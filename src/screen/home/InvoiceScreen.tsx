import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Linking,
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
  useDownloadPdf,
  useMyInvoiceGST,
} from "../../api/query/InvoiceService";
import moment from "moment";
import { request, PERMISSIONS } from "react-native-permissions";
import { useAppSelector } from "../../redux/Store";
import { useIsFocused } from "@react-navigation/native";
import RNFetchBlob from "react-native-blob-util";
import Toast from "react-native-toast-message";

const InvoiceScreen = () => {
  const { t } = useTranslation();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isStartDate, setStartDate] = useState("");
  const [isEndDate, setEndDate] = useState("");
  const { mutateAsync: getMyInvoiceGST } = useMyInvoiceGST();
  const { mutateAsync: downloadPdf } = useDownloadPdf();
  const { userInfo } = useAppSelector((state) => state.auth);
  const [data, setData] = useState<any>([]);
  const [totalPage, setTotalPage] = useState(0);
  const [nextPage, setNextPage] = useState<any>(null);
  const [curPage, setCurPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const isFoused = useIsFocused();

  useEffect(() => {

    handleGetInvoice();
    setCurPage(1);
    setTotalPage(0);
    setNextPage(null);
  }, [isStartDate, isEndDate, isFoused]);

  useEffect(() => {
    handleGetInvoice();
  }, [curPage])

  const handleGetInvoice = async () => {
    try {
      const formattedStartDate = isStartDate
        ? moment(isStartDate).format("YYYY-MM-DD")
        : "";
      const formattedEndDate = isEndDate
        ? moment(isEndDate).format("YYYY-MM-DD")
        : "";

      

      const res = await getMyInvoiceGST({
        gst: userInfo?.gst_number,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        page: curPage,
      });

      if (nextPage >= curPage && nextPage != null) {
        setIsFetching(true);
      }
      if (res?.data) {
        setData((prev: any) =>
          curPage === 1 ? res.data : [...prev, ...res.data]
        );
        setIsFetching(false);
        console.log("Invoice Data:", res.data);
      }

      
      if (res?.hasMore) {
        setTotalPage(res.totalPage);
        setNextPage(res.nextPage);
      }
    } catch (error) {
      console.log("handleGetInvoice==>", error);
    }
  };

  const handlePDFDownload = async (item: any) => {
    if (Platform.OS == "ios") {
      pdf(item);
    } else {
      const granted = await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
      if (granted === "granted") {
        try {
          pdf(item);
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

  const pdf = async (item: any) => {
    try {
      const res = await downloadPdf({ invoiceId: item?.voucher_number });
      if (res?.url) {
        const fileName = item?.voucher_number.replace(/\//g, "_");
        const { dirs } = RNFetchBlob.fs;
        const path = `${dirs.LegacyDownloadDir}/${fileName}.pdf`;
        RNFetchBlob.config({
          fileCache:true,
          addAndroidDownloads:{
            notification:true,
            useDownloadManager:true,
            path: path,
          },
          path:
            Platform.OS === "ios"
              ? `${dirs.DocumentDir}/${fileName}.pdf`
              : path,
        })
          .fetch("GET", res?.url)
          .then((res) => {
            Toast.show({
              type: "success",
              text1: "PDF successfully donwload",
            });
          })
          .catch((error) => {
            Alert.alert("Error", error.message);
          });
      }
    } catch (error) {
      console.log("pdf==>", error);
    }
  };

  const onEndReached = () => {
    if (nextPage <= totalPage && nextPage != null) {
      setCurPage(curPage + 1);
      handleGetInvoice();
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
        <Text style={styles.title}>{t("invoice.invoice")}</Text>
        <Pressable
          style={commonStyle.filterButton}
          onPress={() => setIsFilterOpen(!isFilterOpen)}
        >
          <Image source={IconsPath.filter} style={commonStyle.filter} />
        </Pressable>
      </View>
      <FlatList
        data={data}
        removeClippedSubviews={false}
        contentContainerStyle={{ paddingTop: hp(1) }}
        keyExtractor={(item, index) => `${item.id}_${index}`}
        onEndReached={onEndReached}
        ListFooterComponent={ListFooterComponent}
        ListEmptyComponent={() => (
          <Text style={styles.noOrder}>{t("invoice.noIvoiceavailable")}</Text>
        )}
        onEndReachedThreshold={16}
        renderItem={({ item, index }) => {
          return (
            <InvoiceCard
              key={index}
              item={item}
              downloadOnPress={() => handlePDFDownload(item)}
            />
          );
        }}
      />
      <FilterModal
        isVisible={isFilterOpen}
        isStartDate={isStartDate}
        isEndDate={isEndDate}
        setStartDate={(date) => {
          // console.log("Selected Start Date:", date);
          setStartDate(date);
        }}
        setEndDate={(date) => {
          // console.log("Selected End Date:", date);
          setEndDate(date);
        }}
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
  noOrder: {
    color: colors.black,
    textAlign: "center",
    fontFamily: FontPath.OutfitMedium,
  },
});
