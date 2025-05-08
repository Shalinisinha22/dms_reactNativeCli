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
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { hp, RFValue, wp } from "../../helper/Responsive";
import { colors } from "../../utils/Colors";
import { FontPath } from "../../utils/FontPath";
import { IconsPath } from "../../utils/IconPath";
import { RouteString } from "../../navigation/RouteString";
import FilterStatueType from "../../components/common/FilterStatueType";
import MasonManagementCard from "../../components/dashboard/MasonManagementCard";
import { useGetUserRole } from "../../api/query/MasonManagementService";
import { UserType } from "../../interfaces/Types";
import { useApproveUser } from "../../api/query/DealerManagementService";
import Toast from "react-native-toast-message";

const MasonManagementScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { mutateAsync: aprroveUser } = useApproveUser();

  const [isSelectType, setSelectType] = useState("all");
  const { mutateAsync: getMasonList } = useGetUserRole();

  const [data, setData] = useState<any>([]);
  const [totalPage, setTotalPage] = useState(0);
  const [nextPage, setNextPage] = useState<any>(null);
  const [curPage, setCurPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    handleGetData();
    setCurPage(1);
    setTotalPage(0);
    setNextPage(null);
  }, [isSelectType]);

  const handleGetData = async () => {
    try {
      const res = await getMasonList({
        role: UserType.MASON,
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
      console.log("handleGetData", error);
    }
  };

  const handleApproveUser = async (status: string) => {
    try {
      const res = await aprroveUser({
        userId: data?.masonId,
        status: status,
        role: UserType.MASON,
      });
      if (res) {
        Toast.show({
          type: "success",
          text1: res.message,
        });
        handleGetData();
      }
    } catch (error) {
      console.log("handleApproveOrder", error);
    }
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

  const onEndReached = () => {
    if (nextPage <= totalPage && nextPage != null) {
      setCurPage(curPage + 1);
      handleGetData();
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
        <Text style={styles.title}>{t("drawer.masonManagement")}</Text>
        <Pressable
          style={styles.filterButton}
          onPress={() =>
            navigation.navigate(RouteString.AsoNewMasonOnboardScreen)
          }
        >
          <Image
            source={IconsPath.pluse}
            style={styles.pluse}
            tintColor={colors.white}
          />
        </Pressable>
      </View>
      <FilterStatueType selectedId={handleType} />
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: hp(1) }}
        keyExtractor={(item, index) => `${item.id}_${index}`}
        onEndReached={onEndReached}
        ListFooterComponent={ListFooterComponent}
        onEndReachedThreshold={16}
        renderItem={({ item, index }) => {
          return (
            <MasonManagementCard
              item={item}
              key={index}
              ApproveOnPress={() => handleApproveUser("approved")}
              RejectOnPress={() => handleApproveUser("declined")}
            />
          );
        }}
      />
    </SafeAreaContainer>
  );
};

export default MasonManagementScreen;

const styles = StyleSheet.create({
  headerRowView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: wp(5),
    marginTop: hp(2.5),
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
