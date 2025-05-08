import { StyleSheet, Text } from "react-native";
import React, { useEffect, useState } from "react";
import SafeAreaContainer from "../../components/common/SafeAreaContainer";
import OrderPlacementCard from "../../components/dashboard/OrderPlacementCard";
import Button from "../../components/common/Button";
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { colors } from "../../utils/Colors";
import { FontPath } from "../../utils/FontPath";
import { hp, RFValue, wp } from "../../helper/Responsive";
import { RouteString } from "../../navigation/RouteString";
import { useTranslation } from "react-i18next";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  useGetDistributorList,
  useGetProductList,
} from "../../api/query/OrderPlacementService";
import { ParamsType } from "../../navigation/ParamsType";
import SearchDropDownSignalSelection from "../../components/common/SearchDropDownSignalSelection";
import { useAppSelector } from "../../redux/Store";
import { abbreviateNumber } from "../../utils/commonFunctions";
import Toast from "react-native-toast-message";

const PlaceOrderScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const routes = useRoute<RouteProp<ParamsType, "PlaceOrderScreen">>();
  const [orderItems, setOrderItems] = useState([]);
  const productList = useGetProductList();
  const distributorList = useGetDistributorList();
  const { userInfo } = useAppSelector((state) => state.auth);
  const [distributorid, setDistributorId] = useState("");
  const [distributoridError, setDistributorIdError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (userInfo?.region?.length > 0) {
      distributorList.mutateAsync({ regions: userInfo.region.toString() });
    }
  }, [userInfo?.region]);

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
    } else {
      const updatedData = productList.data?.data?.map((item: any) => ({
        ...item,
        value: "",
      }));
      setOrderItems(updatedData);
    }
  }, [productList.data?.data, routes.params?.item?.products]);

  const handleValueChange = (index: number, newValue: string) => {
    const updatedItems: any = [...orderItems];
    updatedItems[index].value = parseFloat(newValue);
    setOrderItems(updatedItems);
  };

  const totalWeight = orderItems?.reduce(
    (acc: any, item: any) => acc + (parseFloat(item.value) * 0.001 || 0),
    0
  );
  const totalAmount = orderItems?.reduce((acc: number, item: any) => {
    const weight = parseFloat(item.value) * 0.001 || 0;
    const pricePerMt = parseFloat(item.price_per_mt) || 0;
    return acc + weight * pricePerMt;
  }, 0);

  const orderValueCheck = orderItems?.filter(
    (item: { value: string }) => item.value !== ""
  );

  const handleOrderPreview = () => {
    if (distributorid === "") {
      setDistributorIdError(true);
      Toast.show({
        type: "error",
        text1: `${t("orderPlacement.selectDistributor")}`,
      });
      return;
    }
    setDistributorIdError(false);
    if (orderValueCheck.length > 0) {
      navigation.navigate(RouteString.ConfirmOrderScreen, {
        order: orderValueCheck,
        distributorid: distributorid,
      });
      const updatedData = productList.data?.data?.map((item: any) => ({
        ...item,
        value: "",
      }));
      setOrderItems(updatedData);
    }
  };

  const handlSelectedNames = (id: string) => {
    setDistributorIdError(false);
    setDistributorId(id);
  };

  return (
    <SafeAreaContainer>
      <Text style={styles.title}>{t("orderPlacement.orderPlacement")}</Text>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        extraScrollHeight={hp(-10)}
        contentContainerStyle={{ paddingTop: hp(2) }}
      >
        <SearchDropDownSignalSelection
          label={t("orderPlacement.selectDistributor")}
          placeHolder={t("orderPlacement.selectDistributor1")}
          selectedNames={handlSelectedNames}
          zIndex={1}
          data={distributorList?.data}
          isRequired
          distributorId={routes.params?.item?.distributorId}
          errors={distributoridError ? t("error.distributorIsRequired") : ""}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        />
        {orderItems?.map((item: any, index: number) => (
          <OrderPlacementCard
            key={index}
            productName={item.name}
            value={item.value}
            mt={item.price_per_mt}
            onChangeText={(text) => handleValueChange(index, text)}
            onTouchStart={() => setIsVisible(false)}
          />
        ))}
        <Text style={styles.totalWeight}>
          {t("orderPlacement.totalWeight")} :{" "}
          {Number((totalWeight || 0).toFixed(3))} MT
        </Text>
        <Text style={styles.totalAmount}>
          {t("orderPlacement.totalAmount")}: Rs.{" "}
          {abbreviateNumber(Number((totalAmount || 0).toFixed(3)) || 0)}/-
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

export default PlaceOrderScreen;

const styles = StyleSheet.create({
  title: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(20),
    marginHorizontal: wp(5),
    marginTop: hp(2.5),
    lineHeight: hp(4),
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
