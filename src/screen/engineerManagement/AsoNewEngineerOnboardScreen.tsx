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
import { IconsPath } from "../../utils/IconPath";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { colors } from "../../utils/Colors";
import { FontPath } from "../../utils/FontPath";
import { useTranslation } from "react-i18next";
import CustomToggle from "../../components/common/CustomToggle";
import TextInputField from "../../components/common/TextInputField";
import { useFormik } from "formik";
import { asoNewDealerOnboard } from "../../utils/ValidationSchema";
import DocumentUploadView from "../../components/registration/DocumentUploadView";
import Button from "../../components/common/Button";
import { RouteString } from "../../navigation/RouteString";
import DocumentPicker from "react-native-document-picker";
import { useNewEngineerRegister } from "../../api/query/EngineerManagementService";
import Toast from "react-native-toast-message";
import { useAppSelector } from "../../redux/Store";

const AsoNewEngineerOnboardScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [uploadedDocuments, setUploadedDocuments] = useState<any>({
    aadhaar_card: null,
    pan_card: null,
    profile_pic: null,
  });
  const { mutateAsync: createNewEngineerRegister } = useNewEngineerRegister();
  const [isApiLoading, setIsApiLoading] = useState(false);
  const [isOn, setOn] = useState(false);
  const { userInfo } = useAppSelector((state) => state.auth);

  const fileFields = ["aadhaar_card", "pan_card", "profile_pic"];
  const requiredDocuments = ["aadhaar_card", "pan_card"];
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
      name: "",
      email: "",
      phoneNumber: "",
      city: "",
      address: "",
    },
    validationSchema: asoNewDealerOnboard,
    onSubmit: async (values) => {
      const allRequiredDocumentsUploaded = requiredDocuments.every(
        (doc) => uploadedDocuments[doc] !== null
      );

      if (!allRequiredDocumentsUploaded) {
        Toast.show({
          type: "error",
          text1: "Please upload all the required documents",
        });
        return;
      }
      try {
        setIsApiLoading(true);
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("mobile_number", values.phoneNumber);
        formData.append("work_city", values.city);
        formData.append("region", userInfo?.region);
        formData.append("address", values.address);
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
        const res = await createNewEngineerRegister(formData);
        if (res) {
          setIsApiLoading(false);
          navigation.navigate(RouteString.DealerSuccessfullyScreen);
        }
      } catch (error) {
        setIsApiLoading(false);
        console.log("AsoNewMasonOnboardScreen", error);
      }
    },
  });

  const handleToggle = (isOn: boolean) => {
    console.log("Toggle is now:", isOn);
  };

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
            {t("engineerOnboard.engineerOnboard")}
          </Text>
        </View>
        <View style={styles.changeStatusRowView}>
          <Text style={styles.changeStatus}>
            {t("engineerOnboard.changeEngineerStatus")} :
          </Text>
          <CustomToggle initialValue={false} onToggle={handleToggle} />
        </View>
        <TextInputField
          title={t("ASODealerOnboard.name")}
          placeholder={t("ASODealerOnboard.enterName")}
          isPassword={false}
          value={values.name}
          onChangeText={handleChange("name")}
          onBlur={handleBlur("name")}
          touched={touched.name}
          errors={errors.name}
          isRequired={true}
          mainViewStyle={{ marginTop: 0 }}
        />
        <TextInputField
          title={t("ASODealerOnboard.emailAddress")}
          placeholder={t("ASODealerOnboard.enterEmailAddress")}
          isPassword={false}
          value={values.email}
          onChangeText={handleChange("email")}
          onBlur={handleBlur("email")}
          touched={touched.email}
          errors={errors.email}
          isRequired={true}
        />
        <TextInputField
          title={t("ASODealerOnboard.mobileNo")}
          placeholder={t("ASODealerOnboard.enterMobilNo")}
          isPassword={false}
          value={values.phoneNumber}
          onChangeText={handleChange("phoneNumber")}
          onBlur={handleBlur("phoneNumber")}
          touched={touched.phoneNumber}
          errors={errors.phoneNumber}
          isRequired={true}
          maxLength={10}
        />
        <TextInputField
          title={t("registration.SelectAnyOneAreaRegion")}
          placeholder={t("registration.SelectAreaRegion")}
          isPassword={false}
          value={userInfo?.region?.join(" , ")}
          onChangeText={handleChange("zipCode")}
          onBlur={handleBlur("zipCode")}
          touched={false}
          errors={''}
          maxLength={6}
          isRequired={true}
          editable={false}
        />
         <TextInputField
          title={t("registration.workCity")}
          placeholder={t("registration.enterWorkCity")}
          isPassword={false}
          value={values.city}
          onChangeText={handleChange("city")}
          onBlur={handleBlur("city")}
          touched={touched.city}
          errors={errors.city}
          isRequired={true}
        />
        <TextInputField
          title={t("ASODealerOnboard.address")}
          placeholder={t("ASODealerOnboard.addressDetail")}
          isPassword={false}
          value={values.address}
          onChangeText={handleChange("address")}
          onBlur={handleBlur("address")}
          touched={touched.address}
          errors={errors.address}
          InputViewStyle={styles.inputView}
          multiline
          isRequired={true}
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
            uploadedDocuments?.profile_pic?.name
              ? IconsPath.success
              : IconsPath.upload
          }
          onPress={() => handleDocumentSelection("profile_pic")}
          title={t("registration.photoUpload")}
          fileName={uploadedDocuments?.profile_pic?.name}
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

export default AsoNewEngineerOnboardScreen;

const styles = StyleSheet.create({
  title: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(18),
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
  inputView: {
    height: hp(15),
    alignItems: "flex-start",
    paddingVertical: hp(2),
  },
  uplaodDocuments: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(18),
    marginHorizontal: wp(5),
    marginVertical: hp(2.5),
  },
});
