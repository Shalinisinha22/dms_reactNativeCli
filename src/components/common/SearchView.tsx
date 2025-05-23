import { Image, Platform, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { hp, RFValue, wp } from "../../helper/Responsive";
import { colors } from "../../utils/Colors";
import { IconsPath } from "../../utils/IconPath";
import { FontPath } from "../../utils/FontPath";
import { useTranslation } from "react-i18next";
import { SearchViewProps } from "../../interfaces/Types";

const SearchView = ({
  searchMainViewStyle,
  value,
  onChangeText,
  placeholder
}: SearchViewProps) => {
  const { t } = useTranslation();

  return (
    <View style={[styles.searchMainView, searchMainViewStyle]}>
      <Image source={IconsPath.search} style={styles.search} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder ? placeholder : t("dashboard.searchDealer")}
        placeholderTextColor={colors.darkGray}
        style={styles.textInput}
      />
    </View>
  );
};

export default SearchView;

const styles = StyleSheet.create({
  searchMainView: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: wp(5),
    borderWidth: 1,
    height: hp(5.5),
    paddingHorizontal: wp(3),
    borderColor: colors.black_530,
    borderRadius: 5,
  },
  search: {
    width: wp(5),
    height: wp(5),
    resizeMode: "contain",
  },
  textInput: {
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(14),
    marginLeft: wp(2),
    height: Platform.OS === 'android' ? hp(5): hp(3),
    color: colors.black,
  },
});
