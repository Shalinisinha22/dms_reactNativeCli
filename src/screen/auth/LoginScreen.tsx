import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SafeAreaContainer from '../../components/common/SafeAreaContainer';
import {ImagePath} from '../../utils/ImagePath';
import {hp, RFValue, wp} from '../../helper/Responsive';
import {colors} from '../../utils/Colors';
import {FontPath} from '../../utils/FontPath';
import {useAppSelector} from '../../redux/Store';
import TextInputField from '../../components/common/TextInputField';
import {useFormik} from 'formik';
import {loginValidationSchema} from '../../utils/ValidationSchema';
import Button from '../../components/common/Button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {RouteString} from '../../navigation/RouteString';
import {useTranslation} from 'react-i18next';
import { commonStyle } from '../../utils/commonStyles';

const LoginScreen = () => {
  const {t} = useTranslation();
  const {portal} = useAppSelector(state => state.auth);
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const {handleChange, handleBlur, handleSubmit, values, touched, errors} =
    useFormik({
      initialValues: {phoneNumber: '', password: ''},
      validationSchema: loginValidationSchema,
      onSubmit: values => navigation.navigate(RouteString.SignUpScreen),
    });

  return (
    <SafeAreaContainer showHeader={false}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <Image source={ImagePath.appLogo} style={commonStyle.appLogo} />
        <Text style={styles.portalAccess}>{portal}</Text>
        <Text style={commonStyle.login}>{t('login.singInAccessPotal')}</Text>
        <TextInputField
          title={t('login.enterMobileNo')}
          placeholder={t('login.enterYourMobileNo')}
          isPassword={false}
          value={values.phoneNumber}
          onChangeText={handleChange('phoneNumber')}
          onBlur={handleBlur('phoneNumber')}
          touched={touched.phoneNumber}
          errors={errors.phoneNumber}
          keyboardType="numeric"
          isRequired={true}
        />
        <TextInputField
          title={t('login.password')}
          placeholder={t('login.password')}
          isPassword={true}
          value={values.password}
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          touched={touched.password}
          errors={errors.password}
          isRequired={true}
        />
        <Pressable
          onPress={() => navigation.navigate(RouteString.ForgotPasswordScreen)}>
          <Text style={styles.forgot}>{t('login.forgotPassword')}</Text>
        </Pressable>
        <Button
          buttonName={t('login.signIn')}
          isLoading={false}
          onPress={() => navigation.navigate(RouteString.DropDownNavigator)}
        />
        <View style={styles.haveAccountRowView}>
          <Text style={styles.haveAccount}>{t('login.dontHaveAccount')}</Text>
          <Pressable
            onPress={() => navigation.navigate(RouteString.SignUpScreen)}>
            <Text style={styles.register}> {t('login.registerNow')}</Text>
          </Pressable>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaContainer>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  
  portalAccess: {
    color: colors.black,
    fontSize: RFValue(16),
    fontFamily: FontPath.OutfitRegular,
    textAlign: 'center',
    lineHeight:hp(3),
    marginVertical: hp(1),
  },
  forgot: {
    color: colors.primary,
    fontFamily: FontPath.OutfitMedium,
    fontSize: RFValue(14),
    textAlign: 'right',
    marginHorizontal: wp(5),
    marginTop: hp(1),
  },
  haveAccountRowView: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: hp(2),
  },
  haveAccount: {
    fontFamily: FontPath.OutfitRegular,
    color: colors.darkGray,
    fontSize: RFValue(14),
    lineHeight:hp(3),
  },
  register: {
    color: colors.primary,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(14),
    lineHeight:hp(3),
  },
});
