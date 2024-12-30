import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../ApiService";
import { API_ENDPOINT } from "../ApiEndPoint";
import { GetUserRolePayload } from "../ApiPayloadType";

export const useNewMasonRegister = () => {
  return useMutation({
    mutationFn: async (payload: FormData) => {
      const response = await axiosInstance.post(
        API_ENDPOINT.NEW_MASON_REGISTER,
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



export const useGetUserRole = () => {
  return useMutation({
    mutationFn: async (payload: GetUserRolePayload) => {
      const response = await axiosInstance.get(
        API_ENDPOINT.GET_USER_ROLE +
          `/${payload.role}/list?status=${payload.status}`
      );
      return response.data;
    },
  });
};