import {createSlice} from '@reduxjs/toolkit';
import { IAuthSliceInitialState } from '../StateType';

const initialState: IAuthSliceInitialState = {
  portal: ''
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setPortal: (state, action) => {
      state.portal = action.payload;
    },
    
  },
});

export default authSlice.reducer;

export const authActions = authSlice.actions;
