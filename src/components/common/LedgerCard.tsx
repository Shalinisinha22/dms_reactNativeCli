import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../utils/Colors';
import {hp, RFValue, wp} from '../../helper/Responsive';
import {FontPath} from '../../utils/FontPath';
import {useTranslation} from 'react-i18next';
import { commonStyle } from '../../utils/commonStyles';

const LedgerCard = () => {
  const {t} = useTranslation();
  return (
    <View style={styles.cardView}>
      <View style={styles.orderNoView}>
        <View style={commonStyle.profileView}>
          <Text style={commonStyle.userNameText}>M</Text>
        </View>
        <View style={styles.textView}>
          <View>
            <Text style={styles.salesName}>Sales Ms Road TMT Bar</Text>
            <Text style={styles.orderNo}>BMS/24-25/286</Text>
          </View>
          <View style={styles.dateTextView}>
            <View>
              <Text style={styles.date}>{t('ledger.date')}</Text>
              <Text style={styles.dateTime}>12 Sept 2024</Text>
            </View>
            <View style={styles.salesView}>
              <Text style={styles.sales}>{t('ledger.sales')}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LedgerCard;

const styles = StyleSheet.create({
  cardView: {
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
    marginBottom: hp(2),
    paddingHorizontal: wp(3),
    paddingVertical: hp(2),
  },
  orderNoView: {
    flexDirection: 'row',
  },
  orderNo: {
    color: colors.black,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(12),
    marginTop: hp(0.5),
  },
  textView: {
    marginLeft: wp(3),
    flex: 1,
  },
  salesName: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(16),
  },
  dateTextView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp(2.5),
  },
  date: {
    color: colors.black,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(11),
  },
  dateTime: {
    color: colors.black,
    fontFamily: FontPath.OutfitMedium,
    fontSize: RFValue(11),
  },
  salesView: {
    backgroundColor: colors.red_100,
    width: wp(20),
    height: hp(4),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  sales: {
    color: colors.primary,
    fontFamily: FontPath.OutfitMedium,
    fontSize: RFValue(12),
  },
});
