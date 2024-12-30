import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
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
  const { mutateAsync: getRewardStatus, data } = useGetRewardStatus();
  const [isStartDate, setStartDate] = useState("");
  const [isEndDate, setEndDate] = useState("");

  useEffect(() => {
    handleGetRewardStatus();
  }, [isSelectType, isStartDate, isEndDate]);

  const handleGetRewardStatus = async () => {
    try {
      await getRewardStatus({
        startDate: isStartDate ? moment(isStartDate).format("YYYY-MM-DD") : "",
        endDate: isEndDate ? moment(isEndDate).format("YYYY-MM-DD") : "",
        status: isSelectType,
      });
    } catch (error) {
      console.log("handleGetRewardStatus", error);
    }
  };

  const handleType = (id: string) => {
    if (id === "orderHistory.all") {
      setSelectType("all");
    } else if (id === "orderHistory.approved") {
      setSelectType("approved");
    } else if (id === "orderHistory.rejected") {
      setSelectType("rejected");
    }
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
      renderItem={({ item , index}) => (
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
