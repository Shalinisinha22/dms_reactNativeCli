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
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { RouteString } from "../../navigation/RouteString";
import { UserType } from "../../interfaces/Types";
import { useGetUserRole } from "../../api/query/MasonManagementService";
import { useApproveUser } from "../../api/query/DealerManagementService";
import Toast from "react-native-toast-message";
import { dealerManagementType1 } from "../../utils/JsonData";
import { useAppSelector } from "../../redux/Store";

const DealerManagementScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [isSelectType, setSelectType] = useState("all");
  const { mutateAsync: getDealerStatus } = useGetUserRole();
  const { mutateAsync: aprroveUser } = useApproveUser();

  const [search, setSearch] = useState("");

  const [data, setData] = useState<any>([]);
  const [totalPage, setTotalPage] = useState(0);
  const [nextPage, setNextPage] = useState<any>(null);
  const [curPage, setCurPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const isFoused = useIsFocused();
 const { portal } = useAppSelector((state) => state.auth);
 
  useEffect(() => {
    if(portal){
      handleGetDealerManagement();
    }
  }, [isSelectType, isFoused]);

  const handleGetDealerManagement = async () => {
    try {
      const res = await getDealerStatus({
        role: UserType.DEALER,
        status: isSelectType === "all" ? "" : isSelectType,
        page: curPage,
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
      console.log("handleGetDealerManagement", error);
    }
  };

  const onEndReached = () => {
    if (nextPage <= totalPage && nextPage != null) {
      setCurPage(curPage + 1);
      handleGetDealerManagement();
    }
  };

  const ListFooterComponent = () => {
    return isFetching ? (
      <ActivityIndicator size="small" color={colors.primary} />
    ) : null;
  };

  const handleAddDeler = () => {
    navigation.navigate(RouteString.NewDealerOnboardScreen);
  };

  const handleType = (id: string) => {
    if (id === "orderHistory.all") {
      setSelectType("all");
    } else if (id === "orderHistory.approved") {
      setSelectType("approved");
    } else if (id === "orderHistory.rejected") {
      setSelectType("declined");
    } else if (id === "orderHistory.pending") {
      setSelectType("pending");
    }
  };

  const filterData = () => {
    if (!search) {
      return data;
    }
    return data.filter((filtered: { firm_name: string }) => {
      const itemName = filtered?.firm_name?.toLowerCase();
      const query = search?.toLowerCase();

      return itemName.includes(query);
    });
  };

  const handleApproveUser = async (status: string, id: string) => {
    try {
      const res = await aprroveUser({
        userId: id,
        status: status,
        role: UserType.DEALER,
      });
      if (res) {
        Toast.show({
          type: "success",
          text1: res.message,
        });
        handleGetDealerManagement();
      }
    } catch (error) {
      console.log("handleApproveOrder", error);
    }
  };

  return (
    <SafeAreaContainer>
      <View style={styles.headerRowView}>
        <Text style={styles.title}>{t("dashboard.dealerManagement")}</Text>
        <Pressable style={styles.filterButton} onPress={handleAddDeler}>
          <Image
            source={IconsPath.pluse}
            style={styles.pluse}
            tintColor={colors.white}
          />
        </Pressable>
      </View>
      <SearchView onChangeText={(text) => setSearch(text)} value={search} />
      <FilterStatueType data={dealerManagementType1} selectedId={handleType} />
      <FlatList
        data={filterData()}
        removeClippedSubviews={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: hp(1) }}
        keyExtractor={(item, index) => `${item.id}_${index}`}
        onEndReached={onEndReached}
        ListFooterComponent={ListFooterComponent}
        onEndReachedThreshold={16}
        renderItem={({ item, index }) => {
          return (
            <DealerManagementCard
              key={index}
              item={item}
              ApproveOnPress={() =>
                handleApproveUser("approved", item?.dealerId)
              }
              RejectOnPress={() =>
                handleApproveUser("declined", item?.dealerId)
              }
            />
          );
        }}
      />
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
