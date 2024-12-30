import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../ApiService";
import { API_ENDPOINT } from "../ApiEndPoint";
import { UpdateProfilePayload } from "../ApiPayloadType";

export const useGetProfile = () => {
  return useQuery({
    queryKey: ["useGetProfile"],
    queryFn: async () => {
      const response = await axiosInstance.get(API_ENDPOINT.GET_PROFILE);
      return response.data;
    },
  });
};

export const useGetUser = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.get(API_ENDPOINT.GET_USER);
      return response.data;
    },
  });
};


export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: async (payload: UpdateProfilePayload) => {
      const response = await axiosInstance.put(
        API_ENDPOINT.UPDATE_PROFILE,
        payload
      );
      return response.data;
    },
  });
};
