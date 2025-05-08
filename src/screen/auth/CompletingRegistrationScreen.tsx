import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import SafeAreaContainer from "../../components/common/SafeAreaContainer";
import { IconsPath } from "../../utils/IconPath";
import { hp, RFValue, wp } from "../../helper/Responsive";
import { colors } from "../../utils/Colors";
import { FontPath } from "../../utils/FontPath";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../redux/Store";
import { UserType } from "../../interfaces/Types";

const CompletingRegistrationScreen = () => {
  const { t } = useTranslation();
  const { portal } = useAppSelector((state) => state.auth);

  return (
    <SafeAreaContainer showHeader={false}>
      <View style={styles.mainView}>
        <Image source={IconsPath.success} style={styles.success} />
        <Text style={styles.title}>
          {t("completingRegistration.thankYouForCompletingTheRegistration")}
        </Text>
        <Text style={styles.reviewTitle}>
          {t("completingRegistration.yourApplicationIsUnderReview")}
        </Text>
        {portal !== UserType.ASO && (
          <Text style={styles.des}>{t("completingRegistration.des")}</Text>
        )}
      </View>
    </SafeAreaContainer>
  );
};

export default CompletingRegistrationScreen;

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
  reviewTitle: {
    color: colors.primary,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(18),
  },
  des: {
    color: colors.gray,
    fontFamily: FontPath.OutfitRegular,
    textAlign: "center",
    width: wp(85),
    marginTop: hp(0.8),
  },
});
