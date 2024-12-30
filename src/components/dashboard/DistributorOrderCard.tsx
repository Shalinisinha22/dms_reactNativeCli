import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { colors } from "../../utils/Colors";
import { FontPath } from "../../utils/FontPath";
import { hp, RFValue, wp } from "../../helper/Responsive";
import { useTranslation } from "react-i18next";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import ApproveButton from "../common/ApproveButton";
import RejectButton from "../common/RejectButton";
import { commonStyle } from "../../utils/commonStyles";
import moment from "moment";

const DistributorOrderCard = ({
  item,
  approveOnPress,
  rejectOnPress,
}: {
  item: any;
  approveOnPress: () => void;
  rejectOnPress: () => void;
}) => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [isOptionShow, setIsOptionShow] = useState(false);

  const totalQty = item?.products.reduce((acc: number, item: any) => {
    const weight = parseFloat(item.quantity) || 0;
    return acc + weight;
  }, 0);

  const totalAmount = item?.products.reduce((acc: number, item: any) => {
    const amount = parseFloat(item.amount) || 0;
    return acc + amount;
  }, 0);

  return (
    <>
      <Pressable
        style={styles.cardView}
        onPress={() => setIsOptionShow(!isOptionShow)}
      >
        <View style={styles.headerNoRowView}>
          <View>
            <View style={styles.orderNoView}>
              <View style={commonStyle.profileView}>
                <Text style={commonStyle.userNameText}>
                  {item?.dealer_name.slice(0, 1)}
                </Text>
              </View>
              <View style={styles.textView}>
                <Text style={styles.invoiceNo}>
                  {t("dashboard.orderNo")} : {item?.orderNumber}
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
                <Text style={styles.orderinfoText}>
                  {t("dashboard.weight")}
                </Text>
                <Text style={styles.orderInfoDes}>{totalQty}</Text>
              </View>
              <View>
                <Text style={styles.orderinfoText}>
                  {t("confirmOrder.amount")}
                </Text>
                <Text style={styles.orderInfoDes}>Rs.{totalAmount}</Text>
              </View>
            </View>
          </View>
          <View>
            <ApproveButton onPress={approveOnPress} />
            <RejectButton onPress={rejectOnPress} />
          </View>
        </View>
      </Pressable>
    </>
  );
};

export default DistributorOrderCard;

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
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(16),
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
    textAlign:'center'
  },
});
