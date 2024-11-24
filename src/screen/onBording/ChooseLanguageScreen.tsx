import {Image, Pressable, StyleSheet, Text} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../utils/Colors';
import {ImagePath} from '../../utils/ImagePath';
import {hp, RFValue, wp} from '../../helper/Responsive';
import {FontPath} from '../../utils/FontPath';
import SafeAreaContainer from '../../components/common/SafeAreaContainer';
import {chooseLanguage} from '../../utils/JsonData';
import { useTranslation } from 'react-i18next';
import '../../localization/i18n'
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { RouteString } from '../../navigation/RouteString';
import { commonStyle } from '../../utils/commonStyles';

const ChooseLanguageScreen = () => {
  const {i18n, t } = useTranslation();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [isSelectLanguage, setIsSelectLanguage] = useState<number | null>(0);


  const changeLanguage = (index: number) => {
    setIsSelectLanguage(index)
    i18n.changeLanguage(index == 0 ? 'en': 'hi');
    navigation.navigate(RouteString.ChoosePortalAccessScreen)
  };

  return (
    <SafeAreaContainer showHeader={false}>
      <Image source={ImagePath.appLogo} style={commonStyle.appLogo} />
      <Text style={styles.languageTitle}>{t('onBording.chooseLanguage')}</Text>
      {chooseLanguage.map((item, index) => {
        const isSelected = isSelectLanguage === index;
        const borderColor =
          isSelectLanguage === 0
            ? colors.green
            : isSelectLanguage === 1
            ? colors.blue
            : 'transparent';
        const textColor = index === 0 ? colors.green : colors.blue;
        return (
          <Pressable
            key={index}
            onPress={() => changeLanguage(index)}
            style={[
              styles.button,
              {
                backgroundColor:
                  index == 0 ? colors.lightGreen : colors.lightBlue,
                borderColor: isSelected ? borderColor : 'transparent',
              },
            ]}>
            <Text
              style={[
                styles.language,
                {
                  color: textColor,
                },
              ]}>
              {item.language}
            </Text>
          </Pressable>
        );
      })}
    </SafeAreaContainer>
  );
};

export default ChooseLanguageScreen;

const styles = StyleSheet.create({
  languageTitle: {
    fontFamily: FontPath.OutfitSemiBold,
    color: colors.black,
    fontSize: RFValue(24),
    textAlign: 'center',
    lineHeight: hp(5),
    marginVertical: hp(2),
  },
  button: {
    borderWidth: 3,
    height: hp(15),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: wp(5),
    marginBottom: hp(2),
    borderRadius: 10,
  },
  language: {
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(30),
    lineHeight: hp(8),
  },
});
