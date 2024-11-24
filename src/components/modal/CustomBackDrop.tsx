import { Pressable, Dimensions} from 'react-native';
import React from 'react';
import {colors} from '../../utils/Colors';

const CustomBackDrop = ({onPress}: {onPress?: () => void}) => {
  return (
    <Pressable
      style={{backgroundColor: colors.black_900, ...Dimensions.get('screen')}}
      onPress={onPress}
    />
  );
};

export default CustomBackDrop;
