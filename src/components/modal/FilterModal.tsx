import React, {useEffect, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CustomBackDrop from './CustomBackDrop';
import Button from '../common/Button';
import {FilterModalProps} from '../../interfaces/Types';
import {colors} from '../../utils/Colors';
import {hp, isiPAD, RFValue, wp} from '../../helper/Responsive';
import {FontPath} from '../../utils/FontPath';
import {IconsPath} from '../../utils/IconPath';
import {useTranslation} from 'react-i18next';

const FilterModal = ({isVisible, backOnPress}: FilterModalProps) => {
  const {t} = useTranslation();
  const [isStartDate, setStartDate] = useState('');
  const [isEndDate, setEndDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [activePicker, setActivePicker] = useState<any>(null);

  useEffect(() => {
    setStartDate('');
    setEndDate('');
  }, []);

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    const formattedDate = date.toISOString().split('T')[0];
    if (activePicker === 'startDate') {
      setStartDate(formattedDate);
    } else if (activePicker === 'endDate') {
      setEndDate(formattedDate);
    }
    hideDatePicker();
  };

  return (
    <Modal
      isVisible={isVisible}
      statusBarTranslucent
      style={styles.modal}
      customBackdrop={<CustomBackDrop onPress={backOnPress} />}>
      <View style={styles.mainView}>
        <View style={styles.filterRowView}>
          <Text style={styles.filter}>{t('filter.filter')}</Text>
          <Pressable style={styles.closeButton} onPress={backOnPress}>
            <Image source={IconsPath.close} style={styles.closeIcons} />
          </Pressable>
        </View>
        <View style={styles.line} />
        <View style={styles.mainDateView}>
          <Text style={styles.label}>{t('filter.stratDate')}</Text>
          <Pressable
            style={styles.dateButton}
            onPress={() => {
              setActivePicker('startDate');
              setDatePickerVisibility(true);
            }}>
            <Image source={IconsPath.calendar} style={styles.calendarIcon} />
            <Text style={styles.selectDate}>
              {isStartDate ? isStartDate : t('filter.selectStratDate')}
            </Text>
          </Pressable>
        </View>
        <View style={[styles.mainDateView, {marginTop: hp(2)}]}>
          <Text style={styles.label}>{t('filter.endDate')}</Text>
          <Pressable
            style={styles.dateButton}
            onPress={() => {
              setActivePicker('endDate');
              setDatePickerVisibility(true);
            }}>
            <Image source={IconsPath.calendar} style={styles.calendarIcon} />
            <Text style={styles.selectDate}>
              {isEndDate ? isEndDate : t('filter.selectEndDate')}
            </Text>
          </Pressable>
        </View>
        <Button
          buttonName={t('filter.applyFilter')}
          isLoading={false}
          onPress={() => {
            console.log('Filters Applied:', {isStartDate, isEndDate});
          }}
        />
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </Modal>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
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
  mainView: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingVertical: hp(3),
  },
  closeButton: {
    width: isiPAD ? wp(5) : wp(8),
    height: isiPAD ? wp(5) : wp(8),
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  closeIcons: {
    width: isiPAD ? wp(2) : wp(3),
    height: isiPAD ? wp(2) : wp(3),
    resizeMode: 'contain',
  },
  line: {
    height: hp(0.2),
    width: wp(100),
    backgroundColor: colors.lightGray_3,
    marginVertical: hp(2.5),
  },
  mainDateView: {
    marginHorizontal: wp(5),
  },
  label: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(14),
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    height: hp(5),
    borderRadius: 5,
    paddingHorizontal: wp(4),
    marginTop: hp(1.5),
  },
  calendarIcon: {
    width: isiPAD ? wp(4) : wp(6),
    height: isiPAD ? wp(4) : wp(6),
    resizeMode: 'contain',
  },
  selectDate: {
    color: colors.darkGray,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(12),
    marginLeft: wp(3),
  },
});
