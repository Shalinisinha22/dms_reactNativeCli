import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import SafeAreaContainer from "../../components/common/SafeAreaContainer";
import { hp, RFValue, wp } from "../../helper/Responsive";
import { colors } from "../../utils/Colors";
import { FontPath } from "../../utils/FontPath";
import { IconsPath } from "../../utils/IconPath";
import LedgerCard from "../../components/common/LedgerCard";
import { useTranslation } from "react-i18next";
import FilterModal from "../../components/modal/FilterModal";
import { commonStyle } from "../../utils/commonStyles";

const LedgerScreen = () => {
  const { t } = useTranslation();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  return (
    <SafeAreaContainer>
      <View style={styles.headerRowView}>
        <Text style={styles.title}>{t("ledger.ledger")}</Text>
        <View style={styles.downloadRowView}>
          <Pressable>
            <Text style={styles.donwnload}>{t("ledger.download")}</Text>
          </Pressable>
          <Pressable
            style={commonStyle.filterButton}
            onPress={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Image source={IconsPath.filter} style={commonStyle.filter} />
          </Pressable>
        </View>
      </View>
      <LedgerCard />
      <FilterModal
        isVisible={isFilterOpen}
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
});
