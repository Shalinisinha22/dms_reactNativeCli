import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../ApiService";
import { API_ENDPOINT } from "../ApiEndPoint";
import {
  AprroveOrdersPayload,
  GetOrdersDetailsPayload,
  MyOrdersPayload,
  RejectOrdersPayload,
} from "../ApiPayloadType";

export const useMyOrders = () => {
  return useMutation({
    mutationFn: async (payload: MyOrdersPayload) => {
      const response = await axiosInstance.get(
        API_ENDPOINT.MY_ORDERS +
          `?startDate=${payload.startDate}&endDate=${payload.endDate}&page=${payload.page}&status=${payload.status}`
      );
      return response.data;
    },
  });
};

export const useMyStats = () => {
  return useQuery({
    queryKey: ["useMyStats"],
    queryFn: async () => {
      const response = await axiosInstance.get(API_ENDPOINT.MY_STATS);
      return response.data;
    },
  });
};

export const useMySchemes = () => {
  return useQuery({
    queryKey: ["useMySchemes"],
    queryFn: async () => {
      const response = await axiosInstance.get(API_ENDPOINT.MY_SCHEMES);
      console.log(response.data,"scheme response")
      return response.data;
    },
  });
};

export const useMySales = () => {
  return useQuery({
    queryKey: ["useMySales"],
    queryFn: async () => {
      const response = await axiosInstance.get(
        API_ENDPOINT.MY_SALES + "?filterBy=yearly"
      );
      return response.data;
    },
  });
};

export const useAprroveOrders = () => {
  return useMutation({
    mutationFn: async (payload: AprroveOrdersPayload) => {
      const response = await axiosInstance.put(
        API_ENDPOINT.APPROVE_ORDER +
          `${payload.orderId}/set/status/${payload.status}`
      );
      return response.data;
    },
  });
};

export const useRejectOrders = () => {
  return useMutation({
    mutationFn: async (payload: RejectOrdersPayload) => {
      const response = await axiosInstance.post(
        API_ENDPOINT.REJECT_ORDER + `${payload.orderId}/reject`,
        payload.body
      );
      return response.data;
    },
  });
};

export const useGetOrdersDetails = () => {
  return useMutation({
    mutationFn: async (payload: GetOrdersDetailsPayload) => {
      const response = await axiosInstance.get(
        API_ENDPOINT.GET_ORDER_DETAILS + `${payload.orderId}/get/details`,
      );
      return response.data;
    },
  });
};
