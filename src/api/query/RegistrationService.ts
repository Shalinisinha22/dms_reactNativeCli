import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINT } from "../ApiEndPoint";
import axiosInstance from "../ApiService";

export const useDealerRegister = () => {
  return useMutation({
    mutationFn: async (payload: FormData) => {
      const response = await axiosInstance.post(
        API_ENDPOINT.DEALER_REGISTER,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    },
  });
};

export const useAsoRegister = () => {
  return useMutation({
    mutationFn: async (payload: FormData) => {
      const response = await axiosInstance.post(
        API_ENDPOINT.ASO_REGISTER,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    },
  });
};

export const useDistributorRegister = () => {
  return useMutation({
    mutationFn: async (payload: FormData) => {
      const response = await axiosInstance.post(
        API_ENDPOINT.DISTRIBUTOR_REGISTER,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    },
  });
};

export const useEngineerRegister = () => {
  return useMutation({
    mutationFn: async (payload: FormData) => {
      const response = await axiosInstance.post(
        API_ENDPOINT.ENGINEER_REGISTER,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    },
  });
};

export const useMasonRegister = () => {
  return useMutation({
    mutationFn: async (payload: FormData) => {
      const response = await axiosInstance.post(
        API_ENDPOINT.MASON_REGISTER,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    },
  });
};

export const useReferralRegister = () => {
  return useMutation({
    mutationFn: async (payload: FormData) => {
      const response = await axiosInstance.post(
        API_ENDPOINT.SUBMIT_REFERRAL,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    },
  });
};

