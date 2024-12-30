import {
  Alert,
  FlatList,
  Image,
  Linking,
  PermissionsAndroid,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import SafeAreaContainer from "../../components/common/SafeAreaContainer";
import { IconsPath } from "../../utils/IconPath";
import { hp, RFValue, wp } from "../../helper/Responsive";
import { colors } from "../../utils/Colors";
import { FontPath } from "../../utils/FontPath";
import InvoiceCard from "../../components/common/InvoiceCard";
import FilterModal from "../../components/modal/FilterModal";
import { useTranslation } from "react-i18next";
import { commonStyle } from "../../utils/commonStyles";
import {
  useMyInvoice,
  useMyInvoiceDetils,
} from "../../api/query/InvoiceService";
import moment from "moment";
import { useGetProfile } from "../../api/query/ProfileService";
import { generateInvoicePDF } from "../../utils/commonFunctions";
import { request, PERMISSIONS } from "react-native-permissions";
import { useGetProductList } from "../../api/query/OrderPlacementService";
import { useAppSelector } from "../../redux/Store";

const InvoiceScreen = () => {
  const { t } = useTranslation();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isStartDate, setStartDate] = useState("");
  const [isEndDate, setEndDate] = useState("");
  const { mutateAsync: getMyInvoice, data } = useMyInvoice();
  const { mutateAsync: getMyInvoiceDetils } = useMyInvoiceDetils();
  const { userInfo } = useAppSelector((state) => state.auth);
  const productList = useGetProductList();

  useEffect(() => {
    getMyInvoice({
      startDate: isStartDate ? moment(isStartDate).format("YYYY-MM-DD") : "",
      endDate: isEndDate ? moment(isEndDate).format("YYYY-MM-DD") : "",
    });
  }, [isStartDate, isEndDate]);

  const handlePDFDownload = async (id: string) => {
    if (Platform.OS == "ios") {
      pdf(id);
    } else {
      const granted = await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
      if (granted === "granted") {
        try {
          pdf(id);
        } catch (error) {
          console.log("handlePDFDownload", error);
        }
      } else {
        Alert.alert(
          "Storage Permission",
          "App needs access to your storage to save files.",
          [{ text: "Open App Settings", onPress: () => Linking.openSettings() }]
        );
      }
    }
  };

  const pdf = async (id: string) => {
    const res = await getMyInvoiceDetils({ invoiceId: id });
    const combinedResult = res?.products?.map((product: { productId: any }) => {
      const matchingDetail = productList.data?.find(
        (detail: { id: any }) => detail.id === product.productId
      );
      return {
        ...product,
        name: matchingDetail ? matchingDetail.name : "",
      };
    });
    if (res && userInfo) {
      generateInvoicePDF(userInfo, res, combinedResult);
    }
  };

  return (
    <SafeAreaContainer>
      <View style={styles.headerRowView}>
        <Text style={styles.title}>{t("invoice.invoice")}</Text>
        <Pressable
          style={commonStyle.filterButton}
          onPress={() => setIsFilterOpen(!isFilterOpen)}
        >
          <Image source={IconsPath.filter} style={commonStyle.filter} />
        </Pressable>
      </View>
      <FlatList
        data={data?.reverse()}
        removeClippedSubviews={false}
        contentContainerStyle={{paddingTop:hp(1)}}
        renderItem={({ item, index }) => {
          return (
            <InvoiceCard
              key={index}
              item={item}
              downloadOnPress={() => handlePDFDownload(item.id)}
            />
          );
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
    </SafeAreaContainer>
  );
};

export default InvoiceScreen;

const styles = StyleSheet.create({
  headerRowView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: wp(5),
    marginVertical: hp(2.5),
  },
  title: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(20),
  },
});
