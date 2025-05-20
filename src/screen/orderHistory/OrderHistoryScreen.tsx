import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import SafeAreaContainer from "../../components/common/SafeAreaContainer";
import { FontPath } from "../../utils/FontPath";
import { colors } from "../../utils/Colors";
import { hp, RFValue, wp } from "../../helper/Responsive";
import { IconsPath } from "../../utils/IconPath";
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import OrderCard from "../../components/common/OrderCard";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../redux/Store";
import { UserType } from "../../interfaces/Types";
import DistributorOrderWithProgressCard from "../../components/dashboard/DistributorOrderWithProgressCard";
import RejectOrderModal from "../../components/modal/RejectOrderModal";
import FilterStatueType from "../../components/common/FilterStatueType";
import { commonStyle } from "../../utils/commonStyles";
import FilterModal from "../../components/modal/FilterModal";
import { RouteString } from "../../navigation/RouteString";
import PerviousOrderModal from "../../components/modal/PerviousOrderModal";
import {
  useAprroveOrders,
  useMyOrders,
} from "../../api/query/DashboardService";
import moment from "moment";
import Toast from "react-native-toast-message";
import { ParamsType } from "../../navigation/ParamsType";

const OrderHistoryScreen = () => {
  const { t } = useTranslation();
  const { portal } = useAppSelector((state) => state.auth);

  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const routes = useRoute<RouteProp<ParamsType, "OrderHistoryScreen">>();
  const isFoused = useIsFocused();

  const [isRejectOpenModal, setIsRejectOpenModal] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isPerviousOrderModal, setIsPerviousOrderModal] = useState(false);
  const [isStartDate, setStartDate] = useState("");
  const [isEndDate, setEndDate] = useState("");
  const [isSelectType, setSelectType] = useState("orderHistory.all");
  const [orderList, setOrderList] = useState<any>([]);
  const [orderId, setOrderId] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [nextPage, setNextPage] = useState<any>(null);
  const [curPage, setCurPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);

  const { mutateAsync: aprroveOrders } = useAprroveOrders();
  const { mutateAsync: getMyOrders } = useMyOrders();

  useEffect(() => {
    if (routes.params?.type === undefined) {
      setSelectType("orderHistory.all");
      handleGetOrderList();
      setCurPage(1);
      setTotalPage(0);
      setNextPage(null);
    }
  }, [isStartDate, isEndDate]);

  useEffect(() => {
    if (isFoused && portal) {
      setSelectType(
        routes.params?.type ? "orderHistory.pending" : "orderHistory.all"
      );
      setCurPage(1);
      setTotalPage(0);
      setNextPage(null);
      handleGetOrderList();
    }
  }, [isFoused]);

  useEffect(() => {
    if(isSelectType && portal){
      handleGetOrderList();
    }
  }, [isSelectType]);

  const handleGetOrderList = async () => {
    try {
      const res = await getMyOrders({
        startDate: isStartDate ? moment(isStartDate).format("YYYY-MM-DD") : "",
        endDate: isEndDate ? moment(isEndDate).format("YYYY-MM-DD") : "",
        page: curPage,
        status:
          isSelectType === "orderHistory.all"
            ? ""
            : isSelectType === "orderHistory.approved"
            ? "approved"
            : isSelectType === "orderHistory.rejected"
            ? "rejected"
            : isSelectType === "orderHistory.dispatched"
            ? "dispatched"
            : "pending",
      });
      if (nextPage >= curPage && nextPage != null) {
        setIsFetching(true);
      }
      if (res?.data) {
        console.log(res.totalPage,res.nextPage, res.data.length,"116")
        setOrderList((prevData: any) =>
          curPage === 1 ? res?.data : [...prevData, ...res?.data]
        );
        if (res?.hasMore) {
          setTotalPage(res.totalPage);
          setNextPage(res.nextPage);
        }
      }
      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
      console.log("handleGetOrderList", error);
    }
  };

  const title =
    portal === UserType.DEALER
      ? t("drawer.orderHistory")
      : (portal === UserType.DISTRIBUTOR || portal === UserType.ASO) &&
        t("drawer.orderList");

  const handleOrderModifiedOnPress = (item: any) => {
    navigation.navigate(RouteString.OrderPlacementScreen, { item: item });
  };

  const perviouseOnPress = () => {
    setIsPerviousOrderModal(true);
  };

  const handleApproveOrder = async (id: string) => {
    try {
      const res = await aprroveOrders({ orderId: id, status: "approved" });
      if (res) {
        Toast.show({
          type: "success",
          text1: res.message,
        });
        setSelectType("orderHistory.all");
        setOrderList([]);
        setCurPage(1);
        setTotalPage(0);
        setNextPage(null);
        handleGetOrderList();
      }
    } catch (error) {
      console.log("handleApproveOrder", error);
    }
  };

  const handleRejectOrder = (id: string) => {
    setOrderId(id);
    setIsRejectOpenModal(true);
  };

  const onEndReached = () => {
    if (nextPage <= totalPage && nextPage != null) {
      setCurPage(curPage + 1);
      handleGetOrderList();
    }
  };

  const ListFooterComponent = () => {
    return isFetching ? (
      <ActivityIndicator size="small" color={colors.primary} />
    ) : null;
  };

  return (
    <SafeAreaContainer>
      <View style={styles.headerRowView}>
        <Text style={styles.title}>{title}</Text>
        <Pressable
          style={commonStyle.filterButton}
          onPress={() => setIsFilterOpen(true)}
        >
          <Image source={IconsPath.filter} style={commonStyle.filter} />
        </Pressable>
      </View>
      <FilterStatueType
        type={routes.params?.type ? routes.params?.type : isSelectType}
        selectedId={(id) => setSelectType(id)}
      />
      {portal === UserType.DEALER && (
        <FlatList
          data={orderList}
          removeClippedSubviews={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: hp(2) }}
          onEndReached={onEndReached}
          keyExtractor={(item, index) => `${item.id}_${index}`}
          onEndReachedThreshold={0.5}
          ListFooterComponent={ListFooterComponent}
          ListEmptyComponent={() => (
            <Text style={styles.noOrder}>
              {t("orderHistory.noOrderavailable")}
            </Text>
          )}
          renderItem={({ item, index }) => (
            <OrderCard
              key={index}
              item={item}
              isShowButton={true}
              orderModifiedOnPress={() => handleOrderModifiedOnPress(item)}
              perviouseOnPress={perviouseOnPress}
            />
          )}
        />
      )}
      {(portal === UserType.DISTRIBUTOR || portal === UserType.ASO) && (
        <FlatList
          data={orderList}
          removeClippedSubviews={false}
          showsVerticalScrollIndicator={false}
          onEndReached={onEndReached}
          keyExtractor={(item, index) => `${item.id}_${index}`}
          onEndReachedThreshold={0.5}
          ListFooterComponent={ListFooterComponent}
          ListEmptyComponent={() => (
            <Text style={styles.noOrder}>
              {t("orderHistory.noOrderavailable")}
            </Text>
          )}
          contentContainerStyle={{ paddingTop: hp(2) }}
          renderItem={({ item, index }: any) => (
            <DistributorOrderWithProgressCard
              item={item}
              key={index}
              approveOnPress={() => handleApproveOrder(item.id)}
              rejectOnPress={() => handleRejectOrder(item.id)}
            />
          )}
        />
      )}
      <RejectOrderModal
        isVisible={isRejectOpenModal}
        backOnPress={() => setIsRejectOpenModal(false)}
        id={orderId}
        isRefresh={() => {
          handleGetOrderList();
        }}
      />
      <FilterModal
        isVisible={isFilterOpen}
        isStartDate={isStartDate}
        isEndDate={isEndDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        backOnPress={() => setIsFilterOpen(!isFilterOpen)}
      />
      <PerviousOrderModal
        isVisible={isPerviousOrderModal}
        backOnPress={() => setIsPerviousOrderModal(!isPerviousOrderModal)}
      />
    </SafeAreaContainer>
  );
};

export default OrderHistoryScreen;

const styles = StyleSheet.create({
  title: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(20),
    lineHeight: hp(4),
  },
  headerRowView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: wp(5),
    marginTop: hp(2.5),
  },
  noOrder: {
    color: colors.black,
    textAlign: "center",
    fontFamily: FontPath.OutfitMedium,
  },
});