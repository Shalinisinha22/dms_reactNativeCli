import * as yup from 'yup';
import 'yup-phone-lite';

export const loginValidationSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .phone('IN', "error.validPhoneNumber")
    .required('error.phoneNumberRequired'),
    password: yup
    .string()
    .required('error.passwordRequired')
    .min(8, 'error.password8Required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
      'error.passwordUppercaseRequired',
    ),
});


export const forgotPasswordValidationSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .phone('IN', "error.validPhoneNumber")
    .required('error.phoneNumberRequired'),
});


export const signUpValidationSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .phone('IN', "error.validPhoneNumber")
    .required('error.phoneNumberRequired'),
  email: yup
    .string()
    .email('error.emailValid')
    .required('error.emailRequired'),
  fullname: yup.string().required('error.fullnameRequired'),
});

export const setPasswordValidationSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required('error.newPasswordRequired')
    .min(8, 'error.password8Required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
      'error.passwordUppercaseRequired',
    ),
  passwordConfirmation: yup
    .string()
    .required('error.confirmationPasswordRequired')
    .oneOf([yup.ref('newPassword')], 'error.passwordMatch'),
});

export const dealerValidationSchema = yup.object().shape({
  firmName: yup.string().required('error.firmNameRequired'),
  workCity: yup.string().required('error.workCityRequired'),
  zipCode: yup.string().required('error.zipCodeRequired'),
  counterAddress: yup.string().required('error.counterAddressRequired'),
});

export const cancelationRemarksValidationSchema = yup.object().shape({
  remarks: yup.string().required('error.remarksRequired'),
  reason: yup.string().required('error.reasonRequired'),
});

export const supportRequestValidationSchema = yup.object().shape({
  description: yup.string().required('error.descriptionRequired'),
  type: yup.string().required('error.requestTypeRequired'),
});


export const newDealerValidationSchema = yup.object().shape({
  firmName: yup.string().required('error.firmNameRequired'),
  fullname: yup.string().required('error.fullnameRequired'),
  email: yup
  .string()
  .email('error.emailValid')
  .required('error.emailRequired'),
  phoneNumber: yup
  .string()
  .phone('IN', "error.validPhoneNumber")
  .required('error.phoneNumberRequired'),
  workCity: yup.string().required('error.workCityRequired'),
  counterAddress: yup.string().required('error.counterAddressRequired'),
});

export const asoRegistrationValidationSchema = yup.object().shape({
  workCity: yup.string().required('error.workCityRequired'),
  zipCode: yup.string().required('error.zipCodeRequired'),
  region: yup.array().required('error.areaRegionRequired')
})

export const asoNewDealerOnboard = yup.object().shape({
  name: yup.string().required('error.nameRequired'),
  email: yup
  .string()
  .email('error.emailValid')
  .required('error.emailRequired'),
  phoneNumber: yup
  .string()
  .phone('IN', "error.validPhoneNumber")
  .required('error.phoneNumberRequired'),
  city: yup.string().required('error.cityRequired'),
  address: yup.string().required('error.addressRequired'),
})

export const masonOnboard = yup.object().shape({
  name: yup.string().required('error.nameRequired'),
  email: yup
  .string()
  .email('error.emailValid')
  .required('error.emailRequired'),
  phoneNumber: yup
  .string()
  .phone('IN', "error.validPhoneNumber")
  .required('error.phoneNumberRequired'),
  city: yup.string().required('error.cityRequired'),
  address: yup.string().required('error.addressRequired'),
  masonSkill: yup.string().required('error.masonRequired'),
})

export const masonAndEngineerRegistration = yup.object().shape({
  workCity: yup.string().required('error.workCityRequired'),
  zipCode: yup.string().required('error.zipCodeRequired'),
  counterAddress: yup.string().required('error.counterAddressRequired'),
})

export const referralSubmission = yup.object().shape({
  referral: yup.string().required('error.referralRequired'),
  phoneNumber: yup
  .string()
  .phone('IN', "error.validPhoneNumber")
  .required('error.phoneNumberRequired'),
  productUsed: yup.array().required('error.productUsedRequired'),
  address: yup.string().required('error.addressRequired'),
})