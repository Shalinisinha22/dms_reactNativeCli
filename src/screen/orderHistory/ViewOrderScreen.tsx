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
import { IconsPath } from "../../utils/IconPath";
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { hp, RFValue, wp } from "../../helper/Responsive";
import { colors } from "../../utils/Colors";
import { FontPath } from "../../utils/FontPath";
import OrderTracking from "../../components/common/OrderTracking";
import { useTranslation } from "react-i18next";
import ApproveButton from "../../components/common/ApproveButton";
import RejectButton from "../../components/common/RejectButton";
import { useAppSelector } from "../../redux/Store";
import { UserType } from "../../interfaces/Types";
import RejectOrderModal from "../../components/modal/RejectOrderModal";
import {
  useAprroveOrders,
  useGetOrdersDetails,
} from "../../api/query/DashboardService";
import { ParamsType } from "../../navigation/ParamsType";
import moment from "moment";
import { useGetProductList } from "../../api/query/OrderPlacementService";
import Toast from "react-native-toast-message";
import { abbreviateNumber } from "../../utils/commonFunctions";

const ViewOrderScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { portal } = useAppSelector((state) => state.auth);
  const [isRejectOpenModal, setIsRejectOpenModal] = useState(false);
  const { mutateAsync: getOrderDetails, data } = useGetOrdersDetails();
  const routes = useRoute<RouteProp<ParamsType, "ViewOrderScreen">>();
  const { mutateAsync: aprroveOrders } = useAprroveOrders();
  const productList = useGetProductList();

  useEffect(() => {
    if (routes.params.id) {
      getOrderDetails({ orderId: routes.params.id });
    }
  }, [routes.params.id]);

  const totalQty = data?.products.reduce((acc: number, item: any) => {
    return  acc != 0 ? Number(acc) + Number(item.quantity) : Number(item.quantity)
  }, 0);

  const totalAmount = data?.products.reduce((acc: number, item: any) => {
    return Number(acc) + Number(item.amount);
}, 0);
  
  const isAllApprove =
    data?.status?.by_distributor === "approved" ||
    data?.status?.by_distributor === "declined";

  const handleApproveOrder = async () => {
    try {
      const res = await aprroveOrders({
        orderId: routes.params.id,
        status: "approved",
      });
      if (res) {
        Toast.show({
          type: "success",
          text1: res.message,
        });
        navigation.goBack();
      }
    } catch (error) {
      console.log("handleApproveOrder", error);
    }
  };

  const handleRejectOrder = () => {
    setIsRejectOpenModal(true);
  };

  const combinedResult = data?.products?.map((product: { productId: any }) => {
    const matchingDetail = productList.data?.data?.find(
      (detail: { id: any }) => detail.id === product.productId
    );
    return {
      ...product,
      name: matchingDetail ? matchingDetail.name : "",
    };
  });

  return (
    <SafeAreaContainer>
      <View style={styles.backRowView}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image source={IconsPath.backArrow} style={styles.backIcons} />
        </Pressable>
        <Text style={styles.viewOrder}>{t("viewOrder.viewOrder")}</Text>
      </View>
      <View style={styles.orderInfoRowView}>
        <View>
          <Text style={[styles.orderinfoText, { color: colors.primary }]}>
            {t("viewOrder.orderDate")}
          </Text>
          <Text style={[styles.orderInfoDes, { color: colors.primary }]}>
            {moment(data?.orderDate).format("DD MMM YYYY")}
          </Text>
        </View>
        {data?.dispatchDate && (
          <View>
            <Text style={[styles.orderinfoText, { color: colors.green }]}>
              {t("viewOrder.dispatchDate")}
            </Text>
            <Text style={[styles.orderInfoDes, { color: colors.green }]}>
              {moment(data?.dispatchDate).format("DD MMM YYYY")}
            </Text>
          </View>
        )}
        <View>
          <Text style={styles.orderinfoText}>{t("viewOrder.totalWeight")}</Text>
          <Text style={styles.orderInfoDes}>{totalQty} MT</Text>
        </View>
        <View>
          <Text style={styles.orderinfoText}>{t("viewOrder.totalAmount")}</Text>
          <Text style={styles.orderInfoDes}>Rs.{abbreviateNumber(Number(totalAmount || 0).toFixed(2))}</Text>
        </View>
      </View>
      <View style={styles.headerView}>
        <Text style={styles.headerTitle1}>#</Text>
        <Text style={styles.headerTitle2}>
          {t("confirmOrder.productDecription")}
        </Text>
        <Text style={styles.headerTitle3}>MT</Text>
        <Text style={styles.headerTitle4}>{t("confirmOrder.amount")} (₹)</Text>
      </View>
      <View>
        <FlatList
          data={combinedResult}
          removeClippedSubviews={false}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.itemView}>
                <Text style={styles.itemText1}>{index + 1}</Text>
                <Text style={styles.itemText2}>{item.name}</Text>
                <Text style={styles.itemText3}>{item.quantity}</Text>
                <Text style={styles.itemText4}>
                  {abbreviateNumber(Number(item.amount))}
                </Text>
              </View>
            );
          }}
        />
      </View>
      <View style={styles.totalView}>
        {/* <View style={styles.totalRowView}>
          <Text style={styles.total}>{t("confirmOrder.subTotal")} : </Text>
          <Text style={styles.amount}> ₹{totalAmount}</Text>
        </View> */}
        {/* <View style={styles.totalRowView}>
          <Text style={styles.total}>GST @18% : </Text>
          <Text style={styles.amount}>
            {" "}
            ₹{totalAmount}
          </Text>
        </View> */}
        <View style={styles.totalRowView}>
          <Text style={[styles.total, { fontFamily: FontPath.OutfitBold }]}>
            {t("confirmOrder.total")} :{" "}
          </Text>
          <Text style={[styles.amount, { fontFamily: FontPath.OutfitBold }]}>
            {" "}
            ₹{abbreviateNumber(Number(totalAmount || 0).toFixed(2))}
          </Text>
        </View>
      </View>
      <OrderTracking
        selectedStep={1}
        containerStyle={{ marginTop: hp(4) }}
        isCheckIcons={true}
        admin={
          data?.status?.by_admin === "approved" ||
          data?.status?.by_admin === "dispatched"
            ? true
            : false
        }
        orderIcons={IconsPath.check}
        distributorIcons={
          data?.status?.by_distributor === "approved"
            ? IconsPath.check
            : data?.status?.by_distributor === "pending"
            ? null
            : IconsPath.whiteClose
        }
        asoIcons={
          data?.status?.by_aso === "approved"
            ? IconsPath.check
            : data?.status?.by_aso === "pending"
            ? null
            : IconsPath.whiteClose
        }
        dispatchedIcons={
          data?.status?.by_admin === "dispatched"
            ? IconsPath.check
            : data?.status?.by_admin === "declined"
            ? IconsPath.whiteClose
            : null
        }
        adminIcon={
          data?.status?.by_admin === "approved" ||
          data?.status?.by_admin === "dispatched"
            ? IconsPath.check
            : data?.status?.by_admin === "declined"
            ? IconsPath.whiteClose
            : null
        }
      />
      {portal === UserType.DISTRIBUTOR && !isAllApprove && (
        <View style={styles.rowView}>
          <ApproveButton onPress={handleApproveOrder} />
          <RejectButton onPress={handleRejectOrder} />
        </View>
      )}
      <RejectOrderModal
        isVisible={isRejectOpenModal}
        backOnPress={() => setIsRejectOpenModal(false)}
        id={routes.params.id}
        isRefresh={() => {}}
      />
    </SafeAreaContainer>
  );
};

export default ViewOrderScreen;

const styles = StyleSheet.create({
  backRowView: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: wp(3),
    marginVertical: hp(3),
  },
  backIcons: {
    width: wp(8),
    height: wp(8),
    resizeMode: "contain",
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
    lineHeight:hp(2)
  },
  orderInfoDes: {
    color: colors.black,
    fontFamily: FontPath.OutfitMedium,
    fontSize: RFValue(11),
    marginTop: hp(0.3),
  },
  orderInfoRowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: hp(2),
    marginHorizontal: wp(5),
  },
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: wp(5),
    backgroundColor: colors.drarkGray_1,
    height: hp(4),
    alignItems: "center",
    paddingHorizontal: wp(5),
    borderRadius: 3,
  },
  itemText1: {
    color: colors.black,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(12),
    width: wp(3),
  },
  itemText2: {
    color: colors.black,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(12),
    width: wp(25),
  },
  itemText3: {
    color: colors.black,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(12),
    width: wp(20),
    textAlign: "center",
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
    width: wp(3),
  },
  headerTitle2: {
    color: colors.white,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(12),
    width: wp(25),
  },
  headerTitle3: {
    color: colors.white,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(12),
    width: wp(21),
    textAlign: "center",
  },
  headerTitle4: {
    color: colors.white,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(12),
    width: wp(21),
  },
  itemView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: wp(5),
    paddingHorizontal: wp(5),
    paddingVertical: hp(1),
    borderWidth: 1,
    marginTop: hp(1),
    borderRadius: 3,
    borderColor: colors.black_100,
  },
  totalView: {
    alignSelf: "flex-end",
    marginHorizontal: wp(5),
    marginTop: hp(2),
  },
  totalRowView: {
    flexDirection: "row",
    marginTop: hp(0.3),
    alignItems: "center",
  },
  total: {
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(12),
    color: colors.black,
    width: wp(25),
    textAlign: "right",
  },
  amount: {
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(12),
    color: colors.black,
  },
  rowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: wp(50),
    alignSelf: "center",
    marginTop: hp(10),
  },
});
