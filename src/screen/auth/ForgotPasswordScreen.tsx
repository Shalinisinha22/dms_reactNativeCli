import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import SafeAreaContainer from "../../components/common/SafeAreaContainer";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import BackIcons from "../../assets/svg/BackIcons";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { hp, RFValue, wp } from "../../helper/Responsive";
import VerifyOtpIcons from "../../assets/svg/VerifyOtpIcons";
import { FontPath } from "../../utils/FontPath";
import { colors } from "../../utils/Colors";
import TextInputField from "../../components/common/TextInputField";
import { useFormik } from "formik";
import { forgotPasswordValidationSchema } from "../../utils/ValidationSchema";
import { RouteString } from "../../navigation/RouteString";
import Button from "../../components/common/Button";
import { useTranslation } from "react-i18next";
import { useResetPasswordOTP } from "../../api/query/AuthService";

const ForgotPasswordScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { mutateAsync: resetPasswordOTP } = useResetPasswordOTP();
  const [isApiLoading, setIsApiLoading] = useState(false);

  const { handleChange, handleBlur, handleSubmit, values, touched, errors } =
    useFormik({
      initialValues: { phoneNumber: "" },
      validationSchema: forgotPasswordValidationSchema,
      onSubmit: async (values) => {
        setIsApiLoading(true);
        try {
          const res = await resetPasswordOTP({
            mobile_number: values.phoneNumber,
          });
          if (res) {
            setIsApiLoading(false);
            navigation.navigate(RouteString.VerifyOTPScreen, {
              mobile_number: values.phoneNumber,
              from: "forgotPassword",
            });
          }
        } catch (error) {
          setIsApiLoading(false);
          console.log("ForgotPasswordScreen", error);
        }
      },
    });

  return (
    <SafeAreaContainer showHeader={false}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <BackIcons />
        </Pressable>
        <View style={{ alignSelf: "center" }}>
          <VerifyOtpIcons />
        </View>
        <Text style={styles.title}>{t("login.enterMobileNo")}</Text>
        <Text style={styles.des}>
          {t("login.enterYourRegisteredMobileNumber")}
        </Text>
        <TextInputField
          placeholder={t("login.enterMobileNo")}
          isPassword={false}
          value={values.phoneNumber}
          onChangeText={handleChange("phoneNumber")}
          onBlur={handleBlur("phoneNumber")}
          touched={touched.phoneNumber}
          errors={errors.phoneNumber}
          title={""}
          keyboardType="numeric"
          isRequired={false}
        />
        <Button
          buttonName={t("signUp.sendOtp")}
          isLoading={isApiLoading}
          onPress={handleSubmit}
        />
      </KeyboardAwareScrollView>
    </SafeAreaContainer>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  backButton: {
    marginHorizontal: wp(5),
  },
  title: {
    fontFamily: FontPath.OutfitBold,
    color:colors.black,
    fontSize: RFValue(26),
    marginVertical: hp(2),
    alignSelf: "center",
  },
  des: {
    textAlign: "center",
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(15),
    color: colors.darkGray,
    maxWidth: wp(80),
    lineHeight: hp(3),
    alignSelf: "center",
  },
});
