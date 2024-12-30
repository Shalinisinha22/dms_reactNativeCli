import {
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
import { hp, RFValue, wp } from "../../helper/Responsive";
import { IconsPath } from "../../utils/IconPath";
import { useTranslation } from "react-i18next";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { colors } from "../../utils/Colors";
import { FontPath } from "../../utils/FontPath";
import { useFormik } from "formik";
import DocumentPicker from "react-native-document-picker";
import { referralSubmission } from "../../utils/ValidationSchema";
import TextInputField from "../../components/common/TextInputField";
import DocumentUploadView from "../../components/registration/DocumentUploadView";
import Button from "../../components/common/Button";
import { useReferralRegister } from "../../api/query/RegistrationService";
import MultipulSelectDropDown from "../../components/common/MultipulSelectDropDown";
import { useGetProductList } from "../../api/query/OrderPlacementService";
import Toast from "react-native-toast-message";

const ReferralSubmissionScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [uploadedDocuments, setUploadedDocuments] = useState<any>({}); // State to store documents
  const { mutateAsync: createReferralRegister } = useReferralRegister();
  const [isApiLoading, setIsApiLoading] = useState(false);
  const [productList, setProductList] = useState([]);
  const [productId, setProductId] = useState([]);
  const { data } = useGetProductList();

  const fileFields = ["proof"];

  useEffect(() => {
    if (data) {
      const updatedData: any = data?.map((item: any) => ({
        id: item.id,
        name: item.name,
      }));
      setProductList(updatedData);
      setUploadedDocuments({})
    }
  }, [data]);

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
      referral: "",
      phoneNumber: "",
      productUsed: [],
      address: "",
    },
    validationSchema: referralSubmission,
    onSubmit: async (values) => {
      try {
        setIsApiLoading(true);
        const formData = new FormData();
        formData.append("referral_name", values.referral);
        formData.append("mobile_number", values.phoneNumber);
        formData.append("referral_type", "tes");
        formData.append("products", productId);
        formData.append("address", values.address);
        fileFields.forEach((field) => {
          if (uploadedDocuments[field]) {
            formData.append(field, {
              uri: uploadedDocuments[field].uri,
              type: uploadedDocuments[field].type,
              name: uploadedDocuments[field].name,
            });
          }
        });
        const res = await createReferralRegister(formData);
        if (res) {
          setIsApiLoading(false);
          setFieldValue("referral", "");
          setFieldValue("phoneNumber", "");
          setFieldValue("productUsed", []);
          setFieldValue("address", "");
          setUploadedDocuments({});
          Toast.show({
            type: "success",
            text1: res.message,
          });
        }
      } catch (error) {
        setIsApiLoading(false);
        console.log("ReferralSubmissionScreen", error);
      }
    },
  });

  const handleDocumentSelection = useCallback(async (docType: any) => {
    Keyboard.dismiss();
    try {
      const response = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images, DocumentPicker.types.doc], 
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
          <Text style={styles.title}>{t("drawer.referralSubmission")}</Text>
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
          keyboardType="number-pad"
          isRequired={true}
          maxLength={10}
        />
        <MultipulSelectDropDown
          zIndex={2}
          label={t("referralSubmission.ProductUsed")}
          placeHolder={t("referralSubmission.selectProjectUsed")}
          data={productList}
          selectedName={(value) => setFieldValue("productUsed", value)}
          selectedId={(value) => setProductId(value)}
          errors={errors.productUsed}
          mainViewStyle={{ marginTop: hp(3) }}
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
          mainViewStyle={{ marginBottom: hp(2) }}
          multiline
          isRequired={true}
        />
        <DocumentUploadView
          icons={
            uploadedDocuments?.proof?.name
              ? IconsPath.success
              : IconsPath.upload
          }
          onPress={() => handleDocumentSelection("proof")}
          title={t("referralSubmission.uploadProof")}
          fileName={uploadedDocuments?.proof?.name}
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

export default ReferralSubmissionScreen;

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
  },
});
