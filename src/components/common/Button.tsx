import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {colors} from '../../utils/Colors';
import {hp, RFValue, wp} from '../../helper/Responsive';
import {FontPath} from '../../utils/FontPath';
import {ButtonProps} from '../../interfaces/Types';

const Button = ({buttonName, onPress, isLoading, buttonStyle}: ButtonProps) => {
  return (
    <Pressable style={[styles.button, buttonStyle]} disabled={isLoading} onPress={onPress}>
      {isLoading ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <Text style={styles.buttonName}>{buttonName}</Text>
      )}
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    height: hp(6),
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(90),
    alignSelf: 'center',
    marginTop: hp(4),
    borderRadius: 5,
  },
  buttonName: {
    color: colors.white,
    fontFamily: FontPath.OutfitBold,
    fontSize: RFValue(18),
  },
});
