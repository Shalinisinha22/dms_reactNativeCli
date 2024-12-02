import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import SafeAreaContainer from "../../components/common/SafeAreaContainer";
import { FontPath } from "../../utils/FontPath";
import { colors } from "../../utils/Colors";
import { hp, isiPAD, RFValue, wp } from "../../helper/Responsive";
import { IconsPath } from "../../utils/IconPath";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import OrderCard from "../../components/common/OrderCard";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../redux/Store";
import { UserType } from "../../interfaces/Types";
import DistributorOrderWithProgressCard from "../../components/dashboard/DistributorOrderWithProgressCard";
import RejectOrderModal from "../../components/modal/RejectOrderModal";
import FilterStatueType from "../../components/common/FilterStatueType";
import { commonStyle } from "../../utils/commonStyles";
import FilterModal from "../../components/modal/FilterModal";
import { RouteString } from "../../navigation/RouteString";
import PerviousOrderModal from "../../components/modal/PerviousOrderModal";
import SearchView from "../../components/common/SearchView";

const OrderHistoryScreen = () => {
  const { t } = useTranslation();
  const { portal } = useAppSelector((state) => state.auth);
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [isRejectOpenModal, setIsRejectOpenModal] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isPerviousOrderModal, setIsPerviousOrderModal] = useState(false);

  const title =
    portal === UserType.DEALER
      ? t("drawer.orderHistory")
      : (portal === UserType.DISTRIBUTOR ||
        portal === UserType.ASO )&& t("drawer.orderList");

  const handleOrderModifiedOnPress = () => {
    navigation.navigate(RouteString.OrderPlacementScreen);
  };

  const perviouseOnPress = () => {
    setIsPerviousOrderModal(true);
  };


  return (
    <SafeAreaContainer>
      <View style={styles.headerRowView}>
        <Text style={styles.title}>{title}</Text>
        <Pressable
          style={commonStyle.filterButton}
          onPress={() => setIsFilterOpen(true)}
        >
          <Image source={IconsPath.filter} style={commonStyle.filter} />
        </Pressable>
      </View>
     {portal === UserType.ASO && <SearchView searchMainViewStyle={{marginTop:hp(2)}}/>}
      <FilterStatueType />
      {portal === UserType.DEALER && (
        <OrderCard
          isShowButton={true}
          orderModifiedOnPress={handleOrderModifiedOnPress}
          perviouseOnPress={perviouseOnPress}
        />
      )}
      {(portal === UserType.DISTRIBUTOR || portal === UserType.ASO) && (
        <DistributorOrderWithProgressCard
          approveOnPress={() => null}
          rejectOnPress={() => setIsRejectOpenModal(true)}
        />
      )}
      <RejectOrderModal
        isVisible={isRejectOpenModal}
        backOnPress={() => setIsRejectOpenModal(false)}
      />
      <FilterModal
        isVisible={isFilterOpen}
        backOnPress={() => setIsFilterOpen(!isFilterOpen)}
      />
      <PerviousOrderModal
        isVisible={isPerviousOrderModal}
        backOnPress={() => setIsPerviousOrderModal(!isPerviousOrderModal)}
      />
    </SafeAreaContainer>
  );
};

export default OrderHistoryScreen;

const styles = StyleSheet.create({
  title: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(20),
    lineHeight: hp(4),
  },
  headerRowView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: wp(5),
    marginTop: hp(2.5),
  },
});
