import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { colors } from "../../utils/Colors";
import { FontPath } from "../../utils/FontPath";
import { hp, RFValue, wp } from "../../helper/Responsive";
import { useIsFocused } from "@react-navigation/native";
import { useBrandingList } from "../../api/query/SupportService";
import SearchView from "./SearchView";

const BrandingMaterialRequestTable = () => {
  const { t } = useTranslation();

  const [data, setData] = useState<any>([]);
  const [totalPage, setTotalPage] = useState(0);
  const [nextPage, setNextPage] = useState<any>(null);
  const [curPage, setCurPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [search, setSearch] = useState("");
  const isFoused = useIsFocused();
  const getBrandingList = useBrandingList();

  useEffect(() => {
    if (isFoused) {
      handleGetBrandingList();
      setCurPage(1);
      setTotalPage(0);
      setNextPage(null);
    }
  }, [isFoused]);

  const handleGetBrandingList = async () => {
    try {
      const res = await getBrandingList.mutateAsync({ page: curPage });
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
      setIsFetching(false);
      console.log("handleGetBrandingList", error);
    }
  };

  const onEndReached = () => {
    if (nextPage <= totalPage && nextPage != null) {
      setCurPage(curPage + 1);
      handleGetBrandingList();
    }
  };

  const ListFooterComponent = () => {
    return isFetching ? (
      <ActivityIndicator size="small" color={colors.primary} />
    ) : null;
  };

  const filterData = () => {
    if (!search) {
      return data;
    }
    return data.filter((filtered: { name: string }) => {
      const itemName = filtered?.name.toLowerCase();
      const query = search.toLowerCase();

      return itemName.includes(query);
    });
  };

  return (
    <View>
       <SearchView
        placeholder={t('dashboard.SearchByDealerDistributor')}
        value={search}
        onChangeText={(text) => setSearch(text)}
      />
      <View style={styles.headerView}>
        <Text style={styles.headerTitle1}>{t("myScheme.no")}</Text>
        <Text style={styles.headerTitle2}>{t('ASODealerOnboard.name')}</Text>
        <Text style={styles.headerTitle3}>{t('registration.workCity')}</Text>
        <Text style={styles.headerTitle4}>{t('dashboard.requirement')}</Text>
        <Text style={styles.headerTitle5}>{t('ledger.date')}</Text>
      </View>
      <View>
        <FlatList
          data={filterData()}
          scrollEnabled={false}
          removeClippedSubviews={false}
          keyExtractor={(item, index) => `${item.id}_${index}`}
          onEndReached={onEndReached}
          ListFooterComponent={ListFooterComponent}
          onEndReachedThreshold={16}
          renderItem={({ item, index }) => {
            const itemsArray = item?.items[0].split(",").map((item: any, index: number) => ({
              id: index + 1,
              name: item.trim(),
            }));
            return (
              <View style={styles.itemView} key={index}>
                <Text style={styles.itemText1}>{index + 1}</Text>
                <Text style={styles.itemText2}>{item?.name}</Text>
                <Text style={styles.itemText3}>{item?.work_city}</Text>
                <View style={{ width: wp(23) }}>
                  {itemsArray.map((i: any) => {
                    return (
                      <>
                        <Text style={styles.itemText4}>
                          {i?.id}.{i?.name}
                        </Text>
                      </>
                    );
                  })}
                </View>
                <Text style={styles.itemText5}>{item?.requestDate}</Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default BrandingMaterialRequestTable;

const styles = StyleSheet.create({
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: wp(5),
    backgroundColor: colors.primary,
    height: hp(5),
    alignItems: "center",
    paddingHorizontal: wp(3),
    marginTop: hp(2),
    borderRadius: 3,
  },
  headerTitle1: {
    color: colors.white,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(12),
    width: wp(5),
  },
  headerTitle2: {
    color: colors.white,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(12),
    width: wp(10),
  },
  headerTitle3: {
    color: colors.white,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(12),
    width: wp(18),
  },
  headerTitle4: {
    color: colors.white,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(12),
    width: wp(25),
  },
  headerTitle5: {
    color: colors.white,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(12),
    width: wp(12),
  },
  itemView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: wp(5),
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
    borderWidth: 1,
    marginTop: hp(1),
    borderRadius: 3,
    borderColor: colors.black_100,
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4.65,
    elevation: 4,
  },
  itemText1: {
    color: colors.black,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(11),
    width: wp(5),
  },
  itemText2: {
    color: colors.black,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(11),
    width: wp(18),
  },
  itemText3: {
    color: colors.black,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(11),
    width: wp(16),
  },
  itemText4: {
    color: colors.black,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(11),
    textAlign: "center",
  },
  itemText5: {
    color: colors.black,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(11),
    width: wp(18),
    textAlign: "right",
  },
});
