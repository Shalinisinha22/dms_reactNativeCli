import { Image, Pressable, StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SafeAreaContainer from "../../components/common/SafeAreaContainer";
import BackIcons from "../../assets/svg/BackIcons";
import { hp, RFValue, wp } from "../../helper/Responsive";
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { ImagePath } from "../../utils/ImagePath";
import { colors } from "../../utils/Colors";
import { FontPath } from "../../utils/FontPath";
import { useAppDispatch, useAppSelector } from "../../redux/Store";
import TextInputField from "../../components/common/TextInputField";
import { useFormik } from "formik";
import { RouteString } from "../../navigation/RouteString";
import { setPasswordValidationSchema } from "../../utils/ValidationSchema";
import Button from "../../components/common/Button";
import { useTranslation } from "react-i18next";
import { commonStyle } from "../../utils/commonStyles";
import { UserType } from "../../interfaces/Types";
import { useSetPassword } from "../../api/query/AuthService";
import { authActions } from "../../redux/slice/AuthSlice";
import { ParamsType } from "../../navigation/ParamsType";

const SetPasswordScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const routes = useRoute<RouteProp<ParamsType, "SetPasswordScreen">>();
  const { portal } = useAppSelector((state) => state.auth);
  const { mutateAsync: createPassword } = useSetPassword();
  const [isApiLoading, setIsApiLoading] = useState(false);
  const dispatch = useAppDispatch();

  const { handleChange, handleBlur, handleSubmit, values, touched, errors } =
    useFormik({
      initialValues: { newPassword: "", passwordConfirmation: "" },
      validationSchema: setPasswordValidationSchema,
      onSubmit: async (values) => {
        setIsApiLoading(true);
        try {
          const res = await createPassword({
            new_password: values.newPassword,
            confirm_password: values.passwordConfirmation,
          });
          if (res) {
            setIsApiLoading(false);
            dispatch(authActions.setToken(res.access_token.token));
            handleNavigation();
          }
        } catch (error) {
          setIsApiLoading(false);
          console.log("SetPasswordScreen", error);
        }
      },
    });

  const handleNavigation = () => {
    if (routes.params.from === "forgotPassword") {
      navigation.navigate(RouteString.LoginScreen);
    } else {
      if (portal === UserType.DEALER || portal === UserType.DISTRIBUTOR) {
        navigation.navigate(RouteString.RegistrationFormScreen);
      } else if (portal === UserType.ASO) {
        navigation.navigate(RouteString.ASORegistrationScreen);
      } else if (portal === UserType.ENGINEER || portal === UserType.MASON) {
        navigation.navigate(RouteString.MasonAndEngineerRegistrationScreen);
      }
    }
  };

  return (
    <SafeAreaContainer showHeader={false}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <BackIcons />
        </Pressable>
        <Image source={ImagePath.appLogo} style={styles.appLogo} />
        <Text style={styles.portalAccess}>{portal}</Text>
        <Text style={commonStyle.login}>{t("setPassword.setPassword")}</Text>
        <TextInputField
          title={t("setPassword.newPassword")}
          placeholder={t("setPassword.newPassword")}
          isPassword={true}
          value={values.newPassword}
          onChangeText={handleChange("newPassword")}
          onBlur={handleBlur("newPassword")}
          touched={touched.newPassword}
          errors={errors.newPassword}
          isRequired={true}
        />
        <TextInputField
          title={t("setPassword.confirmPassword")}
          placeholder={t("setPassword.confirmPassword")}
          isPassword={true}
          value={values.passwordConfirmation}
          onChangeText={handleChange("passwordConfirmation")}
          onBlur={handleBlur("passwordConfirmation")}
          touched={touched.passwordConfirmation}
          errors={errors.passwordConfirmation}
          isRequired={true}
        />
        <Button
          buttonName={t("setPassword.submit")}
          isLoading={isApiLoading}
          onPress={handleSubmit}
        />
      </KeyboardAwareScrollView>
    </SafeAreaContainer>
  );
};

export default SetPasswordScreen;

const styles = StyleSheet.create({
  backButton: {
    marginHorizontal: wp(5),
  },
  appLogo: {
    width: wp(35),
    height: wp(35),
    resizeMode: "contain",
    alignSelf: "center",
  },
  portalAccess: {
    color: colors.black,
    fontSize: RFValue(16),
    fontFamily: FontPath.OutfitRegular,
    textAlign: "center",
    marginVertical: hp(1),
    lineHeight: hp(3),
  },
});
