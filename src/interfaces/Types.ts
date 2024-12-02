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
};

export type TextInputFieldOptionalProps = {
  title: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  InputViewStyle?: StyleProp<ViewStyle>;
  mainViewStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<ViewStyle>;
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
};

export type TotalOrderCardProps = {
  source: ImageSourcePropType;
  title: string;
  total: string;
};

export type OrderPlacementCardProps = {
  productName: string;
  value: string;
  onChangeText: (text: string) => void
};

export type FilterModalProps = {
  isVisible: boolean;
  backOnPress: () => void;
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
};

export type DropDownViewProps = {
  zIndex: number;
  label: string;
  placeHolder: string;
  mainViewStyle?: StyleProp<ViewStyle>
  data?: any
  selectedName: (name: string) => void
  errors: string | undefined
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
  DEALER = "Dealer",
  DISTRIBUTOR = "Distributor",
  ASO = "Aso",
  ENGINEER = "Engineer",
  MASON = "Mason"
}

export type DistributorOrderWithProgressCardProps = {
  approveOnPress: () => void
  rejectOnPress: () => void
}

export type DealerManagementCardProps = {
  isApproved: boolean
}

export type OrderCardProps = {
  isShowButton: boolean
  orderModifiedOnPress?: () => void
  perviouseOnPress?: () => void
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
}