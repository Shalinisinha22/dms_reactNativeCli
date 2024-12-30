/**
 * @format
 */
import 'intl-pluralrules';
import 'react-native-gesture-handler';
import {Alert, AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from "@react-native-firebase/messaging";

messaging().onMessage(async (remoteMessage) => {
    console.log("A new FCM message arrived:", remoteMessage);
  });
  

AppRegistry.registerComponent(appName, () => App);
