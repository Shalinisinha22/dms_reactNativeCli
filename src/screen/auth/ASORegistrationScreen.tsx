import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
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
import { useAsoRegister } from "../../api/query/RegistrationService";
import { useAppDispatch } from "../../redux/Store";
import Toast from "react-native-toast-message";
import { useSendFCMToken } from "../../api/query/NotificationService";
import { commonStyle } from "../../utils/commonStyles";
import { authActions } from "../../redux/slice/AuthSlice";
import messaging from "@react-native-firebase/messaging";

const ASORegistrationScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const [uploadedDocuments, setUploadedDocuments] = useState<any>({
    aadhaar_card: null,
    pan_card: null,
    profile_pic: null,
  });
  const [isCheck, setIsCheck] = useState(false);
  const { mutateAsync: createAsoRegister } = useAsoRegister();
  const { mutateAsync: sendFCMToken } = useSendFCMToken();
  const [isVisible, setIsVisible] = useState(false);
  const [isApiLoading, setIsApiLoading] = useState(false);
  const dispatch = useAppDispatch();

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
      workCity: "",
      zipCode: "",
      region: [],
    },
    validationSchema: asoRegistrationValidationSchema,
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
      setIsApiLoading(true);
      try {
        const formData = new FormData();
        formData.append("work_city", values.workCity);
        formData.append("zipcode", values.zipCode);
        formData.append("region", values.region);
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
          const token = await messaging().getToken();
          dispatch(authActions.setFCMToken(token));
          await sendFCMToken({ firebaseToken: token });
          setIsApiLoading(false);
          dispatch(authActions.setToken(""));
          navigation.navigate(RouteString.CompletingRegistrationScreen);
        }
      } catch (error) {
        setIsApiLoading(false);
        console.log("ASORegistrationScreen", error);
        Toast.show({
          type: "error",
          text1: "Please try again",
        });
      }
    },
  });

  const onPress = () => {
    if (
      values.workCity == "" ||
      values.zipCode == "" ||
      values.region.length == 0
    ) {
      Toast.show({
        type: "error",
        text1: "Enter All Informatin Correctly",
      });
    }
    handleSubmit();
  };

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
        <SearchDropDownView
          // zIndex={1}
          label={t("registration.SelectAnyOneAreaRegion")}
          placeHolder={t("registration.SelectAreaRegion")}
          selectedNames={(value) => setFieldValue("region", value)}
          errors={errors.region}
          mainViewStyle={commonStyle.mainViewStyle}
          isRequired={true}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        />
        <TextInputField
          title={t("registration.workCity")}
          placeholder={t("registration.enterWorkCity")}
          isPassword={false}
          value={values.workCity}
          onChangeText={handleChange("workCity")}
          onBlur={handleBlur("workCity")}
          touched={touched.workCity}
          onTouchStart={() => setIsVisible(false)}
          errors={errors.workCity}
          isRequired={true}
        />
        <TextInputField
          title={t("registration.zipCode")}
          placeholder={t("registration.enterZipCode")}
          isPassword={false}
          value={values.zipCode}
          onTouchStart={() => setIsVisible(false)}
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
            uploadedDocuments?.profile_pic?.name
              ? IconsPath.success
              : IconsPath.upload
          }
          onPress={() => handleDocumentSelection("profile_pic")}
          title={t("registration.photoUpload")}
          fileName={uploadedDocuments?.profile_pic?.name}
          isRequired={false}
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
          onPress={onPress}
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
