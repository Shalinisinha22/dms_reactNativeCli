import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomBackDrop from './CustomBackDrop';
import {colors} from '../../utils/Colors';
import {hp, isiPAD, RFValue, wp} from '../../helper/Responsive';
import Modal from 'react-native-modal';
import {LogoutModalProps} from '../../interfaces/Types';
import {IconsPath} from '../../utils/IconPath';
import {FontPath} from '../../utils/FontPath';
import {useTranslation} from 'react-i18next';

const LogoutModal = ({isVisible, backOnPress}: LogoutModalProps) => {
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
        <Image source={IconsPath.alert} style={styles.successImage} />
        <Text style={styles.success}>{t('logOut.areYouSure')}</Text>
        <Text style={styles.des}>{t('logOut.des')}</Text>
        <View style={styles.buttonRowView}>
          <Pressable
            onPress={backOnPress}
            style={[styles.button, {backgroundColor: colors.lightGray_4}]}>
            <Text style={[styles.buttonName, {color: colors.darkGray}]}>
              {t('logOut.no')}
            </Text>
          </Pressable>
          <Pressable style={styles.button}>
            <Text style={styles.buttonName}>{t('logOut.yes')}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default LogoutModal;

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
    paddingHorizontal: isiPAD ? wp(5) : wp(10),
  },
  closeButton: {
    backgroundColor: colors.primary,
    alignSelf: 'flex-end',
    width: isiPAD ? wp(6) : wp(9),
    height: isiPAD ? wp(6) : wp(9),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  closeIcons: {
    width: isiPAD ? wp(3) : wp(3.5),
    height: isiPAD ? wp(3) : wp(3.5),
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
  button: {
    width: isiPAD ? wp(38) : wp(33),
    marginTop: hp(3),
    backgroundColor: colors.primary,
    height: isiPAD ? hp(7) : hp(5.5),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: isiPAD ? 12 : 5,
  },
  buttonName: {
    fontFamily: FontPath.OutfitBold,
    fontSize:  RFValue(15),
    color: colors.white,
  },
  buttonRowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
