import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import SafeAreaContainer from '../../components/common/SafeAreaContainer';
import {ImagePath} from '../../utils/ImagePath';
import {hp, RFValue, wp} from '../../helper/Responsive';
import {colors} from '../../utils/Colors';
import {FontPath} from '../../utils/FontPath';
import {portalOption} from '../../utils/JsonData';
import {useAppDispatch} from '../../redux/Store';
import {authActions} from '../../redux/slice/AuthSlice';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { RouteString } from '../../navigation/RouteString';
import { useTranslation } from 'react-i18next';
import { commonStyle } from '../../utils/commonStyles';

const ChoosePortalAccessScreen = () => {
  const {t } = useTranslation();
  const [isSelectPortal, setIsSelectPortal] = useState('');
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const handleSelectPortal = (name: string) => {
    setIsSelectPortal(name);
    dispatch(authActions.setPortal(name));
    navigation.navigate(RouteString.Auth)
  };

  return (
    <SafeAreaContainer showHeader={false}>
      <Image source={ImagePath.appLogo} style={commonStyle.appLogo} />
      <Text style={styles.portalAccess}>{t('onBording.portalAccress')}</Text>
      <Text style={styles.selectPortal}>{t('onBording.portalAccressDesc')}</Text>
      <View style={styles.rowView}>
        {portalOption.map((item, index) => {
          return (
            <Pressable
              key={index}
              style={[
                styles.button,
                {
                  borderWidth: isSelectPortal == item.name ? 1 : 0,
                },
              ]}
              onPress={() => handleSelectPortal(item.name)}>
              <Image source={item.icons} style={styles.icons} />
              <Text style={styles.name}>{item.name}</Text>
            </Pressable>
          );
        })}
      </View>
    </SafeAreaContainer>
  );
};

export default ChoosePortalAccessScreen;

const styles = StyleSheet.create({
  portalAccess: {
    color: colors.black,
    fontSize: RFValue(16),
    fontFamily: FontPath.OutfitRegular,
    textAlign: 'center',
    marginVertical: hp(1),
  },
  selectPortal: {
    fontFamily: FontPath.OutfitSemiBold,
    color: colors.black,
    lineHeight:hp(5),
    fontSize: RFValue(20),
    textAlign: 'center',
  },
  rowView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: wp(5),
    marginTop: hp(4),
  },
  button: {
    backgroundColor: colors.white,
    width: wp(43),
    justifyContent: 'center',
    alignItems: 'center',
    height: hp(18),
    shadowColor: colors.black,
    borderRadius: 5,
    marginBottom: hp(1),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5.27,
    borderColor: colors.primary,
    elevation: 4,
  },
  icons: {
    width: wp(15),
    height: wp(15),
    resizeMode: 'contain',
  },
  name: {
    textTransform: 'uppercase',
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(15),
    lineHeight:hp(3),
    marginTop: hp(0.8),
  },
});
