import { RouteString } from "../navigation/RouteString";
import { IconsPath } from "./IconPath";
import { ImagePath } from "./ImagePath";

export const userProfileImage = 'https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

export const chooseLanguage = [
  {
    language: 'English',
  },
  {
    language: 'हिन्दी',
  },
];

export const portalOption = [
  {
    name: 'Dealer',
    icons: ImagePath.dealer
  },
  {
    name: 'Distributor',
    icons: ImagePath.distributor
  },
  {
    name: 'Aso',
    icons: ImagePath.aso
  },
  {
    name: 'Engineer',
    icons: ImagePath.engineer
  },
  {
    name: 'Mason',
    icons: ImagePath.mason
  }
]

export const dealerDrawerOption = [
  {
    name: 'drawer.dashboard',
    icons: IconsPath.dashboard,
    routes: RouteString.DropDownNavigator
  },
  {
    name: 'drawer.orderPlacement',
    icons: IconsPath.placeOrder,
    routes: RouteString.PlaceOrderScreen
  },
  {
    name: 'drawer.orderHistory',
    icons: IconsPath.orderHistory,
    routes:RouteString.OrderHistory
  },
  {
    name: 'drawer.myInvoice',
    icons: IconsPath.invocie,
    routes:RouteString.InvoiceScreen
  },
  {
    name: 'drawer.ledger',
    icons: IconsPath.lender,
    routes: RouteString.LedgerScreen
  },
  {
    name: 'drawer.myScheme',
    icons: IconsPath.scheme,
    routes:RouteString.MySchemeScreen
  },
  {
    name: 'drawer.brandingRequest',
    icons: IconsPath.branding,
    routes:RouteString.BrandingRequestScreen
  },
  {
    name: 'drawer.support',
    icons: IconsPath.support,
    routes:RouteString.SupportRequestScreen
  },
  {
    name: 'drawer.logOut',
    icons: IconsPath.logOut,
    routes:''
  }
]

export const distributorDrawerOption = [
  {
    name: 'drawer.dashboard',
    icons: IconsPath.dashboard,
    routes: RouteString.DropDownNavigator
  },
  {
    name: 'drawer.orderApproval',
    icons: IconsPath.placeOrder,
    routes: RouteString.PlaceOrderScreen
  },
  {
    name: 'drawer.orderList',
    icons: IconsPath.orderHistory,
    routes:RouteString.OrderHistory
  },
  {
    name: 'drawer.myLedger',
    icons: IconsPath.invocie,
    routes:RouteString.LedgerScreen
  },
  {
    name: 'drawer.myInvoice',
    icons: IconsPath.invocie,
    routes:RouteString.InvoiceScreen
  },
  {
    name: 'drawer.dealerwiseSales',
    icons: IconsPath.dealerWiseSales,
    routes:RouteString.InvoiceScreen
  },
  {
    name: 'drawer.dealerManagemet',
    icons: IconsPath.invocie,
    routes:RouteString.DealerManagementScreen
  },
  {
    name: 'drawer.RunningScheme',
    icons: IconsPath.scheme,
    routes:RouteString.ViewSchemeScreen
  },
  {
    name: 'drawer.brandingRequest',
    icons: IconsPath.branding,
    routes:RouteString.BrandingRequestScreen
  },
  {
    name: 'drawer.support',
    icons: IconsPath.support,
    routes:RouteString.SupportRequestScreen
  },
  {
    name: 'drawer.logOut',
    icons: IconsPath.logOut,
    routes:''
  }
]

export const orderStatusOption = [
  {
    name: 'dashboard.placeNewOrder',
    icons: IconsPath.pluse2,
    routes: RouteString.OrderPlacementScreen
  },
  {
    name: 'dashboard.viewOrderHistory',
    icons: IconsPath.easy,
    routes: RouteString.OrderHistory
  },
  {
    name: 'dashboard.myScheme',
    icons: IconsPath.scheme,
    routes: RouteString.MySchemeScreen
  },
  {
    name: 'dashboard.supportRequest',
    icons: IconsPath.support,
    routes: RouteString.SupportRequestScreen
  },
  {
    name: 'dashboard.brandingMaterialRequest',
    icons: IconsPath.branding,
    routes: RouteString.BrandingRequestScreen
  }
]
export const brandingRequestItem = [
  {
    name: 'GSB/ Sign Board'
  },
  {
    name: 'UniPol'
  },
  {
    name: 'Wall Wrap'
  },
  {
    name: 'Wall Painting'
  },
  {
    name: 'Dealer Certificate'
  },
  {
    name: 'Shop Branding'
  },
  {
    name: 'Poll Kiosk'
  }
]

export const orderHistoryType = ['orderHistory.all','orderHistory.approved', 'orderHistory.rejected', 'orderHistory.dispatched']

export const orderMoreOption = [
  {
    name: 'dashboard.approveOrder',
    icons: IconsPath.checkRound,
    routes: ''
  },
  {
    name: 'dashboard.manageOrder',
    icons: IconsPath.placeOrder,
    routes: ''
  },
  {
    name: 'dashboard.viewLedger',
    icons: IconsPath.easy,
    routes: ''
  },
  {
    name: 'dashboard.onboardDealer',
    icons: IconsPath.profile,
    routes: ''
  }
]

export const dealerManagementType = ['orderHistory.all','orderHistory.approved', 'orderHistory.rejected']

export const supportRequestType = [
  {
    name: 'General'
  },
  {
    name: 'Order Related'
  },
  {
    name: 'Distributorship Related'
  },
  {
    name: 'Dealership Related'
  },
  {
    name: 'Others'
  }
]