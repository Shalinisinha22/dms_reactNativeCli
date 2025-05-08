import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import SafeAreaContainer from "../../components/common/SafeAreaContainer";
import { useTranslation } from "react-i18next";
import { commonStyle } from "../../utils/commonStyles";
import { IconsPath } from "../../utils/IconPath";
import { hp, RFValue, wp } from "../../helper/Responsive";
import { colors } from "../../utils/Colors";
import { FontPath } from "../../utils/FontPath";
import SearchView from "../../components/common/SearchView";
import BrandingMaterialRequestTable from "../../components/common/BrandingMaterialRequestTable";
import { useBrandingList } from "../../api/query/SupportService";
import { useIsFocused } from "@react-navigation/native";

const BrandingMaterialQueryScreen = () => {
  const { t } = useTranslation();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isStartDate, setStartDate] = useState("");
  const [isEndDate, setEndDate] = useState("");

  
  return (
    <SafeAreaContainer>
      <View style={styles.headerRowView}>
        <Text style={styles.title}>
          {t("dashboard.brandingMaterialRequest")}
        </Text>
        {/* <Pressable
          style={commonStyle.filterButton}
          onPress={() => setIsFilterOpen(!isFilterOpen)}
        >
          <Image source={IconsPath.filter} style={commonStyle.filter} />
        </Pressable> */}
      </View>
     
      <BrandingMaterialRequestTable />
    </SafeAreaContainer>
  );
};

export default BrandingMaterialQueryScreen;

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
