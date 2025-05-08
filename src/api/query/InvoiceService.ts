import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../ApiService";
import { API_ENDPOINT } from "../ApiEndPoint";
import { DownloadPdfPayload, InvoiceDetilsPayload, MyInvoiceGSTPayload, MyOrdersPayload } from "../ApiPayloadType";

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

export const useMyInvoiceGST = () => {
  return useMutation({
    mutationFn: async (payload: MyInvoiceGSTPayload) => {
      const response = await axiosInstance.get(
        API_ENDPOINT.GET_INVOICE_GST+ payload?.gst + `?startDate=${payload.startDate}&endDate=${payload.endDate}&page=${payload.page}`);
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


export const useDownloadPdf = () => {
  return useMutation({
    mutationFn: async (payload: DownloadPdfPayload) => {
      const response = await axiosInstance.post(
        API_ENDPOINT.DOWNLOAD_PDF,
        payload
      );
      return response.data;
    },
  });
};
