export const API_ENDPOINT = {

    //auth
    SIGNUP: '/api/auth/user/signup',
    VERIFY_OTP: '/api/auth/user/verify/otp',
    RESEND_OTP: '/api/auth/user/resend/otp',
    SET_PASSWORD: '/api/auth/user/set/password',
    LOGIN: '/api/auth/user/login',
    RESET_PASSWORD: '/api/auth/user/password/reset',
    DELETE_ACCOUNT: '/api/user',

    //registrationFrom
    DEALER_REGISTER : '/api/auth/user/dealer/register',
    ASO_REGISTER : '/api/auth/user/aso/register',
    MASON_REGISTER : '/api/auth/user/mason/register',
    ENGINEER_REGISTER : '/api/auth/user/engineer/register',
    DISTRIBUTOR_REGISTER : '/api/auth/user/distributor/register',

    //dashboard
    MY_ORDERS : '/api/my/orders',
    MY_STATS: '/api/my/stats',
    MY_SCHEMES: '/api/my/schemes',
    APPROVE_ORDER: '/api/order/',
    REJECT_ORDER: '/api/order/',
    GET_ORDER_DETAILS: '/api/order/',
    GET_USER_ROLE:'/api',

    //profile
    GET_PROFILE: '/api/user/profile',
    GET_USER: '/api/user/me',
    UPDATE_PROFILE: '/api/user/member/update',

    //invoice
    GET_INVOICE: '/api/my/invoices',
    INVOICE_DETAILS: '/api/invoice',
    GET_INVOICE_GST:'/api/invoiceByGstin/',
    DOWNLOAD_PDF: 'api/getInvoicePDF',

    //ledgers
    GET_LEDGERS: '/api/my/ledgers',

    //product
    GET_PRODUCT_LIST: '/api/get/product/list',
    NEW_ORDER: '/api/order/new',
    UPDATE_ORDER: '/api/order/',

    //distributor
    DISTRIBUTOR_LIST:'/api/available/distributor/list',

    //support
    SUPPORT_REQUEST: '/api/new/support/request',
    BRANDING_REQUEST: '/api/new/branding/request',
    BRANDING_LIST : '/api/request/branding/list',

    //sales
    MY_SALES: '/api/my/sales',

    //dealerManagement
    GET_DEALER: '/api/dealers/by/status?dealerStatus=',
    NEW_DEALER_REGISTER: '/api/register/new/dealer',
    ALL_DEALER_SALES: '/api/sales/by/dealers',
    GET_USER_DETAILS_BY_USERID: '/api',
    APPROVE_USER : '/api/set',

    //masonManagement
    NEW_MASON_REGISTER: '/api/register/new/mason',

    //engineerManagement
    NEW_ENGINEER_REGISTER: '/api/register/new/engineer',

    //referralSubmission
    SUBMIT_REFERRAL: '/api/referral/submit',

    //rewardStatus
    GET_REWARD_STATUS: '/api/get/reward/list',
    REFERRAL_DETAILS: '/api/get/referral',

    //notification
    SEND_FCM_TOKEN : '/api/user/save/firebase-token',
    GET_NOTIFICATION_UNREAD: '/api/notifications/fetch/unread',

    GET_REGIONS: '/api/available/regions/list'

}