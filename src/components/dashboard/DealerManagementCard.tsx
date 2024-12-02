import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { FontPath } from "../../utils/FontPath";
import { colors } from "../../utils/Colors";
import { hp, RFValue, wp } from "../../helper/Responsive";
import { useTranslation } from "react-i18next";
import { IconsPath } from "../../utils/IconPath";
import { DealerManagementCardProps } from "../../interfaces/Types";
import { commonStyle } from "../../utils/commonStyles";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { RouteString } from "../../navigation/RouteString";

const DealerManagementCard = ({ isApproved }: DealerManagementCardProps) => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  return (
    <Pressable
      style={styles.cardView}
      onPress={() => navigation.navigate(RouteString.ViewDealerDetailScreen)}
    >
      <View style={styles.orderNoView}>
        <View style={commonStyle.profileView}>
          <Text style={commonStyle.userNameText}>M</Text>
        </View>
        <View style={styles.mainTextView}>
          <View style={styles.textView}>
            <View>
              <Text style={styles.salesName}>Mohin Shah</Text>
              <Text style={styles.orderNo}>
                {t("dealerwiseSales.dealerNo")} : 121124
              </Text>
            </View>
            <View
              style={[
                styles.salesView,
                {
                  backgroundColor: isApproved
                    ? colors.green_100
                    : colors.red_100,
                },
              ]}
            >
              <Text
                style={[
                  styles.sales,
                  {
                    color: isApproved ? colors.green_1 : colors.primary,
                  },
                ]}
              >
                {isApproved ? t("dashboard.approved") : t("dashboard.rejected")}
              </Text>
            </View>
          </View>
          <View style={styles.locationRowView}>
            <Image source={IconsPath.location} style={styles.location} />
            <Text style={styles.locationText}>
              123 . Apple Square Complex Donzle Park
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default DealerManagementCard;

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
  orderNo: {
    color: colors.black,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(12),
    marginTop: hp(0.5),
  },
  textView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  salesName: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(16),
  },
  salesView: {
    width: wp(23),
    height: hp(3.5),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  sales: {
    fontFamily: FontPath.OutfitMedium,
    fontSize: RFValue(12),
  },
  location: {
    width: wp(6),
    height: wp(6),
    resizeMode: "contain",
  },
  locationText: {
    color: colors.black,
    fontFamily: FontPath.OutfitMedium,
    fontSize: RFValue(11),
    marginLeft: wp(2),
  },
  locationRowView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp(1),
  },
  mainTextView: {
    flex: 1,
    marginLeft: wp(3),
  },
});
