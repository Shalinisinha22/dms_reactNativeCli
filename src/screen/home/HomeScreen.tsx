import {
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import SafeAreaContainer from "../../components/common/SafeAreaContainer";
import { colors } from "../../utils/Colors";
import { FontPath } from "../../utils/FontPath";
import { hp, RFValue, wp } from "../../helper/Responsive";
import { IconsPath } from "../../utils/IconPath";
import TotalOrderCard from "../../components/dashboard/TotalOrderCard";
import RunningSchemeCard from "../../components/dashboard/RunningSchemeCard";
import {
  NavigationProp,
  ParamListBase,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { RouteString } from "../../navigation/RouteString";
import BarChartView from "../../components/dashboard/BarChartView";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../redux/Store";
import { UserType } from "../../interfaces/Types";
import DistributorOrderCard from "../../components/dashboard/DistributorOrderCard";
import OrderCard from "../../components/common/OrderCard";
import {
  asoMoreOption,
  masonAndEngineerMoreOption,
  orderMoreOption,
  orderStatusOption,
} from "../../utils/JsonData";
import DashboardActionCard from "../../components/dashboard/DashboardActionCard";
import TotalReferallDashboardCard from "../../components/dashboard/TotalReferallDashboardCard";
import {
  useAprroveOrders,
  useMyOrders,
  useMySales,
  useMySchemes,
  useMyStats,
} from "../../api/query/DashboardService";
import moment from "moment";
import RejectOrderModal from "../../components/modal/RejectOrderModal";
import DotView from "../../components/common/DotView";
import Toast from "react-native-toast-message";

const HomeScreen = () => {
  const { t } = useTranslation();
  const { portal } = useAppSelector((state) => state.auth);
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const { mutateAsync: getMyOrders } = useMyOrders();
  const stats = useMyStats();
  const schemes = useMySchemes();
  const sales = useMySales();
  const { mutateAsync: aprroveOrders } = useAprroveOrders();

  const isFoused = useIsFocused();
  const [distributorOrderList, setDistributorOrderList] = useState([]);
  const [asoOrderList, setAsoOrderList] = useState([]);
  const [dealerOrderList, setDealerOrderList] = useState([]);
  const [isRejectOpenModal, setIsRejectOpenModal] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isFoused) {
      stats.isFetchedAfterMount;
      handleGetorderList();
    }
  }, [isFoused]);

  const handleGetorderList = async () => {
    try {
      const res = await getMyOrders({
        startDate: moment().format("YYYY-MM-DD"),
        endDate: moment().format("YYYY-MM-DD"),
      });
      if (res) {
        if (portal === UserType.DISTRIBUTOR) {
          const filterData = res.filter(
            (item: { status: { by_distributor: string } }) =>
              item?.status?.by_distributor === "pending"
          );
          setDistributorOrderList(filterData);
        } else if (portal === UserType.DEALER) {
          setDealerOrderList(res);
        } else if (portal === UserType.ASO) {
          const filterData = res.filter(
            (item: { status: { by_aso: string; by_distributor: string } }) =>
              item?.status?.by_aso === "pending" &&
              item?.status?.by_distributor === "approved"
          );
          setAsoOrderList(filterData);
        }
      }
    } catch (error) {
      console.log("handleGetorderList", error);
    }
  };

  const handleApproveOrder = async (id: string) => {
    try {
      const res = await aprroveOrders({ orderId: id, status: "approved" });
      if (res) {
        Toast.show({
          type: "success",
          text1: res.message,
        });
        handleGetorderList();
        stats.isFetchedAfterMount;
      }
    } catch (error) {
      console.log("handleApproveOrder", error);
    }
  };

  const handleRejectOrder = (id: string) => {
    setOrderId(id);
    setIsRejectOpenModal(true);
  };

  const handleScroll = (event: {
    nativeEvent: { contentOffset: { x: any } };
  }) => {
    const screenWidth = Dimensions.get("window").width;
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / screenWidth);
    setCurrentIndex(index);
  };

  return (
    <SafeAreaContainer>
      <View style={styles.headerRowView}>
        <Text style={styles.title}>{t("dashboard.dashboard")}</Text>
        {portal === UserType.DEALER && (
          <Pressable
            onPress={() => navigation.navigate(RouteString.OrderHistory)}
          >
            <Text style={styles.sellAll}>{t("dashboard.seeAllOrder")}</Text>
          </Pressable>
        )}
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: hp(2) }}
      >
        {(portal === UserType.ENGINEER || portal === UserType.MASON) && (
          <>
            <TotalReferallDashboardCard item={stats.data} />
            <DashboardActionCard data={masonAndEngineerMoreOption} />
          </>
        )}
        {portal === UserType.DEALER && (
          <View style={{ marginBottom: hp(2) }}>
            <FlatList
              data={dealerOrderList.slice(0, 5)}
              horizontal
              pagingEnabled
              onScroll={handleScroll}
              showsHorizontalScrollIndicator={false}
              snapToAlignment="center"
              decelerationRate="fast"
              renderItem={({ item, index }) => (
                <View style={{ width: wp(100) }}>
                  <OrderCard key={index} item={item} isShowButton={false} />
                </View>
              )}
            />
            {dealerOrderList.slice(0, 5).length > 1 && (
              <DotView data={dealerOrderList} currentPage={currentIndex} />
            )}
          </View>
        )}
        {portal === UserType.DEALER && (
          <DashboardActionCard data={orderStatusOption} />
        )}
        {(portal === UserType.DEALER ||
          portal === UserType.ASO ||
          portal === UserType.DISTRIBUTOR) && (
          <View style={styles.orderHistoryView}>
            <Text style={styles.orderHistory}>
              {portal === UserType.DEALER
                ? t("dashboard.orderHistory")
                : portal === UserType.ASO
                ? t("dashboard.totalSalesVolume")
                : t("dashboard.salesVolume")}
            </Text>
            {sales.data && <BarChartView data={sales.data} />}
          </View>
        )}
        {portal === UserType.DISTRIBUTOR && (
          <View>
            <View style={styles.pendingRowView}>
              <Text style={styles.sellAll}>
                {t("dashboard.pendingOrder")}({distributorOrderList.length})
              </Text>
              <Pressable
                onPress={() =>
                  navigation.navigate(RouteString.PlaceOrderScreen, { type : ''})
                }
              >
                <Text style={styles.sellAll}>{t("dashboard.viewAll")}</Text>
              </Pressable>
            </View>
            <FlatList
              data={distributorOrderList}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              snapToAlignment="center"
              onScroll={handleScroll}
              decelerationRate="fast"
              renderItem={({ item, index }: any) => (
                <View style={{ width: wp(100) }}>
                  <DistributorOrderCard
                    key={index}
                    item={item}
                    approveOnPress={() => handleApproveOrder(item.id)}
                    rejectOnPress={() => handleRejectOrder(item.id)}
                  />
                </View>
              )}
            />
            {distributorOrderList.slice(0, 5).length > 1 && (
              <DotView
                data={distributorOrderList}
                currentPage={currentIndex}
                dotViewStyle={{ marginBottom: hp(2) }}
              />
            )}
            <DashboardActionCard data={orderMoreOption} />
          </View>
        )}
        {portal === UserType.ASO && (
          <>
            <DashboardActionCard data={asoMoreOption} />
            <View style={styles.pendingRowView}>
              <Text style={styles.sellAll}>
                {t("dashboard.pendingOrder")}({asoOrderList.length})
              </Text>
              <Pressable
                onPress={() =>
                  navigation.navigate(RouteString.PlaceOrderScreen)
                }
              >
                <Text style={styles.sellAll}>{t("dashboard.viewAll")}</Text>
              </Pressable>
            </View>
            <FlatList
              data={asoOrderList}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              snapToAlignment="center"
              decelerationRate="fast"
              renderItem={({ item, index }: any) => (
                <View style={{ width: wp(100) }}>
                  <DistributorOrderCard
                    key={index}
                    item={item}
                    approveOnPress={() => handleApproveOrder(item.id)}
                    rejectOnPress={() => handleRejectOrder(item.id)}
                  />
                </View>
              )}
            />
            {asoOrderList.slice(0, 5).length > 1 && (
              <DotView
                data={asoOrderList}
                currentPage={currentIndex}
                dotViewStyle={{ marginBottom: hp(2) }}
              />
            )}
          </>
        )}
        {(portal === UserType.DEALER ||
          portal === UserType.ASO ||
          portal === UserType.DISTRIBUTOR) && (
          <>
            <TotalOrderCard
            onPress={() => {
              if(portal === UserType.DEALER) {
              navigation.navigate(RouteString.OrderHistory, {
                screen: RouteString.OrderHistoryScreen,
                params: { type : 'orderHistory.all' },
              })
            } else {
              navigation.navigate(RouteString.BottomTabNavigator, {
                screen: RouteString.PlaceOrderScreen,
                params: { type :'orderHistory.pending' },
              })
            }
            }}
              source={
                portal === UserType.DEALER
                  ? IconsPath.orderStatus
                  : IconsPath.payment
              }
              title={
                portal === UserType.DEALER
                  ? t("dashboard.totalOrderPlaced")
                  : t("dashboard.outstandingPayment")
              }
              total={
                portal === UserType.DEALER
                  ? stats?.data?.rejected + stats?.data?.dispatched
                  : stats.data?.pending
              }
            />
            <TotalOrderCard
            onPress={() => {
              if(portal === UserType.DEALER) {
                navigation.navigate(RouteString.OrderHistory, {
                  screen: RouteString.OrderHistoryScreen,
                  params: { type : 'orderHistory.dispatched' },
                })
              } else {
                navigation.navigate(RouteString.BottomTabNavigator, {
                  screen: RouteString.PlaceOrderScreen,
                  params: { type : 'orderHistory.approved' },
                })
              }
            
            }}
              source={
                portal === UserType.DEALER
                  ? IconsPath.dispatched
                  : IconsPath.orderHistiryWhite
              }
              title={
                portal === UserType.DEALER
                  ? t("dashboard.totalOrderDispatched")
                  : t("dashboard.orderApproved")
              }
              total={
                portal === UserType.DEALER
                  ? stats?.data?.dispatched
                  : stats.data?.approved
              }
            />
            <TotalOrderCard
             onPress={() => {
              if(portal === UserType.DEALER) {
                navigation.navigate(RouteString.OrderHistory, {
                  screen: RouteString.OrderHistoryScreen,
                  params: { type : 'orderHistory.rejected' },
                })
              } else {
                navigation.navigate(RouteString.BottomTabNavigator, {
                  screen: RouteString.PlaceOrderScreen,
                  params: { type : 'orderHistory.rejected' },
                })
              }
             
            }}
              source={
                portal === UserType.DEALER
                  ? IconsPath.dispatched
                  : IconsPath.orderHistiryWhite
              }
              title={
                portal === UserType.DEALER
                  ? t("dashboard.totalOrderRejected")
                  : t("dashboard.orderRejected")
              }
              total={
                portal === UserType.DEALER
                  ? stats?.data?.rejected
                  : stats.data?.rejected
              }
            />
          </>
        )}
        {(portal === UserType.DEALER ||
          portal === UserType.ENGINEER ||
          portal === UserType.MASON) && (
          <RunningSchemeCard data={schemes.data} />
        )}
      </ScrollView>
      <RejectOrderModal
        isVisible={isRejectOpenModal}
        id={orderId}
        backOnPress={() => setIsRejectOpenModal(false)}
        isRefresh={() => {
          handleGetorderList();
          stats.isFetchedAfterMount;
        }}
      />
    </SafeAreaContainer>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  title: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(20),
    lineHeight: hp(4),
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
    lineHeight: hp(3),
  },
  headerRowView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: wp(5),
    marginTop: hp(2.5),
  },
  pendingRowView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: wp(5),
    marginBottom: hp(1.5),
  },
  sellAll: {
    color: colors.primary,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(14),
    lineHeight: hp(4),
  },
});
