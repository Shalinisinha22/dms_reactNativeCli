import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import SafeAreaContainer from "../../components/common/SafeAreaContainer";
import { FontPath } from "../../utils/FontPath";
import { colors } from "../../utils/Colors";
import { hp, isiPAD, RFValue, wp } from "../../helper/Responsive";
import { brandingRequestItem } from "../../utils/JsonData";
import CheckIcons from "../../assets/svg/CheckIcons";
import Button from "../../components/common/Button";
import { useTranslation } from "react-i18next";

const BrandingRequestScreen = () => {
  const { t } = useTranslation();
  const [selectedItem, setSelectedItem] = useState<Set<string>>(new Set());

  const handleSelectItem = (name: string) => {
    if (selectedItem.has(name)) {
      const newSet = new Set(selectedItem);
      newSet.delete(name);
      setSelectedItem(newSet);
    } else {
      const newSet = new Set(selectedItem);
      setSelectedItem(newSet.add(name));
    }
  };

  return (
    <SafeAreaContainer>
      <Text style={styles.title}>{t("brandingRequest.brandingRequest")}</Text>
      <Text style={styles.selectItems}>{t("brandingRequest.selectItems")}</Text>
      <View style={styles.cardView}>
        {brandingRequestItem.map((item, index) => {
          return (
            <View key={index} style={styles.rowView}>
              <Pressable
                style={styles.checkBox}
                onPress={() => handleSelectItem(item.name)}
              >
                {selectedItem.has(item?.name) && (
                  <CheckIcons width={wp(3)} height={wp(3)} />
                )}
              </Pressable>
              <Text style={styles.name}>{item.name}</Text>
            </View>
          );
        })}
      </View>
      <Button
        buttonName={t("cancelOrder.Submit")}
        isLoading={false}
        onPress={() => null}
      />
    </SafeAreaContainer>
  );
};

export default BrandingRequestScreen;

const styles = StyleSheet.create({
  title: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(20),
    marginHorizontal: wp(5),
    marginVertical: hp(2.5),
    lineHeight:hp(4)
  },
  selectItems: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(14),
    marginHorizontal: wp(5),
  },
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
    paddingTop: hp(3),
    paddingHorizontal: wp(5),
    marginTop: hp(2),
  },
  rowView: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp(3),
  },
  checkBox: {
    width: isiPAD ? wp(4) : wp(6),
    height: isiPAD ? wp(4) : wp(6),
    borderWidth: 2,
    borderRadius: 5,
    borderColor: colors.black_530,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontFamily: FontPath.OutfitMedium,
    fontSize: RFValue(15),
    color: colors.black,
    marginLeft: wp(3),
  },
});
