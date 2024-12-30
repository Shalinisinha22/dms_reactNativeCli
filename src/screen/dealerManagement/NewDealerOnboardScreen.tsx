import {
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import SafeAreaContainer from "../../components/common/SafeAreaContainer";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { hp, RFValue, wp } from "../../helper/Responsive";
import { FontPath } from "../../utils/FontPath";
import { colors } from "../../utils/Colors";
import { useTranslation } from "react-i18next";
import TextInputField from "../../components/common/TextInputField";
import { useFormik } from "formik";
import { newDealerValidationSchema } from "../../utils/ValidationSchema";
import DocumentUploadView from "../../components/registration/DocumentUploadView";
import DocumentPicker from "react-native-document-picker";
import { IconsPath } from "../../utils/IconPath";
import Button from "../../components/common/Button";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { RouteString } from "../../navigation/RouteString";
import { city } from "../../utils/JsonData";
import { useNewDealerRegister } from "../../api/query/DealerManagementService";
import CustomToggle from "../../components/common/CustomToggle";
import SearchDropDownView from "../../components/common/SearchDropDownView";
import Toast from "react-native-toast-message";

const NewDealerOnboardScreen = () => {
  const { t } = useTranslation();
  const [uploadedDocuments, setUploadedDocuments] = useState<any>({
    aadhaar_card: null,
    pan_card: null,
    gst_certificate: null,
    profile_pic: null,
    cheque: null,
  });
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { mutateAsync: createNewDealerRegister } = useNewDealerRegister();
  const [isApiLoading, setIsApiLoading] = useState(false);
  const [isOn, setOn] = useState(false);

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
      fullname: "",
      email: "",
      phoneNumber: "",
      workCity: "",
      counterAddress: "",
    },
    validationSchema: newDealerValidationSchema,
    onSubmit: async (values) => {
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
      try {
        setIsApiLoading(true);
        const formData = new FormData();
        formData.append("name", values.fullname);
        formData.append("firm_name", values.firmName);
        formData.append("email", values.email);
        formData.append("mobile_number", values.phoneNumber);
        formData.append("work_city", values.workCity);
        formData.append("address", values.counterAddress);
        formData.append("status", isOn ? "approved" : "pending");
        fileFields.forEach((field) => {
          if (uploadedDocuments[field]) {
            formData.append(field, {
              uri: uploadedDocuments[field].uri,
              type: uploadedDocuments[field].type,
              name: uploadedDocuments[field].name,
            });
          }
        });
        const res = await createNewDealerRegister(formData);
        if (res) {
          setIsApiLoading(false);
          navigation.navigate(RouteString.DealerSuccessfullyScreen);
        }
      } catch (error) {
        setIsApiLoading(false);
        console.log("NewDealerOnboardScreen", error);
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

  const handleToggle = (isOn: boolean) => {
    setOn(isOn);
  };

  return (
    <SafeAreaContainer>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets
        extraScrollHeight={hp(-10)} // Adjust as needed
        contentContainerStyle={{ paddingBottom: hp(5) }}
      >
        <View style={styles.backRowView}>
          <Pressable onPress={() => navigation.goBack()}>
            <Image source={IconsPath.backArrow} style={styles.backIcons} />
          </Pressable>
          <Text style={styles.title}>
            {t("newDealerOnboard.newDealerOnboard")}
          </Text>
        </View>
        <View style={styles.changeStatusRowView}>
          <Text style={styles.changeStatus}>
            {t("viewDealerDetails.changeDealerStatus")} :
          </Text>
          <CustomToggle initialValue={false} onToggle={handleToggle} />
        </View>
        <TextInputField
          title={t("registration.fullName")}
          placeholder={t("signUp.enterName")}
          isPassword={false}
          value={values.fullname}
          onChangeText={handleChange("fullname")}
          onBlur={handleBlur("fullname")}
          touched={touched.fullname}
          errors={errors.fullname}
          isRequired={true}
          mainViewStyle={{ marginTop: 0 }}
        />
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
        <TextInputField
          title={t("signUp.emailAddress")}
          placeholder={t("signUp.enterEmailAddress")}
          isPassword={false}
          value={values.email}
          onChangeText={handleChange("email")}
          onBlur={handleBlur("email")}
          touched={touched.email}
          errors={errors.email}
          isRequired={true}
        />
        <TextInputField
          title={t("signUp.mobileNo")}
          placeholder={t("signUp.enterMobileNo")}
          isPassword={false}
          value={values.phoneNumber}
          onChangeText={handleChange("phoneNumber")}
          onBlur={handleBlur("phoneNumber")}
          touched={touched.phoneNumber}
          errors={errors.phoneNumber}
          isRequired={true}
          maxLength={10}
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
          title={t("registration.counterAddress")}
          placeholder={t("registration.enterCounterAddress")}
          isPassword={false}
          value={values.counterAddress}
          onChangeText={handleChange("counterAddress")}
          onBlur={handleBlur("counterAddress")}
          touched={touched.counterAddress}
          errors={errors.counterAddress}
          InputViewStyle={styles.inputView}
          multiline
          isRequired={true}
          textInputStyle={{ height: hp(15), paddingVertical: hp(2) }}
        />
        <Text style={styles.uplaodDocuments}>
          {t("registration.uplaodDocuments")}
        </Text>
        <DocumentUploadView
          icons={
            uploadedDocuments?.aadhaar_card?.name
              ? IconsPath.success
              : IconsPath.upload
          }
          onPress={() => handleDocumentSelection("aadhaar_card")}
          title={t("registration.aadharCardUpload")}
          fileName={uploadedDocuments?.aadhaar_card?.name}
          isRequired={false}
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
          isRequired={false}
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
          isRequired={false}
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
          isRequired={false}
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
          isRequired={false}
        />
        <Button
          buttonName={t("cancelOrder.Submit")}
          isLoading={isApiLoading}
          buttonStyle={{ marginTop: 0 }}
          onPress={handleSubmit}
        />
      </KeyboardAwareScrollView>
    </SafeAreaContainer>
  );
};

export default NewDealerOnboardScreen;

const styles = StyleSheet.create({
  title: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(18),
  },
  inputView: {
    height: hp(15),
    alignItems: "flex-start",
  },
  uplaodDocuments: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(18),
    marginHorizontal: wp(5),
    marginVertical: hp(2.5),
  },
  backRowView: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: wp(3),
    marginTop: hp(3),
  },
  backIcons: {
    width: wp(8),
    height: wp(8),
    resizeMode: "contain",
  },
  changeStatusRowView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: wp(5),
    marginVertical: hp(2),
  },
  changeStatus: {
    color: colors.primary,
    fontFamily: FontPath.OutfitMedium,
    fontSize: RFValue(16),
  },
});
