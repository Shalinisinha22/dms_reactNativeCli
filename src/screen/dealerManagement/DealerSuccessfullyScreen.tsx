import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import SafeAreaContainer from "../../components/common/SafeAreaContainer";
import { IconsPath } from "../../utils/IconPath";
import { useTranslation } from "react-i18next";
import { colors } from "../../utils/Colors";
import { FontPath } from "../../utils/FontPath";
import { hp, RFValue, wp } from "../../helper/Responsive";

const DealerSuccessfullyScreen = () => {
  const { t } = useTranslation();

  return (
    <SafeAreaContainer>
      <View style={styles.mainView}>
        <Image source={IconsPath.success} style={styles.success} />
        <Text style={styles.title}>
          {t("success.dealerOnboardingSuccessfully")}
        </Text>
        <Text style={styles.des}>
          {" "}
          {t("success.dealerOnboardingSuccessfullyDes")}
        </Text>
      </View>
    </SafeAreaContainer>
  );
};

export default DealerSuccessfullyScreen;

const styles = StyleSheet.create({
  success: {
    width: wp(20),
    height: wp(20),
    resizeMode: "contain",
  },
  mainView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(20),
    textAlign: "center",
    marginVertical: hp(2),
  },
  des: {
    color: colors.gray,
    fontFamily: FontPath.OutfitRegular,
    textAlign: "center",
    width: wp(95),
    fontSize: RFValue(16),
  },
});
