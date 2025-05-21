import { RouteString } from "../navigation/RouteString";
import { IconsPath } from "./IconPath";
import { ImagePath } from "./ImagePath";

export const chooseLanguage = [
  {
    language: "English",
  },
  {
    language: "हिन्दी",
  },
];

export const portalOption = [
  {
    name: "Dealer",
    icons: ImagePath.dealer,
  },
  {
    name: "Distributor",
    icons: ImagePath.distributor,
  },
  {
    name: "Aso",
    icons: ImagePath.aso,
  },
  {
    name: "Engineer",
    icons: ImagePath.engineer,
  },
  {
    name: "Mason",
    icons: ImagePath.mason,
  },
];

export const dealerDrawerOption = [
  {
    name: "drawer.dashboard",
    icons: IconsPath.dashboard,
    routes: RouteString.HomeScreen,
  },
  {
    name: "drawer.orderPlacement",
    icons: IconsPath.placeOrderRed,
    routes: RouteString.PlaceOrderScreen,
  },
  {
    name: "drawer.orderHistory",
    icons: IconsPath.orderHistoryRed,
    routes: RouteString.OrderHistory,
  },
  {
    name: "drawer.myInvoice",
    icons: IconsPath.invocie,
    routes: RouteString.InvoiceScreen,
  },
  {
    name: "drawer.ledger",
    icons: IconsPath.lender,
    routes: RouteString.LedgerScreen,
  },
  {
    name: "drawer.myScheme",
    icons: IconsPath.scheme,
    routes: RouteString.MySchemeScreen,
  },
  {
    name: "drawer.brandingRequest",
    icons: IconsPath.branding,
    routes: RouteString.BrandingRequestScreen,
  },
  {
    name: "drawer.support",
    icons: IconsPath.support,
    routes: RouteString.SupportRequestScreen,
  },
  {
    name: "drawer.logOut",
    icons: IconsPath.logOut,
    routes: "",
  },
];

export const distributorDrawerOption = [
  {
    name: "drawer.dashboard",
    icons: IconsPath.dashboard,
    routes: RouteString.HomeScreen,
  },
   {
    name: "drawer.todaysRate",
    icons: IconsPath.rate, 
    routes: RouteString.TodaysRateScreen,
  },
  {
    name: "drawer.orderList",
    icons: IconsPath.orderHistoryRed,
    routes: RouteString.PlaceOrderScreen,
  },
  {
    name: "drawer.myLedger",
    icons: IconsPath.invocie,
    routes: RouteString.LedgerScreen,
  },
  {
    name: "drawer.myInvoice",
    icons: IconsPath.invocie,
    routes: RouteString.InvoiceScreen,
  },
  {
    name: "drawer.dealerwiseSales",
    icons: IconsPath.dealerWiseSales,
    routes: RouteString.DealerWiseSalesScreen,
  },
  {
    name: "drawer.dealerManagemet",
    icons: IconsPath.invocie,
    routes: RouteString.OrderHistory,
  },
  {
    name: "drawer.RunningScheme",
    icons: IconsPath.scheme,
    routes: RouteString.ViewSchemeScreen,
  },
  {
    name: "drawer.brandingRequest",
    icons: IconsPath.branding,
    routes: RouteString.BrandingRequestScreen,
  },
  {
    name: "drawer.support",
    icons: IconsPath.support,
    routes: RouteString.SupportRequestScreen,
  },
  {
    name: "drawer.logOut",
    icons: IconsPath.logOut,
    routes: "",
  },
];

export const asoDrawerOption = [
  {
    name: "drawer.dashboard",
    icons: IconsPath.dashboard,
    routes: RouteString.HomeScreen,
  },
    {
    name: "drawer.todaysRate", 
    icons: IconsPath.rate, 
    routes: RouteString.TodaysRateScreen, 
  },
  {
    name: "drawer.orderList",
    icons: IconsPath.orderHistoryRed,
    routes: RouteString.PlaceOrderScreen,
  },
  {
    name: "drawer.dealerwiseSales",
    icons: IconsPath.dealerWiseSales,
    routes: RouteString.DealerWiseSalesScreen,
  },
  {
    name: "drawer.dealerManagemet",
    icons: IconsPath.invocie,
    routes: RouteString.DealerManagementScreen,
  },
  {
    name: "drawer.masonManagement",
    icons: IconsPath.mason,
    routes: RouteString.MasonManagementScreen,
  },
  {
    name: "drawer.engineerManagement",
    icons: IconsPath.engineer,
    routes: RouteString.EngineerManagementScreen,
  },
  {
    name: "drawer.brandingMaterialquery",
    icons: IconsPath.brandingMaterial,
    routes: RouteString.BrandingMaterialQueryScreen,
  },
  {
    name: "drawer.support",
    icons: IconsPath.support,
    routes: RouteString.SupportRequestScreen,
  },
  {
    name: "drawer.logOut",
    icons: IconsPath.logOut,
    routes: "",
  },
];

export const masonANdEngineerDrawerOption = [
  {
    name: "drawer.dashboard",
    icons: IconsPath.dashboard,
    routes: RouteString.HomeScreen,
  },
  {
    name: "drawer.referralSubmission",
    icons: IconsPath.placeOrderRed,
    routes: RouteString.PlaceOrderScreen,
  },
  {
    name: "drawer.rewardStatus",
    icons: IconsPath.orderHistoryRed,
    routes: RouteString.OrderHistory,
  },
  {
    name: "drawer.RunningScheme",
    icons: IconsPath.scheme,
    routes: RouteString.ViewSchemeScreen,
  },
  {
    name: "drawer.support",
    icons: IconsPath.support,
    routes: RouteString.SupportRequestScreen,
  },
  {
    name: "drawer.logOut",
    icons: IconsPath.logOut,
    routes: "",
  },
];

export const orderStatusOption = [
  {
    name: "dashboard.placeNewOrder",
    icons: IconsPath.pluse2,
    routes: RouteString.PlaceOrderScreen,
  },
  {
    name: "dashboard.viewOrderHistory",
    icons: IconsPath.easy,
    routes: RouteString.OrderHistory,
  },
  {
    name: "dashboard.myScheme",
    icons: IconsPath.scheme,
    routes: RouteString.MySchemeScreen,
  },
  {
    name: "dashboard.supportRequest",
    icons: IconsPath.support,
    routes: RouteString.SupportRequestScreen,
  },
  {
    name: "dashboard.brandingMaterialRequest",
    icons: IconsPath.branding,
    routes: RouteString.BrandingRequestScreen,
  },
];
export const brandingRequestItem = [
  {
    name: "GSB/ Sign Board",
  },
  {
    name: "UniPol",
  },
  {
    name: "Wall Wrap",
  },
  {
    name: "Wall Painting",
  },
  {
    name: "Dealer Certificate",
  },
  {
    name: "Shop Branding",
  },
  {
    name: "Poll Kiosk",
  },
];

export const orderMoreOption = [
  {
    name: "dashboard.approveOrder",
    icons: IconsPath.checkRound,
    routes: RouteString.PlaceOrderScreen,
  },
  {
    name: "dashboard.manageOrder",
    icons: IconsPath.placeOrder,
    routes: RouteString.OrderHistory,
  },
  {
    name: "dashboard.viewLedger",
    icons: IconsPath.easy,
    routes: RouteString.LedgerScreen,
  },
  {
    name: "dashboard.onboardDealer",
    icons: IconsPath.profile,
    routes: RouteString.NewDealerOnboardScreen,
  },
];

export const asoMoreOption = [
  {
    name: "dashboard.approveOrder",
    icons: IconsPath.checkRound,
    routes: RouteString.PlaceOrderScreen,
  },
  {
    name: "dashboard.manageOrder",
    icons: IconsPath.placeOrder,
    routes: RouteString.DealerManagementScreen,
  },
  {
    name: "dashboard.viewLedger",
    icons: IconsPath.easy,
    routes: RouteString.LedgerScreen,
  },
];

export const masonAndEngineerMoreOption = [
  {
    name: "drawer.referralSubmission",
    icons: IconsPath.checkRound,
    routes: RouteString.PlaceOrderScreen,
  },
  {
    name: "drawer.rewardStatus",
    icons: IconsPath.placeOrder,
    routes: RouteString.OrderHistory,
  },
];
export const orderHistoryType = [
  "orderHistory.all",
  "orderHistory.approved",
  "orderHistory.rejected",
  "orderHistory.dispatched",
  "orderHistory.pending",
];
export const dealerManagementType = [
  "orderHistory.all",
  "orderHistory.approved",
  "orderHistory.rejected",
  "orderHistory.pending",
];
export const asorManagementType = [
  "orderHistory.all",
  "orderHistory.approved",
  "orderHistory.rejected",
  "orderHistory.pending",
];
export const rewardType = [
  "orderHistory.all",
  "orderHistory.approved",
  "orderHistory.rejected",
];
export const dealerManagementType1 = [
  "orderHistory.all",
  "orderHistory.approved",
  "orderHistory.pending",
];

export const supportRequestType = [
  {
    name: "General",
  },
  {
    name: "Order Related",
  },
  {
    name: "Distributorship Related",
  },
  {
    name: "Dealership Related",
  },
  {
    name: "Others",
  },
];

export const masonSkill = [
  {
    name: "masonSkill.bricklayingAndBlocklaying",
  },
  {
    name: "masonSkill.ConcreteAndCementWork",
  },
  {
    name: "masonSkill.TileSetting",
  },
  {
    name: "masonSkill.StoneMasonry",
  },
  {
    name: "masonSkill.BlueprintReadingAndInterpretation",
  },
  {
    name: "masonSkill.Others",
  },
];
