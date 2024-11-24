import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../utils/Colors';
import {hp, isiPAD, RFValue, wp} from '../../helper/Responsive';
import {FontPath} from '../../utils/FontPath';
import { TotalOrderCardProps } from '../../interfaces/Types';

const TotalOrderCard = ({source,title, total }:TotalOrderCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.redView}>
        <View style={styles.redInnerView}>
          <Image source={source} style={styles.icons} tintColor={colors.white} />
        </View>
      </View>
      <View style={styles.textView}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.total}>{total}</Text>
      </View>
    </View>
  );
};

export default TotalOrderCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    marginHorizontal: wp(5),
    shadowOpacity: 0.05,
    shadowRadius: 10.65,
    elevation: 8,
    borderRadius: 8,
    height: hp(13),
    marginBottom: hp(2),
  },
  redView: {
    position: 'absolute',
    height: hp(13),
    borderRadius: 8,
    overflow: 'hidden',
  },
  redInnerView: {
    width:  isiPAD ? wp(20) :  wp(28),
    height: isiPAD ? wp(15) :  wp(28),
    backgroundColor: colors.primary,
    borderRadius: 60,
    left:  isiPAD ? wp(-9) :  wp(-9),
    top: hp(-4),
    paddingLeft: isiPAD ? wp(8) : wp(6),
    paddingTop: hp(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  icons: {
    width:  isiPAD ? wp(4.5) :  wp(8),
    height: isiPAD ? wp(4.5) :  wp(8),
    resizeMode: 'contain',

  },
  textView: {
    marginTop: hp(2),
    marginLeft: isiPAD ? wp(16) :wp(25),
  },
  title: {
    color: colors.black,
    fontFamily: FontPath.OutfitMedium,
    fontSize: RFValue(16),
    lineHeight:hp(3),
  },
  total: {
    color: colors.black,
    fontFamily: FontPath.OutfitBold,
    fontSize: RFValue(28),
  },
});
