import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
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

const DealerWiseSalesScreen = () => {
  const { t } = useTranslation();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
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
      <SearchView />
      <DealerWiseSalesCard />
      <FilterModal
        isVisible={isFilterOpen}
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
