import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../../utils/Colors";
import { FontPath } from "../../utils/FontPath";
import { hp, isiPAD, RFValue, wp } from "../../helper/Responsive";
import { SearchDropDownViewProps } from "../../interfaces/Types";
import { useTranslation } from "react-i18next";
import { IconsPath } from "../../utils/IconPath";

const SearchDropDownView = ({
  zIndex,
  label,
  placeHolder,
  mainViewStyle,
  data,
  selectedName,
  errors,
  isRequired,
}: SearchDropDownViewProps) => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [text, setText] = useState("");

  const handleSelectItem = (name: string) => {
    selectedName(name);
    setText(name)
    setIsVisible(false);
  };

  const filterData = () => {
    if (!text) {
      return data;
    }
    return data.filter((filtered: { name: string }) => {
      const itemName = filtered?.name.toLowerCase();
      const query = text.toLowerCase();

      return itemName.includes(query);
    });
  };

  return (
    <View style={[mainViewStyle, { zIndex: zIndex }]}>
      <Text style={styles.label}>
        {label} {isRequired && <Text style={styles.required}>*</Text>}
      </Text>
      <View style={styles.inputView}>
        <TextInput
          placeholder={placeHolder}
          placeholderTextColor={colors.darkGray}
          style={styles.textInput}
          value={text}
          onChangeText={(v) => setText(v)}
          onFocus={() => setIsVisible(true)}
          onTouchStart={() => setIsVisible(true)}
          autoCapitalize="none"
        />
        <Image source={IconsPath.downArrow} style={styles.downArrow} />
      </View>
      {isVisible && (
        <View style={styles.itemView}>
          {filterData().map((item: any, index: number) => {
            return (
              <Pressable
                key={index}
                onPress={() => handleSelectItem(item.name)}
              >
                <Text style={styles.name}>{item.name}</Text>
              </Pressable>
            );
          })}
        </View>
      )}
      {errors && <Text style={styles.error}>{t(`${errors}`)}</Text>}
    </View>
  );
};

export default SearchDropDownView;

const styles = StyleSheet.create({
  label: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(14),
    lineHeight: hp(3),
    marginBottom: hp(1),
  },
  downArrow: {
    width: isiPAD ? wp(4) : wp(5.5),
    height: isiPAD ? wp(4) : wp(5.5),
    resizeMode: "contain",
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
  },
  required: {
    color: colors.primary,
  },
  inputView: {
    backgroundColor: colors.lightGray,
    height: hp(6),
    paddingHorizontal: wp(5),
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textInput: {
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(14),
    color: colors.black,
    height: Platform.OS === 'android' ? hp(5) : hp(4),
    flex: 1,
  },
});
