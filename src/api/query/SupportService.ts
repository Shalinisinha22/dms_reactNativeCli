import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../ApiService";
import { API_ENDPOINT } from "../ApiEndPoint";
import { SupportPayload } from "../ApiPayloadType";

export const useSupport = () => {
  return useMutation({
    mutationFn: async (payload: SupportPayload) => {
      const response = await axiosInstance.post(
        API_ENDPOINT.SUPPORT_REQUEST,
        payload
      );
      return response.data;
    },
  });
};

export const useBranding = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const response = await axiosInstance.post(
        API_ENDPOINT.BRANDING_REQUEST,
        payload
      );
      return response.data;
    },
  });
};

export const useBrandingList = () => {
  return useQuery({
    queryKey: ["useBrandingList"],
    queryFn: async () => {
      const response = await axiosInstance.get(API_ENDPOINT.BRANDING_LIST);
      return response.data;
    },
  });
};
