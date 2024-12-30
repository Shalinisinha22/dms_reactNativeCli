import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { hp, RFValue, wp } from "../../helper/Responsive";
import { FontPath } from "../../utils/FontPath";
import { colors } from "../../utils/Colors";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { RouteString } from "../../navigation/RouteString";
import { useTranslation } from "react-i18next";
import moment from "moment";

const DealerSchemeView = ({ item }: { item: any }) => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  return (
    <View>
      <View style={styles.schemeView}>
        <View>
          <Text style={styles.dealerScheme}>Dealer’s Annual Scheme </Text>
          <Text style={styles.date}>
            {moment(item[0]?.startDate).format("DD MMMM YYYY")} To{" "}
            {moment(item[item?.length]?.endDate).format("DD MMMM YYYY")}
          </Text>
        </View>
        <Pressable
          onPress={() => navigation.navigate(RouteString.ViewSchemeScreen)}
        >
          <Text style={styles.viewScheme}>{t("myScheme.viewScheme")}</Text>
        </Pressable>
      </View>
      <View style={styles.headerView}>
        <Text style={styles.headerTitle1}>{t("myScheme.no")}</Text>
        <Text style={styles.headerTitle2}>{t("myScheme.slab")}</Text>
        <Text style={styles.headerTitle3}>{t("myScheme.scheme")}</Text>
        <Text style={styles.headerTitle4}>{t("myScheme.myOrder")}</Text>
        <Text style={styles.headerTitle5}>{t("myScheme.status")}</Text>
      </View>
      <View>
        <FlatList
          data={item}
          scrollEnabled={false}
          removeClippedSubviews={false} 
          renderItem={({ item, index }) => {
            return (
              <View style={styles.itemView} key={index}>
                <Text style={styles.itemText1}>{index + 1}</Text>
                <Text style={styles.itemText2}>{item.slab}</Text>
                <Text style={styles.itemText3}>{item.incentive}</Text>
                <View style={{ width: wp(23) }}>
                  <Text style={styles.itemText4}>{item.my_order}</Text>
                  {item.pending > 0 && (
                    <Text style={styles.remaining}>
                      {' '}
                      <Text>(</Text>{t('myScheme.remaining')} {item.pending}
                      <Text>)</Text>
                    </Text>
                  )}
                </View>
                <Text style={styles.itemText5}>
                  {item?.achieved === "yes" ? t("myScheme.achieved") : ""}
                </Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default DealerSchemeView;

const styles = StyleSheet.create({
  schemeView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: wp(5),
    marginTop: hp(1.5),
  },
  dealerScheme: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(16),
  },
  date: {
    color: colors.black,
    fontFamily: FontPath.OutfitLight,
    fontSize: RFValue(12),
  },
  viewScheme: {
    color: colors.primary,
    fontFamily: FontPath.OutfitBold,
    fontSize: RFValue(14),
  },
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: wp(5),
    backgroundColor: colors.primary,
    height: hp(5),
    alignItems: "center",
    paddingHorizontal: wp(3),
    marginTop: hp(2),
    borderRadius: 3,
  },
  headerTitle1: {
    color: colors.white,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(12),
    width: wp(7),
  },
  headerTitle2: {
    color: colors.white,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(12),
    width: wp(10),
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
    width: wp(25),
  },
  headerTitle5: {
    color: colors.white,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(12),
    width: wp(12),
  },
  itemView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: wp(5),
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
    borderWidth: 1,
    marginTop: hp(1),
    borderRadius: 3,
    borderColor: colors.black_100,
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4.65,
    elevation: 4,
  },
  itemText1: {
    color: colors.black,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(11),
    width: wp(8),
  },
  itemText2: {
    color: colors.black,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(11),
    width: wp(11),
  },
  itemText3: {
    color: colors.black,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(11),
    width: wp(16),
  },
  itemText4: {
    color: colors.black,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(11),
    textAlign: "center",
  },
  itemText5: {
    color: colors.green_1,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(11),
    width: wp(18),
    textAlign: "right",
  },
  remaining: {
    color: colors.primary,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(11),
    textAlign: "center",
  },
});
