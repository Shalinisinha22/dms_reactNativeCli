import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import SafeAreaContainer from '../../components/common/SafeAreaContainer';
import {
  dealerDrawerOption,
  distributorDrawerOption,
  userProfileImage,
} from '../../utils/JsonData';
import {hp, isiPAD, RFValue, wp} from '../../helper/Responsive';
import {IconsPath} from '../../utils/IconPath';
import {colors} from '../../utils/Colors';
import {FontPath} from '../../utils/FontPath';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {RouteString} from '../RouteString';
import LogoutModal from '../../components/modal/LogoutModal';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '../../redux/Store';
import {drawerItemType, UserType} from '../../interfaces/Types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CustomDrawerContent = (props: any) => {
  const {t} = useTranslation();
  const {portal} = useAppSelector(state => state.auth);
  const {top} = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [isLogOut, setIsLogOut] = useState(false);

  const drawer: any =
    portal === UserType.DEALER
      ? dealerDrawerOption
      : portal === UserType.DISTRIBUTOR && distributorDrawerOption;

  const IdDes =
    portal === UserType.DEALER
      ? t('drawer.dealerCode')
      : portal === UserType.DISTRIBUTOR && t('drawer.distributorID');

  return (
    <View style={{marginTop: top}}>
      <View style={styles.topHeaderView}>
        <View style={styles.imageRowView}>
          <Image source={{uri: userProfileImage}} style={styles.userProfile} />
          <View>
            <Text style={styles.userName}>Rajesh Kumar</Text>
            <Text style={styles.code}>
              {IdDes} : BDMDL0001
            </Text>
          </View>
        </View>
        <Pressable >
          <Image source={IconsPath.edit} style={styles.edit} />
        </Pressable>
      </View>
      {drawer.map((item: drawerItemType, index: number) => {
        return (
          <Pressable
            style={styles.button}
            key={index}
            onPress={() => {
              if (item.routes == RouteString.DropDownNavigator) {
                navigation.navigate(item.routes, {
                  screen: RouteString.BottomTabNavigator,
                });
              } else if (item.name === 'drawer.logOut') {
                setIsLogOut(true);
              } else if (
                item.routes === RouteString.PlaceOrderScreen ||
                item.routes === RouteString.OrderHistory
              ) {
                navigation.navigate(RouteString.DropDownNavigator, {
                  screen: RouteString.BottomTabNavigator,
                  params: {
                    screen: item.routes,
                  },
                });
              } else {
                navigation.navigate(RouteString.DropDownNavigator, {
                  screen: RouteString.BottomTabNavigator,
                  params: {
                    screen: RouteString.Home,
                    params: {
                      screen: item.routes,
                    },
                  },
                });
              }
            }}>
            <Image
              source={item.icons}
              style={styles.edit}
              tintColor={colors.primary}
            />
            <Text style={styles.buttonName}>{t(`${item.name}`)}</Text>
          </Pressable>
        );
      })}
      <LogoutModal
        isVisible={isLogOut}
        backOnPress={() => setIsLogOut(!isLogOut)}
      />
    </View>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  userProfile: {
    width: isiPAD ? wp(9) : wp(13),
    height: isiPAD ? wp(9) : wp(13),
    resizeMode: 'cover',
    borderRadius: 100,
    marginRight: wp(2),
  },
  topHeaderView: {
    marginHorizontal: wp(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(3),
  },
  imageRowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    color: colors.black,
    fontFamily: FontPath.OutfitMedium,
    fontSize: RFValue(16),
  },
  code: {
    color: colors.darkGray,
    fontFamily: FontPath.OutfitLight,
    fontSize: RFValue(10),
  },
  edit: {
    width: isiPAD ? wp(4.5) : wp(6),
    height: isiPAD ? wp(4.5) : wp(6),
    resizeMode: 'cover',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp(5),
    marginBottom: hp(3),
  },
  buttonName: {
    fontSize: RFValue(18),
    fontFamily: FontPath.OutfitRegular,
    marginLeft: wp(3),
    lineHeight:hp(3.5)
  },
});
