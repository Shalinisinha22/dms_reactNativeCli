import {
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  asoDrawerOption,
  dealerDrawerOption,
  distributorDrawerOption,
  masonANdEngineerDrawerOption,
} from "../../utils/JsonData";
import { hp, isiPAD, RFValue, wp } from "../../helper/Responsive";
import { IconsPath } from "../../utils/IconPath";
import { colors } from "../../utils/Colors";
import { FontPath } from "../../utils/FontPath";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { RouteString } from "../RouteString";
import LogoutModal from "../../components/modal/LogoutModal";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../redux/Store";
import { drawerItemType, UserType } from "../../interfaces/Types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { authActions } from "../../redux/slice/AuthSlice";
import { IMAGE_URL } from "@env";

const CustomDrawerContent = (props: any) => {
  const { t } = useTranslation();
  const { portal, userInfo } = useAppSelector((state) => state.auth);
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [isLogOut, setIsLogOut] = useState(false);
  const [isError, setIsError] = useState(false);

  const dispatch = useAppDispatch();

  const drawer: any =
    portal === UserType.DEALER
      ? dealerDrawerOption
      : portal === UserType.DISTRIBUTOR
      ? distributorDrawerOption
      : portal === UserType.ASO
      ? asoDrawerOption
      : portal === UserType.ENGINEER || portal === UserType.MASON
      ? masonANdEngineerDrawerOption
      : [];

  const IdDes =
    portal === UserType.DEALER
      ? t("drawer.dealerCode")
      : portal === UserType.DISTRIBUTOR
      ? t("drawer.distributorID")
      : portal === UserType.ASO
      ? "ASO ID"
      : portal === UserType.MASON
      ? "Mason ID"
      : "Engineer ID";

  const handleYesOnPress = () => {
    setIsLogOut(false);
    dispatch(authActions.setPortal(""));
    dispatch(authActions.setToken(""));
    dispatch(authActions.setFCMToken(""));
    dispatch(authActions.setUserInfo({}));
    dispatch(authActions.setUserStatus("pending"));
    navigation.reset({
      index: 0,
      routes: [{ name: RouteString.OnBording }],
    });
  };

  const imageUrl = userInfo.profile_pic?.file_path
    ? { uri: `${IMAGE_URL}${userInfo.profile_pic.file_path}` }
    : null;

  return (
    <View style={{ marginTop: top }}>
      <View style={styles.topHeaderView}>
        <View style={styles.imageRowView}>
          <Image
            // source={isError || !imageUrl ? IconsPath.user : imageUrl}
            source={IconsPath.user}
            style={styles.userProfile}
            onError={() => setIsError(true)}
          />
          <View>
            <Text style={styles.userName}>{userInfo?.name}</Text>
            <Text style={styles.code}>
              {IdDes} :{" "}
              {userInfo?.distributorNumber ||
                userInfo?.dealerNumber ||
                userInfo?.asoNumber ||
                userInfo?.masonNumber}
            </Text>
          </View>
        </View>
        <Pressable
          onPress={() =>
            navigation.navigate(RouteString.DropDownNavigator, {
              screen: RouteString.BottomTabNavigator,
              params: {
                screen: RouteString.ProfileScreen,
              },
            })
          }
        >
          <Image source={IconsPath.edit} style={styles.edit} />
        </Pressable>
      </View>
      {drawer.map((item: drawerItemType, index: number) => {
        return (
          <Pressable
            style={styles.button}
            key={index}
            onPress={() => {
              if (item.routes == RouteString.DropDownNavigator) {
                navigation.navigate(item.routes, {
                  screen: RouteString.BottomTabNavigator,
                });
              } else if (item.name === "drawer.logOut") {
                setIsLogOut(true);
              } else if (
                item.routes === RouteString.PlaceOrderScreen ||
                item.routes === RouteString.OrderHistory
              ) {
                navigation.navigate(RouteString.DropDownNavigator, {
                  screen: RouteString.BottomTabNavigator,
                  params: {
                    screen: item.routes,
                  },
                });
              } else {
                navigation.navigate(RouteString.DropDownNavigator, {
                  screen: RouteString.BottomTabNavigator,
                  params: {
                    screen: RouteString.Home,
                    params: {
                      screen: item.routes,
                    },
                  },
                });
              }
            }}
          >
        
            <Image
              source={item.icons}
              style={styles.edit}
              tintColor={colors.primary}
            />
            <Text style={styles.buttonName}>{t(`${item.name}`)}</Text>
          </Pressable>
        );
      })}
      <Pressable
        style={{
          marginLeft: wp(11),
        }}
        onPress={() => Linking.openURL(`tel:9241879323`)}
      >
        <Text style={styles.buttonName}>
          Support/helpline Number <Text style={styles.helpineNumber}>9241873998</Text> 
        </Text>
      </Pressable>
      <LogoutModal
        isVisible={isLogOut}
        backOnPress={() => setIsLogOut(!isLogOut)}
        yesOnPress={handleYesOnPress}
      />
    </View>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  userProfile: {
    width: isiPAD ? wp(9) : wp(13),
    height: isiPAD ? wp(9) : wp(13),
    resizeMode: "cover",
    borderRadius: 100,
    marginRight: wp(2),
  },
  topHeaderView: {
    marginHorizontal: wp(5),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: hp(3),
  },
  imageRowView: {
    flexDirection: "row",
    alignItems: "center",
  },
  userName: {
    color: colors.black,
    fontFamily: FontPath.OutfitMedium,
    fontSize: RFValue(16),
  },
  code: {
    color: colors.darkGray,
    fontFamily: FontPath.OutfitLight,
    fontSize: RFValue(10),
  },
  edit: {
    width: isiPAD ? wp(4.5) : wp(6),
    height: isiPAD ? wp(4.5) : wp(6),
    resizeMode: "cover",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: wp(5),
    marginBottom: hp(3),
  },
  buttonName: {
    fontSize: RFValue(16),
    fontFamily: FontPath.OutfitRegular,
    color: colors.black,
    marginLeft: wp(3),
    lineHeight: hp(3.5),
  },
  helpineNumber: {
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(16),
    color: colors.blue,
  },
});
