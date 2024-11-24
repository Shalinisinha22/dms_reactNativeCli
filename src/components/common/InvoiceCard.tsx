import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IconsPath} from '../../utils/IconPath';
import {hp, isiPAD, RFValue, wp} from '../../helper/Responsive';
import {colors} from '../../utils/Colors';
import {FontPath} from '../../utils/FontPath';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {RouteString} from '../../navigation/RouteString';
import { useTranslation } from 'react-i18next';
import { commonStyle } from '../../utils/commonStyles';

const InvoiceCard = () => {
  const {t} = useTranslation();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  return (
    <Pressable
      style={styles.cardView}
      onPress={() => navigation.navigate(RouteString.InvoiceDetailScreen)}>
      <View style={styles.headerNoRowView}>
        <View style={styles.orderNoView}>
          <View style={commonStyle.profileView}>
            <Text style={commonStyle.userNameText}>M</Text>
          </View>
          <View style={styles.textView}>
            <Text style={styles.invoiceNo}>{t('invoice.invoiceNo')} : 121124</Text>
            <Text style={styles.orderNo}>{t('dashboard.orderNo')} : 121124</Text>
          </View>
        </View>
        <Pressable>
          <Image source={IconsPath.downlaod} style={styles.download} />
        </Pressable>
      </View>
      <View style={styles.orderInfoRowView}>
        <View>
          <Text style={styles.orderinfoText}>{t('viewOrder.orderDate')}</Text>
          <Text style={styles.orderInfoDes}>12 Sept 2024</Text>
        </View>
        <View>
          <Text style={styles.orderinfoText}>{t('viewOrder.dispatchDate')}</Text>
          <Text style={styles.orderInfoDes}>12 Sept 2024</Text>
        </View>
        <View>
          <Text style={styles.orderinfoText}>{t('viewOrder.totalAmount')}</Text>
          <Text style={styles.orderInfoDes}>Rs.12,0000</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default InvoiceCard;

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
    borderRadius: 8,
    marginBottom: hp(2),
    paddingHorizontal: wp(3),
    paddingVertical: hp(2),
  },
  headerNoRowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  orderNoView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderNo: {
    color: colors.black,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(12),
  },
  textView: {
    marginLeft: wp(3),
  },
  invoiceNo: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(16),
  },
  download: {
    width: isiPAD ? wp(5) : wp(7),
    height:isiPAD ? wp(5) : wp(7),
    resizeMode: 'contain',
  },
  orderInfoRowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp(65),
    marginTop: hp(2),
    marginHorizontal: wp(3),
  },
  orderinfoText: {
    color: colors.black,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(11),
  },
  orderInfoDes: {
    color: colors.black,
    fontFamily: FontPath.OutfitMedium,
    fontSize: RFValue(11),
    marginTop: hp(0.3),
  },
});
