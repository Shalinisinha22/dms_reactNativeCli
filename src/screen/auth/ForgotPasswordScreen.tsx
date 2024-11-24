import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SafeAreaContainer from '../../components/common/SafeAreaContainer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import BackIcons from '../../assets/svg/BackIcons';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {hp, RFValue, wp} from '../../helper/Responsive';
import VerifyOtpIcons from '../../assets/svg/VerifyOtpIcons';
import {FontPath} from '../../utils/FontPath';
import {colors} from '../../utils/Colors';
import TextInputField from '../../components/common/TextInputField';
import {useFormik} from 'formik';
import {forgotPasswordValidationSchema} from '../../utils/ValidationSchema';
import {RouteString} from '../../navigation/RouteString';
import Button from '../../components/common/Button';
import {useTranslation} from 'react-i18next';

const ForgotPasswordScreen = () => {
  const {t} = useTranslation();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const {handleChange, handleBlur, handleSubmit, values, touched, errors} =
    useFormik({
      initialValues: {phoneNumber: ''},
      validationSchema: forgotPasswordValidationSchema,
      onSubmit: values => navigation.navigate(RouteString.VerifyOTPScreen),
    });

  return (
    <SafeAreaContainer showHeader={false}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <BackIcons />
        </Pressable>
        <View style={{alignSelf: 'center'}}>
          <VerifyOtpIcons />
        </View>
        <Text style={styles.title}>{t('login.enterMobileNo')}</Text>
        <Text style={styles.des}>
          {t('login.enterYourRegisteredMobileNumber')}
        </Text>
        <TextInputField
          placeholder={t('login.enterMobileNo')}
          isPassword={false}
          value={values.phoneNumber}
          onChangeText={handleChange('phoneNumber')}
          onBlur={handleBlur('phoneNumber')}
          touched={touched.phoneNumber}
          errors={errors.phoneNumber}
          title={''}
          isRequired={false}
        />
        <Button
          buttonName={t('signUp.sendOtp')}
          isLoading={false}
          onPress={() => navigation.navigate(RouteString.VerifyOTPScreen)}
        />
      </KeyboardAwareScrollView>
    </SafeAreaContainer>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  backButton: {
    marginHorizontal: wp(5),
  },
  title: {
    fontFamily: FontPath.OutfitBold,
    fontSize: RFValue(26),
    marginVertical: hp(2),
    alignSelf: 'center',
  },
  des: {
    textAlign: 'center',
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(15),
    color: colors.darkGray,
    maxWidth: wp(80),
    lineHeight:hp(3),
    alignSelf: 'center',
  },
});
