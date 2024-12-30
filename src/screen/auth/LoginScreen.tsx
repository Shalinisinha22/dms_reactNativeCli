import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import SafeAreaContainer from "../../components/common/SafeAreaContainer";
import { ImagePath } from "../../utils/ImagePath";
import { hp, RFValue, wp } from "../../helper/Responsive";
import { colors } from "../../utils/Colors";
import { FontPath } from "../../utils/FontPath";
import { useAppDispatch, useAppSelector } from "../../redux/Store";
import TextInputField from "../../components/common/TextInputField";
import { useFormik } from "formik";
import { loginValidationSchema } from "../../utils/ValidationSchema";
import Button from "../../components/common/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { RouteString } from "../../navigation/RouteString";
import { useTranslation } from "react-i18next";
import { commonStyle } from "../../utils/commonStyles";
import { useLogin } from "../../api/query/AuthService";
import Toast from "react-native-toast-message";
import { authActions } from "../../redux/slice/AuthSlice";
import { UserType } from "../../interfaces/Types";
import { useGetUser } from "../../api/query/ProfileService";
import { useSendFCMToken } from "../../api/query/NotificationService";

const LoginScreen = () => {
  const { t } = useTranslation();
  const { portal, FCMToken } = useAppSelector((state) => state.auth);
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { mutateAsync: getLogin } = useLogin();
  const [isApiLoading, setIsApiLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { mutateAsync: getUserData } = useGetUser();
  const { mutateAsync: sendFCMToken } = useSendFCMToken();

  const capitalizeFirstLetter = (word: string) => {
    if (!word) return '';
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };
  
  const capitalizedWord = capitalizeFirstLetter(portal);

  const { handleChange, handleBlur, handleSubmit, values, touched, errors } =
    useFormik({
      initialValues: { phoneNumber: "", password: "" },
      validationSchema: loginValidationSchema,
      onSubmit: async (values) => {
        setIsApiLoading(true);
        try {
          const res = await getLogin({
            mobile_number: values.phoneNumber,
            password: values.password,
          });
          if (res) {
            dispatch(authActions.setPortal(res.role[0]));
            dispatch(authActions.setToken(res.access_token.token));
            if (res.registration_pending) {
              setIsApiLoading(false);
              if (
                res.role[0] === UserType.DEALER ||
                res.role[0] === UserType.DISTRIBUTOR
              ) {
                navigation.navigate(RouteString.RegistrationFormScreen);
              } else if (res.role[0] === UserType.ASO) {
                navigation.navigate(RouteString.ASORegistrationScreen);
              } else if (
                res.role[0] === UserType.ENGINEER ||
                res.role[0] === UserType.MASON
              ) {
                navigation.navigate(
                  RouteString.MasonAndEngineerRegistrationScreen
                );
              }
            } else {
              if (res?.user_approval_status === "pending") {
                setIsApiLoading(false);
                navigation.navigate(RouteString.CompletingRegistrationScreen);
              } else {
                const data = await getUserData();
                await sendFCMToken({firebaseToken: FCMToken})
                dispatch(authActions.setUserStatus(res?.user_approval_status));
                setIsApiLoading(false);
                if (data) {
                  dispatch(authActions.setUserInfo(data));
                  navigation.reset({
                    index: 0,
                    routes: [{ name: RouteString.DropDownNavigator }],
                  });
                }
              }
            }
          }
        } catch (error: any) {
          setIsApiLoading(false);
          Toast.show({
            type: "error",
            text1: error?.response?.data?.message,
          });
        }
      },
    });

  return (
    <SafeAreaContainer showHeader={false}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <Image source={ImagePath.appLogo} style={commonStyle.appLogo} />
        <Text style={styles.portalAccess}>{capitalizedWord}</Text>
        <Text style={commonStyle.login}>{t("login.singInAccessPotal")}</Text>
        <TextInputField
          title={t("login.enterMobileNo")}
          placeholder={t("login.enterYourMobileNo")}
          isPassword={false}
          value={values.phoneNumber}
          onChangeText={handleChange("phoneNumber")}
          onBlur={handleBlur("phoneNumber")}
          touched={touched.phoneNumber}
          errors={errors.phoneNumber}
          keyboardType="numeric"
          isRequired={true}
          maxLength={10}
        />
        <TextInputField
          title={t("login.password")}
          placeholder={t("login.password")}
          isPassword={true}
          value={values.password}
          onChangeText={handleChange("password")}
          onBlur={handleBlur("password")}
          touched={touched.password}
          errors={errors.password}
          isRequired={true}
        />
        <Pressable
          onPress={() => navigation.navigate(RouteString.ForgotPasswordScreen)}
        >
          <Text style={styles.forgot}>{t("login.forgotPassword")}</Text>
        </Pressable>
        <Button
          buttonName={t("login.signIn")}
          isLoading={isApiLoading}
          onPress={handleSubmit}
        />
        <View style={styles.haveAccountRowView}>
          <Text style={styles.haveAccount}>{t("login.dontHaveAccount")}</Text>
          <Pressable
            onPress={() => navigation.navigate(RouteString.SignUpScreen)}
          >
            <Text style={styles.register}> {t("login.registerNow")}</Text>
          </Pressable>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaContainer>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  portalAccess: {
    color: colors.black,
    fontSize: RFValue(16),
    fontFamily: FontPath.OutfitRegular,
    textAlign: "center",
    lineHeight: hp(3),
    marginVertical: hp(1),
  },
  forgot: {
    color: colors.primary,
    fontFamily: FontPath.OutfitMedium,
    fontSize: RFValue(14),
    textAlign: "right",
    lineHeight: hp(3),
    marginHorizontal: wp(5),
    marginTop: hp(1),
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
