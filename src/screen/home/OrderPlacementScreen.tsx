import { StyleSheet, Text } from "react-native";
import React, { useEffect, useState } from "react";
import SafeAreaContainer from "../../components/common/SafeAreaContainer";
import { colors } from "../../utils/Colors";
import { FontPath } from "../../utils/FontPath";
import { hp, RFValue, wp } from "../../helper/Responsive";
import OrderPlacementCard from "../../components/dashboard/OrderPlacementCard";
import Button from "../../components/common/Button";
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { RouteString } from "../../navigation/RouteString";
import { useTranslation } from "react-i18next";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useGetProductList } from "../../api/query/OrderPlacementService";
import { ParamsType } from "../../navigation/ParamsType";
import { abbreviateNumber } from "../../utils/commonFunctions";

const OrderPlacementScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const routes = useRoute<RouteProp<ParamsType, "OrderPlacementScreen">>();
  const productList = useGetProductList();
  const [orderItems, setOrderItems] = useState<any>([]);

  useEffect(() => {
    if (routes.params?.item?.products) {
      const combinedResult: any = routes.params?.item?.products.map(
        (product: any) => {
          const matchingDetail = productList.data?.data.find(
            (detail: { id: any }) => detail.id === product.productId
          );
          return {
            ...product,
            name: matchingDetail ? matchingDetail.name : "",
            value: product.quantity,
          };
        }
      );
      setOrderItems(combinedResult);
    }
  }, [productList.data?.data, routes.params?.item?.products]);

  // Handler to update individual values
  const handleValueChange = (index: number, newValue: string) => {
    const updatedItems = [...orderItems];
    updatedItems[index].value = newValue;
    setOrderItems(updatedItems);
  };

  // Compute total weight and amount (example logic)
  const totalWeight = orderItems?.reduce(
    (acc: any, item: any) => acc + (parseFloat(item.value) * 0.001 || 0),
    0
  );
  const totalAmount = orderItems?.reduce((acc: number, item: any) => {
    const weight = parseFloat(item.value) * 0.001 || 0;
    const pricePerMt = parseFloat(item.price_per_mt) || 0;
    return acc + weight * pricePerMt;
  }, 0);

  const handleOrderPreview = () => {
    if (orderItems.length > 0) {
      navigation.navigate(RouteString.ConfirmOrderScreen, {
        order: orderItems,
        distributorid: routes.params?.item?.distributorId,
        from: "OrderModify",
        id: routes.params?.item?.id,
      });
    }
  };

  return (
    <SafeAreaContainer>
      <Text style={styles.title}>{t("orderPlacement.orderPlacement")}</Text>
      <KeyboardAwareScrollView
        extraScrollHeight={hp(-10)} // Adjust as needed
        showsVerticalScrollIndicator={false}
      >
        {orderItems.map((item: any, index: number) => (
          <OrderPlacementCard
            key={index}
            productName={item.name}
            value={item.value}
            mt={item.price_per_mt}
            onChangeText={(text) => handleValueChange(index, text)}
          />
        ))}
        <Text style={styles.totalWeight}>
          {t("orderPlacement.totalWeight")} : {totalWeight} MT
        </Text>
        <Text style={styles.totalAmount}>
          {t("orderPlacement.totalAmount")}: Rs. {abbreviateNumber(totalAmount)}
          /-
        </Text>
        <Button
          buttonName={t("orderPlacement.orderPreview")}
          isLoading={false}
          onPress={handleOrderPreview}
          buttonStyle={styles.button}
        />
      </KeyboardAwareScrollView>
    </SafeAreaContainer>
  );
};

export default OrderPlacementScreen;

const styles = StyleSheet.create({
  title: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(20),
    marginHorizontal: wp(5),
    marginVertical: hp(2.5),
  },
  totalWeight: {
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(17),
    textAlign: "center",
    color: colors.black,
    marginTop: hp(2),
  },
  totalAmount: {
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(18),
    textAlign: "center",
    color: colors.primary,
    marginTop: hp(0.8),
  },
  button: {
    marginBottom: hp(5),
    marginTop: hp(3),
  },
});
