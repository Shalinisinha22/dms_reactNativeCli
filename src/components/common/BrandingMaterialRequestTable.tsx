import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { colors } from "../../utils/Colors";
import { FontPath } from "../../utils/FontPath";
import { hp, RFValue, wp } from "../../helper/Responsive";

const BrandingMaterialRequestTable = () => {
  const { t } = useTranslation();

  return (
    <View>
      <View style={styles.headerView}>
        <Text style={styles.headerTitle1}>{t("myScheme.no")}</Text>
        <Text style={styles.headerTitle2}>Name</Text>
        <Text style={styles.headerTitle3}>Work City</Text>
        <Text style={styles.headerTitle4}>Requirement</Text>
        <Text style={styles.headerTitle5}>Date</Text>
      </View>
      <View>
        <FlatList
          data={[1, 2, 3]}
          scrollEnabled={false}
          removeClippedSubviews={false} 
          renderItem={({ item, index }) => {
            return (
              <View style={styles.itemView} key={index}>
                <Text style={styles.itemText1}>{index + 1}</Text>
                <Text style={styles.itemText2}>Xyz Enterprise</Text>
                <Text style={styles.itemText3}>Patna</Text>
                <View style={{ width: wp(23) }}>
                  <Text style={styles.itemText4}>1.Wall Painting</Text>
                  <Text style={styles.itemText4}>2.Wall Painting</Text>
                  <Text style={styles.itemText4}>3.Wall Painting</Text>
                </View>
                <Text style={styles.itemText5}>12/01/2024</Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default BrandingMaterialRequestTable;

const styles = StyleSheet.create({
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
    width: wp(5),
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
    width: wp(18),
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
    width: wp(5),
  },
  itemText2: {
    color: colors.black,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(11),
    width: wp(18),
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
    color: colors.black,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(11),
    width: wp(18),
    textAlign: "right",
  },
});
