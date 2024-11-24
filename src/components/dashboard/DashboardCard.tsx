import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {IconsPath} from '../../utils/IconPath';
import OrderTracking from '../common/OrderTracking';
import {colors} from '../../utils/Colors';
import {hp, RFValue, wp} from '../../helper/Responsive';
import {FontPath} from '../../utils/FontPath';
import {orderStatusOption} from '../../utils/JsonData';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const DashboardCard = () => {
  const {t} = useTranslation();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [isOptionShow, setIsOptionShow] = useState(false);

  return (
    <View>
      <Pressable
        style={styles.cardView}
        onPress={() => setIsOptionShow(!isOptionShow)}>
        <View style={styles.redView}>
          <View style={styles.redInnerView}>
            <Image source={IconsPath.orderStatus} style={styles.icons} />
          </View>
        </View>
        <View style={styles.textView}>
          <Text style={styles.newOrder}>{t('dashboard.newOrderStatus')}</Text>
          <Text style={styles.orderNo}>{t('dashboard.orderNo')} : 121212</Text>
          <Text style={styles.orderStatus}>{t('dashboard.orderDate')} : 15th Oct 2024</Text>
        </View>
        <OrderTracking selectedStep={2} isCheckIcons={true} />
      </Pressable>
      {isOptionShow && (
        <View style={styles.statusUpdateView}>
          {orderStatusOption.map((item, index) => {
            return (
              <Pressable style={styles.button} key={index} onPress={() => navigation.navigate(item.routes)}>
                <Image
                  source={item.icons}
                  style={styles.edit}
                  tintColor={colors.darkGray}
                />
                <Text style={styles.buttonName}>{t(`${item.name}`)}</Text>
              </Pressable>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default DashboardCard;

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
    height: hp(23),
    marginBottom: hp(2),
  },
  redView: {
    position: 'absolute',
    height: hp(23),
    borderRadius: 8,
    overflow: 'hidden',
  },
  redInnerView: {
    width: wp(28),
    height: wp(28),
    backgroundColor: colors.primary,
    borderRadius: 60,
    left: wp(-9),
    top: hp(-4),
    paddingLeft: wp(6),
    paddingTop: hp(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  icons: {
    width: wp(8),
    height: wp(8),
    resizeMode: 'contain',
  },
  textView: {
    alignSelf: 'center',
    marginTop: hp(2.5),
    marginLeft: wp(3),
  },
  newOrder: {
    color: colors.black,
    fontSize: RFValue(16),
    fontFamily: FontPath.OutfitMedium,
  },
  orderNo: {
    color: colors.black,
    fontFamily: FontPath.OutfitMedium,
    fontSize: RFValue(12),
    marginTop: hp(1),
  },
  orderStatus: {
    color: colors.black,
    fontFamily: FontPath.OutfitMedium,
    fontSize: RFValue(12),
    marginTop: hp(0.5),
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp(5),
    marginBottom: hp(3),
  },
  buttonName: {
    fontSize: RFValue(18),
    fontFamily: FontPath.OutfitRegular,
    marginLeft: wp(3),
    color: colors.black,
  },
  edit: {
    width: wp(6),
    height: wp(6),
    resizeMode: 'cover',
  },
  statusUpdateView: {
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
    paddingTop: hp(3),
    marginBottom: hp(2),
  },
});
