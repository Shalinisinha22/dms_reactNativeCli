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
import { useTranslation } from "react-i18next";
import { commonStyle } from "../../utils/commonStyles";
import { IconsPath } from "../../utils/IconPath";
import { hp, RFValue, wp } from "../../helper/Responsive";
import { colors } from "../../utils/Colors";
import { FontPath } from "../../utils/FontPath";
import FilterStatueType from "../../components/common/FilterStatueType";
import RewardStatusCard from "../../components/dashboard/RewardStatusCard";
import { useGetRewardStatus } from "../../api/query/RewardService";
import FilterModal from "../../components/modal/FilterModal";
import moment from "moment";

const RewardStatusScreen = () => {
  const { t } = useTranslation();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSelectType, setSelectType] = useState("all");
  const { mutateAsync: getRewardStatus } = useGetRewardStatus();
  const [isStartDate, setStartDate] = useState("");
  const [isEndDate, setEndDate] = useState("");

  const [data, setData] = useState<any>([]);
  const [totalPage, setTotalPage] = useState(0);
  const [nextPage, setNextPage] = useState<any>(null);
  const [curPage, setCurPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {  
    handleGetRewardStatus();
    setCurPage(1);
    setTotalPage(0);
    setNextPage(null);
  }, [isSelectType, isStartDate, isEndDate]);

  const handleGetRewardStatus = async () => {
    try {
      const res = await getRewardStatus({
        startDate: isStartDate ? moment(isStartDate).format("YYYY-MM-DD") : "",
        endDate: isEndDate ? moment(isEndDate).format("YYYY-MM-DD") : "",
        status: isSelectType,
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
      setIsFetching(false);
      console.log("handleGetRewardStatus", error);
    }
  };

  const handleType = (id: string) => {
    if (id === "orderHistory.all") {
      setSelectType("all");
    } else if (id === "orderHistory.approved") {
      setSelectType("approved");
    } else if (id === "orderHistory.rejected") {
      setSelectType("declined");
    }
  };

  const onEndReached = () => {
    if (nextPage <= totalPage && nextPage != null) {
      setCurPage(curPage + 1);
      handleGetRewardStatus();
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
        <Text style={styles.title}>{t("drawer.rewardStatus")}</Text>
        <Pressable
          style={commonStyle.filterButton}
          onPress={() => setIsFilterOpen(!isFilterOpen)}
        >
          <Image source={IconsPath.filter} style={commonStyle.filter} />
        </Pressable>
      </View>
      <FilterStatueType selectedId={handleType} />
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={false}
        keyExtractor={(item, index) => `${item.id}_${index}`}
        onEndReached={onEndReached}
        ListFooterComponent={ListFooterComponent}
        onEndReachedThreshold={16}
        renderItem={({ item, index }) => (
          <RewardStatusCard key={index} item={item} />
        )}
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

export default RewardStatusScreen;

const styles = StyleSheet.create({
  headerRowView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: wp(5),
    marginTop: hp(2.5),
  },
  title: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(20),
  },
});
