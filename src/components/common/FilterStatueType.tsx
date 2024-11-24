import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { hp, RFValue, wp } from '../../helper/Responsive';
import { colors } from '../../utils/Colors';
import { FontPath } from '../../utils/FontPath';
import { dealerManagementType, orderHistoryType } from '../../utils/JsonData';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../redux/Store';
import { UserType } from '../../interfaces/Types';

const FilterStatueType = () => {
    const {t} = useTranslation();
    const {portal} = useAppSelector(state => state.auth);
  const [isSelectType, setIsSelectType] = useState('All');

  const type = portal === UserType.DEALER ? orderHistoryType : UserType.DISTRIBUTOR && dealerManagementType

  return (
    <View>
    <FlatList
      data={type}
      horizontal
      style={{marginVertical:hp(2)}}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{paddingLeft: wp(5)}}
      renderItem={({item, index}) => {
        return (
          <Pressable
            key={index}
            onPress={() => setIsSelectType(t(`${item}`))}
            style={[
              styles.typeButton,
              {
                backgroundColor:
                  isSelectType === t(`${item}`) ? colors.primary : colors.white,
                borderColor:
                  isSelectType === t(`${item}`)
                    ? colors.primary
                    : colors.lightGray_5,
              },
            ]}>
            <Text
              style={[
                styles.buttonName,
                {
                  color:
                    isSelectType === t(`${item}`) ? colors.white : colors.black,
                },
              ]}>
              {t(`${item}`)}
            </Text>
          </Pressable>
        );
      }}
    />
  </View>
  )
}

export default FilterStatueType

const styles = StyleSheet.create({
    typeButton: {
        borderWidth: 1,
        marginRight: wp(3),
        paddingHorizontal: wp(5),
        height: hp(4),
        justifyContent: 'center',
        borderRadius: 50,
      },
      buttonName: {
        fontFamily: FontPath.OutfitRegular,
        fontSize: RFValue(12),
      },
})