import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../ApiService";
import { API_ENDPOINT } from "../ApiEndPoint";
import { GetDistributorListPayload, NewOrderPayload } from "../ApiPayloadType";

export const useGetProductList = () => {
  return useQuery({
    queryKey: ["useGetProductList"],
    queryFn: async () => {
      const response = await axiosInstance.get(API_ENDPOINT.GET_PRODUCT_LIST);
      return response.data;
    },
  });
};

export const useNewOrder = () => {
  return useMutation({
    mutationFn: async (payload: NewOrderPayload) => {
      const response = await axiosInstance.post(
        API_ENDPOINT.NEW_ORDER,
        payload
      );
      return response.data;
    },
  });
};


export const useGetDistributorList = () => {
  return useMutation({
    mutationFn: async (payload: GetDistributorListPayload) => {
      const response = await axiosInstance.get(
        API_ENDPOINT.DISTRIBUTOR_LIST + `?regions=${payload.regions}`);
      return response.data;
    },
  });
};


export const useUpdateOrder = () => {
  return useMutation({
    mutationFn: async (payload: any) => {
      const response = await axiosInstance.put(
        API_ENDPOINT.UPDATE_ORDER + `${payload?.orderId}/update`, payload.data);
      return response.data;
    },
  });
};
