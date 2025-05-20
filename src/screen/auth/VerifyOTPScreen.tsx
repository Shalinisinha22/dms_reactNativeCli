import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import SafeAreaContainer from "../../components/common/SafeAreaContainer";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import BackIcons from "../../assets/svg/BackIcons";
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { hp, RFValue, wp } from "../../helper/Responsive";
import VerifyOtpIcons from "../../assets/svg/VerifyOtpIcons";
import { FontPath } from "../../utils/FontPath";
import { colors } from "../../utils/Colors";
import { OtpInput } from "react-native-otp-entry";
import Button from "../../components/common/Button";
import { RouteString } from "../../navigation/RouteString";
import { useTranslation } from "react-i18next";
import { useResendOTP, useVerifyOTP } from "../../api/query/AuthService";
import { ParamsType } from "../../navigation/ParamsType";
import Toast from "react-native-toast-message";
import { authActions } from "../../redux/slice/AuthSlice";
import { useAppDispatch } from "../../redux/Store";

const VerifyOTPScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const routes = useRoute<RouteProp<ParamsType, "VerifyOTPScreen">>();
  const [timer, setTimer] = useState(0); 
  const [isApiLoading, setIsApiLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const { mutateAsync: getVerifyOTP } = useVerifyOTP();
  const { mutateAsync: getResendOTP } = useResendOTP();
  const dispatch = useAppDispatch();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval); 
  }, [timer]);

  const handleResendCode = async () => {
    setTimer(60);
    try {
      const res = await getResendOTP({
        mobile_number: routes.params.mobile_number,
      });
      if (res) {
        Toast.show({
          type: "success",
          text1: res.message,
        });
      }
    } catch (error) {
      setTimer(0);
      console.log("handleResendCode", error);
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length === 0) {
      setOtpError("Please enter OTP");
      return;
    }
    setIsApiLoading(true);
    try {
      const res = await getVerifyOTP({
        mobile_number: routes.params.mobile_number,
        otp: otp,
      });
      if (res) {
        setIsApiLoading(false);
        dispatch(authActions.setToken(res.access_token.token));
        navigation.navigate(RouteString.SetPasswordScreen, {
          from: routes.params.from,
        });
      }
    } catch (error: any) {
      setIsApiLoading(false);
      Toast.show({
        type: "error",
        text1: error?.response.data.errors.otp || error?.response.data.message,
      });
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
        <View style={styles.mainView}>
          <VerifyOtpIcons />
          <Text style={styles.title}>{t("verifyOTP.verifyOTP")}</Text>
          <Text style={styles.des}>{t("verifyOTP.des")}</Text>
          <Text style={styles.phoneNumber}>
            +91 {routes.params.mobile_number}
          </Text>
          <OtpInput
            numberOfDigits={6}
            onTextChange={(text) => {
              setOtp(text), setOtpError("");
            }}
            theme={{
              filledPinCodeContainerStyle: styles.otpContainer,
              focusedPinCodeContainerStyle: styles.otpContainer,
              pinCodeContainerStyle: styles.otpContainer,
              containerStyle: styles.containerStyle,
              focusStickStyle: styles.focusStickStyle,
              pinCodeTextStyle:{
                color:colors.black
              }
            }}
          />
          {otpError && <Text style={styles.error}>{otpError}</Text>}
          <View style={styles.changeNoRowView}>
            <Pressable onPress={() => navigation.goBack()}>
              <Text style={styles.changeNo}>
                {t("verifyOTP.changeMobileNo")}
              </Text>
            </Pressable>
            <Pressable onPress={handleResendCode} disabled={timer > 0}>
              <Text style={[styles.changeNo, timer > 0 && styles.disabledText]}>
                {timer > 0
                  ? t("verifyOTP.resendIn", { timer })
                  : t("verifyOTP.resendCode")}
              </Text>
            </Pressable>
          </View>
          <Button
            buttonName={t("verifyOTP.verifyOTP1")}
            isLoading={isApiLoading}
            onPress={handleVerifyOTP}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaContainer>
  );
};

export default VerifyOTPScreen;

const styles = StyleSheet.create({
  backButton: {
    marginHorizontal: wp(5),
  },
  mainView: {
    alignItems: "center",
  },
  title: {
    fontFamily: FontPath.OutfitBold,
    color:colors.black,
    fontSize: RFValue(26),
    marginVertical: hp(2),
    lineHeight: hp(5),
  },
  des: {
    textAlign: "center",
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(15),
    color: colors.darkGray,
    maxWidth: wp(80),
  },
  phoneNumber: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(16),
    marginTop: hp(1),
  },
  otpContainer: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: colors.darkGray,
  },
  containerStyle: {
    width: wp(80),
    marginTop: hp(2),
  },
  focusStickStyle: {
    backgroundColor: colors.darkGray,
  },
  changeNo: {
    color: colors.primary,
    fontSize: RFValue(14),
    fontFamily: FontPath.OutfitMedium,
  },
  changeNoRowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: wp(80),
    marginTop: hp(2),
  },
  disabledText: {
    color: colors.darkGray, // Adjust this color to indicate disabled state
  },
  error: {
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(10),
    marginVertical: hp(1),
    color: colors.primary,
  },
});
