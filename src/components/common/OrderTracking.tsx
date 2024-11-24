import {View, Text, StyleSheet, Image, Animated} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {hp, isiPAD, RFValue, wp} from '../../helper/Responsive';
import {colors} from '../../utils/Colors';
import {FontPath} from '../../utils/FontPath';
import {OrderTrackingProps} from '../../interfaces/Types';
import {IconsPath} from '../../utils/IconPath';
import { useTranslation } from 'react-i18next';

const OrderTracking = ({
  selectedStep,
  containerStyle,
  isCheckIcons,
}: OrderTrackingProps) => {
  const {t} = useTranslation();

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.mainView}>
        <View>
          <View
            style={[
              styles.round,
              {
                backgroundColor:
                  selectedStep > 0 ? colors.green_1 : colors.lightGray_1,
              },
            ]}>
            {selectedStep > 0 && isCheckIcons && (
              <Image source={IconsPath.check} style={styles.checkIcons} />
            )}
          </View>
          <Text style={styles.label}>{t('dashboard.ordered')}</Text>
        </View>
        <View style={[styles.line,{
          backgroundColor: selectedStep > 0 ? colors.green_1 : colors.lightGray_1,
        }]} />
        <View>
          <View
            style={[
              styles.round,
              {
                backgroundColor:
                  selectedStep > 1 ? colors.green_1 : colors.lightGray_1,
              },
            ]}>
            {selectedStep > 1 && isCheckIcons && (
              <Image source={IconsPath.check} style={styles.checkIcons} />
            )}
          </View>
          <Text style={styles.label}>{t('dashboard.approvedByDisctributor')}</Text>
        </View>
        <View style={[styles.line,{
          backgroundColor: selectedStep > 1 ? colors.green_1 : colors.lightGray_1,
        }]} />
        <View>
          <View
            style={[
              styles.round,
              {
                backgroundColor:
                  selectedStep > 2 ? colors.green_1 : colors.lightGray_1,
              },
            ]}>
            {selectedStep > 2 && isCheckIcons && (
              <Image source={IconsPath.check} style={styles.checkIcons} />
            )}
          </View>
          <Text style={styles.label}>{t('dashboard.approvedByASO')}</Text>
        </View>
        <View style={[styles.line,{
          backgroundColor: selectedStep > 2 ? colors.green_1 : colors.lightGray_1,
        }]} />
        <View>
          <View
            style={[
              styles.round,
              {
                backgroundColor:
                  selectedStep >= 3 ? colors.green_1 : colors.lightGray_1,
              },
            ]}>
            {selectedStep >= 3 && isCheckIcons && (
              <Image source={IconsPath.check} style={styles.checkIcons} />
            )}
          </View>
          <Text style={styles.label}>{t('dashboard.orderDispatched')}</Text>
        </View>
      </View>
    </View>
  );
};

export default OrderTracking;

const styles = StyleSheet.create({
  mainView: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  round: {
    width: isiPAD ? wp(4) : wp(5),
    height: isiPAD ? wp(4) :  wp(5),
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  line: {
    width: wp(18),
    height: hp(0.5),
  },
  label: {
    position: 'absolute',
    width: wp(20),
    zIndex: 1,
    marginTop: hp(3.5),
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(11),
    alignSelf: 'center',
    textAlign: 'center',
  },
  container: {
    alignSelf: 'center',
    marginTop: hp(2),
  },
  checkIcons: {
    width:  isiPAD ? wp(2) :  wp(2.5),
    height: isiPAD ? wp(2) :  wp(2.5),
    resizeMode: 'contain',
  },
  animationLine: {
    height: hp(0.5),
    backgroundColor: colors.green_1,
  },
});
