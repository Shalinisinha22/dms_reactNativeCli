import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../ApiService";
import { API_ENDPOINT } from "../ApiEndPoint";
import { GetRewardStatusPayload, ReferralDetailsPayload } from "../ApiPayloadType";

export const useGetRewardStatus = () => {
  return useMutation({
    mutationFn: async (payload: GetRewardStatusPayload) => {
      const response = await axiosInstance.get(
        API_ENDPOINT.GET_REWARD_STATUS +
          `?status=${payload.status}&startDate=${payload.startDate}&endDate=${payload.endDate}`
      );
      return response.data;
    },
  });
};

export const useGetreferralDetails = () => {
  return useMutation({
    mutationFn: async (payload: ReferralDetailsPayload) => {
      const response = await axiosInstance.get(
        API_ENDPOINT.REFERRAL_DETAILS +
          `/${payload.referralId}/details`
      );
      return response.data;
    },
  });
};

