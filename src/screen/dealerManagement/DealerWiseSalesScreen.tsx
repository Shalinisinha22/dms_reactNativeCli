import {
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
  const { mutateAsync: getDealerSales, data } = useGetDealerSales();
  const [search, setSearch] = useState("");

  useEffect(() => {
    getDealerSales({
      startDate: isStartDate ? moment(isStartDate).format("YYYY-MM-DD") : "",
      endDate: isEndDate ? moment(isEndDate).format("YYYY-MM-DD") : "",
    });
  }, [isStartDate, isEndDate]);

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
});
