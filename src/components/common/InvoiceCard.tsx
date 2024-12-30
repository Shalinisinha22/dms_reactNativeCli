import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { IconsPath } from "../../utils/IconPath";
import { hp, isiPAD, RFValue, wp } from "../../helper/Responsive";
import { colors } from "../../utils/Colors";
import { FontPath } from "../../utils/FontPath";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { RouteString } from "../../navigation/RouteString";
import { useTranslation } from "react-i18next";
import { commonStyle } from "../../utils/commonStyles";
import moment from "moment";

const InvoiceCard = ({
  item,
  downloadOnPress,
}: {
  item: any;
  downloadOnPress: () => void;
}) => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  return (
    <Pressable
      style={styles.cardView}
      onPress={() =>
        navigation.navigate(RouteString.InvoiceDetailScreen, { id: item.id })
      }
    >
      <View style={styles.headerNoRowView}>
        <View style={styles.orderNoView}>
          <View style={commonStyle.profileView}>
            <Text style={commonStyle.userNameText}>
              {item.customerName.slice(0, 1)}
            </Text>
          </View>
          <View style={styles.textView}>
            <Text style={styles.invoiceNo}>
              {t("invoice.invoiceNo")} : {item?.invoiceNumber}
            </Text>
            <Text style={styles.orderNo}>
              {t("dashboard.orderNo")} : {item?.orderNumber}
            </Text>
          </View>
        </View>
        <Pressable onPress={downloadOnPress}>
          <Image source={IconsPath.downlaod} style={styles.download} />
        </Pressable>
      </View>
      <View style={styles.orderInfoRowView}>
        <View>
          <Text style={styles.orderinfoText}>{t("viewOrder.orderDate")}</Text>
          <Text style={styles.orderInfoDes}>
            {moment(item?.orderDate).format("DD MMM YYYY")}
          </Text>
        </View>
        <View>
          <Text style={styles.orderinfoText}>
            {t("viewOrder.dispatchDate")}
          </Text>
          <Text style={styles.orderInfoDes}>
            {moment(item?.invoiceDate).format("DD MMM YYYY")}
          </Text>
        </View>
        <View>
          <Text style={styles.orderinfoText}>{t("viewOrder.totalAmount")}</Text>
          <Text style={styles.orderInfoDes}>Rs.{item?.totalAmount}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default InvoiceCard;

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
    width: isiPAD ? wp(5) : wp(7),
    height: isiPAD ? wp(5) : wp(7),
    resizeMode: "contain",
  },
  orderInfoRowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: wp(65),
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
});
