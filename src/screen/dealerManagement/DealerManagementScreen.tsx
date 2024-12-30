import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
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
  useNavigation,
} from "@react-navigation/native";
import { RouteString } from "../../navigation/RouteString";
import { useAppSelector } from "../../redux/Store";
import { UserType } from "../../interfaces/Types";
import { useGetUserRole } from "../../api/query/MasonManagementService";
import { useApproveUser } from "../../api/query/DealerManagementService";
import Toast from "react-native-toast-message";
import { dealerManagementType1 } from "../../utils/JsonData";

const DealerManagementScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { portal } = useAppSelector((state) => state.auth);
  const [isSelectType, setSelectType] = useState('all');
  const { mutateAsync: getDealerStatus, data } = useGetUserRole();
    const { mutateAsync: aprroveUser } = useApproveUser();
  
  const [search, setSearch] = useState('');

  useEffect(() => {
    handleGetDealerManagement();
  }, [isSelectType]);

  const handleGetDealerManagement = () => {
    try {
      getDealerStatus({
           role: UserType.DEALER,
           status: isSelectType === "all" ? "" : isSelectType,
         });
    } catch (error) {
      console.log("handleGetDealerManagement", error);
    }
  };

  const handleAddDeler = () => {
      navigation.navigate(RouteString.NewDealerOnboardScreen);
  };

  const handleType = (id: string) => {
    if(id === 'orderHistory.all'){
      setSelectType('all');
    } else if (id === 'orderHistory.approved'){
      setSelectType('approved');
    }else if (id === 'orderHistory.rejected'){
      setSelectType('declined');
    }else if (id === 'orderHistory.pending'){
      setSelectType('pending');
    }
  }

  const filterData = () => {
    if (!search) {
      return data;
    }
    return data.filter((filtered: { name: string }) => {
      const itemName = filtered?.name?.toLowerCase();
      const query = search?.toLowerCase();

      return itemName.includes(query);
    });
  };

    const handleApproveUser = async (status: string, id :string) => {
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
      <SearchView onChangeText={(text) => setSearch(text)}  value={search}/>
      <FilterStatueType data ={dealerManagementType1} selectedId={handleType} />
      <FlatList
        data={filterData()}
        removeClippedSubviews={false} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingTop:hp(1)}}
        renderItem={({ item, index }) => {
          return (
            <DealerManagementCard
              key={index}
              item={item}
              ApproveOnPress={() => handleApproveUser("approved", item?.dealerId)}
              RejectOnPress={() => handleApproveUser("declined", item?.dealerId)}
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
