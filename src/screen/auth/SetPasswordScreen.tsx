import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SafeAreaContainer from '../../components/common/SafeAreaContainer';
import BackIcons from '../../assets/svg/BackIcons';
import {hp, RFValue, wp} from '../../helper/Responsive';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {ImagePath} from '../../utils/ImagePath';
import {colors} from '../../utils/Colors';
import {FontPath} from '../../utils/FontPath';
import {useAppSelector} from '../../redux/Store';
import TextInputField from '../../components/common/TextInputField';
import {useFormik} from 'formik';
import {RouteString} from '../../navigation/RouteString';
import {setPasswordValidationSchema} from '../../utils/ValidationSchema';
import Button from '../../components/common/Button';
import {useTranslation} from 'react-i18next';
import { commonStyle } from '../../utils/commonStyles';

const SetPasswordScreen = () => {
  const {t} = useTranslation();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const {portal} = useAppSelector(state => state.auth);

  const {handleChange, handleBlur, handleSubmit, values, touched, errors} =
    useFormik({
      initialValues: {newPassword: '', passwordConfirmation: ''},
      validationSchema: setPasswordValidationSchema,
      onSubmit: values =>
        navigation.navigate(RouteString.RegistrationFormScreen),
    });

  return (
    <SafeAreaContainer showHeader={false}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <BackIcons />
        </Pressable>
        <Image source={ImagePath.appLogo} style={styles.appLogo} />
        <Text style={styles.portalAccess}>{portal}</Text>
        <Text style={commonStyle.login}>{t('setPassword.setPassword')}</Text>
        <TextInputField
          title={t('setPassword.newPassword')}
          placeholder={t('setPassword.newPassword')}
          isPassword={true}
          value={values.newPassword}
          onChangeText={handleChange('newPassword')}
          onBlur={handleBlur('newPassword')}
          touched={touched.newPassword}
          errors={errors.newPassword}
          isRequired={true}
        />
        <TextInputField
          title={t('setPassword.confirmPassword')}
          placeholder={t('setPassword.confirmPassword')}
          isPassword={true}
          value={values.passwordConfirmation}
          onChangeText={handleChange('passwordConfirmation')}
          onBlur={handleBlur('passwordConfirmation')}
          touched={touched.passwordConfirmation}
          errors={errors.passwordConfirmation}
          isRequired={true}
        />
        <Button
          buttonName={t('setPassword.submit')}
          isLoading={false}
          onPress={() =>  navigation.navigate(RouteString.RegistrationFormScreen)}
        />
      </KeyboardAwareScrollView>
    </SafeAreaContainer>
  );
};

export default SetPasswordScreen;

const styles = StyleSheet.create({
  backButton: {
    marginHorizontal: wp(5),
  },
  appLogo: {
    width: wp(35),
    height: wp(35),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  portalAccess: {
    color: colors.black,
    fontSize: RFValue(16),
    fontFamily: FontPath.OutfitRegular,
    textAlign: 'center',
    marginVertical: hp(1),
    lineHeight:hp(3),
  }
});
