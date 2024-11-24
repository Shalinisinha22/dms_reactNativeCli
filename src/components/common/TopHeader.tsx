import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {hp, isiPAD, wp} from '../../helper/Responsive';
import {colors} from '../../utils/Colors';
import {IconsPath} from '../../utils/IconPath';
import {ImagePath} from '../../utils/ImagePath';
import {
  DrawerActions,
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {RouteString} from '../../navigation/RouteString';
import i18n from '../../localization/i18n';

const TopHeader = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  return (
    <View style={styles.headerRowView}>
      <View style={styles.secondRowViwe}>
        <Pressable
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Image source={IconsPath.menu} style={styles.icons} />
        </Pressable>
        <Image source={ImagePath.appLogo} style={styles.appLogo} />
      </View>
      <View style={styles.secondRowViwe}>
        <Pressable
          onPress={() => navigation.navigate(RouteString.NotificationScreen)}>
          <Image source={IconsPath.notification} style={styles.icons} />
        </Pressable>
        <Pressable onPress={() => i18n.changeLanguage(i18n.language == 'en' ? 'hi' : 'en')}>
          <Image
            source={IconsPath.translate}
            style={[styles.icons, {marginLeft: wp(4)}]}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default TopHeader;

const styles = StyleSheet.create({
  icons: {
    width: isiPAD ? wp(4) : wp(6),
    height: isiPAD ? wp(4) : wp(6),
    resizeMode: 'contain',
  },
  appLogo: {
    width:isiPAD ? wp(6) : wp(9),
    height:isiPAD ? wp(6) : wp(9),
    marginLeft: wp(4),
    resizeMode: 'contain',
  },
  secondRowViwe: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRowView: {
    flexDirection: 'row',
    height:isiPAD ? wp(11) : hp(7),
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4.65,
    elevation: 4,
    zIndex: 1,
  },
});
