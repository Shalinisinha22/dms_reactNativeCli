import {
  FlatList,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../utils/Colors";
import { FontPath } from "../../utils/FontPath";
import { hp, isiPAD, RFValue, wp } from "../../helper/Responsive";
import { SearchDropDownViewProps } from "../../interfaces/Types";
import { useTranslation } from "react-i18next";
import { IconsPath } from "../../utils/IconPath";
import CheckIcons from "../../assets/svg/CheckIcons";
import { useGetRegionsList } from "../../api/query/AuthService";

const SearchDropDownView = ({
  zIndex,
  label,
  placeHolder,
  mainViewStyle,
  data,
  selectedNames,
  errors,
  isRequired,
  isVisible,
  setIsVisible
}: SearchDropDownViewProps) => {
  const getRegionsList = useGetRegionsList();
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleSelectItem = (name: string) => {
    if (selectedItems.includes(name)) {
      setSelectedItems(selectedItems.filter((item) => item !== name));
    } else {
      setSelectedItems([...selectedItems, name]);
    }
    selectedNames([...selectedItems, name]);
    setText(name);
    // setIsVisible(false);
  };

  // const filterData = () => {
  //   if (!text) {
  //     return data;
  //   }
  //   return data.filter((filtered: { name: string }) => {
  //     const itemName = filtered?.name.toLowerCase();
  //     const query = text.toLowerCase();

  //     return itemName.includes(query);
  //   });
  // };

  return (
    <View style={[mainViewStyle, { zIndex: zIndex }]}>
      <Text style={styles.label}>
        {label} {isRequired && <Text style={styles.required}>*</Text>}
      </Text>
      <Pressable
        style={styles.inputView}
        onPress={() => setIsVisible(!isVisible)}
      >
        {/* <TextInput
          placeholder={placeHolder}
          placeholderTextColor={colors.darkGray}
          style={styles.textInput}
          value={text}
          onChangeText={(v) => setText(v)}
          onFocus={() => setIsVisible(true)}
          onTouchStart={() => setIsVisible(true)}
          onBlur={() => setIsVisible(false)}
          autoCapitalize="none"
        /> */}
        <Text
          style={[
            styles.areaText,
            {
              color: selectedItems.length > 0 ? colors.black : colors.darkGray,
            },
          ]}
        >
          {selectedItems.length > 0
            ? selectedItems
                .map((item) =>
                  item
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")
                )
                .join(" , ")
            : placeHolder}
        </Text>
        <Image source={IconsPath.downArrow} style={styles.downArrow} />
      </Pressable>
      {isVisible && (
        <View style={styles.itemView}>
          <FlatList
            data={getRegionsList?.data}
            nestedScrollEnabled
            renderItem={({ item, index }) => {
              return (
                <Pressable
                  key={index}
                  onPress={() => handleSelectItem(item.name)}
                  style={styles.button}
                >
                  <Text style={styles.name}>
                    {item?.name?.charAt(0).toUpperCase() + item?.name?.slice(1)}
                  </Text>
                  {selectedItems.includes(item.name) && (
                    <CheckIcons fill={colors.primary} />
                  )}
                </Pressable>
              );
            }}
          />
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
    height: hp(20),
    backgroundColor: colors.lightBlue,
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
    color:colors.black,
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
    height: Platform.OS === "android" ? hp(5) : hp(4),
    flex: 1,
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: wp(5),
  },
  areaText: {
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(14),
  },
});
