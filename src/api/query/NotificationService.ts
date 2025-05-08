import { useMutation, useQuery } from "@tanstack/react-query";
import { API_ENDPOINT } from "../ApiEndPoint";
import axiosInstance from "../ApiService";
import { NotificationUnReadPayload, SendFCMTokenPayload } from "../ApiPayloadType";

export const useSendFCMToken = () => {
  return useMutation({
    mutationFn: async (payload: SendFCMTokenPayload) => {
      const response = await axiosInstance.post(
        API_ENDPOINT.SEND_FCM_TOKEN,
        payload
      );
      return response.data;
    },
  });
};

export const useGetNotificationUnRead = () => {
  return useMutation({
    mutationFn: async (payload: NotificationUnReadPayload) => {
      const response = await axiosInstance.get(API_ENDPOINT.GET_NOTIFICATION_UNREAD + `?page=${payload.page}`);
      return response.data;
    },
  });
};
