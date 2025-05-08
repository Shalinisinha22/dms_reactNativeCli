import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { colors } from "../../utils/Colors";
import { FontPath } from "../../utils/FontPath";
import { hp, RFValue, wp } from "../../helper/Responsive";
import ApproveButton from "../common/ApproveButton";
import RejectButton from "../common/RejectButton";
import OrderTracking from "../common/OrderTracking";
import { RouteString } from "../../navigation/RouteString";
import {
  DistributorOrderWithProgressCardProps,
  UserType,
} from "../../interfaces/Types";
import { commonStyle } from "../../utils/commonStyles";
import moment from "moment";
import { IconsPath } from "../../utils/IconPath";
import { useAppSelector } from "../../redux/Store";
import { abbreviateNumber } from "../../utils/commonFunctions";

const DistributorOrderWithProgressCard = ({
  approveOnPress,
  rejectOnPress,
  item,
}: DistributorOrderWithProgressCardProps) => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { portal } = useAppSelector((state) => state.auth);

  const totalQty = item.products.reduce((acc: number, item: any) => {
    const weight = parseFloat(item.quantity) || 0;
    return acc + weight;
  }, 0);

  const totalAmount = item.products.reduce((acc: number, item: any) => {
    const amount = parseFloat(item.amount) || 0;
    return acc + amount;
  }, 0);

  const renderApproveButton = () => {
    if(item?.status?.by_admin === 'pending'){
    if (
      item?.status?.by_distributor === "pending" &&
      portal === UserType.DISTRIBUTOR
    ) {
      return button;
    } else if (item?.status?.by_aso === "pending" && portal === UserType.ASO) {
      return button;
    }
  }
  };

  const button = (
    <View>
      <ApproveButton onPress={approveOnPress} />
      <RejectButton onPress={rejectOnPress} />
    </View>
  );

  return (
    <Pressable
      style={styles.cardView}
      onPress={() =>
        navigation.navigate(RouteString.ViewOrderScreen, { id: item.id })
      }
    >
      <View style={styles.headerNoRowView}>
        <View>
          <View style={styles.orderNoView}>
            {/* <View style={commonStyle.profileView}>
              <Text style={commonStyle.userNameText}>M</Text>
            </View> */}
            <Image source={IconsPath.orderlogo} style={commonStyle.logo} />
            <View style={styles.textView}>
              <Text style={styles.name} numberOfLines={2}>{item?.firm_name}</Text>
              <Text style={styles.invoiceNo}>
                {t("dashboard.orderNo")} : {item?.odrNumber}
              </Text>
            </View>
          </View>
          <View style={styles.orderInfoRowView}>
            <View>
              <Text style={styles.orderinfoText}>{t("ledger.date")}</Text>
              <Text style={styles.orderInfoDes}>
                {moment(item?.orderDate).format("DD MMM YYYY")}
              </Text>
            </View>
            <View>
              <Text style={styles.orderinfoText}>Qty</Text>
              <Text style={styles.orderInfoDes}>{totalQty}</Text>
            </View>
            <View>
              <Text style={styles.orderinfoText}>
                {t("confirmOrder.amount")}
              </Text>
              <Text style={styles.orderInfoDes}>
                Rs.{abbreviateNumber(totalAmount)}
              </Text>
            </View>
          </View>
        </View>
        {renderApproveButton()}
      </View>
      <OrderTracking
        selectedStep={1}
        isCheckIcons={true}
        admin={
          item?.status?.by_admin === "approved" ||
          item?.status?.by_admin === "dispatched"
            ? true
            : false
        }
        orderIcons={IconsPath.check}
        distributorIcons={
          item?.status?.by_distributor === "approved"
            ? IconsPath.check
            : item?.status?.by_distributor === "pending"
            ? null
            : IconsPath.whiteClose
        }
        asoIcons={
          item?.status?.by_aso === "approved"
            ? IconsPath.check
            : item?.status?.by_aso === "pending"
            ? null
            : IconsPath.whiteClose
        }
        dispatchedIcons={
          item?.status?.by_admin === "dispatched"
            ? IconsPath.check
            : item?.status?.by_admin === "declined"
            ? IconsPath.whiteClose
            : null
        }
        adminIcon={
          item?.status?.by_admin === "approved" ||
          item?.status?.by_admin === "dispatched"
            ? IconsPath.check
            : item?.status?.by_admin === "declined"
            ? IconsPath.whiteClose
            : null
        }
      />
    </Pressable>
  );
};

export default DistributorOrderWithProgressCard;

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
    borderRadius: 8,
    marginBottom: hp(2),
    paddingHorizontal: wp(3),
    paddingVertical: hp(2),
    height: hp(25),
  },
  headerNoRowView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  orderNoView: {
    flexDirection: "row",
    alignItems: "center",
  },
  orderNo: {
    color: colors.black,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(12),
  },
  textView: {
    marginLeft: wp(3),
  },
  invoiceNo: {
    color: colors.black,
    fontFamily: FontPath.OutfitMedium,
    fontSize: RFValue(12),
  },
  download: {
    width: wp(7),
    height: wp(7),
    resizeMode: "contain",
  },
  orderInfoRowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: wp(55),
    marginTop: hp(2),
    marginHorizontal: wp(3),
  },
  orderinfoText: {
    color: colors.black,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(11),
  },
  orderInfoDes: {
    color: colors.black,
    fontFamily: FontPath.OutfitMedium,
    fontSize: RFValue(11),
    marginTop: hp(0.3),
  },
  name: {
    color: colors.black,
    fontFamily: FontPath.OutfitBold,
    fontSize: RFValue(14),
    width:wp(40)
  },
});
