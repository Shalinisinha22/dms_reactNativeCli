import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../utils/Colors';
import {FontPath} from '../../utils/FontPath';
import {hp, isiPAD, RFValue, wp} from '../../helper/Responsive';
import {DocumentUploadViewProps} from '../../interfaces/Types';

const DocumentUploadView = ({
  title,
  icons,
  onPress,
  fileName
}: DocumentUploadViewProps) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <View>
      <Text style={styles.title}>
        {title}
        <Text style={{color: colors.primary}}> *</Text>
      </Text>
     {fileName && <Text>{fileName}</Text>}
      </View>
      <Image source={icons} style={styles.icons} />
    </Pressable>
  );
};

export default DocumentUploadView;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5.46,
    elevation: 5,
    marginHorizontal: wp(5),
    height: hp(8),
    borderRadius: 4,
    paddingHorizontal: wp(5),
    marginBottom:hp(2)
  },
  title: {
    color: colors.black,
    fontFamily: FontPath.OutfitMedium,
    fontSize: RFValue(16),
    lineHeight:hp(4)
  },
  icons: {
    width: isiPAD ? wp(6) : wp(10),
    height: isiPAD ? wp(6) : wp(10),
    resizeMode: 'contain',
  },
});
