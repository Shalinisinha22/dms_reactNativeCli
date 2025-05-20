import { StyleSheet, Text,ScrollView,View,TouchableOpacity,FlatList } from "react-native";
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
  const productList = useGetProductList();
  const distributorList = useGetDistributorList();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const routes = useRoute<RouteProp<ParamsType, "PlaceOrderScreen">>();
  const [orderItems, setOrderItems] = useState<any[]>([]); // Track weights for all products
  const [distributorid, setDistributorId] = useState("");
  const [distributoridError, setDistributorIdError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("superTMT");
  const { userInfo } = useAppSelector((state) => state.auth);
  const superTMTBars = productList.data?.data.filter((item: any) =>
    item.name.includes("Super TMT")
  );
  const superStarTMTBars = productList.data?.data.filter((item: any) =>
    item.name.includes("Super Star TMT")
  );
  useEffect(() => {
    if (userInfo?.region?.length > 0) {
      distributorList.mutateAsync({ regions: userInfo.region.toString() });
    }
  }, [userInfo?.region]);

  // Initialize orderItems with all products and their weights
  useEffect(() => {
    if (productList.data?.data) {
      const initialOrderItems = productList.data.data.map((item: any) => ({
        id: item.id,
        name: item.name,
        price_per_mt: item.price_per_mt,
        value: "", // Default weight is empty
      }));
      setOrderItems(initialOrderItems);
    }
  }, [productList.data]);

  const handleValueChange = (index: number, newValue: string, productList: any) => {
    const updatedOrderItems = [...orderItems];
    const productIndex = updatedOrderItems.findIndex(
      (item) => item.id === productList[index].id
    );
    if (productIndex !== -1) {
      updatedOrderItems[productIndex].value = newValue; // Update weight
    }
    setOrderItems(updatedOrderItems);
  };

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

    // Filter products with non-empty weights
    const selectedProducts = orderItems.filter(
      (item) => item.value && parseFloat(item.value) > 0
    );

    if (selectedProducts.length > 0) {
      navigation.navigate(RouteString.ConfirmOrderScreen, {
        order: selectedProducts,
        distributorid: distributorid,
      });
    } else {
      Toast.show({
        type: "error",
        text1: `${t("orderPlacement.noProductsSelected")}`,
      });
    }
  };

  const handlSelectedNames = (id: string) => {
    setDistributorIdError(false);
    setDistributorId(id);
  };

  const renderProductList = (products: any[]) => (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => {
        const productIndex = orderItems.findIndex((orderItem) => orderItem.id === item.id);
        const productValue = productIndex !== -1 ? orderItems[productIndex].value : "";
        return (
          <OrderPlacementCard
            key={index}
            productName={item.name}
            value={productValue}
            mt={item.price_per_mt}
            onChangeText={(text) => handleValueChange(index, text, products)}
            onTouchStart={() => setIsVisible(false)}
          />
        );
      }}
      contentContainerStyle={{ paddingTop: hp(2), paddingBottom: hp(5) }}
    />
  );

  const calculateTotals = () => {
    const totalWeight = orderItems.reduce(
      (acc: number, item: any) => acc + (parseFloat(item.value || 0) * 0.001 || 0),
      0
    );
    const totalAmount = orderItems.reduce((acc: number, item: any) => {
      const weight = parseFloat(item.value || 0) * 0.001 || 0;
      const pricePerMt = parseFloat(item.price_per_mt) || 0;
      return acc + weight * pricePerMt;
    }, 0);
    return { totalWeight, totalAmount };
  };

  const { totalWeight, totalAmount } = calculateTotals();

  return (
    <SafeAreaContainer>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>{t("orderPlacement.orderPlacement")}</Text>
        <SearchDropDownSignalSelection
          label={t("orderPlacement.selectDistributor")}
          placeHolder={t("orderPlacement.selectDistributor1")}
          selectedNames={handlSelectedNames}
          zIndex={1}
          data={distributorList?.data}
          isRequired
          errors={distributoridError ? t("error.distributorIsRequired") : ""}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === "superTMT" && styles.activeCategoryButton,
            ]}
            onPress={() => setSelectedCategory("superTMT")}
          >
            <Text
              style={[
                styles.categoryButtonText,
                selectedCategory === "superTMT" && styles.activeCategoryButtonText,
              ]}
            >
              Super TMT Bars
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === "superStarTMT" && styles.activeCategoryButton,
            ]}
            onPress={() => setSelectedCategory("superStarTMT")}
          >
            <Text
              style={[
                styles.categoryButtonText,
                selectedCategory === "superStarTMT" && styles.activeCategoryButtonText,
              ]}
            >
              Super Star TMT Bars
            </Text>
          </TouchableOpacity>
        </View>
        {selectedCategory === "superTMT"
          ? renderProductList(superTMTBars)
          : renderProductList(superStarTMTBars)}
        <Text style={styles.totalWeight}>
          {t("orderPlacement.totalWeight")} : {totalWeight.toFixed(3)} MT
        </Text>
        <Text style={styles.totalAmount}>
          {t("orderPlacement.totalAmount")}: Rs. {abbreviateNumber(totalAmount)}/-
        </Text>
        <Button
          buttonName={t("orderPlacement.orderPreview")}
          isLoading={false}
          onPress={handleOrderPreview}
          buttonStyle={styles.button}
        />
      </ScrollView>
    </SafeAreaContainer>
  );
};

export default PlaceOrderScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: hp(5), 
  },
 title: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(20),
    marginHorizontal: wp(5),
    marginTop: hp(2.5),
    lineHeight: hp(4),
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 16,
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "gray", 
  },
  activeCategoryButton: {
    backgroundColor: "orange", 
  },
  categoryButtonText: {
    fontSize: 16,
    color: "#fff", 
  },
  activeCategoryButtonText: {
    color: "#fff",
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
    margin: 16,
  },
});
