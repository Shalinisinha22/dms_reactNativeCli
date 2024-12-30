import {
  Alert,
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import SafeAreaContainer from "../../components/common/SafeAreaContainer";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { colors } from "../../utils/Colors";
import { FontPath } from "../../utils/FontPath";
import { hp, isiPAD, RFValue, wp } from "../../helper/Responsive";
import TextInputField from "../../components/common/TextInputField";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../redux/Store";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { dealerValidationSchema } from "../../utils/ValidationSchema";
import { RouteString } from "../../navigation/RouteString";
import TextInputFieldOptional from "../../components/common/TextInputFieldOptional";
import { IconsPath } from "../../utils/IconPath";
import DocumentUploadView from "../../components/registration/DocumentUploadView";
import Button from "../../components/common/Button";
import CheckIcons from "../../assets/svg/CheckIcons";
import DocumentPicker from "react-native-document-picker";
import { useTranslation } from "react-i18next";
import {
  useDealerRegister,
  useDistributorRegister,
} from "../../api/query/RegistrationService";
import SearchDropDownView from "../../components/common/SearchDropDownView";
import { city } from "../../utils/JsonData";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Toast from "react-native-toast-message";
import { UserType } from "../../interfaces/Types";
import { useGetUser } from "../../api/query/ProfileService";
import { authActions } from "../../redux/slice/AuthSlice";
import { useSendFCMToken } from "../../api/query/NotificationService";

const RegistrationFormScreen = () => {
  const { t } = useTranslation();
  const { portal, FCMToken } = useAppSelector((state) => state.auth);
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [birthDate, setBirthDate] = useState("");
  const [isCheck, setIsCheck] = useState(false);
  const [familyMembers, setFamilyMembers] = useState([
    { id: Date.now(), name: "", relationship: "", dob: "" },
  ]);
  const [uploadedDocuments, setUploadedDocuments] = useState<any>({
    aadhaar_card: null,
    pan_card: null,
    gst_certificate: null,
    profile_pic: null,
    cheque: null,
  });
  const [isApiLoading, setIsApiLoading] = useState(false);
  const { mutateAsync: createDealerRegister } = useDealerRegister();
  const { mutateAsync: createDistributorRegister } = useDistributorRegister();
  const { mutateAsync: sendFCMToken } = useSendFCMToken();

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<any>("");
  const dispatch = useAppDispatch();

  const fileFields = [
    "aadhaar_card",
    "pan_card",
    "gst_certificate",
    "profile_pic",
    "cheque",
  ];

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    touched,
    errors,
    setFieldValue,
  } = useFormik({
    initialValues: {
      firmName: "",
      workCity: "",
      zipCode: "",
      counterAddress: "",
    },
    validationSchema: dealerValidationSchema,
    onSubmit: async (values) => {
      if (isCheck == false) {
        Toast.show({
          type: "error",
          text1: "Accept Terms & Comditions",
        });
        return;
      }
      const allDocumentsUploaded = Object.values(uploadedDocuments).every(
        (doc) => doc !== null
      );

      if (!allDocumentsUploaded) {
        Toast.show({
          type: "error",
          text1: "Please upload all the required documents",
        });
        return;
      }

      setIsApiLoading(true);
      try {
        const updatedFamilyMembers = familyMembers.map(
          ({ id, ...rest }) => rest
        );
        const formData = new FormData();
        formData.append("firm_name", values.firmName);
        formData.append("work_city", values.workCity);
        formData.append("zipcode", values.zipCode);
        formData.append("address", values.counterAddress);
        formData.append("dob", birthDate);
        formData.append(
          "member",
          updatedFamilyMembers[0]?.name === "" ? [] : updatedFamilyMembers
        );
        fileFields.forEach((field) => {
          if (uploadedDocuments[field]) {
            formData.append(field, {
              uri: uploadedDocuments[field].uri,
              type: uploadedDocuments[field].type,
              name: uploadedDocuments[field].name,
            });
          }
        });
        const res =
          portal === UserType.DISTRIBUTOR
            ? await createDistributorRegister(formData)
            : await createDealerRegister(formData);
        if (res) {
          await sendFCMToken({ firebaseToken: FCMToken });
          setIsApiLoading(false);
          navigation.navigate(RouteString.CompletingRegistrationScreen);
        }
      } catch (error) {
        setIsApiLoading(false);
        console.log("RegistrationFormScreen", error);
      }
    },
  });

  const handleDocumentSelection = useCallback(async (docType: any) => {
    Keyboard.dismiss();
    try {
      const response = await DocumentPicker.pick({
        type: [
          DocumentPicker.types.pdf,
          DocumentPicker.types.images,
          DocumentPicker.types.doc,
        ],
        presentationStyle: "fullScreen",
      });

      // Store the document in the state
      setUploadedDocuments((prevState: any) => ({
        ...prevState,
        [docType]: response[0], // Use docType as the key, e.g., 'aadharCard'
      }));
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.warn("User canceled the document picker");
      } else {
        console.error("Error selecting document:", err);
      }
    }
  }, []);

  // Handler to add a new member form
  const addMember = () => {
    setFamilyMembers([
      ...familyMembers,
      { id: Date.now(), name: "", relationship: "", dob: "" },
    ]);
  };

  // Handler to remove a member form by id
  const removeMember = (id: number) => {
    setFamilyMembers(familyMembers.filter((member) => member.id !== id));
  };

  // Handler to update the member details and validate the name field
  const handleInputChange = (id: number, field: string, value: string) => {
    if (field === "name" && value.toLowerCase() === "all") {
      Alert.alert(
        "Invalid Input",
        '"all" is not allowed as a name. Please enter a different name.'
      );
      return;
    }

    setFamilyMembers(
      familyMembers.map((member) =>
        member.id === id ? { ...member, [field]: value } : member
      )
    );
  };

  const handleConfirm = (date: any) => {
    const formattedDate = date.toISOString().split("T")[0];

    // Calculate the cutoff date for 18 years ago
    const today = new Date();
    const eighteenYearsAgo = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );

    // Check if the selected date is before or equal to the cutoff date
    if (date > eighteenYearsAgo) {
      Toast.show({
        type: "error",
        text1: `${t('error.AgeMustBeOrAbove')}`,
      });
      setDatePickerVisibility(false);
      return;
    } else {
      if (selectedMemberId) {
        handleInputChange(selectedMemberId, "dob", formattedDate);
      } else {
        setBirthDate(formattedDate);
      }
    }
    setDatePickerVisibility(false);
  };

  const showDatePickerForMember = (id: number) => {
    setDatePickerVisibility(true);
    setSelectedMemberId(id);
  };

  return (
    <SafeAreaContainer showHeader={false}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        extraScrollHeight={hp(-10)} // Adjust as needed
        contentContainerStyle={{ paddingBottom: hp(5) }}
      >
        <Text style={styles.title}>
          {t("registration.completeRegistration")}
        </Text>
        <TextInputField
          title={t("registration.enterprise")}
          placeholder={t("registration.enterEnterprise")}
          isPassword={false}
          value={values.firmName}
          onChangeText={handleChange("firmName")}
          onBlur={handleBlur("firmName")}
          touched={touched.firmName}
          errors={errors.firmName}
          isRequired={true}
        />
        <SearchDropDownView
          zIndex={1}
          label={t("registration.workCity")}
          placeHolder={t("registration.enterWorkCity")}
          data={city}
          selectedName={(value) => setFieldValue("workCity", value)}
          errors={errors.workCity}
          mainViewStyle={{ marginTop: hp(3), marginHorizontal: wp(5) }}
          isRequired={true}
        />
        <TextInputField
          title={t("registration.zipCode")}
          placeholder={t("registration.enterZipCode")}
          isPassword={false}
          value={values.zipCode}
          onChangeText={handleChange("zipCode")}
          onBlur={handleBlur("zipCode")}
          touched={touched.zipCode}
          errors={errors.zipCode}
          maxLength={6}
          isRequired={true}
        />
        <TextInputField
          title={t("registration.counterAddress")}
          placeholder={t("registration.enterCounterAddress")}
          isPassword={false}
          value={values.counterAddress}
          onChangeText={handleChange("counterAddress")}
          onBlur={handleBlur("counterAddress")}
          touched={touched.counterAddress}
          errors={errors.counterAddress}
          InputViewStyle={styles.inputView}
          textInputStyle={{ height:hp(15)}}
          multiline
          isRequired={true}
        />
        <Text style={styles.personalInfo}>
          {t("registration.personalInfo")}
        </Text>
        <TextInputFieldOptional
          title={t("registration.yourBirthDate")}
          placeholder={t("registration.DDMM")}
          value={birthDate}
          onChangeText={() => null}
          onTouchStart={() => {
            setDatePickerVisibility(true);
            setSelectedMemberId("");
          }}
        />
        {familyMembers.map((member, index) => (
          <View style={styles.moreMemberView} key={index}>
            <Pressable
              style={styles.closeButton}
              onPress={() => removeMember(member.id)}
            >
              <Image source={IconsPath.closeRound} style={styles.close} />
            </Pressable>
            <TextInputFieldOptional
              title={t("registration.familyMemberName")}
              placeholder={t("registration.entreFamilyMemberName")}
              mainViewStyle={styles.mainViewStyle}
              labelStyle={styles.labelStyle}
              InputViewStyle={styles.inputViewStyle}
              value={member.name}
              onChangeText={(value) =>
                handleInputChange(member.id, "name", value)
              }
            />
            <TextInputFieldOptional
              title={t("registration.relationShipWithMember")}
              placeholder={t("registration.enterRelatioshipWithEmeber")}
              labelStyle={styles.labelStyle}
              InputViewStyle={styles.inputViewStyle}
              value={member.relationship}
              onChangeText={(value) =>
                handleInputChange(member.id, "relationship", value)
              }
            />
            <TextInputFieldOptional
              title={t("registration.birthDate")}
              placeholder={t("registration.DDMM")}
              labelStyle={styles.labelStyle}
              InputViewStyle={styles.inputViewStyle}
              value={member.dob}
              onTouchStart={() => showDatePickerForMember(member.id)}
              onChangeText={(value) =>
                handleInputChange(member.id, "dob", value)
              }
            />
          </View>
        ))}
        <Pressable style={styles.addMoreMemberButton} onPress={addMember}>
          <Image source={IconsPath.pluse} style={styles.pluse} />
          <Text style={styles.addMoreMember}>
            {t("registration.addMoreMember")}
          </Text>
        </Pressable>
        <DocumentUploadView
          icons={
            uploadedDocuments?.aadhaar_card?.name
              ? IconsPath.success
              : IconsPath.upload
          }
          onPress={() => handleDocumentSelection("aadhaar_card")}
          title={t("registration.aadharCardUpload")}
          fileName={uploadedDocuments?.aadhaar_card?.name}
          isRequired={true}
        />
        <DocumentUploadView
          icons={
            uploadedDocuments?.pan_card?.name
              ? IconsPath.success
              : IconsPath.upload
          }
          onPress={() => handleDocumentSelection("pan_card")}
          title={t("registration.panCardUpload")}
          fileName={uploadedDocuments?.pan_card?.name}
          isRequired={true}
        />
        <DocumentUploadView
          icons={
            uploadedDocuments?.gst_certificate?.name
              ? IconsPath.success
              : IconsPath.upload
          }
          onPress={() => handleDocumentSelection("gst_certificate")}
          title={t("registration.GSTCertificateUpload")}
          fileName={uploadedDocuments?.gst_certificate?.name}
          isRequired={true}
        />
        <DocumentUploadView
          icons={
            uploadedDocuments?.profile_pic?.name
              ? IconsPath.success
              : IconsPath.upload
          }
          onPress={() => handleDocumentSelection("profile_pic")}
          title={t("registration.photoUpload")}
          fileName={uploadedDocuments?.profile_pic?.name}
          isRequired={true}
        />
        <DocumentUploadView
          icons={
            uploadedDocuments?.cheque?.name
              ? IconsPath.success
              : IconsPath.upload
          }
          onPress={() => handleDocumentSelection("cheque")}
          title={t("registration.signedChequeUpload")}
          fileName={uploadedDocuments?.cheque?.name}
          isRequired={true}
        />
        <View style={styles.termsView}>
          <Pressable
            style={[
              styles.checkButton,
              {
                backgroundColor: isCheck ? colors.primary : colors.white,
                borderColor: isCheck ? colors.primary : colors.black,
              },
            ]}
            onPress={() => setIsCheck(!isCheck)}
          >
            {isCheck && (
              <CheckIcons fill={isCheck ? colors.white : colors.black} />
            )}
          </Pressable>
          <Text style={styles.agreeText}>
            {t("registration.iAgreeWithAllTheTermsComditions")}
          </Text>
        </View>
        <Button
          buttonName={t("registration.submitForApproval")}
          isLoading={isApiLoading}
          buttonStyle={{ marginTop: 0 }}
          onPress={handleSubmit}
        />
      </KeyboardAwareScrollView>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => setDatePickerVisibility(false)}
      />
    </SafeAreaContainer>
  );
};

export default RegistrationFormScreen;

const styles = StyleSheet.create({
  title: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(18),
    marginHorizontal: wp(5),
    lineHeight: hp(4),
  },
  inputView: {
    height: hp(15),
    alignItems: "flex-start",
  },
  personalInfo: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(15),
    marginHorizontal: wp(5),
    marginTop: hp(2),
    lineHeight: hp(4),
  },
  close: {
    width: isiPAD ? wp(5) : wp(7),
    height: isiPAD ? wp(5) : wp(7),
    resizeMode: "contain",
  },
  moreMemberView: {
    backgroundColor: colors.lightblack,
    borderWidth: 1,
    borderColor: colors.black_100,
    marginHorizontal: wp(5),
    marginTop: hp(2),
    paddingBottom: hp(3),
  },
  closeButton: {
    alignSelf: "flex-end",
    marginRight: wp(4),
    marginTop: hp(2),
  },
  mainViewStyle: {
    marginTop: 0,
  },
  labelStyle: {
    marginBottom: hp(1),
  },
  inputViewStyle: {
    borderWidth: 1,
    borderColor: colors.black_50,
  },
  addMoreMemberButton: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: wp(5),
    marginVertical: hp(3),
  },
  pluse: {
    width: isiPAD ? wp(6) : wp(8),
    height: isiPAD ? wp(6) : wp(8),
    resizeMode: "contain",
  },
  addMoreMember: {
    color: colors.primary,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(14),
    lineHeight: hp(3),
  },
  termsView: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: hp(2),
    marginBottom: hp(4),
  },
  checkButton: {
    width: wp(5),
    height: wp(5),
    borderWidth: 2,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  agreeText: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(14),
    marginLeft: wp(2),
    lineHeight: hp(3),
  },
  error: {
    color: colors.primary,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(12),
    lineHeight: hp(3),
    marginHorizontal: wp(5),
  },
});
