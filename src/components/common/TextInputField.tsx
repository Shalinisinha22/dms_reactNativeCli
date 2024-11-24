import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {hp, RFValue, wp} from '../../helper/Responsive';
import {FontPath} from '../../utils/FontPath';
import {colors} from '../../utils/Colors';
import {TextInputFieldProps} from '../../interfaces/Types';
import EasyOffIcons from '../../assets/svg/EasyOffIcons';
import { useTranslation } from 'react-i18next';

const TextInputField = ({
  title,
  placeholder,
  isPassword,
  onChangeText,
  onBlur,
  value,
  touched,
  errors,
  keyboardType,
  maxLength,
  InputViewStyle,
  multiline,
  mainViewStyle,
  isRequired
}: TextInputFieldProps) => {
  const {t} = useTranslation();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  return (
    <View style={[styles.mainView, mainViewStyle]}>
      <Text style={styles.label}>
        {title}
      {isRequired &&  <Text style={styles.required}>*</Text>}
      </Text>
      <View style={[styles.inputView, InputViewStyle]}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={colors.darkGray}
          style={styles.textInput}
          value={value}
          secureTextEntry={isPassword && !passwordVisible}
          onChangeText={onChangeText}
          onFocus={onBlur}
          // onBlur={onBlur}
          autoCapitalize="none"
          keyboardType={keyboardType}
          maxLength={maxLength}
          multiline={multiline}
        />
        {isPassword && (
          <Pressable onPress={() => setPasswordVisible(!passwordVisible)}>
            <EasyOffIcons />
          </Pressable>
        )}
      </View>
      {touched && errors && <Text style={styles.error}>{t(errors)}</Text>}
    </View>
  );
};

export default TextInputField;

const styles = StyleSheet.create({
  mainView: {
    marginHorizontal: wp(5),
    marginTop: hp(3),
  },
  label: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(14),
    lineHeight:hp(3),
    marginBottom: hp(1),
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  error: {
    color: colors.primary,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(12),
    lineHeight:hp(3),
  },
});
