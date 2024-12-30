import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../ApiService";
import { API_ENDPOINT } from "../ApiEndPoint";
import { InvoiceDetilsPayload, MyOrdersPayload } from "../ApiPayloadType";

export const useMyInvoice = () => {
  return useMutation({
    mutationFn: async (payload: MyOrdersPayload) => {
      const response = await axiosInstance.get(
        API_ENDPOINT.GET_INVOICE +
          `?startDate=${payload.startDate}&endDate=${payload.endDate}`
      );
      return response.data;
    },
  });
};

export const useMyInvoiceDetils = () => {
  return useMutation({
    mutationFn: async (payload: InvoiceDetilsPayload) => {
      const response = await axiosInstance.get(
        API_ENDPOINT.INVOICE_DETAILS +
          `/${payload.invoiceId}/get/details`
      );
      return response.data;
    },
  });
};

export const useMyledgers = () => {
  return useMutation({
    mutationFn: async (payload: MyOrdersPayload) => {
      const response = await axiosInstance.get(
        API_ENDPOINT.GET_LEDGERS +
          `?startDate=${payload.startDate}&endDate=${payload.endDate}`
      );
      return response.data;
    },
  });
};
