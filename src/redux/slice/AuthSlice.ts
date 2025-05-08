import { createSlice } from "@reduxjs/toolkit";
import { IAuthSliceInitialState } from "../StateType";

const initialState: IAuthSliceInitialState = {
  portal: "",
  token: "",
  FCMToken: "",
  user_approval_status: "pending",
  userInfo: {
    name: "",
    dob: "",
    email: "",
    address: "",
    id: "",
    member: [],
    mobile_number: "",
    profile_pic: {
      name: "",
      file_path: ""
    },
    aadhaar_card: {
      name: "",
      file_path: ""
    },
    pan_card: {
      name: "",
      file_path: ""
    },
    gst_certificate: {
      name: "",
      file_path: ""
    },
    cheque: {
      name: "",
      file_path: ""
    },
    status: {
      by_dealer: "",
      by_aso: "",
      by_distributor: "",
      by_admin: ""
    },
    company: "",
    gst_number:"",
    role: [],
    region: [],
    skill: [],
    scheme: [],
    work_city: "",
    zipcode: 0,
    user_approval_status: "",
    registration_pending: false,
    dealerNumber: 0,
    asoNumber: undefined,
    masonNumber: undefined,
    distributorNumber: 0
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setPortal: (state, action) => {
      state.portal = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setUserStatus: (state, action) => {
      state.user_approval_status = action.payload;
    },
    setFCMToken: (state, action) => {
      state.FCMToken = action.payload;
    }
  },
});

export default authSlice.reducer;

export const authActions = authSlice.actions;
