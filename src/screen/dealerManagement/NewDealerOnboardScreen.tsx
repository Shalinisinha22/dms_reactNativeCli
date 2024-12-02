import { Image, Pressable, StyleSheet, Text, View } from "react-native";
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
import DropDownView from "../../components/common/DropDownView";
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
import { supportRequestType } from "../../utils/JsonData";

const NewDealerOnboardScreen = () => {
  const { t } = useTranslation();
  const [uploadedDocuments, setUploadedDocuments] = useState<any>({}); // State to store documents
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const { handleChange, handleBlur, handleSubmit, values, touched, errors } =
    useFormik({
      initialValues: {
        firmName: "",
        fullName: "",
        email: "",
        phoneNumber: "",
        workCity: "",
        zipCode: "",
        counterAddress: "",
      },
      validationSchema: newDealerValidationSchema,
      onSubmit: (values) => {},
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
        <TextInputField
          title={t("registration.fullName")}
          placeholder={t("signUp.enterName")}
          isPassword={false}
          value={values.fullName}
          onChangeText={handleChange("fullName")}
          onBlur={handleBlur("fullName")}
          touched={touched.fullName}
          errors={errors.fullName}
          isRequired={true}
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
        />
        <DropDownView
          zIndex={1}
          label={t("registration.workCity")}
          placeHolder={t("registration.selectCity")}
          mainViewStyle={{ marginTop: hp(3) }}
          data={supportRequestType}
          selectedName={function (name: string): void {
            throw new Error("Function not implemented.");
          }}
          errors={undefined}
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
        />
        <Text style={styles.uplaodDocuments}>
          {t("registration.uplaodDocuments")}
        </Text>
        <DocumentUploadView
          icons={
            uploadedDocuments?.aadharCard?.name
              ? IconsPath.success
              : IconsPath.upload
          }
          onPress={() => handleDocumentSelection("aadharCard")}
          title={t("registration.aadharCardUpload")}
          fileName={uploadedDocuments?.aadharCard?.name}
          isRequired={false}
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
          isRequired={false}
        />
        <DocumentUploadView
          icons={
            uploadedDocuments?.gstCertificate?.name
              ? IconsPath.success
              : IconsPath.upload
          }
          onPress={() => handleDocumentSelection("gstCertificate")}
          title={t("registration.GSTCertificateUpload")}
          fileName={uploadedDocuments?.gstCertificate?.name}
          isRequired={false}
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
          isRequired={false}
        />
        <DocumentUploadView
          icons={
            uploadedDocuments?.signedCheque?.name
              ? IconsPath.success
              : IconsPath.upload
          }
          onPress={() => handleDocumentSelection("signedCheque")}
          title={t("registration.signedChequeUpload")}
          fileName={uploadedDocuments?.signedCheque?.name}
          isRequired={false}
        />
        <Button
          buttonName={t("cancelOrder.Submit")}
          isLoading={false}
          buttonStyle={{ marginTop: 0 }}
          onPress={() =>
            navigation.navigate(RouteString.DealerSuccessfullyScreen)
          }
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
    paddingVertical: hp(2),
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
});
