export type ParamsType = {
  VerifyOTPScreen: {
    mobile_number: string;
    from: string;
  };
  SetPasswordScreen: {
    from: string;
  };
  ConfirmOrderScreen: {
    id: string;
    from: string;
    order: {
      sku: string;
      name: string;
      description: string;
      price_per_mt: number;
      value: string;
      createdAt: string;
      updatedAt: string;
      id: string;
      productId: string;
    }[];
    distributorid: string;
  };
  PlaceOrderScreen: {
    item: {
      products: [];
      distributorId: string;
    };
  };
  InvoiceDetailScreen: {
    item: {
      voucher_number:string;
      bill_to_name:string;
      address_1:string;
      state:string
      country:string
      zipcode:string
      invoiceDate:string
      dueDate:string
      items:{
        item_name:string
        qty:number
        amount:number
      }[]
    };
  };
  ViewOrderScreen: {
    id: string;
  };
  ViewDealerDetailScreen: {
    id: string;
    type: string;
  };
  OrderHistoryScreen: {
    type: string;
  };
  OrderPlacementScreen: {
    item: {
      products: [];
      distributorId: string;
      id: string;
    };
  };
};
