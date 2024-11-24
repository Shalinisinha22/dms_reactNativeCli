import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomBackDrop from './CustomBackDrop';
import Modal from 'react-native-modal';
import {SuccessModalProps} from '../../interfaces/Types';
import {colors} from '../../utils/Colors';
import {hp, RFValue, wp} from '../../helper/Responsive';
import {IconsPath} from '../../utils/IconPath';
import {FontPath} from '../../utils/FontPath';
import { useTranslation } from 'react-i18next';

const SuccessModal = ({isVisible, backOnPress}: SuccessModalProps) => {
  const {t} = useTranslation();
  return (
    <Modal
      isVisible={isVisible}
      statusBarTranslucent
      style={styles.modal}
      customBackdrop={<CustomBackDrop onPress={backOnPress} />}>
      <View style={styles.mainView}>
        <Pressable style={styles.closeButton} onPress={backOnPress}>
          <Image
            source={IconsPath.close}
            tintColor={colors.white}
            style={styles.closeIcons}
          />
        </Pressable>
        <Image source={IconsPath.success} style={styles.successImage} />
        <Text style={styles.success}>{t('success.success')}</Text>
        <Text style={styles.des}>
        {t('success.des')}
        </Text>
      </View>
    </Modal>
  );
};

export default SuccessModal;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    margin: 0,
  },
  mainView: {
    backgroundColor: colors.white,
    borderRadius: 18,
    marginHorizontal: wp(5),
    paddingVertical: hp(3),
    paddingHorizontal: wp(10),
  },
  closeButton: {
    backgroundColor: colors.primary,
    alignSelf: 'flex-end',
    width: wp(9),
    height: wp(9),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  closeIcons: {
    width: wp(3.5),
    height: wp(3.5),
    resizeMode: 'contain',
  },
  successImage: {
    width: wp(20),
    height: wp(20),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  success: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(24),
    textAlign: 'center',
    marginVertical: hp(0.5),
  },
  des: {
    color: colors.black,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(15),
    textAlign: 'center',
  },
});
