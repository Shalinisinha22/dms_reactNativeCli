import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {hp, RFValue, wp} from '../../helper/Responsive';
import {FontPath} from '../../utils/FontPath';
import {colors} from '../../utils/Colors';
import {TextInputFieldOptionalProps} from '../../interfaces/Types';

const TextInputFieldOptional = ({
  title,
  InputViewStyle,
  placeholder,
  value,
  onChangeText,
  mainViewStyle,
  labelStyle
}: TextInputFieldOptionalProps) => {
  return (
    <View style={[styles.mainView, mainViewStyle]}>
      <Text style={[styles.label, labelStyle]}>{title}</Text>
      <View style={[styles.inputView, InputViewStyle]}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={colors.darkGray}
          style={styles.textInput}
          value={value}
          onChangeText={onChangeText}
          autoCapitalize="none"
        />
      </View>
    </View>
  );
};

export default TextInputFieldOptional;

const styles = StyleSheet.create({
  mainView: {
    marginHorizontal: wp(5),
    marginTop: hp(3),
  },
  label: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(14),
    marginBottom: hp(2),
    lineHeight:hp(3)
  },
  required: {
    color: colors.primary,
  },
  textInput: {
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(14),
    color: colors.black,
    flex: 1,
  },
  inputView: {
    backgroundColor: colors.lightGray,
    height: hp(6),
    paddingHorizontal: wp(5),
    borderRadius: 5,
  },
});
