import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import SafeAreaContainer from '../../components/common/SafeAreaContainer'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { hp, RFValue, wp } from '../../helper/Responsive'
import { IconsPath } from '../../utils/IconPath'
import { useTranslation } from 'react-i18next'
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native'
import { colors } from '../../utils/Colors'
import { FontPath } from '../../utils/FontPath'
import { useFormik } from 'formik'
import DocumentPicker from "react-native-document-picker";
import { referralSubmission } from '../../utils/ValidationSchema'
import TextInputField from '../../components/common/TextInputField'
import DropDownView from '../../components/common/DropDownView'
import { supportRequestType } from '../../utils/JsonData'
import DocumentUploadView from '../../components/registration/DocumentUploadView'
import Button from '../../components/common/Button'
import { RouteString } from '../../navigation/RouteString'

const ReferralSubmissionScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [uploadedDocuments, setUploadedDocuments] = useState<any>({}); // State to store documents


  const { handleChange, handleBlur, handleSubmit, values, touched, errors } =
    useFormik({
      initialValues: {
        referral: "",
        phoneNumber: "",
        type: "",
        productUsed: "",
        address: "",
      },
      validationSchema: referralSubmission,
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
        {/* <Pressable onPress={() => navigation.goBack()}>
          <Image source={IconsPath.backArrow} style={styles.backIcons} />
        </Pressable> */}
        <Text style={styles.title}>
          {t("drawer.referralSubmission")}
        </Text>
      </View>
      <TextInputField
          title={t("referralSubmission.Referral")}
          placeholder={t("referralSubmission.enterReferralname")}
          isPassword={false}
          value={values.referral}
          onChangeText={handleChange("referral")}
          onBlur={handleBlur("referral")}
          touched={touched.referral}
          errors={errors.referral}
          isRequired={true}
        />
         <TextInputField
          title={t("referralSubmission.phoneNO")}
          placeholder={t("referralSubmission.enterPhoneNumber")}
          isPassword={false}
          value={values.phoneNumber}
          onChangeText={handleChange("phoneNumber")}
          onBlur={handleBlur("phoneNumber")}
          touched={touched.phoneNumber}
          errors={errors.phoneNumber}
          keyboardType='number-pad'
          isRequired={true}
        />
         <DropDownView
          zIndex={2}
          label={t("referralSubmission.type")}
          placeHolder={t("referralSubmission.selectProjectType")}
          mainViewStyle={{ marginTop: hp(3) }}
          data={supportRequestType}
          selectedName={function (name: string): void {
            console.log("name", name);
          }}
          errors={errors.type}
        />
        <DropDownView
          zIndex={1}
          label={t("referralSubmission.ProductUsed")}
          placeHolder={t("referralSubmission.selectProjectUsed")}
          mainViewStyle={{ marginTop: hp(3) }}
          data={supportRequestType}
          selectedName={function (name: string): void {
            console.log("name", name);
          }}
          errors={errors.productUsed}
        />
         <TextInputField
          title={t("ASODealerOnboard.address")}
          placeholder={t("referralSubmission.enterAddress")}
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
         <DocumentUploadView
          icons={
            uploadedDocuments?.photo?.name
              ? IconsPath.success
              : IconsPath.upload
          }
          onPress={() => handleDocumentSelection("photo")}
          title={t("referralSubmission.uploadProof")}
          fileName={uploadedDocuments?.photo?.name}
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
  )
}

export default ReferralSubmissionScreen

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
  inputView: {
    height: hp(15),
    alignItems: "flex-start",
    paddingVertical: hp(2),
    marginBottom:hp(2)
  },
})