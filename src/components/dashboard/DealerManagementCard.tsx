import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { FontPath } from "../../utils/FontPath";
import { colors } from "../../utils/Colors";
import { hp, RFValue, wp } from "../../helper/Responsive";
import { useTranslation } from "react-i18next";
import { IconsPath } from "../../utils/IconPath";
import { DealerManagementCardProps, UserType } from "../../interfaces/Types";
import { commonStyle } from "../../utils/commonStyles";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { RouteString } from "../../navigation/RouteString";
import TwoStepOrderTracking from "../common/TwoStepOrderTracking";
import ApproveButton from "../common/ApproveButton";
import RejectButton from "../common/RejectButton";

const DealerManagementCard = ({
  item,
  ApproveOnPress,
  RejectOnPress,
}: DealerManagementCardProps) => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const isApproveButton =
    item?.status?.by_admin === "approved"
      ? false
      : item?.status?.by_aso === "pending";

      return (
    <Pressable
      style={styles.cardView}
      onPress={() =>
        navigation.navigate(RouteString.ViewDealerDetailScreen, {
          type: UserType.DEALER,
          id: item.dealerId,
        })
      }
    >
      <View style={styles.orderNoView}>
        <View style={commonStyle.profileView}>
          <Text style={commonStyle.userNameText}>{item.firm_name.slice(0, 1)}</Text>
        </View>
        <View style={styles.mainTextView}>
          <View style={styles.textView}>
            <View>
              <Text style={styles.salesName}>{item.firm_name}</Text>
              <Text style={styles.orderNo}>
                {t("dealerwiseSales.dealerNo")} : {item.dealerNumber}
              </Text>
            </View>
            <View style={styles.trackingView}>
              <TwoStepOrderTracking
                selectedStep={1}
                isCheckIcons
                admin={item?.status?.by_admin === "approved"}
                asoIcons={
                  item?.status?.by_aso === "approved" ||
                  item?.status?.by_admin === "approved"
                    ? IconsPath.check
                    : item?.status?.by_aso === "pending"
                    ? null
                    : IconsPath.whiteClose
                }
                dealerIcons={
                  item?.status?.by_distributor === "approved"
                    ? IconsPath.check
                    : item?.status?.by_distributor === "pending"
                    ? null
                    : IconsPath.whiteClose
                }
                containerStyle={{ bottom: hp(2) }}
              />
            </View>
          </View>
          <View style={styles.locationRowView}>
            <Image source={IconsPath.location} style={styles.location} />
            <Text style={styles.locationText}>{item.address}</Text>
          </View>
        </View>
      </View>
      {isApproveButton && (
        <View style={styles.buttonRowView}>
          <ApproveButton onPress={ApproveOnPress} />
          <RejectButton onPress={RejectOnPress} />
        </View>
      )}
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
    fontSize: RFValue(9),
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
    width:wp(40)
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
    width:wp(55),
  },
  locationRowView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp(2),
  },
  mainTextView: {
    flex: 1,
    marginLeft: wp(3),
  },
  buttonRowView: {
    flexDirection: "row",
    marginTop: hp(1),
    marginLeft: wp(10),
    justifyContent: "space-between",
    width: wp(46),
  },
  trackingView: {
    marginTop: hp(2),
    marginRight: wp(8),
  },
});
