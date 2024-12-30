import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../utils/Colors";
import { hp, RFValue, wp } from "../../helper/Responsive";
import { commonStyle } from "../../utils/commonStyles";
import { FontPath } from "../../utils/FontPath";
import { useTranslation } from "react-i18next";
import ApproveButton from "../common/ApproveButton";
import RejectButton from "../common/RejectButton";
import { IconsPath } from "../../utils/IconPath";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { RouteString } from "../../navigation/RouteString";
import { UserType } from "../../interfaces/Types";

const MasonManagementCard = ({
  item,
  ApproveOnPress,
  RejectOnPress,
}: {
  item: any;
  ApproveOnPress: () => void;
  RejectOnPress: () => void;
}) => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const isAllApprove = item?.status?.by_aso === "pending";

  return (
    <Pressable
      style={[
        styles.cardView,
        {
          height: isAllApprove ? hp(18) : hp(23),
        },
      ]}
      onPress={() =>
        navigation.navigate(RouteString.ViewDealerDetailScreen, {
          type: UserType.MASON,
          id: item.masonId,
        })
      }
    >
      <View style={styles.orderNoView}>
        <View style={commonStyle.profileView}>
          <Text style={commonStyle.userNameText}>
            {item?.name?.slice(0, 1)}
          </Text>
        </View>
        <View style={styles.mainTextView}>
          <View>
            <Text style={styles.salesName}>Mohin Shah</Text>
            <Text style={styles.orderNo}>
              {t("masonManagement.masonId")} : {item?.masonNumber}
            </Text>
          </View>
          <View style={styles.dateRowView}>
            <View>
              <Text style={styles.date}>{t("masonManagement.date")}</Text>
              <Text style={styles.fullDate}>12 Sept 2024</Text>
            </View>
          </View>
          <View style={styles.locationRowView}>
            <Image source={IconsPath.location} style={styles.location} />
            <Text style={styles.locationText}>{item.address}</Text>
          </View>
          {isAllApprove ? null : (
            <View style={styles.buttonRowView}>
              <ApproveButton onPress={ApproveOnPress} />
              <RejectButton onPress={RejectOnPress} />
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
};

export default MasonManagementCard;

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
  mainTextView: {
    flex: 1,
    marginLeft: wp(3),
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
  dateRowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hp(2),
    width: wp(60),
  },
  date: {
    color: colors.black,
    fontSize: RFValue(11),
    fontFamily: FontPath.OutfitSemiBold,
  },
  fullDate: {
    color: colors.black,
    fontSize: RFValue(11),
    fontFamily: FontPath.OutfitMedium,
  },
  buttonRowView: {
    flexDirection: "row",
    marginTop: hp(1),
    justifyContent: "space-between",
    width: wp(46),
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
});
