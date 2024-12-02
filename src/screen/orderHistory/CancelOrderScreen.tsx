import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import SafeAreaContainer from "../../components/common/SafeAreaContainer";
import { IconsPath } from "../../utils/IconPath";
import { hp, RFValue, wp } from "../../helper/Responsive";
import { colors } from "../../utils/Colors";
import { FontPath } from "../../utils/FontPath";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import TextInputField from "../../components/common/TextInputField";
import { useFormik } from "formik";
import { cancelationRemarksValidationSchema } from "../../utils/ValidationSchema";
import Button from "../../components/common/Button";
import { useTranslation } from "react-i18next";

const CancelOrderScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const { handleChange, handleBlur, handleSubmit, values, touched, errors } =
    useFormik({
      initialValues: {
        remarks: "",
      },
      validationSchema: cancelationRemarksValidationSchema,
      onSubmit: (values) => console.log("==>", values),
    });

  return (
    <SafeAreaContainer>
      <View style={styles.backRowView}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image source={IconsPath.backArrow} style={styles.backIcons} />
        </Pressable>
        <Text style={styles.cancelOrder}>{t("cancelOrder.cancelOrder")}</Text>
      </View>
      <TextInputField
        title={t("cancelOrder.addCancelationRemarks")}
        placeholder={t("cancelOrder.enterRemarks")}
        isPassword={false}
        value={values.remarks}
        onChangeText={handleChange("remarks")}
        onBlur={handleBlur("remarks")}
        touched={touched.remarks}
        errors={errors.remarks}
        InputViewStyle={styles.inputView}
        multiline
        mainViewStyle={{ marginTop: 0 }}
        isRequired={false}
      />
      <Button
        buttonName={t("cancelOrder.Submit")}
        isLoading={false}
        onPress={handleSubmit}
      />
    </SafeAreaContainer>
  );
};

export default CancelOrderScreen;

const styles = StyleSheet.create({
  backRowView: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: wp(3),
    marginVertical: hp(3),
  },
  backIcons: {
    width: wp(8),
    height: wp(8),
    resizeMode: "contain",
  },
  cancelOrder: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(20),
  },
  inputView: {
    height: hp(15),
    alignItems: "flex-start",
    paddingVertical: hp(2),
  },
});
