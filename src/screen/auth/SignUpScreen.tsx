import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import SafeAreaContainer from "../../components/common/SafeAreaContainer";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { hp, RFValue, wp } from "../../helper/Responsive";
import { colors } from "../../utils/Colors";
import { FontPath } from "../../utils/FontPath";
import { ImagePath } from "../../utils/ImagePath";
import { useAppSelector } from "../../redux/Store";
import BackIcons from "../../assets/svg/BackIcons";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import TextInputField from "../../components/common/TextInputField";
import { useFormik } from "formik";
import { signUpValidationSchema } from "../../utils/ValidationSchema";
import { RouteString } from "../../navigation/RouteString";
import Button from "../../components/common/Button";
import { useTranslation } from "react-i18next";
import { commonStyle } from "../../utils/commonStyles";
import { useSignUp } from "../../api/query/AuthService";

const SignUpScreen = () => {
  const { t } = useTranslation();
  const { portal } = useAppSelector((state) => state.auth);
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { mutateAsync: createSignUp } = useSignUp();

  const { handleChange, handleBlur, handleSubmit, values, touched, errors } =
    useFormik({
      initialValues: { fullname: "dixit test", email: "dixitwork013@gmail.com", phoneNumber: "9879439697" },
      validationSchema: signUpValidationSchema,
      onSubmit: async (values) => {
        try {
          const res = await createSignUp({
            email: values.email,
            mobile_number: values.phoneNumber,
            name: values.fullname,
            role: portal,
          });
          console.log('res',res)
          // navigation.navigate(RouteString.VerifyOTPScreen)
        } catch (error) {
          console.log('SignUpScreen==>', error)
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
        <Image source={ImagePath.appLogo} style={commonStyle.appLogo} />
        <Text style={styles.portalAccess}>{portal}</Text>
        <Text style={commonStyle.login}>{t("signUp.singUpAccessPortal")}</Text>
        <TextInputField
          title={t("signUp.fullName")}
          placeholder={t("signUp.enterName")}
          isPassword={false}
          value={values.fullname}
          onChangeText={handleChange("fullname")}
          onBlur={handleBlur("fullname")}
          touched={touched.fullname}
          errors={errors.fullname}
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
          keyboardType="numeric"
          isRequired={true}
        />
        <Button
          buttonName={t("signUp.sendOtp")}
          isLoading={false}
          onPress={handleSubmit}
        />
        <View style={styles.haveAccountRowView}>
          <Text style={styles.haveAccount}>
            {t("signUp.alreadyHaveAnAccount")}
          </Text>
          <Pressable
            onPress={() => navigation.navigate(RouteString.LoginScreen)}
          >
            <Text style={styles.register}> {t("signUp.signIn")}</Text>
          </Pressable>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaContainer>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  portalAccess: {
    color: colors.black,
    fontSize: RFValue(16),
    fontFamily: FontPath.OutfitRegular,
    textAlign: "center",
    marginVertical: hp(0.8),
  },
  backButton: {
    marginHorizontal: wp(5),
  },
  haveAccountRowView: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    marginTop: hp(2),
  },
  haveAccount: {
    fontFamily: FontPath.OutfitRegular,
    color: colors.darkGray,
    fontSize: RFValue(14),
    lineHeight: hp(3),
  },
  register: {
    color: colors.primary,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(14),
    lineHeight: hp(3),
  },
});
