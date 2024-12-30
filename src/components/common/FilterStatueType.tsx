import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { hp, RFValue, wp } from "../../helper/Responsive";
import { colors } from "../../utils/Colors";
import { FontPath } from "../../utils/FontPath";
import {
  asorManagementType,
  dealerManagementType,
  orderHistoryType,
  rewardType,
} from "../../utils/JsonData";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../redux/Store";
import { UserType } from "../../interfaces/Types";

const FilterStatueType = ({
  selectedId,
  type,
  data
}: {
  selectedId: (id: any) => void;
  type?:string
  data?:any
}) => {
  const { t } = useTranslation();
  const { portal } = useAppSelector((state) => state.auth);
  const [isSelectType, setIsSelectType] = useState( "All");

  useEffect(() => {
    if(type == 'orderHistory.pending' ||
      type == 'orderHistory.approved' ||
      type == 'orderHistory.rejected' ||
      type == 'orderHistory.dispatched' ||
      type == 'orderHistory.all' 
    ){
      selectedId(type);
    }
  },[type])

  useEffect(() => {
    setIsSelectType(type ? `${t(`${type}`)}` : "All")
  },[type])

  const types: any = data ? data :
    portal === UserType.DEALER
      ? orderHistoryType
      : portal === UserType.DISTRIBUTOR
      ? dealerManagementType
      : portal === UserType.ASO
      ? asorManagementType
      : (portal === UserType.MASON || portal === UserType.ENGINEER) &&
        rewardType;

  const handleSelectedItem = (id: any) => {
    setIsSelectType(`${t(id)}`);
    selectedId(id);
  };

  return (
    <View>
      <FlatList
        data={types}
        horizontal
        style={{ marginVertical: hp(2) }}
        showsHorizontalScrollIndicator={false}
        removeClippedSubviews={false} 
        contentContainerStyle={{ paddingLeft: wp(5) }}
        renderItem={({ item, index }) => {
          return (
            <Pressable
              key={index}
              onPress={() => handleSelectedItem(item)}
              style={[
                styles.typeButton,
                {
                  backgroundColor:
                    isSelectType === t(`${item}`)
                      ? colors.primary
                      : colors.white,
                  borderColor:
                    isSelectType === t(`${item}`)
                      ? colors.primary
                      : colors.lightGray_5,
                },
              ]}
            >
              <Text
                style={[
                  styles.buttonName,
                  {
                    color:
                      isSelectType === t(`${item}`)
                        ? colors.white
                        : colors.black,
                  },
                ]}
              >
                {t(`${item}`)}
              </Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

export default FilterStatueType;

const styles = StyleSheet.create({
  typeButton: {
    borderWidth: 1,
    marginRight: wp(3),
    paddingHorizontal: wp(5),
    height: hp(4),
    justifyContent: "center",
    borderRadius: 50,
  },
  buttonName: {
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(12),
  },
});
