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
import { hp, RFValue, wp } from "../../helper/Responsive";
import { colors } from "../../utils/Colors";
import { FontPath } from "../../utils/FontPath";
import { IconsPath } from "../../utils/IconPath";
import LedgerCard from "../../components/common/LedgerCard";
import { useTranslation } from "react-i18next";
import FilterModal from "../../components/modal/FilterModal";
import { commonStyle } from "../../utils/commonStyles";
import { useMyledgers } from "../../api/query/InvoiceService";
import moment from "moment";
import { PERMISSIONS, request } from "react-native-permissions";
import { useAppSelector } from "../../redux/Store";
import { generateLedgerPDF } from "../../utils/commonFunctions";
import { useIsFocused } from "@react-navigation/native";

const LedgerScreen = () => {
  const { t } = useTranslation();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isStartDate, setStartDate] = useState("");
  const [isEndDate, setEndDate] = useState("");
  const { mutateAsync: getMyledgers } = useMyledgers();
  const { userInfo } = useAppSelector((state) => state.auth);

  const [totalPage, setTotalPage] = useState(0);
  const [nextPage, setNextPage] = useState<any>(null);
  const [curPage, setCurPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState<any>([]);
  const isFoused = useIsFocused();

  useEffect(() => {
    handleGetLedgerList();
  }, [isStartDate, isEndDate, isFoused]);

  const handleGetLedgerList = async () => {
    try {
      const res = await getMyledgers({
        startDate: isStartDate ? moment(isStartDate).format("YYYY-MM-DD") : "",
        endDate: isEndDate ? moment(isEndDate).format("YYYY-MM-DD") : "",
        page: curPage,
      });
      if (nextPage >= curPage && nextPage != null) {
        setIsFetching(true);
      }
      if (res?.data) {
        setData((prev: any) =>
          curPage === 1 ? res.data : [...prev, ...res?.data]
        );
        setIsFetching(false);
      }
      if (res?.hasMore) {
        setTotalPage(res.totalPage);
        setNextPage(res.nextPage);
      }
    } catch (error) {
      console.log("handleGetLedgerList", error);
    }
  };

  const onEndReached = () => {
    if (nextPage <= totalPage && nextPage != null) {
      setCurPage(curPage + 1);
      handleGetLedgerList();
    }
  };

  const ListFooterComponent = () => {
    return isFetching ? (
      <ActivityIndicator size="small" color={colors.primary} />
    ) : null;
  };

  const handleDonwload = async () => {
    if (Platform.OS == "ios") {
      generateLedgerPDF(userInfo, data);
    } else {
      const granted = await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
      if (granted === "granted") {
        try {
          generateLedgerPDF(userInfo, data);
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

  return (
    <SafeAreaContainer>
      <View style={styles.headerRowView}>
        <Text style={styles.title}>{t("ledger.ledger")}</Text>
        <View style={styles.downloadRowView}>
          {data?.length > 0 && (
            <Pressable onPress={handleDonwload}>
              <Text style={styles.donwnload}>{t("ledger.download")}</Text>
            </Pressable>
          )}
          <Pressable
            style={commonStyle.filterButton}
            onPress={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Image source={IconsPath.filter} style={commonStyle.filter} />
          </Pressable>
        </View>
      </View>
      <FlatList
        data={data}
        removeClippedSubviews={false}
        showsVerticalScrollIndicator={false}
        onEndReached={onEndReached}
        ListFooterComponent={ListFooterComponent}
        ListEmptyComponent={() => (
          // <Text style={styles.nodata}>{t("error.NoDataAvailable")}</Text>
          <View style={styles.commingsoonview}>
          <Text style={styles.commingsoon}>Comming Soon</Text>
          </View>

        )}
        keyExtractor={(item, index) => `${item.id}_${index}`}
        onEndReachedThreshold={16}
        renderItem={({ item, index }) => <LedgerCard key={index} item={item} />}
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

export default LedgerScreen;

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
    lineHeight: hp(5),
  },
  downloadRowView: {
    flexDirection: "row",
    alignItems: "center",
  },
  donwnload: {
    color: colors.primary,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(18),
    marginRight: wp(3),
  },
  nodata: {
    color: colors.black,
    alignSelf: "center",
    fontFamily: FontPath.OutfitMedium,
  },
  commingsoon:{
    color: colors.black,
    alignSelf: "center",
    fontSize:RFValue(18),
    fontFamily: FontPath.OutfitSemiBold,
  },
  commingsoonview: {
    height:hp(65),
    justifyContent:'center'
  }
});
