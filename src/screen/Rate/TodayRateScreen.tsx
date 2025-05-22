import { StyleSheet, Text,ScrollView,View,TouchableOpacity,FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import SafeAreaContainer from "../../components/common/SafeAreaContainer";
import { colors } from "../../utils/Colors";
import { FontPath } from "../../utils/FontPath";
import { hp, RFValue, wp } from "../../helper/Responsive";
import { useTranslation } from "react-i18next";
import {
  useGetDistributorList,
  useGetProductList,
} from "../../api/query/OrderPlacementService";

import { useAppSelector } from "../../redux/Store";
import { abbreviateNumber } from "../../utils/commonFunctions";


const TodaysRateScreen = () => {
  const { t } = useTranslation();
  const productList = useGetProductList();
  const distributorList = useGetDistributorList();
  const [items, setItems] = useState<any[]>([]); 
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

  useEffect(() => {
    if (productList.data?.data) {
      const initialOrderItems = productList.data.data.map((item: any) => ({
        id: item.id,
        name: item.name,
        price_per_mt: item.price_per_mt,
        value: "", 
      }));
      setItems(initialOrderItems);
    }
  }, [productList.data]);

 
 
 const renderProductList = (products: any[]) => (
  <FlatList
    data={products}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
      <View style={styles.productCard}>
  
              <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.mrp}>
                  MRP : <Text style={styles.unit}>{item.price_per_mt}/MT</Text>
                </Text>
      </View>
    )}
    contentContainerStyle={{
      paddingTop: hp(2),
      paddingBottom: hp(5),
    }}
    showsVerticalScrollIndicator={false}

  />
);

 



  return (
    <SafeAreaContainer>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>{t("todaysRate.todaysRate")}</Text>
        <Text style={styles.categoryButtonText}>{t("todaysRate.superTMTBars")}</Text>
        <Text style={styles.categoryButtonText}>{t("todaysRate.superStarTMTBars")}</Text>
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
              {t("todaysRate.superTMTBars")}
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
              {t("todaysRate.superStarTMTBars")}
            </Text>
          </TouchableOpacity>
        </View>
        {selectedCategory === "superTMT"
          ? renderProductList(superTMTBars)
          : renderProductList(superStarTMTBars)}
      
   
      </ScrollView>
    </SafeAreaContainer>
  );
};

export default TodaysRateScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    // paddingBottom: hp(5), 
  },
 title: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(20),
    marginHorizontal: wp(5),
    marginTop: hp(2.5),
  },

  buttonContainer: {
    flexDirection: "row",
    gap:1,
 marginHorizontal: wp(5),
    marginTop: hp(-2),
  },
  categoryButton: {
    paddingVertical: 16,
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
       backgroundColor: colors.darkGray, 
   
  },
  activeCategoryButton: {
   backgroundColor: colors.orange, 
  },
  categoryButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
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
  productCard: {
    backgroundColor: "#fff",
    padding: 16,
    marginHorizontal: wp(5),
    marginBottom: hp(1.5),
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
 productName: {
    color: colors.primary,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(16),
    marginBottom: hp(0.8),
  },
  mrp: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(14),
  },
    unit: {
    fontFamily: FontPath.OutfitMedium,
    color: colors.black,
  },
});
