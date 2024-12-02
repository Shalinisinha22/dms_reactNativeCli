import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import SafeAreaContainer from "../../components/common/SafeAreaContainer";
import { hp, RFValue, wp } from "../../helper/Responsive";
import { colors } from "../../utils/Colors";
import { FontPath } from "../../utils/FontPath";
import { IconsPath } from "../../utils/IconPath";
import { useTranslation } from "react-i18next";
import SearchView from "../../components/common/SearchView";
import FilterStatueType from "../../components/common/FilterStatueType";
import DealerManagementCard from "../../components/dashboard/DealerManagementCard";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { RouteString } from "../../navigation/RouteString";
import { useAppSelector } from "../../redux/Store";
import { UserType } from "../../interfaces/Types";

const DealerManagementScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { portal } = useAppSelector((state) => state.auth);

  const handleAddDeler = () => {
    if(portal === UserType.DISTRIBUTOR){
      navigation.navigate(RouteString.NewDealerOnboardScreen)
    } else if (portal === UserType.ASO){
      navigation.navigate(RouteString.AsoNewDealerOnboardScreen)
    }
  }

  return (
    <SafeAreaContainer>
      <View style={styles.headerRowView}>
        <Text style={styles.title}>{t("dashboard.dealerManagement")}</Text>
        <Pressable
          style={styles.filterButton}
          onPress={handleAddDeler}
        >
          <Image
            source={IconsPath.pluse}
            style={styles.pluse}
            tintColor={colors.white}
          />
        </Pressable>
      </View>
      <SearchView />
      <FilterStatueType />
      <DealerManagementCard isApproved={true} />
    </SafeAreaContainer>
  );
};

export default DealerManagementScreen;

const styles = StyleSheet.create({
  headerRowView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: wp(5),
    marginVertical: hp(2.5),
  },
  filterButton: {
    backgroundColor: colors.primary,
    padding: wp(0.5),
    borderRadius: 3,
  },
  pluse: {
    width: wp(8),
    height: wp(8),
    resizeMode: "contain",
  },
  title: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(20),
  },
});
