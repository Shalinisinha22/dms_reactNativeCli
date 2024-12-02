import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import SafeAreaContainer from '../../components/common/SafeAreaContainer'
import { useTranslation } from 'react-i18next';
import { commonStyle } from '../../utils/commonStyles';
import { IconsPath } from '../../utils/IconPath';
import { hp, RFValue, wp } from '../../helper/Responsive';
import { colors } from '../../utils/Colors';
import { FontPath } from '../../utils/FontPath';
import FilterStatueType from '../../components/common/FilterStatueType';
import RewardStatusCard from '../../components/dashboard/RewardStatusCard';

const RewardStatusScreen = () => {
  const { t } = useTranslation();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
      <FilterStatueType/>
      <RewardStatusCard/>
    </SafeAreaContainer>
  )
}

export default RewardStatusScreen

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
})