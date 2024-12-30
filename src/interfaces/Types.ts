import { Dispatch, SetStateAction } from 'react';
import {
  ImageSourcePropType,
  KeyboardType,
  NativeSyntheticEvent,
  StyleProp,
  TextInputFocusEventData,
  ViewStyle,
} from 'react-native';

export type TextInputFieldProps = {
  title: string;
  placeholder: string;
  isPassword: boolean;
  value: string;
  onChangeText: (text: string) => void;
  onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  touched: boolean | undefined;
  errors: string | any;
  keyboardType?: KeyboardType;
  maxLength?: number;
  InputViewStyle?: StyleProp<ViewStyle>;
  multiline?: boolean;
  mainViewStyle?: StyleProp<ViewStyle>;
  isRequired: boolean;
  textInputStyle?: StyleProp<ViewStyle>;
};

export type TextInputFieldOptionalProps = {
  title: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  InputViewStyle?: StyleProp<ViewStyle>;
  mainViewStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<ViewStyle>;
  maxLength?: number
  onTouchStart?: () => void
  editable?: boolean
};

export type ButtonProps = {
  buttonName: string;
  onPress: () => void;
  isLoading: boolean;
  buttonStyle?: StyleProp<ViewStyle>;
};

export type DocumentUploadViewProps = {
  title: string;
  icons: ImageSourcePropType;
  onPress: () => void;
  fileName: string;
  isRequired: boolean
};

export type OrderTrackingProps = {
  selectedStep: number;
  containerStyle?: StyleProp<ViewStyle>;
  isCheckIcons?: boolean;
  orderIcons:ImageSourcePropType
  distributorIcons:ImageSourcePropType
  asoIcons:ImageSourcePropType
  dispatchedIcons:ImageSourcePropType
  dealerIcons?:ImageSourcePropType
  admin:boolean
  adminIcon?:ImageSourcePropType
};

export type TwoStepOrderTrackingProps = {
  selectedStep: number;
  containerStyle?: StyleProp<ViewStyle>;
  isCheckIcons?: boolean;
  dealerIcons?:ImageSourcePropType
  asoIcons:ImageSourcePropType
}

export type TotalOrderCardProps = {
  source: ImageSourcePropType;
  title: string;
  total: string;
  onPress: () => void
};

export type OrderPlacementCardProps = {
  productName: string;
  value: any;
  onChangeText: (text: string) => void
  mt: number
};

export type FilterModalProps = {
  isVisible: boolean;
  backOnPress: () => void;
  setStartDate: Dispatch<SetStateAction<string>>
  setEndDate: Dispatch<SetStateAction<string>>
  isStartDate:string
  isEndDate:string
};

export type RejectOrderModalProps = {
  isVisible: boolean;
  backOnPress: () => void;
  id?:string
  isRefresh: () => void;
};

export type PerviousOrderModalProps = {
  isVisible: boolean;
  backOnPress: () => void;
}

export type SuccessModalProps = {
  isVisible: boolean;
  backOnPress: () => void;
};

export type LogoutModalProps = {
  isVisible: boolean;
  backOnPress: () => void;
  yesOnPress: () => void;
};

export type DocumentViewModalProps = {
  isVisible: boolean;
  backOnPress: () => void;
  item:any
}

export type DropDownViewProps = {
  zIndex: number;
  label: string;
  placeHolder: string;
  mainViewStyle?: StyleProp<ViewStyle>
  data?: any
  selectedName: (name: any) => void
  selectedId?: ((id: any) => void | any) | undefined
  errors: string | undefined | any
  isRequired?: boolean
};

export type SearchDropDownViewProps = {
  zIndex: number;
  label: string;
  placeHolder: string;
  mainViewStyle?: StyleProp<ViewStyle>
  data?: any
  selectedName: (name: string) => void
  errors: string | undefined
  isRequired?: boolean
};

export type UserInfoRowViewProps = {
  title: string;
  userInfo: string;
};

export type drawerItemType = {
  routes: string;
  name: string;
  icons: ImageSourcePropType | undefined;
};


export enum UserType {
  DEALER = "dealer",
  DISTRIBUTOR = "distributor",
  ASO = "aso",
  ENGINEER = "engineer",
  MASON = "mason"
}

export type DistributorOrderWithProgressCardProps = {
  approveOnPress: () => void
  rejectOnPress: () => void
  item:any
}

export type DealerManagementCardProps = {
  item:any
  ApproveOnPress: () => void
  RejectOnPress: () => void
}

export type OrderCardProps = {
  isShowButton: boolean
  orderModifiedOnPress?: () => void
  perviouseOnPress?: () => void
  item: any
}

export type CustomToggleProps = {
  initialValue: boolean;
  onToggle: (val: boolean) => void;
};

export type DealerInfoViewProps = {
  title: string
  des: string
}

export type SearchViewProps = {
  searchMainViewStyle?: StyleProp<ViewStyle>
  value:string
  onChangeText:(text:string) => void
  placeholder?: string
}