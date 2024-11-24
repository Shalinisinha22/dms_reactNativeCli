import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, { useEffect } from 'react';
import Routes from './src/navigation/Routes';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from './src/redux/Store';
import SplashScreen from 'react-native-splash-screen';
import { colors } from './src/utils/Colors';

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, []);


  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Routes />
        <StatusBar translucent barStyle={'dark-content'} backgroundColor={colors.white}/>
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
