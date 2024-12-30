import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { colors } from "../../utils/Colors";
import { FontPath } from "../../utils/FontPath";
import { hp, isiPAD, RFValue, wp } from "../../helper/Responsive";
import { IconsPath } from "../../utils/IconPath";
import { DropDownViewProps } from "../../interfaces/Types";
import { useTranslation } from "react-i18next";

const DropDownView = ({
  zIndex,
  label,
  placeHolder,
  mainViewStyle,
  data,
  selectedName,
  errors,
}: DropDownViewProps) => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  const handleSelectItem = (name: string) => {
    selectedName(name);
    setIsVisible(!isVisible);
  };

  return (
    <View style={[mainViewStyle, { zIndex: zIndex }]}>
      <Text style={styles.label}>{label}</Text>
      <Pressable
        style={styles.selectButton}
        onPress={() => setIsVisible(!isVisible)}
      >
        <Text
          style={[
            styles.status,
            {
              color: placeHolder ? colors.black : colors.darkGray,
            },
          ]}
        >
          {placeHolder}
        </Text>
        <Image source={IconsPath.downArrow} style={styles.downArrow} />
      </Pressable>
      {isVisible && (
        <View style={styles.itemView}>
          {data.map((item: any, index: number) => {
            return (
              <Pressable
                key={index}
                onPress={() => handleSelectItem(t(`${item.name}`))}
              >
                <Text style={styles.name}>{t(`${item.name}`)}</Text>
              </Pressable>
            );
          })}
        </View>
      )}
      {errors && <Text style={styles.error}>{t(`${errors}`)}</Text>}
    </View>
  );
};

export default DropDownView;

const styles = StyleSheet.create({
  label: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(14),
    marginHorizontal: wp(5),
    lineHeight:hp(3)
  },
  selectButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.lightGray,
    height: hp(6),
    borderRadius: 5,
    paddingHorizontal: wp(4),
    marginHorizontal: wp(5),
    marginTop: hp(1.5),
    justifyContent: "space-between",
  },
  downArrow: {
    width: isiPAD ? wp(4) : wp(5.5),
    height: isiPAD ? wp(4) : wp(5.5),
    resizeMode: "contain",
  },
  status: {
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(14),
  },
  itemView: {
    position: "absolute",
    alignSelf: "center",
    zIndex: 999,
    top: hp(9.5),
    backgroundColor: colors.white,
    paddingTop: hp(1),
    borderRadius: 12,
    width: wp(90),
    marginTop: hp(1),
    shadowColor: colors.black_100,
    shadowRadius: 4,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.8,
  },
  name: {
    fontFamily: FontPath.OutfitMedium,
    marginHorizontal: wp(5),
    marginBottom: hp(2),
  },
  error: {
    color: colors.primary,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(12),
    lineHeight: hp(3),
    marginHorizontal: wp(5),
  },
});
