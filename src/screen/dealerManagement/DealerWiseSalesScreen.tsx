import {
  ActivityIndicator,
  FlatList,
  Image,
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
import { commonStyle } from "../../utils/commonStyles";
import { useTranslation } from "react-i18next";
import SearchView from "../../components/common/SearchView";
import DealerWiseSalesCard from "../../components/dashboard/DealerWiseSalesCard";
import FilterModal from "../../components/modal/FilterModal";
import { useGetDealerSales } from "../../api/query/DealerManagementService";
import moment from "moment";

const DealerWiseSalesScreen = () => {
  const { t } = useTranslation();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isStartDate, setStartDate] = useState("");
  const [isEndDate, setEndDate] = useState("");
  const { mutateAsync: getDealerSales } = useGetDealerSales();
  const [search, setSearch] = useState("");

  const [data, setData] = useState<any>([]);
  const [totalPage, setTotalPage] = useState(0);
  const [nextPage, setNextPage] = useState<any>(null);
  const [curPage, setCurPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    handleGetDealerSalesList();
  }, [isStartDate, isEndDate]);

  const handleGetDealerSalesList = async () => {
    try {
      const res = await getDealerSales({
        startDate: isStartDate ? moment(isStartDate).format("YYYY-MM-DD") : "",
        endDate: isEndDate ? moment(isEndDate).format("YYYY-MM-DD") : "",
        page: curPage,
        status: ""
      });
      if (nextPage >= curPage && nextPage != null) {
        setIsFetching(true);
      }
      if (res?.data) {
        setData((prev: any) =>
          curPage === 1 ? res.data : [...prev, ...res.data]
        );
        setIsFetching(false);
      }
      if (res?.hasMore) {
        setTotalPage(res.totalPage);
        setNextPage(res.nextPage);
      }
    } catch (error) {
      console.log("handleGetDealerSalesList===>", error);
    }
  };

  const filterData = () => {
    if (!search) {
      return data;
    }
    return data.filter((filtered: { dealerName: string }) => {
      const itemName = filtered?.dealerName.toLowerCase();
      const query = search.toLowerCase();

      return itemName.includes(query);
    });
  };

  const onEndReached = () => {
    if (nextPage <= totalPage && nextPage != null) {
      setCurPage(curPage + 1);
      handleGetDealerSalesList();
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
        <Text style={styles.title}>{t("dealerwiseSales.dealerwiseSales")}</Text>
        <Pressable
          style={commonStyle.filterButton}
          onPress={() => setIsFilterOpen(!isFilterOpen)}
        >
          <Image source={IconsPath.filter} style={commonStyle.filter} />
        </Pressable>
      </View>
      <SearchView onChangeText={(text) => setSearch(text)} value={search} />
      <FlatList
        data={filterData()}
        removeClippedSubviews={false}
        keyExtractor={(item, index) => `${item.id}_${index}`}
        onEndReached={onEndReached}
        ListEmptyComponent={() => <Text style={styles.noData}>{t('error.NoDataAvailable')}</Text>}
        ListFooterComponent={ListFooterComponent}
        onEndReachedThreshold={16}
        renderItem={({ item, index }) => {
          return <DealerWiseSalesCard key={index} item={item} />;
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

export default DealerWiseSalesScreen;

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
  noData:{
    alignSelf:'center',
    fontFamily:FontPath.OutfitMedium,
    color:colors.black
  }
});
