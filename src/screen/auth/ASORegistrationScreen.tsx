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

const ASORegistrationScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [uploadedDocuments, setUploadedDocuments] = useState<any>({}); // State to store documents
  const [isCheck, setIsCheck] = useState(false);

  const { handleChange, handleBlur, handleSubmit, values, touched, errors } =
    useFormik({
      initialValues: {
        workCity: "",
        zipCode: "",
      },
      validationSchema: asoRegistrationValidationSchema,
      onSubmit: (values) => {
        console.log("--->", values);
      },
    });

  const handleDocumentSelection = useCallback(async (docType: any) => {
    try {
      const response = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf], // Restrict to PDFs
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
        <TextInputField
          title={t("registration.workCity")}
          placeholder={t("registration.enterWorkCity")}
          isPassword={false}
          value={values.workCity}
          onChangeText={handleChange("workCity")}
          onBlur={handleBlur("workCity")}
          touched={touched.workCity}
          errors={errors.workCity}
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
          onPress={() => handleDocumentSelection("aadharCard")}
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
          onPress={() => handleDocumentSelection("panCard")}
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
          onPress={() => handleDocumentSelection("photo")}
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
          isLoading={false}
          buttonStyle={{ marginTop: 0 }}
          onPress={() =>
            navigation.navigate(RouteString.CompletingRegistrationScreen)
          }
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
