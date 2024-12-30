import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../ApiService";
import { API_ENDPOINT } from "../ApiEndPoint";

export const useNewEngineerRegister = () => {
    return useMutation({
      mutationFn: async (payload: FormData) => {
        const response = await axiosInstance.post(
          API_ENDPOINT.NEW_ENGINEER_REGISTER,
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
  