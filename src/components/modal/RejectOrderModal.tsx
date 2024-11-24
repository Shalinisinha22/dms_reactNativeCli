import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {FilterModalProps} from '../../interfaces/Types';
import Modal from 'react-native-modal';
import CustomBackDrop from './CustomBackDrop';
import {colors} from '../../utils/Colors';
import {hp, RFValue, wp} from '../../helper/Responsive';
import {FontPath} from '../../utils/FontPath';
import {IconsPath} from '../../utils/IconPath';
import DropDownView from '../common/DropDownView';
import TextInputField from '../common/TextInputField';
import {useFormik} from 'formik';
import {cancelationRemarksValidationSchema} from '../../utils/ValidationSchema';
import Button from '../common/Button';
import { supportRequestType } from '../../utils/JsonData';

const RejectOrderModal = ({isVisible, backOnPress}: FilterModalProps) => {
  const {t} = useTranslation();

  const {handleChange, handleBlur, handleSubmit, values, touched, errors} =
    useFormik({
      initialValues: {
        remarks: '',
      },
      validationSchema: cancelationRemarksValidationSchema,
      onSubmit: values => console.log('==>', values),
    });

  return (
    <Modal
      isVisible={isVisible}
      statusBarTranslucent
      style={styles.modal}
      customBackdrop={<CustomBackDrop onPress={backOnPress} />}>
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.mainView}>
          <View style={styles.filterRowView}>
            <Text style={styles.filter}>{t('orderHistory.rejectOrder')}</Text>
            <Pressable style={styles.closeButton} onPress={backOnPress}>
              <Image source={IconsPath.close} style={styles.closeIcons} />
            </Pressable>
          </View>
          <View style={styles.line} />
          <DropDownView
            zIndex={1}
            label={t('orderHistory.reason')}
            placeHolder={t('orderHistory.selectReason')}
            data={supportRequestType}
          />
          <TextInputField
            title={t('orderHistory.remark')}
            placeholder={t('orderHistory.enterTheDescription')}
            isPassword={false}
            value={values.remarks}
            onChangeText={handleChange('remarks')}
            onBlur={handleBlur('remarks')}
            touched={touched.remarks}
            errors={errors.remarks}
            InputViewStyle={styles.inputView}
            multiline
            isRequired={false}
          />
          <Button
            buttonName={t('orderHistory.rejectOrders')}
            isLoading={false}
            onPress={() => null}
          />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default RejectOrderModal;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  mainView: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingVertical: hp(3),
  },
  filterRowView: {
    flexDirection: 'row',
    marginHorizontal: wp(5),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filter: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(20),
  },
  closeButton: {
    width: wp(8),
    height: wp(8),
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  closeIcons: {
    width: wp(3),
    height: wp(3),
    resizeMode: 'contain',
  },
  line: {
    height: hp(0.2),
    width: wp(100),
    backgroundColor: colors.lightGray_3,
    marginVertical: hp(2.5),
  },
  inputView: {
    height: hp(15),
    alignItems: 'flex-start',
    paddingVertical: hp(2),
  },
});
