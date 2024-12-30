export interface IAuthSliceInitialState {
  portal: string;
  token: string;
  FCMToken:string;
  user_approval_status: string;
  userInfo: {
    dealerNumber: number;
    asoNumber: any;
    masonNumber: any;
    distributorNumber:number
    name: string;
    dob: string;
    email: string;
    address: string
    id: string;
    member: any;
    mobile_number: string;
    profile_pic:{
      name:string
      file_path:string
    };
    aadhaar_card:{
      name:string
      file_path:string
    }
    pan_card:{
      name:string
      file_path:string
    }
    gst_certificate:{
      name:string
      file_path:string
    }
    cheque:{
      name:string
      file_path:string
    }
    status:{
      by_dealer:string
      by_aso:string
      by_distributor:string
      by_admin:string
    }
    company:string
    role:[]
    region:[]
    skill:[]
    scheme:[]
    work_city:string
    zipcode:number
    user_approval_status:string
    registration_pending:boolean
  };
}
