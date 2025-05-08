import {
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
import { SearchDropDownSignalSelectionProps } from "../../interfaces/Types";
import { useTranslation } from "react-i18next";
import CheckIcons from "../../assets/svg/CheckIcons";
import { FlatList } from "react-native-gesture-handler";
import { IconsPath } from "../../utils/IconPath";

const SearchDropDownSignalSelection = ({
  zIndex,
  label,
  placeHolder,
  data,
  selectedNames,
  errors,
  distributorId,
  isRequired,
  isVisible,
  setIsVisible,
}: SearchDropDownSignalSelectionProps) => {
  const { t } = useTranslation();

  const [text, setText] = useState("");

  useEffect(() => {
    if (distributorId) {
      const findDilear = data.filter((item: any) => item.id === distributorId);
      selectedNames(findDilear[0]?.id);
      setText(findDilear[0]?.name);
    } else {
      setText("");
    }
  }, [distributorId, data]);

  const handleSelectItem = (item: any) => {
    if (text === item.name) {
      selectedNames(null);
      setText("");
    } else {
      selectedNames(item?.id);
      setText(item?.name);
      setIsVisible(false);
    }
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
    <View style={[styles.mainViewStyle, { zIndex: zIndex }]}>
      <Text style={styles.label}>
        {label} {isRequired && <Text style={styles.required}>*</Text>}
      </Text>
      <Pressable
        style={styles.inputView}
        onPress={() => setIsVisible(!isVisible)}
      >
        <TextInput
          placeholder={placeHolder}
          placeholderTextColor={colors.darkGray}
          style={styles.textInput}
          value={text}
          editable={false}
          onChangeText={(v) => setText(v)}
          onTouchStart={() => setIsVisible(!isVisible)}
          autoCapitalize="none"
        />
        <Image source={IconsPath.downArrow} style={styles.downArrow} />
      </Pressable>
      {isVisible && (
        <View style={styles.itemView}>
          <FlatList
            data={filterData()}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <Text style={styles.noData}>
                {t("error.NoDistributorInYourArea")}
              </Text>
            )}
            renderItem={({ item, index }) => {
              return (
                <Pressable
                  key={`area${index}`}
                  onPress={() => handleSelectItem(item)}
                  style={styles.button}
                >
                  <Text style={styles.name}>
                    {item?.firm_name?.charAt(0).toUpperCase() + item?.firm_name?.slice(1)}
                  </Text>
                  {text == item.firm_name && <CheckIcons fill={colors.primary} />}
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

export default SearchDropDownSignalSelection;

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
    color: colors.black,
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
  mainViewStyle: {
    marginHorizontal: wp(5),
    marginBottom: hp(2),
  },
  noData: {
    alignSelf: "center",
    marginTop: hp(5),
    justifyContent: "center",
    fontFamily: FontPath.OutfitMedium,
    color: colors.black_900,
  },
});
