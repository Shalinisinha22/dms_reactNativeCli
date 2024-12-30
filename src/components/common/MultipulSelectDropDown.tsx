import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../utils/Colors";
import { FontPath } from "../../utils/FontPath";
import { hp, isiPAD, RFValue, wp } from "../../helper/Responsive";
import { DropDownViewProps } from "../../interfaces/Types";
import { useTranslation } from "react-i18next";
import { IconsPath } from "../../utils/IconPath";

const MultipulSelectDropDown = ({
  zIndex,
  label,
  placeHolder,
  mainViewStyle,
  data,
  errors,
  selectedName,
  selectedId
}: DropDownViewProps) => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [select, setSelect] = useState(new Set());
  const [selectId, setSelectId] = useState(new Set())

  const handleSelectItem = (item: any) => {
    if (select?.has(item.name)) {
      const newSet = new Set(select);
      newSet.delete(item.id);

      const newSetId = new Set(selectId);
      newSetId.delete(item.id);

      setSelect(newSet);
      setSelectId(newSetId)
    } else {
      const newSet = new Set(select);
      setSelect(newSet.add(item.name));

      const newSetId = new Set(selectId);
      setSelectId(newSetId.add(item.id));
    }
  };
  
  useEffect(() => {
    selectedName(Array.from(select))
    selectedId?.(Array.from(selectId))
  },[select])


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
          {select.size > 0
            ? Array.from(select).join(', ') // Convert Set to array for display
            : placeHolder}
        </Text>
        <Image source={IconsPath.downArrow} style={styles.downArrow} />
      </Pressable>
      {isVisible && (
        <View style={styles.itemView}>
          {data.map((item: any, index: number) => {
            return (
              <Pressable
                key={index}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: wp(5),
                }}
                onPress={() => handleSelectItem(item)}
              >
                <Text style={styles.name}>{item.name}</Text>
                {select?.has(item.name) && (
                  <Image
                    source={IconsPath.check}
                    style={{
                      width: wp(4),
                      height: wp(4),
                      resizeMode: "contain",
                    }}
                    tintColor={colors.primary}
                  />
                )}
              </Pressable>
            );
          })}
        </View>
      )}
      {errors && <Text style={styles.error}>{t(`${errors}`)}</Text>}
    </View>
  );
};

export default MultipulSelectDropDown;

const styles = StyleSheet.create({
  label: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(14),
    marginHorizontal: wp(5),
    lineHeight: hp(3),
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
