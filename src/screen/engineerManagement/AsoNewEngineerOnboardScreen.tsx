import { Image, Pressable, StyleSheet, Text, View } from "react-native";
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
import DropDownView from "../../components/common/DropDownView";
import { supportRequestType } from "../../utils/JsonData";
import DocumentUploadView from "../../components/registration/DocumentUploadView";
import Button from "../../components/common/Button";
import { RouteString } from "../../navigation/RouteString";
import DocumentPicker from "react-native-document-picker";

const AsoNewEngineerOnboardScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [uploadedDocuments, setUploadedDocuments] = useState<any>({}); // State to store documents

  const { handleChange, handleBlur, handleSubmit, values, touched, errors } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        phoneNumber: "",
        city: "",
        address: "",
      },
      validationSchema: asoNewDealerOnboard,
      onSubmit: (values) => {},
    });

  const handleToggle = (isOn: boolean) => {
    console.log("Toggle is now:", isOn);
  };

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
        />
        <DropDownView
          zIndex={1}
          label={t("ASODealerOnboard.city")}
          placeHolder={t("ASODealerOnboard.selectCity")}
          mainViewStyle={{ marginTop: hp(3) }}
          data={supportRequestType}
          selectedName={function (name: string): void {
            console.log("name", name);
          }}
          errors={errors.city}
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
