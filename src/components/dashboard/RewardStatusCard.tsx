import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../utils/Colors";
import { hp, RFValue, wp } from "../../helper/Responsive";
import { commonStyle } from "../../utils/commonStyles";
import { FontPath } from "../../utils/FontPath";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { RouteString } from "../../navigation/RouteString";
import { useTranslation } from "react-i18next";

const RewardStatusCard = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  return (
    <View style={styles.cardView}>
      <View style={styles.orderNoView}>
        <View style={commonStyle.profileView}>
          <Text style={commonStyle.userNameText}>M</Text>
        </View>
        <View style={styles.textView}>
          <Text style={styles.salesName}>Mohin Shah</Text>
          <Text style={styles.orderNo}>Claim No : 121124</Text>
        </View>
      </View>
      <View style={styles.dateRowView}>
        <View>
          <Text style={styles.date}>{t('masonManagement.date')}</Text>
          <Text style={styles.value}>12 Sept 2024</Text>
        </View>
        <View>
          <Text style={styles.date}>Referral Products</Text>
          <Text style={styles.value}>TMT Bar 8mm</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <View style={styles.salesView}>
            <Text style={styles.sales}>{t('dashboard.approved')}</Text>
          </View>
          <Pressable
            style={{ marginTop: hp(1) }}
            onPress={() =>
              navigation.navigate(RouteString.RewardStatusdetailScreen)
            }
          >
            <Text style={styles.viewDetail}>{t('rewardStatus.viewDetail')}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default RewardStatusCard;

const styles = StyleSheet.create({
  cardView: {
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    marginHorizontal: wp(5),
    shadowOpacity: 0.05,
    shadowRadius: 10.65,
    elevation: 8,
    marginBottom: hp(2),
    paddingHorizontal: wp(3),
    paddingVertical: hp(2),
  },
  orderNoView: {
    flexDirection: "row",
  },
  textView: {
    marginLeft: wp(3),
    flex: 1,
  },
  salesName: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(16),
  },
  orderNo: {
    color: colors.black,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(12),
    marginTop: hp(0.5),
  },
  salesView: {
    backgroundColor: colors.green_100,
    width: wp(20),
    height: hp(3.5),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  sales: {
    color: colors.green_1,
    fontFamily: FontPath.OutfitMedium,
    fontSize: RFValue(11),
  },
  date: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(11),
  },
  value: {
    color: colors.black,
    fontFamily: FontPath.OutfitMedium,
    fontSize: RFValue(11),
  },
  dateRowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  viewDetail: {
    color: colors.primary,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(12),
  },
});
