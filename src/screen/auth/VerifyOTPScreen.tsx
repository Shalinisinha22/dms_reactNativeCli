import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
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
import { OtpInput } from "react-native-otp-entry";
import Button from "../../components/common/Button";
import { RouteString } from "../../navigation/RouteString";
import { useTranslation } from "react-i18next";

const VerifyOTPScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [timer, setTimer] = useState(0); // Timer state

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval); // Cleanup interval
  }, [timer]);

  const handleResendCode = () => {
    setTimer(60); // Start the timer for 60 seconds
    console.log("Resend code triggered");
    // Trigger API call to resend OTP here
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
          <Text style={styles.phoneNumber}>+91 8401272015</Text>
          <OtpInput
            numberOfDigits={6}
            onTextChange={(text) => console.log(text)}
            theme={{
              filledPinCodeContainerStyle: styles.otpContainer,
              focusedPinCodeContainerStyle: styles.otpContainer,
              pinCodeContainerStyle: styles.otpContainer,
              containerStyle: styles.containerStyle,
              focusStickStyle: styles.focusStickStyle,
            }}
          />
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
            isLoading={false}
            onPress={() => navigation.navigate(RouteString.SetPasswordScreen)}
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
    marginVertical: hp(2),
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
  },
  disabledText: {
    color: colors.darkGray, // Adjust this color to indicate disabled state
  },
});
