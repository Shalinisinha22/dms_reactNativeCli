import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SafeAreaContainer from '../../components/common/SafeAreaContainer';
import TopHeader from '../../components/common/TopHeader';
import {colors} from '../../utils/Colors';
import {FontPath} from '../../utils/FontPath';
import {hp, RFValue, wp} from '../../helper/Responsive';
import DashboardCard from '../../components/dashboard/DashboardCard';
import {IconsPath} from '../../utils/IconPath';
import TotalOrderCard from '../../components/dashboard/TotalOrderCard';
import RunningSchemeCard from '../../components/dashboard/RunningSchemeCard';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {RouteString} from '../../navigation/RouteString';
import BarChartView from '../../components/dashboard/BarChartView';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '../../redux/Store';
import {UserType} from '../../interfaces/Types';
import DistributorOrderCard from '../../components/dashboard/DistributorOrderCard';
import OrderCard from '../../components/common/OrderCard';

const HomeScreen = () => {
  const {t} = useTranslation();
  const {portal} = useAppSelector(state => state.auth);
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  return (
    <SafeAreaContainer>
      <View style={styles.headerRowView}>
        <Text style={styles.title}>{t('dashboard.dashboard')}</Text>
        {portal === UserType.DEALER && (
          <Pressable
            onPress={() => navigation.navigate(RouteString.OrderHistory)}>
            <Text style={styles.sellAll}>{t('dashboard.seeAllOrder')}</Text>
          </Pressable>
        )}
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {portal === UserType.DEALER && (
          <>
            {[1, 2].map((item, index) => {
              return <OrderCard isShowButton={false} />;
            })}
          </>
        )}
        <View style={styles.orderHistoryView}>
          <Text style={styles.orderHistory}>
            {portal === UserType.DEALER
              ? t('dashboard.orderHistory')
              : t('dashboard.salesVolume')}
          </Text>
          <BarChartView />
        </View>
        {portal === UserType.DISTRIBUTOR && (
          <View>
            <View style={styles.pendingRowView}>
              <Text style={styles.sellAll}>
                {t('dashboard.pendingOrder')}(4)
              </Text>
              <Pressable>
                <Text style={styles.sellAll}>{t('dashboard.viewAll')}</Text>
              </Pressable>
            </View>
            <DistributorOrderCard />
          </View>
        )}
        <TotalOrderCard
          source={
            portal === UserType.DEALER
              ? IconsPath.orderStatus
              : IconsPath.payment
          }
          title={
            portal === UserType.DEALER
              ? t('dashboard.totalOrderPlaced')
              : t('dashboard.outstandingPayment')
          }
          total={portal === UserType.DEALER ? '350' : 'Rs. 12,90,000'}
        />
        <TotalOrderCard
          source={
            portal === UserType.DEALER
              ? IconsPath.dispatched
              : IconsPath.orderHistiryWhite
          }
          title={
            portal === UserType.DEALER
              ? t('dashboard.totalOrderDispatched')
              : t('dashboard.orderApproved')
          }
          total={portal === UserType.DEALER ? '25' : '100'}
        />
        <TotalOrderCard
          source={
            portal === UserType.DEALER
              ? IconsPath.dispatched
              : IconsPath.orderHistiryWhite
          }
          title={
            portal === UserType.DEALER
              ? t('dashboard.totalOutstandingPayment')
              : t('dashboard.orderRejected')
          }
          total={portal === UserType.DEALER ? 'Rs. 12,90,000' : '25'}
        />
        {portal === UserType.DEALER && <RunningSchemeCard />}
      </ScrollView>
    </SafeAreaContainer>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  title: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(20),
    lineHeight:hp(4)
  },
  orderHistoryView: {
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10.65,
    elevation: 8,
    borderRadius: 8,
    marginHorizontal: wp(5),
    height: hp(35),
    marginBottom: hp(2),
  },
  orderHistory: {
    color: colors.black,
    fontFamily: FontPath.OutfitMedium,
    fontSize: RFValue(18),
    paddingHorizontal: wp(5),
    marginTop: hp(2),
    marginBottom: hp(1),
  },
  headerRowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: wp(5),
    marginVertical: hp(2.5),
  },
  pendingRowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: wp(5),
    marginBottom: hp(1.5),
  },
  sellAll: {
    color: colors.primary,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(14),
    lineHeight:hp(4)
  },
});
