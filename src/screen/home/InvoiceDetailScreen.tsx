import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import SafeAreaContainer from "../../components/common/SafeAreaContainer";
import { hp, RFValue, wp } from "../../helper/Responsive";
import { colors } from "../../utils/Colors";
import { IconsPath } from "../../utils/IconPath";
import { FontPath } from "../../utils/FontPath";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { commonStyle } from "../../utils/commonStyles";
import Share from "react-native-share";
const data = [
  {
    id: "1",
    description: "TMT Bar 8mm",
    weight: "12 MT",
    amount: "2,000.00",
  },
  {
    id: "2",
    description: "TMT Bar 6mm",
    weight: "12 MT",
    amount: "2,000.00",
  },
];

const InvoiceDetailScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const handleShare = () => {
    Share.open({
      message: "Hello",
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        err && console.log(err);
      });
  };

  return (
    <SafeAreaContainer showHeader={false}>
      <View style={styles.headerRowView}>
        <View style={styles.innerView}>
          <Pressable onPress={() => navigation.goBack()}>
            <Image source={IconsPath.backArrow1} style={styles.icon} />
          </Pressable>
          <Text style={styles.headerTitle}>
            {t("invoiceDetail.invoiceDetail")}
          </Text>
        </View>
        <Pressable onPress={handleShare}>
          <Image source={IconsPath.share} style={styles.shareIcon} />
        </Pressable>
      </View>
      <View style={styles.rowView}>
        <View style={commonStyle.profileView}>
          <Text style={commonStyle.userNameText}>M</Text>
        </View>
        <Pressable style={styles.downloadButton}>
          <Image
            source={IconsPath.downlaod}
            tintColor={colors.white}
            style={styles.downloadIcons}
          />
          <Text style={styles.download}>{t("ledger.download")}</Text>
        </Pressable>
      </View>
      <View style={styles.rowView1}>
        <View>
          <Text style={styles.name}>My Private Limited</Text>
          <Text style={styles.address}>
            A 672 Mstercaslrd place New Banglore
          </Text>
          <Text style={styles.zipcode}>434343</Text>
        </View>
        <View>
          <Text style={styles.invoice}>{t("invoiceDetail.invoice")}</Text>
          <Text style={styles.invoiceNo}>120002</Text>
          <Text style={styles.balanceDue}>{t("invoiceDetail.balanceDue")}</Text>
          <Text style={styles.amount}>Rs.12,000.00</Text>
        </View>
      </View>
      <View style={styles.rowView1}>
        <View>
          <Text style={styles.billTO}>{t("invoiceDetail.billTo")}</Text>
          <Text style={styles.invoiceName}>Rajesh Kumar</Text>
          <Text style={styles.address}>
            A 672 Kalyan Nagar, HRBR Layout, Banglore
          </Text>
          <Text style={styles.zipcode}>434343</Text>
        </View>
        <View>
          <View style={styles.totalRowView}>
            <Text style={styles.invoiceDate}>
              {t("invoiceDetail.invoiceDate")} :{" "}
            </Text>
            <Text style={styles.date}> 12 Sept 2024</Text>
          </View>
          <View
            style={[
              styles.totalRowView,
              {
                marginTop: hp(0.9),
              },
            ]}
          >
            <Text style={styles.invoiceDate}>
              {t("invoiceDetail.dueDate")} :{" "}
            </Text>
            <Text style={styles.date}> 25 Sept 2024</Text>
          </View>
        </View>
      </View>
      <View style={styles.headerView}>
        <Text style={styles.headerTitle1}>#</Text>
        <Text style={styles.headerTitle2}>
          {t("confirmOrder.productDecription")}
        </Text>
        <Text style={styles.headerTitle3}>{t("confirmOrder.weight")}</Text>
        <Text style={styles.headerTitle4}>{t("confirmOrder.amount")}</Text>
      </View>
      <View>
        <FlatList
          data={data}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.itemView}>
                <Text style={styles.itemText1}>{item.id}</Text>
                <Text style={styles.itemText2}>{item.description}</Text>
                <Text style={styles.itemText3}>{item.weight}</Text>
                <Text style={styles.itemText4}>{item.amount}</Text>
              </View>
            );
          }}
        />
      </View>
      <View style={styles.totalView}>
        <View style={styles.totalRowView}>
          <Text style={styles.total}>{t("confirmOrder.subTotal")} : </Text>
          <Text style={styles.subAmount}> 4,000.00</Text>
        </View>
        <View
          style={[
            styles.totalRowView,
            {
              marginTop: hp(0.8),
            },
          ]}
        >
          <Text style={styles.total}>{t("confirmOrder.total")} : </Text>
          <Text style={styles.totalAmount}> 4,000.00</Text>
        </View>
      </View>
    </SafeAreaContainer>
  );
};

export default InvoiceDetailScreen;

const styles = StyleSheet.create({
  headerRowView: {
    flexDirection: "row",
    height: hp(7),
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp(5),
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4.65,
    elevation: 4,
    marginBottom: hp(4),
  },
  innerView: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: wp(10),
    height: wp(10),
    resizeMode: "contain",
  },
  headerTitle: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(19),
    marginLeft: wp(4),
  },
  shareIcon: {
    width: wp(6.5),
    height: wp(6.5),
    resizeMode: "contain",
  },
  rowView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: wp(5),
  },
  downloadButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    width: wp(30),
    justifyContent: "center",
    height: hp(4),
    borderRadius: 5,
  },
  downloadIcons: {
    width: wp(5),
    height: wp(5),
    resizeMode: "contain",
  },
  download: {
    color: colors.white,
    fontSize: RFValue(14),
    fontFamily: FontPath.OutfitMedium,
    marginLeft: wp(1.5),
  },
  rowView1: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: wp(5),
    marginTop: hp(1.5),
  },
  name: {
    color: colors.black,
    fontSize: RFValue(16),
    fontFamily: FontPath.OutfitMedium,
  },
  address: {
    color: colors.black,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(14),
    maxWidth: wp(45),
    marginVertical: hp(0.6),
  },
  zipcode: {
    color: colors.black,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(14),
  },
  invoice: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(23),
    textAlign: "right",
    marginBottom: hp(0.5),
  },
  invoiceNo: {
    color: colors.black,
    fontFamily: FontPath.OutfitMedium,
    fontSize: RFValue(16),
    textAlign: "right",
  },
  balanceDue: {
    color: colors.black,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(14),
    textAlign: "right",
    marginTop: hp(2),
  },
  amount: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(20),
    textAlign: "right",
  },
  totalRowView: {
    flexDirection: "row",
    alignItems: "center",
  },
  invoiceDate: {
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(13),
    color: colors.black,
    width: wp(25),
    textAlign: "right",
  },
  date: {
    fontFamily: FontPath.OutfitBold,
    fontSize: RFValue(13),
    color: colors.black,
  },
  invoiceName: {
    color: colors.black,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(14),
    marginTop: hp(0.5),
  },
  billTO: {
    color: colors.black,
    fontFamily: FontPath.OutfitMedium,
    fontSize: RFValue(16),
  },
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: wp(5),
    backgroundColor: colors.drarkGray_1,
    height: hp(4),
    alignItems: "center",
    paddingHorizontal: wp(5),
    borderRadius: 3,
    marginTop: hp(2),
  },
  itemText1: {
    color: colors.black,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(12),
    width: wp(10),
  },
  itemText2: {
    color: colors.black,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(12),
    width: wp(40),
  },
  itemText3: {
    color: colors.black,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(12),
    width: wp(15),
  },
  itemText4: {
    color: colors.black,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(12),
    width: wp(18),
  },
  headerTitle1: {
    color: colors.white,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(12),
    width: wp(10),
  },
  headerTitle2: {
    color: colors.white,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(12),
    width: wp(35),
  },
  headerTitle3: {
    color: colors.white,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(12),
    width: wp(15),
  },
  headerTitle4: {
    color: colors.white,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(12),
    width: wp(15),
  },
  itemView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: wp(5),
    paddingHorizontal: wp(5),
    paddingVertical: hp(1),
    borderWidth: 1,
    marginTop: hp(1),
    borderRadius: 3,
    borderColor: colors.black_100,
  },
  totalView: {
    alignSelf: "flex-end",
    marginHorizontal: wp(5),
    marginTop: hp(2),
  },
  total: {
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(12),
    color: colors.black,
    width: wp(25),
    textAlign: "right",
  },
  subAmount: {
    color: colors.black,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(12),
    textAlign: "right",
  },
  totalAmount: {
    color: colors.black,
    fontFamily: FontPath.OutfitBold,
    fontSize: RFValue(12),
  },
});
