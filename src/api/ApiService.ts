import { API_URL } from "@env";
import axios from "axios";
import store from "../redux/Store";

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
    const token = store.getState()?.auth?.token?.access_token;
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
    return Promise.reject(error);
  }
);

export default axiosInstance;
