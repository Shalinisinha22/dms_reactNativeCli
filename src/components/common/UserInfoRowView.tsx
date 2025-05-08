import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../utils/Colors';
import {FontPath} from '../../utils/FontPath';
import {hp, RFValue, wp} from '../../helper/Responsive';
import {UserInfoRowViewProps} from '../../interfaces/Types';

const UserInfoRowView = ({title, userInfo}: UserInfoRowViewProps) => {
  return (
    <View style={styles.textRowView}>
      <Text
        style={[
          styles.title,
          {
            width: title === 'Counter Address' ? wp(31) : wp(25),
          },
        ]}>
        {title}
      </Text>
      <Text style={styles.dot}>:</Text>
      <Text
        style={[
          styles.userInfo,
          {
            width: title === 'Counter Address' ? wp(40) : wp(55),
          },
        ]}>
        {userInfo}
      </Text>
    </View>
  );
};

export default UserInfoRowView;

const styles = StyleSheet.create({
  textRowView: {
    flexDirection: 'row',
    marginBottom: hp(1.5),
  },
  title: {
    color: colors.black,
    fontFamily: FontPath.OutfitMedium,
    fontSize: RFValue(14),
    alignSelf:'flex-start',
    lineHeight:hp(3)
  },
  dot: {
    fontFamily: FontPath.OutfitMedium,
    color:colors.black,
    fontSize: RFValue(16),
  },
  userInfo: {
    color: colors.black,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(15),
    marginLeft: wp(4),
    lineHeight:hp(3)
  },
});
