import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import SafeAreaContainer from "../../components/common/SafeAreaContainer";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { hp, RFValue, wp } from "../../helper/Responsive";
import { useTranslation } from "react-i18next";
import { FontPath } from "../../utils/FontPath";
import { colors } from "../../utils/Colors";
import TextInputField from "../../components/common/TextInputField";
import { useFormik } from "formik";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { RouteString } from "../../navigation/RouteString";
import { asoRegistrationValidationSchema } from "../../utils/ValidationSchema";
import DocumentUploadView from "../../components/registration/DocumentUploadView";
import { IconsPath } from "../../utils/IconPath";
import DocumentPicker from "react-native-document-picker";
import CheckIcons from "../../assets/svg/CheckIcons";
import Button from "../../components/common/Button";
import SearchDropDownView from "../../components/common/SearchDropDownView";
import { areaType, city } from "../../utils/JsonData";
import { useAsoRegister } from "../../api/query/RegistrationService";
import MultipulSelectDropDown from "../../components/common/MultipulSelectDropDown";
import { useAppDispatch, useAppSelector } from "../../redux/Store";
import Toast from "react-native-toast-message";
import { useSendFCMToken } from "../../api/query/NotificationService";

const ASORegistrationScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { FCMToken } = useAppSelector((state) => state.auth);
  
  const [uploadedDocuments, setUploadedDocuments] = useState<any>({
    aadhaar_card: null,
    pan_card: null,
    profile_pic: null,
  });
  const [isCheck, setIsCheck] = useState(false);
  const { mutateAsync: createAsoRegister } = useAsoRegister();
    const { mutateAsync: sendFCMToken } = useSendFCMToken();
  
  const [isApiLoading, setIsApiLoading] = useState(false);

  const dispatch = useAppDispatch();

  const fileFields = ["aadhaar_card", "pan_card", "profile_pic"];

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
      workCity: "",
      zipCode: "",
      region: [],
    },
    validationSchema: asoRegistrationValidationSchema,
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
      setIsApiLoading(true);
      try {
        const formData = new FormData();
        formData.append("work_city", values.workCity);
        formData.append("zipcode", values.zipCode);
        formData.append("region", values.region);
        console.log("uploadedDocuments", uploadedDocuments);
        fileFields.forEach((field) => {
          if (uploadedDocuments[field]) {
            formData.append(field, {
              uri: uploadedDocuments[field].uri,
              type: uploadedDocuments[field].type,
              name: uploadedDocuments[field].name,
            });
          }
        });
        const res = await createAsoRegister(formData);
        if (res) {
          await sendFCMToken({firebaseToken: FCMToken})
          setIsApiLoading(false);
          navigation.navigate(RouteString.CompletingRegistrationScreen);
        }
      } catch (error) {
        setIsApiLoading(false);
        console.log("ASORegistrationScreen", error);
      }
    },
  });

  const handleDocumentSelection = useCallback(async (docType: any) => {
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
    <SafeAreaContainer showHeader={false}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        extraScrollHeight={hp(-10)} // Adjust as needed
        contentContainerStyle={{ paddingBottom: hp(5) }}
      >
        <Text style={styles.title}>
          {t("registration.completeRegistration")}
        </Text>
        <MultipulSelectDropDown
          zIndex={2}
          label={t("registration.areaRegionName")}
          placeHolder={t("registration.selectAreaRegionName")}
          data={areaType}
          selectedName={(value) => setFieldValue("region", value)}
          errors={errors.region}
          mainViewStyle={{ marginTop: hp(2) }}
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
          mainViewStyle={{ marginBottom: hp(2) }}
        />
        <DocumentUploadView
          icons={
            uploadedDocuments?.aadharCard?.name
              ? IconsPath.success
              : IconsPath.upload
          }
          onPress={() => handleDocumentSelection("aadhaar_card")}
          title={t("registration.aadharCardUpload")}
          fileName={uploadedDocuments?.aadharCard?.name}
          isRequired={true}
        />
        <DocumentUploadView
          icons={
            uploadedDocuments?.panCard?.name
              ? IconsPath.success
              : IconsPath.upload
          }
          onPress={() => handleDocumentSelection("pan_card")}
          title={t("registration.panCardUpload")}
          fileName={uploadedDocuments?.panCard?.name}
          isRequired={true}
        />
        <DocumentUploadView
          icons={
            uploadedDocuments?.photo?.name
              ? IconsPath.success
              : IconsPath.upload
          }
          onPress={() => handleDocumentSelection("profile_pic")}
          title={t("registration.photoUpload")}
          fileName={uploadedDocuments?.photo?.name}
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
    </SafeAreaContainer>
  );
};

export default ASORegistrationScreen;

const styles = StyleSheet.create({
  title: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(18),
    marginHorizontal: wp(5),
    lineHeight: hp(4),
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
});
