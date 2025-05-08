import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { colors } from "../../utils/Colors";
import { FontPath } from "../../utils/FontPath";
import { hp, RFValue, wp } from "../../helper/Responsive";
import { OrderPlacementCardProps } from "../../interfaces/Types";
import { useTranslation } from "react-i18next";
import { abbreviateNumber } from "../../utils/commonFunctions";

const OrderPlacementCard = ({
  productName,
  value,
  onChangeText,
  mt,
  onTouchStart,
}: OrderPlacementCardProps) => {
  const { t } = useTranslation();
  // const [unit, setUnit] = useState(0);
  const kgToMt =  Number((value * 0.001).toFixed(3)) 
  return (
    <View style={styles.cardView}>
      <View>
        <Text style={styles.productName}>{productName}</Text>
        <Text style={styles.mrp}>
          MRP : <Text style={styles.unit}>{mt}/MT</Text>
        </Text>
        <Text style={styles.mrp}>
          {t("orderPlacement.amount")} ₹ :{" "}
          <Text style={styles.unit}>{abbreviateNumber(Math.round(mt * kgToMt) || 0)}</Text>
        </Text>
      </View>
      <View style={styles.rowView}>
        <View>
          <Text style={styles.weight}>{t("confirmOrder.weight")}</Text>
          <View style={styles.addUnitView}>
            <TextInput
              placeholder="0"
              value={value}
              onChangeText={onChangeText}
              placeholderTextColor={colors.darkGray}
              style={styles.textInput}
              keyboardType="numeric"
              onTouchStart={onTouchStart}
            />
            {/* <Pressable
            onPress={() => setUnit(() => (unit > 0 ? unit - unitPluse : 0))}>
            <Image source={IconsPath.miuns} style={styles.icons} />
          </Pressable> */}
            {/* <Text style={styles.unitNumber}>{unit}</Text> */}
            {/* <Pressable
            onPress={() => setUnit(() => (unit >= 0 ? unit + unitPluse : 0))}>
            <Image source={IconsPath.pluse3} style={styles.icons} />
          </Pressable> */}
          </View>
        <Text style={styles.mt}>{kgToMt || 0} MT</Text>

        </View>
        <Text style={styles.kg}>Kg</Text>
      </View>
    </View>
  );
};

export default OrderPlacementCard;

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
    padding: wp(4),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  productName: {
    color: colors.primary,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(16),
    marginBottom: hp(0.8),
  },
  mrp: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(14),
  },
  unit: {
    fontFamily: FontPath.OutfitMedium,
    color: colors.black,
  },
  weight: {
    color: colors.black,
    fontFamily: FontPath.OutfitMedium,
    fontSize: RFValue(14),
    textAlign:'center'
  },
  icons: {
    width: wp(4),
    height: wp(4),
    resizeMode: "contain",
  },
  unitNumber: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(12),
    // width: wp(10),
    textAlign: "center",
  },
  addUnitView: {
    // flexDirection: 'row',
    alignItems: "center",
    // justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.lightGray_2,
    // paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
    marginTop: hp(1),
    borderRadius: 5,
    width: wp(22),
  },
  textInput: {
    color: colors.black,
    fontFamily: FontPath.OutfitMedium,
    fontSize: RFValue(14),
    paddingVertical: 0,
    alignSelf: "center",
    textAlign: "center",
    width: wp(22),
  },
  kg: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(15),
    marginLeft: wp(2),
  },
  rowView: {
    flexDirection: "row",
    alignItems: "center",
  },
  mt: {
    fontFamily: FontPath.OutfitSemiBold,
    marginTop: hp(0.5),
    color: colors.blue_2,
    textAlign:'center'
  },
});
