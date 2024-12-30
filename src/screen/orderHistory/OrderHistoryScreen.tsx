import {
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
import { orderFilter } from "../../utils/commonFunctions";
import Toast from "react-native-toast-message";
import { ParamsType } from "../../navigation/ParamsType";

const OrderHistoryScreen = () => {
  const { t } = useTranslation();
  const { portal } = useAppSelector((state) => state.auth);
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const routes = useRoute<RouteProp<ParamsType, "OrderHistoryScreen">>();
  const [isRejectOpenModal, setIsRejectOpenModal] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isPerviousOrderModal, setIsPerviousOrderModal] = useState(false);
  const [isStartDate, setStartDate] = useState("");
  const [isEndDate, setEndDate] = useState("");
  const [isSelectType, setSelectType] = useState("All");
  const { mutateAsync: getMyOrders } = useMyOrders();
  const [orderList, setOrderList] = useState([]);
  const [orderListFilter, setOrderListFilter] = useState([]);
  const isFoused = useIsFocused();
  const { mutateAsync: aprroveOrders } = useAprroveOrders();
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    if(routes.params?.type === undefined){
      setSelectType('All')
      handleGetOrderList();
    }
  }, [isStartDate, isEndDate, isFoused]);

  useEffect(() => {
    setOrderList([])
    handleFilter()
    const datafilter: any = orderFilter(isSelectType, orderListFilter);
    if (datafilter?.length === 0 && isSelectType === "orderHistory.all") {
      handleGetOrderList();
    } else {
      setOrderList(datafilter);
    }
  }, [isSelectType]);

  const handleFilter = async() => {
    const res = await getMyOrders({
      startDate: isStartDate ? moment(isStartDate).format("YYYY-MM-DD") : "",
      endDate: isEndDate ? moment(isEndDate).format("YYYY-MM-DD") : "",
    });
    if(res){
      setOrderListFilter(res?.reverse());
    }
  }

  const handleGetOrderList = async () => {
    try {
      const res = await getMyOrders({
        startDate: isStartDate ? moment(isStartDate).format("YYYY-MM-DD") : "",
        endDate: isEndDate ? moment(isEndDate).format("YYYY-MM-DD") : "",
      });
      if (res) {
        setOrderList(res);
        setOrderListFilter(res?.reverse());
      }
    } catch (error) {
      console.log("handleGetOrderList", error);
    }
  };

  const title =
    portal === UserType.DEALER
      ? t("drawer.orderHistory")
      : (portal === UserType.DISTRIBUTOR || portal === UserType.ASO) &&
        t("drawer.orderList");

  const handleOrderModifiedOnPress = () => {
    navigation.navigate(RouteString.OrderPlacementScreen);
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
          renderItem={({ item, index }) => (
            <OrderCard
              key={index}
              item={item}
              isShowButton={true}
              orderModifiedOnPress={handleOrderModifiedOnPress}
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
});
