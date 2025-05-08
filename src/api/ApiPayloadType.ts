export type SignUpPayload = {
  name: string;
  email: string;
  mobile_number: string;
  role: string;
};

export type VerifyOTPPayload = {
  mobile_number: string;
  otp: string;
};

export type ResendOTPPayload = {
  mobile_number: string;
};

export type SetPasswordPayload = {
  new_password: string;
  confirm_password: string;
};

export type LoginPayload = {
  mobile_number: string;
  password: string;
};

export type ResetPasswordOTPPayload = {
  mobile_number: string;
};

export type MyOrdersPayload = {
  startDate: string;
  endDate: string;
  page: number;
  status?:string
};

export type MyInvoiceGSTPayload = {
  gst: string
  startDate: string;
  endDate: string;
  page: number;
}

export type GetUserDetailsByIDPayload = {
  role:string
  userId:string
};

export type DeleteAccountPayload = {
  userId: string;
};

export type ApproveUserPayload = {
  role:string;
  status:string
  userId: string;
};

export type NewOrderPayload = {
  products: {
    productId: string;
    quantity: string;
  }[];
};

export type GetDistributorListPayload = {
  regions:string
}

export type NotificationUnReadPayload = {
  page: number
}

export type BrandingListProps = {
  page: number
}


export type SupportPayload = {
  requestType: string;
  description: string;
};

export type SendFCMTokenPayload = {
  firebaseToken: string;
};

export type InvoiceDetilsPayload = {
  invoiceId: string;
};

export type GetUserRolePayload = {
  role: string;
  status:string
  page: number
};

export type GetDealerStatusPayload = {
  dealerStatus: string;
};

export type AprroveOrdersPayload = {
  orderId: string;
  status: string;
};

export type RejectOrdersPayload = {
  orderId: string | undefined;
  body: {
    remarks: string;
    reason: string;
  };
};

export type UpdateProfilePayload = {
  dob: string;
  membe: [
    {
      name: string;
      relationship: string;
      dob: string;
    }
  ];
};

export type GetRewardStatusPayload = {
  status: string;
  startDate: string;
  endDate: string;
};

export type GetOrdersDetailsPayload = {
  orderId:string
}

export type ReferralDetailsPayload = {
  referralId:string
}

export type DownloadPdfPayload = {
  invoiceId:string
}