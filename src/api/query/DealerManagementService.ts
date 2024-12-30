import axiosInstance from "../ApiService";
import { API_ENDPOINT } from "../ApiEndPoint";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ApproveUserPayload, GetDealerStatusPayload, GetUserDetailsByIDPayload, MyOrdersPayload } from "../ApiPayloadType";

export const useGetDealerStatus = () => {
  return useMutation({
    mutationFn: async (payload: GetDealerStatusPayload) => {
      const response = await axiosInstance.get(
        API_ENDPOINT.GET_DEALER + `${payload.dealerStatus}`
      );
      return response.data;
    },
  });
};

export const useNewDealerRegister = () => {
  return useMutation({
    mutationFn: async (payload: FormData) => {
      const response = await axiosInstance.post(
        API_ENDPOINT.NEW_DEALER_REGISTER,
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

export const useGetDealerSales = () => {
  return useMutation({
    mutationFn: async (payload: MyOrdersPayload) => {
      const response = await axiosInstance.get(
        API_ENDPOINT.ALL_DEALER_SALES +
          `?startDate=${payload.startDate}&endDate=${payload.endDate}`
      );
      return response.data;
    },
  });
};


export const useGetUserDetailsByID = () => {
  return useMutation({
    mutationFn: async (payload: GetUserDetailsByIDPayload) => {
      const response = await axiosInstance.get(
        API_ENDPOINT.GET_USER_DETAILS_BY_USERID +
          `/${payload.role}/${payload.userId}/details`
      );
      return response.data;
    },
  });
};

export const useApproveUser = () => {
  return useMutation({
    mutationFn: async (payload: ApproveUserPayload) => {
      const response = await axiosInstance.get(
        API_ENDPOINT.APPROVE_USER +
          `/${payload.role}/${payload.userId}/${payload.status}`
      );
      return response.data;
    },
  });
};