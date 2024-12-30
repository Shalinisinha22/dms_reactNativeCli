import { API_URL } from "@env";
import axios from "axios";
import store from "../redux/Store";
import { navigationRef } from "../navigation/Routes";
import { RouteString } from "../navigation/RouteString";
import { authActions } from "../redux/slice/AuthSlice";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding authorization token
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = store.getState()?.auth?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors and token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle server errors
    if (error.response?.status === 500) {
      return Promise.reject(new Error("Server error. Please try again later."));
    }
    if(error.response?.status === 403){
      if (navigationRef.isReady()) {
        navigationRef.reset({ index: 0, routes: [{ name: RouteString.Auth }] });
        store.dispatch(authActions.setPortal(""));
        store.dispatch(authActions.setToken(""));
        store.dispatch(authActions.setUserInfo({}));
        store.dispatch(authActions.setUserStatus("pending"));
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
