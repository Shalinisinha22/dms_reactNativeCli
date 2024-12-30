import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import OrderTracking from "./OrderTracking";
import { colors } from "../../utils/Colors";
import { hp, isiPAD, RFValue, wp } from "../../helper/Responsive";
import { FontPath } from "../../utils/FontPath";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { RouteString } from "../../navigation/RouteString";
import { useTranslation } from "react-i18next";
import { OrderCardProps } from "../../interfaces/Types";
import { commonStyle } from "../../utils/commonStyles";
import moment from "moment";
import { IconsPath } from "../../utils/IconPath";

const OrderCard = ({
  isShowButton,
  orderModifiedOnPress,
  perviouseOnPress,
  item,
}: OrderCardProps) => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const totalQty = item?.products.reduce((acc: number, item: any) => {
    const weight = parseFloat(item.quantity) || 0;
    return acc + weight;
  }, 0);

  const totalAmount = item?.products.reduce((acc: number, item: any) => {
    const amount = parseFloat(item.amount) || 0;
    return acc + amount;
  }, 0);

  return (
    <Pressable
      style={styles.cardView}
      onPress={() =>
        navigation.navigate(RouteString.ViewOrderScreen, { id: item?.id })
      }
    >
      <View style={styles.headerNoRowView}>
        <View style={styles.orderNoView}>
          <View style={commonStyle.profileView}>
            <Text style={commonStyle.userNameText}>M</Text>
          </View>
          <View style={{ marginLeft: wp(3) }}>
            <Text style={styles.orderNo}>
              {t("orderHistory.orderNo")} : {item?.orderNumber}
            </Text>
            {item?.dispatchDate && (
              <Text style={styles.dispatchDate}>
                {t("orderHistory.dispatchDate")} :{" "}
                {moment(item?.dispatchDate).format("DD MMM YYYY")}
              </Text>
            )}
          </View>
        </View>
        {/* <Pressable
          style={styles.cancelOrderButton}
          onPress={() => navigation.navigate(RouteString.CancelOrderScreen)}>
          <Text style={styles.cancelOrder}>{t('orderHistory.cancelOrder')}</Text>
        </Pressable> */}
        {isShowButton && (
          <Pressable
            style={styles.cancelOrderButton}
            onPress={() =>
              navigation.navigate(RouteString.PlaceOrderScreen, { item: item })
            }
          >
            <Text style={styles.cancelOrder}>{t("orderHistory.reorder")}</Text>
          </Pressable>
        )}
      </View>
      <View style={styles.orderInfoRowView}>
        <View>
          <Text style={styles.orderinfoText}>
            {t("orderHistory.orderDate")}
          </Text>
          <Text style={styles.orderInfoDes}>
            {moment(item?.orderDate).format("DD MMM YYYY")}
          </Text>
        </View>
        <View>
          <Text style={styles.orderinfoText}>
            {t("orderHistory.totalWeight")}
          </Text>
          <Text style={styles.orderInfoDes}>{totalQty} MT</Text>
        </View>
        <View>
          <Text style={styles.orderinfoText}>
            {t("orderHistory.totalAmount")}
          </Text>
          <Text style={styles.orderInfoDes}>Rs.{totalAmount}</Text>
        </View>
        {isShowButton && (
          <View>
            <Pressable onPress={orderModifiedOnPress}>
              <Text style={styles.orderModified}>
                {t("orderHistory.orderModified")}
              </Text>
            </Pressable>
            <Pressable onPress={perviouseOnPress}>
              <Text style={styles.previous}>{t("orderHistory.previous")}</Text>
            </Pressable>
          </View>
        )}
      </View>
      <OrderTracking
        selectedStep={1}
        containerStyle={{ marginTop: 0 }}
        isCheckIcons={true}
        admin={item?.status?.by_admin === "approved" ? true : false}
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
          item?.status?.by_admin === "approved" ||
          item?.status?.by_admin === "dispatched"
            ? IconsPath.check
            : item?.status?.by_admin === "pending"
            ? null
            : IconsPath.whiteClose
        }
        adminIcon={
          item?.status?.by_admin === "approved" ||
          item?.status?.by_admin === "dispatched"
            ? IconsPath.check
            : item?.status?.by_admin === "pending"
            ? null
            : IconsPath.whiteClose
        }
      />
    </Pressable>
  );
};

export default OrderCard;

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
    paddingVertical: hp(2.5),
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
    fontSize: RFValue(14),
  },
  dispatchDate: {
    color: colors.black,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(11),
  },
  cancelOrderButton: {
    backgroundColor: colors.primary,
    height: hp(3.5),
    alignItems: "center",
    justifyContent: "center",
    width: wp(28),
    borderRadius: 50,
  },
  cancelOrder: {
    color: colors.white,
    fontFamily: FontPath.OutfitMedium,
    fontSize: RFValue(12),
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
    textAlign:'center'
  },
  orderInfoRowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: wp(80),
    marginVertical: hp(2),
    marginHorizontal: wp(3),
  },
  orderModified: {
    color: colors.primary,
    fontFamily: FontPath.OutfitBold,
    fontSize: RFValue(9),
  },
  previous: {
    color: colors.black,
    fontFamily: FontPath.OutfitMedium,
    fontSize: RFValue(9),
    textAlign: "right",
    marginTop: hp(0.5),
  },
});
