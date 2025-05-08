import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import SafeAreaContainer from "../../components/common/SafeAreaContainer";
import { FontPath } from "../../utils/FontPath";
import { colors } from "../../utils/Colors";
import { hp, RFValue, wp } from "../../helper/Responsive";
import Button from "../../components/common/Button";
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { IconsPath } from "../../utils/IconPath";
import { useTranslation } from "react-i18next";
import { RouteString } from "../../navigation/RouteString";
import { ParamsType } from "../../navigation/ParamsType";
import {
  useNewOrder,
  useUpdateOrder,
} from "../../api/query/OrderPlacementService";
import { abbreviateNumber } from "../../utils/commonFunctions";

const ConfirmOrderScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const routes = useRoute<RouteProp<ParamsType, "ConfirmOrderScreen">>();
  const [isApiLoading, setIsApiLoading] = useState(false);

  const { mutateAsync: createNewOrder } = useNewOrder();
  const { mutateAsync: updateOrder } = useUpdateOrder();

  const totalAmount: any = routes.params?.order.reduce((acc: number, item: any) => {
    const weight = parseFloat(item?.value) * 0.001 || 0;
    const pricePerMt = parseFloat(item.price_per_mt) || 0;
    return Number(acc) + Number(weight) * Number(pricePerMt);
  }, 0);

  const handleCreateOrder = async () => {
    setIsApiLoading(true);
    try {
      const formattedData: any = {
        products: routes.params.order.map((item:any) => ({
          productId: item.id || item?.productId,
          quantity: (item?.value * 0.001).toFixed(2)
        })),
        distributorId: routes.params.distributorid,
      };
      const res = await createNewOrder(formattedData);
      if (res) {
        setIsApiLoading(false);
        navigation.navigate(RouteString.OrderSuccessfullyScreen);
      }
    } catch (error) {
      setIsApiLoading(false);
      console.log("handleCreateOrder", error);
    }
  };

  const handleOrderModify = async () => {
    setIsApiLoading(true);
    try {
      const formattedData: any = {
        data: {
          products: routes.params.order.map((item:any) => ({
            productId: item.id || item?.productId,
            quantity: (item?.value * 0.001).toFixed(2)
          })),
        },
        orderId: routes.params.id,
      };
      const res = await updateOrder(formattedData);
      if (res) {
        setIsApiLoading(false);
        navigation.navigate(RouteString.OrderSuccessfullyScreen);
      }
    } catch (error) {
      setIsApiLoading(false);
      console.log("handleCreateOrder", error);
    }
  };

  return (
    <SafeAreaContainer>
      <View style={styles.backRowView}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image source={IconsPath.backArrow} style={styles.backIcons} />
        </Pressable>
        <Text style={styles.title}>{t("confirmOrder.confirmOrder")}</Text>
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
          data={routes.params.order}
          removeClippedSubviews={false}
          renderItem={({ item, index }: any) => {
            return (
              <View style={styles.itemView}>
                <Text style={styles.itemText1}>{index + 1}</Text>
                <Text style={styles.itemText2}>{item.name}</Text>
                <Text style={styles.itemText3}>{Number((item.value * 0.001).toFixed(3))}</Text>
                <Text style={styles.itemText4}>
                  {abbreviateNumber(Number(item?.value * item.price_per_mt * 0.001).toFixed(2) )}
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
          <Text style={styles.amount}> ₹{(totalAmount * 18) / 100}</Text>
        </View> */}
        <View style={styles.totalRowView}>
          <Text style={[styles.total, { fontFamily: FontPath.OutfitBold }]}>
            {t("confirmOrder.total")} :{" "}
          </Text>
          <Text style={[styles.amount, { fontFamily: FontPath.OutfitBold }]}>
            {" "}
            ₹{abbreviateNumber(Number(totalAmount).toFixed(2))}
          </Text>
        </View>
      </View>
      <Button
        buttonName={t("confirmOrder.PlaceOrder")}
        isLoading={isApiLoading}
        buttonStyle={{ marginBottom: hp(4) }}
        onPress={() =>
          routes.params?.from === "OrderModify"
            ? handleOrderModify()
            : handleCreateOrder()
        }
      />
    </SafeAreaContainer>
  );
};

export default ConfirmOrderScreen;

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
  title: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(20),
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
    textAlign:'center'
  },
  headerTitle4: {
    color: colors.white,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(12),
    width: wp(21),
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
  itemText1: {
    color: colors.black,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(12),
    width: wp(4),
  },
  itemText2: {
    color: colors.black,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(12),
    width: wp(20),
  },
  itemText3: {
    color: colors.black,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(12),
    textAlign: "center",
    width: wp(18),
  },
  itemText4: {
    color: colors.black,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(12),
    width: wp(18),
  },
  totalView: {
    alignSelf: "flex-end",
    marginHorizontal: wp(5),
    marginTop: hp(2),
    flex: 1,
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
});
