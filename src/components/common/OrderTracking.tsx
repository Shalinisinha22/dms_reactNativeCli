import { View, Text, StyleSheet, Image, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
import { hp, isiPAD, RFValue, wp } from "../../helper/Responsive";
import { colors } from "../../utils/Colors";
import { FontPath } from "../../utils/FontPath";
import { OrderTrackingProps } from "../../interfaces/Types";
import { IconsPath } from "../../utils/IconPath";
import { useTranslation } from "react-i18next";

const OrderTracking = ({
  selectedStep,
  containerStyle,
  isCheckIcons,
  orderIcons,
  distributorIcons,
     distributor_firm_name,
  asoIcons,
  dispatchedIcons,
  admin,
  adminIcon
}: OrderTrackingProps) => {
  const { t } = useTranslation();



  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.mainView}>
        <View>
          <View
            style={[
              styles.round,
              {
                backgroundColor:
                  selectedStep > 0 ? colors.green_1 : colors.lightGray_1,
              },
            ]}
          >
            {selectedStep > 0 && isCheckIcons && (
              <Image source={orderIcons} style={styles.checkIcons} />
            )}
          </View>
          <Text style={styles.label}>{t("dashboard.ordered")}</Text>
        </View>
        <View
          style={[
            styles.line,
            {
              width:admin ? wp(25) : wp(18)
            },
          ]}
        />
        {adminIcon ? null : (
          <View>
            <View
              style={[
                styles.round,
                {
                  backgroundColor:
                    distributorIcons === 39
                      ? colors.green_1
                      : distributorIcons !== null
                      ? colors.primary
                      : colors.lightGray_1,
                },
              ]}
            >
              {isCheckIcons && distributorIcons && (
                <Image source={distributorIcons} style={styles.checkIcons} />
              )}
            </View>
            
            <Text style={styles.label}>
              {distributorIcons === 39 || distributorIcons === null
                ? t("dashboard.approvedByDisctributor")
                : t("dashboard.rejectByDisctributor")}
            </Text>
            <View style={{marginTop:5}}>

             <Text numberOfLines={5} style={[styles.label,{fontWeight:"500",fontSize:10}]}>
              {distributorIcons === 39 || distributorIcons === null
                ? distributor_firm_name
                :""}
            </Text>
            </View>
          </View>
         )}
 
        {admin && (
          <View>
            <View
              style={[
                styles.round,
                {
                  backgroundColor:
                    adminIcon === 39
                      ? colors.green_1
                      : adminIcon !== null
                      ? colors.primary
                      : colors.lightGray_1,
                },
              ]}
            >
              {isCheckIcons && adminIcon && (
                <Image source={adminIcon} style={styles.checkIcons} />
              )}
            </View>
            <Text style={styles.label}>
              {adminIcon === 39 || adminIcon === null
                ? t("dashboard.approvedByAdmin")
                : t("dashboard.rejectByAdmin")}
            </Text>
          </View>
        )}
        <View
          style={styles.line}
        />
        {adminIcon ? null : (
          <View>
            <View
              style={[
                styles.round,
                {
                  backgroundColor:
                    asoIcons === 39
                      ? colors.green_1
                      : asoIcons !== null
                      ? colors.primary
                      : colors.lightGray_1,
                },
              ]}
            >
              {isCheckIcons && asoIcons && (
                <Image source={asoIcons} style={styles.checkIcons} />
              )}
            </View>
            <Text style={styles.label}>
              {asoIcons === 39 || asoIcons === null
                ? t("dashboard.approvedByASO")
                : t("dashboard.rejectByASO")}
            </Text>
          </View>
         )}
        <View
          style={[
            styles.line,
            {
              width: admin ? wp(10) : wp(18)
            },
          ]}
        />
        <View>
          <View
            style={[
              styles.round,
              {
                backgroundColor:
                  dispatchedIcons === 39
                    ? colors.green_1
                    : dispatchedIcons !== null
                    ? colors.primary
                    : colors.lightGray_1,
              },
            ]}
          >
            {isCheckIcons && dispatchedIcons && (
              <Image source={dispatchedIcons} style={styles.checkIcons} />
            )}
          </View>
          <Text style={styles.label}>{t("dashboard.orderDispatched")}</Text>
        </View>
      </View>
    </View>
  );
};

export default OrderTracking;

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
    width: wp(18),
    height: hp(0.5),
    backgroundColor: colors.lightGray_1,
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
    marginTop: hp(2),
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