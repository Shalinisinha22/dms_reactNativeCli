import {
  Alert,
  Linking,
  PermissionsAndroid,
  Platform,
  StatusBar,
  StyleSheet,
} from "react-native";
import React, { useEffect } from "react";
import Routes, { navigationRef } from "./src/navigation/Routes";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./src/redux/Store";
import SplashScreen from "react-native-splash-screen";
import { colors } from "./src/utils/Colors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { NavigationContainer } from "@react-navigation/native";
import messaging from "@react-native-firebase/messaging";
import {
  getTrackingStatus,
  requestTrackingPermission,
} from "react-native-tracking-transparency";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
    requestUserPermission();
    trackingPermission();
  }, []);

  async function trackingPermission() {
    await requestTrackingPermission();
    const trackingStatus = await getTrackingStatus();

    if (trackingStatus === "authorized" || trackingStatus === "unavailable") {
      console.log("Tracking permission granted");
    } else {
      console.log("Tracking permission denied");
    }
  }

  async function requestUserPermission() {
    await messaging().requestPermission();
    if (Platform.OS === "android") {
      try {
        const res = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );

        if (res === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Notification permission granted");
        } else if (res === PermissionsAndroid.RESULTS.DENIED) {
          console.log("Notification permission denied");
        } else if (res === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          console.log(
            "Notification permission denied and 'Don't ask again' selected"
          );
          Alert.alert(
            "Permission Required",
            "Please enable notification permissions in your device settings.",
            [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "Open Settings",
                onPress: () => Linking.openSettings(),
              },
            ]
          );
        }
      } catch (err) {
        console.error("Error requesting notification permission:", err);
      }
    }
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <Routes />
            <StatusBar
              translucent
              barStyle={"dark-content"}
              backgroundColor={colors.white}
            />
            <Toast />
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
