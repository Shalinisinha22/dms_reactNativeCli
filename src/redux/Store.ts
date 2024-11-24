import {configureStore, combineReducers, PayloadAction} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import {PersistConfig, persistReducer, persistStore} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import AuthSlice from './slice/AuthSlice';

const persistConfig: PersistConfig<ReturnType<typeof rootReducer>> = {
  key: 'DMS-redux-root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['auth'],
};

const combinedRootReducer = combineReducers({
  auth: AuthSlice,
});

export type RootState = ReturnType<typeof combinedRootReducer>;

const rootReducer: any = (state: RootState, action: PayloadAction) => {
  return combinedRootReducer(state, action);
};

const persistRootReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistRootReducer,
  middleware: gDM => gDM({serializableCheck: false}).concat(logger),
});

export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
