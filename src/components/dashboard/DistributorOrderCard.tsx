import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../utils/Colors';
import {FontPath} from '../../utils/FontPath';
import {hp, RFValue, wp} from '../../helper/Responsive';
import {useTranslation} from 'react-i18next';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import ApproveButton from '../common/ApproveButton';
import RejectButton from '../common/RejectButton';
import {orderMoreOption} from '../../utils/JsonData';
import { commonStyle } from '../../utils/commonStyles';

const DistributorOrderCard = () => {
  const {t} = useTranslation();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [isOptionShow, setIsOptionShow] = useState(false);

  return (
    <>
      <Pressable
        style={styles.cardView}
        onPress={() => setIsOptionShow(!isOptionShow)}>
        <View style={styles.headerNoRowView}>
          <View>
            <View style={styles.orderNoView}>
              <View style={commonStyle.profileView}>
                <Text style={commonStyle.userNameText}>M</Text>
              </View>
              <View style={styles.textView}>
                <Text style={styles.invoiceNo}>
                  {t('dashboard.orderNo')} : 121124
                </Text>
              </View>
            </View>
            <View style={styles.orderInfoRowView}>
              <View>
                <Text style={styles.orderinfoText}>{t('ledger.date')}</Text>
                <Text style={styles.orderInfoDes}>12 Sept 2024</Text>
              </View>
              <View>
                <Text style={styles.orderinfoText}>
                  {t('dashboard.weight')}
                </Text>
                <Text style={styles.orderInfoDes}>12000</Text>
              </View>
              <View>
                <Text style={styles.orderinfoText}>
                  {t('confirmOrder.amount')}
                </Text>
                <Text style={styles.orderInfoDes}>Rs.12,0000</Text>
              </View>
            </View>
          </View>
          <View>
            <ApproveButton onPress={() => null} />
            <RejectButton onPress={() => null} />
          </View>
        </View>
      </Pressable>
      {isOptionShow && (
        <View style={styles.statusUpdateView}>
          {orderMoreOption.map((item, index) => {
            return (
              <Pressable
                style={styles.button}
                key={index}
                onPress={() => navigation.navigate(item.routes)}>
                <Image
                  source={item.icons}
                  style={styles.icons}
                  tintColor={colors.black}
                />
                <Text style={styles.buttonName}>{t(`${item.name}`)}</Text>
              </Pressable>
            );
          })}
        </View>
      )}
    </>
  );
};

export default DistributorOrderCard;

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
    width: wp(7),
    height: wp(7),
    resizeMode: 'contain',
  },
  orderInfoRowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp(55),
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
  icons: {
    width: wp(6),
    height: wp(6),
    resizeMode: 'cover',
  },
});
