import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SafeAreaContainer from '../../components/common/SafeAreaContainer';
import {IconsPath} from '../../utils/IconPath';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {hp, RFValue, wp} from '../../helper/Responsive';
import {colors} from '../../utils/Colors';
import {FontPath} from '../../utils/FontPath';
import OrderTracking from '../../components/common/OrderTracking';
import { useTranslation } from 'react-i18next';

const data = [
  {
    id: '1',
    description: 'MS Rod TMT Bar 8mm MRP: 20000',
    weight: '12 MT',
    amount: '2,000.00',
  },
  {
    id: '2',
    description: 'MS Rod TMT Bar 8mm MRP: 20000',
    weight: '12 MT',
    amount: '2,000.00',
  },
  {
    id: '3',
    description: 'MS Rod TMT Bar 8mm MRP: 20000',
    weight: '12 MT',
    amount: '2,000.00',
  },
];

const ViewOrderScreen = () => {
  const {t} = useTranslation();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  return (
    <SafeAreaContainer>
      <View style={styles.backRowView}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image source={IconsPath.backArrow} style={styles.backIcons} />
        </Pressable>
        <Text style={styles.viewOrder}>{t('viewOrder.viewOrder')}</Text>
      </View>
      <View style={styles.orderInfoRowView}>
        <View>
          <Text style={[styles.orderinfoText, {color: colors.primary}]}>
          {t('viewOrder.orderDate')}
          </Text>
          <Text style={[styles.orderInfoDes, {color: colors.primary}]}>
            12 Sept 2024
          </Text>
        </View>
        <View>
          <Text style={[styles.orderinfoText, {color: colors.green}]}>
          {t('viewOrder.dispatchDate')}
          </Text>
          <Text style={[styles.orderInfoDes, {color: colors.green}]}>
            16 Sept 2024
          </Text>
        </View>
        <View>
          <Text style={styles.orderinfoText}>{t('viewOrder.totalWeight')}</Text>
          <Text style={styles.orderInfoDes}>10 MT</Text>
        </View>
        <View>
          <Text style={styles.orderinfoText}>{t('viewOrder.totalAmount')}</Text>
          <Text style={styles.orderInfoDes}>Rs.12,0000</Text>
        </View>
      </View>
      <View style={styles.headerView}>
        <Text style={styles.headerTitle1}>#</Text>
        <Text style={styles.headerTitle2}>{t('confirmOrder.productDecription')}</Text>
        <Text style={styles.headerTitle3}>{t('confirmOrder.weight')}</Text>
        <Text style={styles.headerTitle4}>{t('confirmOrder.amount')}</Text>
      </View>
      <View>
        <FlatList
          data={data}
          renderItem={({item, index}) => {
            return (
              <View style={styles.itemView}>
                <Text style={styles.itemText1}>{item.id}</Text>
                <Text style={styles.itemText2}>{item.description}</Text>
                <Text style={styles.itemText3}>{item.weight}</Text>
                <Text style={styles.itemText4}>{item.amount}</Text>
              </View>
            );
          }}
        />
      </View>
      <View style={styles.totalView}>
        <View style={styles.totalRowView}>
          <Text style={styles.total}>{t('confirmOrder.subTotal')} : </Text>
          <Text style={styles.amount}> 4,000.00</Text>
        </View>
        <View style={styles.totalRowView}>
          <Text style={styles.total}>GST @18% : </Text>
          <Text style={styles.amount}> 720</Text>
        </View>
        <View style={styles.totalRowView}>
          <Text style={[styles.total, {fontFamily: FontPath.OutfitBold}]}>
          {t('confirmOrder.total')} :{' '}
          </Text>
          <Text style={[styles.amount, {fontFamily: FontPath.OutfitBold}]}>
            {' '}
            4,720.00
          </Text>
        </View>
      </View>
      <OrderTracking
        selectedStep={0}
        containerStyle={{marginTop: hp(4)}}
        isCheckIcons={true}
      />
    </SafeAreaContainer>
  );
};

export default ViewOrderScreen;

const styles = StyleSheet.create({
  backRowView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp(3),
    marginVertical: hp(3),
  },
  backIcons: {
    width: wp(8),
    height: wp(8),
    resizeMode: 'contain',
  },
  viewOrder: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(20),
  },
  orderinfoText: {
    color: colors.black,
    fontFamily: FontPath.OutfitBold,
    fontSize: RFValue(11),
  },
  orderInfoDes: {
    color: colors.black,
    fontFamily: FontPath.OutfitMedium,
    fontSize: RFValue(11),
    marginTop: hp(0.3),
  },
  orderInfoRowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp(2),
    marginHorizontal: wp(5),
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(5),
    backgroundColor: colors.drarkGray_1,
    height: hp(4),
    alignItems: 'center',
    paddingHorizontal: wp(5),
    borderRadius: 3,
  },
  itemText1: {
    color: colors.black,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(12),
    width: wp(10),
  },
  itemText2: {
    color: colors.black,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(12),
    width: wp(40),
  },
  itemText3: {
    color: colors.black,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(12),
    width: wp(15),
  },
  itemText4: {
    color: colors.black,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(12),
    width: wp(18),
  },
  headerTitle1: {
    color: colors.white,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(12),
    width: wp(10),
  },
  headerTitle2: {
    color: colors.white,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(12),
    width: wp(35),
  },
  headerTitle3: {
    color: colors.white,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(12),
    width: wp(15),
  },
  headerTitle4: {
    color: colors.white,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(12),
    width: wp(15),
  },
  itemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(5),
    paddingHorizontal: wp(5),
    paddingVertical: hp(1),
    borderWidth: 1,
    marginTop: hp(1),
    borderRadius: 3,
    borderColor: colors.black_100,
  },
  totalView: {
    alignSelf: 'flex-end',
    marginHorizontal: wp(5),
    marginTop: hp(2),
  },
  totalRowView: {
    flexDirection: 'row',
    marginTop: hp(0.3),
    alignItems: 'center',
  },
  total: {
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(12),
    color: colors.black,
    width: wp(25),
    textAlign: 'right',
  },
  amount: {
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(12),
    color: colors.black,
  },
});
