import { string } from "yup";

export type ParamsType = {
  VerifyOTPScreen: {
    mobile_number: string;
  };
  ConfirmOrderScreen: {
    order: {
      sku: string;
      name: string;
      description: string;
      price_per_mt: number;
      value: string;
      createdAt: string;
      updatedAt: string;
      id: string;
      productId: string
    }[];
  };
  PlaceOrderScreen:{
    item:{
      products:[]
    }
  }
  InvoiceDetailScreen:{
    id:string
  }
  ViewOrderScreen:{
    id:string
  }
  ViewDealerDetailScreen:{
    id:string
    type:string
  }
  OrderHistoryScreen:{
    type: string
  }
};
