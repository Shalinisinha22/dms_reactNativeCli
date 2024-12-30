import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../ApiService";
import { API_ENDPOINT } from "../ApiEndPoint";
import {
  DeleteAccountPayload,
  LoginPayload,
  ResendOTPPayload,
  ResetPasswordOTPPayload,
  SetPasswordPayload,
  SignUpPayload,
  VerifyOTPPayload,
} from "../ApiPayloadType";

export const useSignUp = () => {
  return useMutation({
    mutationFn: async (payload: SignUpPayload) => {
      const response = await axiosInstance.post(API_ENDPOINT.SIGNUP, payload);
      return response.data;
    },
  });
};

export const useVerifyOTP = () => {
  return useMutation({
    mutationFn: async (payload: VerifyOTPPayload) => {
      const response = await axiosInstance.post(
        API_ENDPOINT.VERIFY_OTP,
        payload
      );
      return response.data;
    },
  });
};

export const useResendOTP = () => {
  return useMutation({
    mutationFn: async (payload: ResendOTPPayload) => {
      const response = await axiosInstance.post(
        API_ENDPOINT.RESEND_OTP,
        payload
      );
      return response.data;
    },
  });
};

export const useSetPassword = () => {
  return useMutation({
    mutationFn: async (payload: SetPasswordPayload) => {
      const response = await axiosInstance.post(
        API_ENDPOINT.SET_PASSWORD,
        payload
      );
      return response.data;
    },
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const response = await axiosInstance.post(API_ENDPOINT.LOGIN, payload);
      return response.data;
    },
  });
};

export const useResetPasswordOTP = () => {
  return useMutation({
    mutationFn: async (payload: ResetPasswordOTPPayload) => {
      const response = await axiosInstance.post(
        API_ENDPOINT.RESET_PASSWORD,
        payload
      );
      return response.data;
    },
  });
};

export const useDeleteAccount = () => {
  return useMutation({
    mutationFn: async (payload: DeleteAccountPayload) => {
      const response = await axiosInstance.delete(
        API_ENDPOINT.DELETE_ACCOUNT + `${payload.userId}/delete`
      );
      return response.data;
    },
  });
};
