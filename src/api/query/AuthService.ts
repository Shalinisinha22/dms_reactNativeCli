import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../ApiService";
import { API_ENDPOINT } from "../ApiEndPoint";
import { SignUpPayload } from "../ApiPayloadType";

export const useSignUp = () => {
  return useMutation({
    mutationFn: async (payload: SignUpPayload) => {
      const response= await axiosInstance.post(
        API_ENDPOINT.SIGNUP,
        payload
      );
      return response.data;
    },
  });
};
 