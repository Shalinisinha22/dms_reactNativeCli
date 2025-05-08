import { Image, Pressable, StyleSheet, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createNavigationContainerRef,
} from "@react-navigation/native";
import { RouteString } from "./RouteString";
import ChooseLanguageScreen from "../screen/onBording/ChooseLanguageScreen";
import ChoosePortalAccessScreen from "../screen/onBording/ChoosePortalAccessScreen";
import LoginScreen from "../screen/auth/LoginScreen";
import SignUpScreen from "../screen/auth/SignUpScreen";
import VerifyOTPScreen from "../screen/auth/VerifyOTPScreen";
import SetPasswordScreen from "../screen/auth/SetPasswordScreen";
import RegistrationFormScreen from "../screen/auth/RegistrationFormScreen";
import CompletingRegistrationScreen from "../screen/auth/CompletingRegistrationScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screen/home/HomeScreen";
import PlaceOrderScreen from "../screen/placeOrder/PlaceOrderScreen";
import OrderHistoryScreen from "../screen/orderHistory/OrderHistoryScreen";
import ProfileScreen from "../screen/profile/ProfileScreen";
import { IconsPath } from "../utils/IconPath";
import { hp, isiPAD, RFValue, wp } from "../helper/Responsive";
import { colors } from "../utils/Colors";
import { FontPath } from "../utils/FontPath";
import CustomDrawerContent from "./drawer/CustomDrawerContent";
import OrderPlacementScreen from "../screen/home/OrderPlacementScreen";
import ConfirmOrderScreen from "../screen/home/ConfirmOrderScreen";
import CancelOrderScreen from "../screen/orderHistory/CancelOrderScreen";
import ViewOrderScreen from "../screen/orderHistory/ViewOrderScreen";
import InvoiceScreen from "../screen/home/InvoiceScreen";
import InvoiceDetailScreen from "../screen/home/InvoiceDetailScreen";
import LedgerScreen from "../screen/home/LedgerScreen";
import SupportRequestScreen from "../screen/home/SupportRequestScreen";
import BrandingRequestScreen from "../screen/home/BrandingRequestScreen";
import MySchemeScreen from "../screen/home/MySchemeScreen";
import ViewSchemeScreen from "../screen/home/ViewSchemeScreen";
import NotificationScreen from "../screen/notification/NotificationScreen";
import ForgotPasswordScreen from "../screen/auth/ForgotPasswordScreen";
import { useAppDispatch, useAppSelector } from "../redux/Store";
import { UserType } from "../interfaces/Types";
import { useTranslation } from "react-i18next";
import DealerManagementScreen from "../screen/dealerManagement/DealerManagementScreen";
import NewDealerOnboardScreen from "../screen/dealerManagement/NewDealerOnboardScreen";
import DealerSuccessfullyScreen from "../screen/dealerManagement/DealerSuccessfullyScreen";
import OrderSuccessfullyScreen from "../screen/placeOrder/OrderSuccessfullyScreen";
import ViewDealerDetailScreen from "../screen/dealerManagement/ViewDealerDetailScreen";
import DealerWiseSalesScreen from "../screen/dealerManagement/DealerWiseSalesScreen";
import ASORegistrationScreen from "../screen/auth/ASORegistrationScreen";
import AsoNewMasonOnboardScreen from "../screen/masonMangement/AsoNewMasonOnboardScreen";
import AsoNewEngineerOnboardScreen from "../screen/engineerManagement/AsoNewEngineerOnboardScreen";
import EngineerManagementScreen from "../screen/engineerManagement/EngineerManagementScreen";
import MasonManagementScreen from "../screen/masonMangement/MasonManagementScreen";
import BrandingMaterialQueryScreen from "../screen/home/BrandingMaterialQueryScreen";
import MasonAndEngineerRegistrationScreen from "../screen/auth/MasonAndEngineerRegistrationScreen";
import ReferralSubmissionScreen from "../screen/home/ReferralSubmissionScreen";
import RewardStatusScreen from "../screen/home/RewardStatusScreen";
import RewardStatusdetailScreen from "../screen/home/RewardStatusdetailScreen";
import { authActions } from "../redux/slice/AuthSlice";
import messaging from "@react-native-firebase/messaging";
import { IMAGE_URL } from "@env";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const BottomTab = createBottomTabNavigator();
export const navigationRef = createNavigationContainerRef();

const Routes = () => {
  const { user_approval_status } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getFCMToken();
  }, []);

  const getFCMToken = async () => {
    const token = await messaging().getToken();
    dispatch(authActions.setFCMToken(token));
    console.log("token", token);
  };

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={
        user_approval_status == "approved"
          ? RouteString.DropDownNavigator
          : RouteString.OnBording
      }
    >
      <Stack.Screen name={RouteString.OnBording} component={OnBording} />
      <Stack.Screen name={RouteString.Auth} component={Auth} />
      <Stack.Screen
        name={RouteString.DropDownNavigator}
        component={DropDownNavigator}
      />
      <Stack.Screen
        name={RouteString.InvoiceDetailScreen}
        component={InvoiceDetailScreen}
      />
      <Stack.Screen
        name={RouteString.NotificationScreen}
        component={NotificationScreen}
      />
    </Stack.Navigator>
  );
};

export default Routes;

function OnBording() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={RouteString.ChooseLanguageScreen}
        component={ChooseLanguageScreen}
      />
      <Stack.Screen
        name={RouteString.ChoosePortalAccessScreen}
        component={ChoosePortalAccessScreen}
      />
    </Stack.Navigator>
  );
}

function Auth() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={RouteString.LoginScreen} component={LoginScreen} />
      <Stack.Screen name={RouteString.SignUpScreen} component={SignUpScreen} />
      <Stack.Screen
        name={RouteString.VerifyOTPScreen}
        component={VerifyOTPScreen}
      />
      <Stack.Screen
        name={RouteString.SetPasswordScreen}
        component={SetPasswordScreen}
      />
      <Stack.Screen
        name={RouteString.RegistrationFormScreen}
        component={RegistrationFormScreen}
      />
      <Stack.Screen
        name={RouteString.CompletingRegistrationScreen}
        component={CompletingRegistrationScreen}
      />
      <Stack.Screen
        name={RouteString.ForgotPasswordScreen}
        component={ForgotPasswordScreen}
      />
      <Stack.Screen
        name={RouteString.ASORegistrationScreen}
        component={ASORegistrationScreen}
      />
      <Stack.Screen
        name={RouteString.MasonAndEngineerRegistrationScreen}
        component={MasonAndEngineerRegistrationScreen}
      />
    </Stack.Navigator>
  );
}

function DropDownNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: wp(75),
        },
      }}
    >
      <Drawer.Screen
        name={RouteString.BottomTabNavigator}
        component={BottomTabNavigator}
      />
      <Drawer.Screen
        name={RouteString.OrderPlacementScreen}
        component={OrderPlacementScreen}
      />
      <Drawer.Screen
        name={RouteString.ConfirmOrderScreen}
        component={ConfirmOrderScreen}
      />
      <Drawer.Screen
        name={RouteString.ViewOrderScreen}
        component={ViewOrderScreen}
      />
      <Drawer.Screen
        name={RouteString.OrderSuccessfullyScreen}
        component={OrderSuccessfullyScreen}
      />
    </Drawer.Navigator>
  );
}

function BottomTabNavigator() {
  const { portal, userInfo } = useAppSelector((state) => state.auth);
  const { t } = useTranslation();
  const [isError, setIsError] = useState(false);

  const imageUrl = userInfo.profile_pic?.file_path
    ? { uri: `${IMAGE_URL}${userInfo.profile_pic.file_path}` }
    : null;

  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: hp(10),
          paddingTop: hp(1),
        },
        tabBarButton: (props) => <Pressable {...props} style={styles.button} />,
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === RouteString.Home) {
            iconName = IconsPath.home;
          } else if (route.name === RouteString.PlaceOrderScreen) {
            iconName = IconsPath.placeOrder;
          } else if (route.name === RouteString.OrderHistory) {
            iconName = IconsPath.orderHistory;
          }
          const icons =
            route.name === RouteString.ProfileScreen
              ? IconsPath.user
              // isError || !imageUrl
              //   ? IconsPath.user
              //   : imageUrl
              : iconName;
          return (
            <Image
              source={icons}
              onError={() => setIsError(true)}
              tintColor={
                route.name === RouteString.ProfileScreen
                  ? "trtransparent"
                  : focused
                  ? colors.primary
                  : colors.darkGray
              }
              style={
                route.name === RouteString.ProfileScreen
                  ? styles.profile
                  : styles.icons
              }
            />
          );
        },
        tabBarLabel: ({ focused }) => (
          <Text
            style={[
              styles.label,
              {
                color: focused ? colors.primary : colors.darkGray,
              },
            ]}
          >
            {route.name === RouteString.Home
              ? t("navigationLabel.Home")
              : route.name === RouteString.PlaceOrderScreen
              ? portal === UserType.DEALER
                ? t("navigationLabel.placeOrder")
                : portal === UserType.ENGINEER || portal === UserType.MASON
                ? t("navigationLabel.referralClaim")
                : t("navigationLabel.orderApproval")
              : route.name === RouteString.OrderHistory
              ? portal === UserType.DEALER
                ? t("navigationLabel.orderHistory")
                : portal === UserType.ENGINEER || portal === UserType.MASON
                ? t("navigationLabel.rewardHistory")
                : t("navigationLabel.dealars")
              : t("navigationLabel.profile")}
          </Text>
        ),
      })}
    >
      <BottomTab.Screen name={RouteString.Home} component={Home} />
      <BottomTab.Screen
        name={RouteString.PlaceOrderScreen}
        component={
          portal === UserType.DISTRIBUTOR || portal === UserType.ASO
            ? OrderHistoryScreen
            : portal === UserType.ENGINEER || portal === UserType.MASON
            ? ReferralSubmissionScreen
            : PlaceOrderScreen
        }
      />
      <BottomTab.Screen
        name={RouteString.OrderHistory}
        component={OrderHistory}
      />
      <BottomTab.Screen
        name={RouteString.ProfileScreen}
        component={ProfileScreen}
      />
    </BottomTab.Navigator>
  );
}

function Home() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={RouteString.HomeScreen} component={HomeScreen} />
      <Stack.Screen
        name={RouteString.InvoiceScreen}
        component={InvoiceScreen}
      />
      <Stack.Screen name={RouteString.LedgerScreen} component={LedgerScreen} />
      <Stack.Screen
        name={RouteString.SupportRequestScreen}
        component={SupportRequestScreen}
      />
      <Stack.Screen
        name={RouteString.BrandingRequestScreen}
        component={BrandingRequestScreen}
      />
      <Stack.Screen
        name={RouteString.MySchemeScreen}
        component={MySchemeScreen}
      />
      <Stack.Screen
        name={RouteString.ViewSchemeScreen}
        component={ViewSchemeScreen}
      />
      <Stack.Screen
        name={RouteString.DealerSuccessfullyScreen}
        component={DealerSuccessfullyScreen}
      />
      <Stack.Screen
        name={RouteString.DealerWiseSalesScreen}
        component={DealerWiseSalesScreen}
      />
      <Stack.Screen
        name={RouteString.AsoNewMasonOnboardScreen}
        component={AsoNewMasonOnboardScreen}
      />
      <Stack.Screen
        name={RouteString.DealerManagementScreen}
        component={DealerManagementScreen}
      />
      <Stack.Screen
        name={RouteString.AsoNewEngineerOnboardScreen}
        component={AsoNewEngineerOnboardScreen}
      />
      <Stack.Screen
        name={RouteString.EngineerManagementScreen}
        component={EngineerManagementScreen}
      />
      <Stack.Screen
        name={RouteString.MasonManagementScreen}
        component={MasonManagementScreen}
      />
      <Stack.Screen
        name={RouteString.BrandingMaterialQueryScreen}
        component={BrandingMaterialQueryScreen}
      />
      <Stack.Screen
        name={RouteString.ReferralSubmissionScreen}
        component={ReferralSubmissionScreen}
      />
      <Stack.Screen
        name={RouteString.RewardStatusScreen}
        component={RewardStatusScreen}
      />
      <Stack.Screen
        name={RouteString.RewardStatusdetailScreen}
        component={RewardStatusdetailScreen}
      />
      <Stack.Screen
        name={RouteString.NewDealerOnboardScreen}
        component={NewDealerOnboardScreen}
      />
      <Stack.Screen
        name={RouteString.ViewDealerDetailScreen}
        component={ViewDealerDetailScreen}
      />
    </Stack.Navigator>
  );
}

function OrderHistory() {
  const { portal } = useAppSelector((state) => state.auth);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={RouteString.OrderHistoryScreen}
        initialParams={{ type: undefined }}
        component={
          portal === UserType.DISTRIBUTOR || portal === UserType.ASO
            ? DealerManagementScreen
            : portal === UserType.ENGINEER || portal === UserType.MASON
            ? RewardStatusScreen
            : OrderHistoryScreen
        }
      />
      <Stack.Screen
        name={RouteString.CancelOrderScreen}
        component={CancelOrderScreen}
      />
      <Stack.Screen
        name={RouteString.ViewDealerDetailScreen}
        component={ViewDealerDetailScreen}
      />
      <Stack.Screen
        name={RouteString.NewDealerOnboardScreen}
        component={NewDealerOnboardScreen}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  icons: {
    width: isiPAD ? wp(4) : wp(6),
    height: isiPAD ? wp(4) : wp(6),
    resizeMode: "contain",
  },
  profile: {
    width: isiPAD ? wp(4) : wp(6),
    height: isiPAD ? wp(4) : wp(6),
    resizeMode: "cover",
    borderRadius: 50,
  },
  label: {
    fontFamily: FontPath.OutfitMedium,
    fontSize: RFValue(10),
    marginTop: hp(0.5),
    textAlign: "center",
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
