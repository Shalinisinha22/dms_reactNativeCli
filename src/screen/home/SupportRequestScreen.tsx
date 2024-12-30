import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import SafeAreaContainer from "../../components/common/SafeAreaContainer";
import { colors } from "../../utils/Colors";
import { FontPath } from "../../utils/FontPath";
import { hp, RFValue, wp } from "../../helper/Responsive";
import DropDownView from "../../components/common/DropDownView";
import TextInputField from "../../components/common/TextInputField";
import { useFormik } from "formik";
import { supportRequestValidationSchema } from "../../utils/ValidationSchema";
import Button from "../../components/common/Button";
import SuccessModal from "../../components/modal/SuccessModal";
import { useTranslation } from "react-i18next";
import { supportRequestType } from "../../utils/JsonData";
import { useSupport } from "../../api/query/SupportService";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

const SupportRequestScreen = () => {
  const { t } = useTranslation();
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [isApiLoading, setIsApiLoading] = useState(false);
  const { mutateAsync: createSupportRequest } = useSupport();
  const navigation = useNavigation();

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
      description: "",
      type: "",
    },
    validationSchema: supportRequestValidationSchema,
    onSubmit: async (values) => {
      setIsApiLoading(true);
      try {
        const res = await createSupportRequest({
          requestType:values.type,
          description: values.description,
        });
        if(res){
          setIsApiLoading(false);
          navigation.goBack();
          Toast.show({
            type: "success",
            text1: res.message,
          });
        }
      } catch (error) {
        setIsApiLoading(false);
        console.log("SupportRequestScreen", error);
      }
    },
  });

  return (
    <SafeAreaContainer>
      <Text style={styles.title}>{t("supportRequest.supportRequest")}</Text>
      <DropDownView
        zIndex={1}
        label={t("supportRequest.requestType")}
        placeHolder={
          values.type ? values.type : t("supportRequest.selectCategory")
        }
        data={supportRequestType}
        selectedName={(name) => setFieldValue("type", name)}
        errors={errors.type}
      />
      <TextInputField
        title={t("supportRequest.description")}
        placeholder={t("supportRequest.enterDescription")}
        isPassword={false}
        value={values.description}
        onChangeText={handleChange("description")}
        onBlur={handleBlur("description")}
        touched={touched.description}
        errors={errors.description}
        InputViewStyle={styles.inputView}
        multiline
        isRequired={false}
      />
      <Button
        buttonName={t("cancelOrder.Submit")}
        isLoading={isApiLoading}
        onPress={handleSubmit}
      />
      <SuccessModal
        isVisible={isSubmitSuccess}
        backOnPress={() => setIsSubmitSuccess(!isSubmitSuccess)}
      />
    </SafeAreaContainer>
  );
};

export default SupportRequestScreen;

const styles = StyleSheet.create({
  title: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(20),
    marginHorizontal: wp(5),
    marginVertical: hp(2.5),
    lineHeight: hp(4),
  },
  inputView: {
    height: hp(15),
    alignItems: "flex-start",
    paddingVertical: hp(2),
  },
});
