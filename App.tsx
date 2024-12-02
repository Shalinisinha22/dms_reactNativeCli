import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, { useEffect } from 'react';
import Routes from './src/navigation/Routes';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from './src/redux/Store';
import SplashScreen from 'react-native-splash-screen';
import { colors } from './src/utils/Colors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <Routes />
        <StatusBar translucent barStyle={'dark-content'} backgroundColor={colors.white}/>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
