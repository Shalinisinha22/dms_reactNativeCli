import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { hp, isiPAD, RFValue, wp } from "../../helper/Responsive";
import { FontPath } from "../../utils/FontPath";
import { colors } from "../../utils/Colors";
import { useTranslation } from "react-i18next";
import { TwoStepOrderTrackingProps } from "../../interfaces/Types";

const TwoStepOrderTracking = ({
  selectedStep,
  containerStyle,
  isCheckIcons,
  dealerIcons,
  asoIcons,
  admin
}: TwoStepOrderTrackingProps) => {
  const { t } = useTranslation();
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.mainView}>
        <View>
          <View
            style={[
              styles.round,
              {
                backgroundColor: dealerIcons === 39
                      ? colors.green_1
                      : dealerIcons !== null
                      ? colors.primary
                    : colors.lightGray_1,
              },
            ]}
          >
            {dealerIcons && isCheckIcons && (
              <Image source={dealerIcons} style={styles.checkIcons} />
            )}
          </View>
          <Text style={styles.label}>
            {t("dashboard.approvedByDisctributor")}
          </Text>
        </View>
        <View
          style={[
            styles.line,
            {
              backgroundColor:
                selectedStep > 1 ? colors.green_1 : colors.lightGray_1,
            },
          ]}
        />
        <View>
          <View
            style={[
              styles.round,
              {
                backgroundColor: admin ||  asoIcons === 39
                      ? colors.green_1
                      : asoIcons !== null
                      ? colors.primary
                    : colors.lightGray_1,
              },
            ]}
          >
            {asoIcons && isCheckIcons && (
              <Image source={asoIcons} style={styles.checkIcons} />
            )}
          </View>
          <Text style={styles.label}>{admin ?  t("dashboard.approvedByAdmin") : t("masonManagement.approvedByASO")}</Text>
        </View>
      </View>
    </View>
  );
};

export default TwoStepOrderTracking;

const styles = StyleSheet.create({
  mainView: {
    alignItems: "center",
    flexDirection: "row",
  },
  round: {
    width: isiPAD ? wp(4) : wp(5),
    height: isiPAD ? wp(4) : wp(5),
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  line: {
    width: wp(14),
    height: hp(0.5),
  },
  label: {
    position: "absolute",
    width: wp(20),
    zIndex: 1,
    marginTop: hp(3.5),
    color:colors.black,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(9),
    alignSelf: "center",
    textAlign: "center",
  },
  container: {
    alignSelf: "center",
  },
  checkIcons: {
    width: isiPAD ? wp(2) : wp(2.5),
    height: isiPAD ? wp(2) : wp(2.5),
    resizeMode: "contain",
  },
  animationLine: {
    height: hp(0.5),
    backgroundColor: colors.green_1,
  },
});
