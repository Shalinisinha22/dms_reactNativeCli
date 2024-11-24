import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../utils/Colors';
import {FontPath} from '../../utils/FontPath';
import {hp, isiPAD, RFValue, wp} from '../../helper/Responsive';
import {IconsPath} from '../../utils/IconPath';
import {DropDownViewProps} from '../../interfaces/Types';

const DropDownView = ({zIndex, label, placeHolder, mainViewStyle, data}: DropDownViewProps) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <View style={[mainViewStyle,{zIndex: zIndex}]}>
      <Text style={styles.label}>{label}</Text>
      <Pressable
        style={styles.selectButton}
        onPress={() => setIsVisible(!isVisible)}>
        <Text style={styles.status}>{placeHolder}</Text>
        <Image source={IconsPath.downArrow} style={styles.downArrow} />
      </Pressable>
      {isVisible && (
        <View style={styles.itemView}>
          {data.map((item : any, index: number) => {
            return (
              <Pressable key={index}>
                <Text style={styles.name}>{item.name}</Text>
              </Pressable>
            );
          })}
        </View>
      )}
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
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    height: hp(5),
    borderRadius: 5,
    paddingHorizontal: wp(4),
    marginHorizontal: wp(5),
    marginTop: hp(1.5),
    justifyContent: 'space-between',
  },
  downArrow: {
    width: isiPAD ? wp(4) : wp(5.5),
    height: isiPAD ? wp(4) : wp(5.5),
    resizeMode: 'contain',
  },
  status: {
    color: colors.darkGray,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(14),
  },
  itemView: {
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 999,
    top: hp(9.5),
    backgroundColor: colors.white,
    paddingTop: hp(1),
    borderRadius: 12,
    width: wp(90),
    marginTop: hp(1),
    shadowColor: colors.black_100,
    shadowRadius: 4,
    shadowOffset: {height: 4, width: 0},
    shadowOpacity: 0.8,
  },
  name: {
    fontFamily: FontPath.OutfitMedium,
    marginHorizontal: wp(5),
    marginBottom: hp(1),
  },
});
