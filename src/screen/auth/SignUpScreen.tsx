import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
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
import Toast from "react-native-toast-message";

const SignUpScreen = () => {
  const { t } = useTranslation();
  const { portal } = useAppSelector((state) => state.auth);
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { mutateAsync: createSignUp } = useSignUp();
  const [isApiLoading, setIsApiLoading] = useState(false);

  const capitalizeFirstLetter = (word: string) => {
    if (!word) return "";
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };

  const capitalizedWord = capitalizeFirstLetter(portal);

  const { handleChange, handleBlur, handleSubmit, values, touched, errors } =
    useFormik({
      initialValues: {
        fullname: "",
        email: "",
        phoneNumber: "",
      },
      validationSchema: signUpValidationSchema,
      onSubmit: async (values) => {
        try {
          setIsApiLoading(true);
          const res = await createSignUp({
            email: values.email,
            mobile_number: values.phoneNumber,
            name: values.fullname,
            role: portal,
          });
          if (res) {
            setIsApiLoading(false);
            navigation.navigate(RouteString.VerifyOTPScreen, {
              mobile_number: values.phoneNumber,
              from: "",
            });
          }
        } catch (error: any) {
          setIsApiLoading(false);
          Toast.show({
            type: "error",
            text1: error?.response.data.message ||
            error?.response?.data?.errors?.name ||  'Please try again'
          });
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
        <Text style={styles.portalAccess}>{capitalizedWord}</Text>
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
          isLoading={isApiLoading}
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
