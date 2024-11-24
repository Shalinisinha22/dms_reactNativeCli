import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import SafeAreaContainer from '../../components/common/SafeAreaContainer';
import {colors} from '../../utils/Colors';
import {FontPath} from '../../utils/FontPath';
import {hp, RFValue, wp} from '../../helper/Responsive';
import DropDownView from '../../components/common/DropDownView';
import TextInputField from '../../components/common/TextInputField';
import {useFormik} from 'formik';
import {supportRequestValidationSchema} from '../../utils/ValidationSchema';
import Button from '../../components/common/Button';
import SuccessModal from '../../components/modal/SuccessModal';
import {useTranslation} from 'react-i18next';
import { supportRequestType } from '../../utils/JsonData';

const SupportRequestScreen = () => {
  const {t} = useTranslation();
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  const {handleChange, handleBlur, handleSubmit, values, touched, errors} =
    useFormik({
      initialValues: {
        description: '',
      },
      validationSchema: supportRequestValidationSchema,
      onSubmit: values => console.log('==>', values),
    });

  return (
    <SafeAreaContainer>
      <Text style={styles.title}>{t('supportRequest.supportRequest')}</Text>
      <DropDownView
        zIndex={1}
        label={t('supportRequest.requestType')}
        placeHolder={t('supportRequest.selectCategory')}
        data={supportRequestType}
      />
      <TextInputField
        title={t('supportRequest.description')}
        placeholder={t('supportRequest.enterDescription')}
        isPassword={false}
        value={values.description}
        onChangeText={handleChange('description')}
        onBlur={handleBlur('description')}
        touched={touched.description}
        errors={errors.description}
        InputViewStyle={styles.inputView}
        multiline
        isRequired={false}
      />
      <Button
        buttonName={t('cancelOrder.Submit')}
        isLoading={false}
        onPress={handleSubmit}
      />
      <SuccessModal
        isVisible={isSubmitSuccess}
        backOnPress={() => setIsSubmitSuccess(!isSubmitSuccess)}
      />
    </SafeAreaContainer>
  );
};

export default SupportRequestScreen;

const styles = StyleSheet.create({
  title: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(20),
    marginHorizontal: wp(5),
    marginVertical: hp(2.5),
  },
  inputView: {
    height: hp(15),
    alignItems: 'flex-start',
    paddingVertical: hp(2),
  },
});
