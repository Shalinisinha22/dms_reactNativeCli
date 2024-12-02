import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SafeAreaContainer from '../../components/common/SafeAreaContainer'
import { useTranslation } from 'react-i18next';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { hp, RFValue, wp } from '../../helper/Responsive';
import { colors } from '../../utils/Colors';
import { FontPath } from '../../utils/FontPath';
import { IconsPath } from '../../utils/IconPath';
import { RouteString } from '../../navigation/RouteString';
import FilterStatueType from '../../components/common/FilterStatueType';
import MasonManagementCard from '../../components/dashboard/MasonManagementCard';

const MasonManagementScreen = () => {
    const { t } = useTranslation();
    const navigation = useNavigation<NavigationProp<ParamListBase>>();

  return (
    <SafeAreaContainer>
      <View style={styles.headerRowView}>
        <Text style={styles.title}>Mason Management</Text>
        <Pressable
          style={styles.filterButton}
          onPress={() =>  navigation.navigate(RouteString.AsoNewMasonOnboardScreen)}
        >
          <Image
            source={IconsPath.pluse}
            style={styles.pluse}
            tintColor={colors.white}
          />
        </Pressable>
      </View>
      <FilterStatueType />
      <MasonManagementCard/>
    </SafeAreaContainer>
  )
}

export default MasonManagementScreen

const styles = StyleSheet.create({
    headerRowView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: wp(5),
        marginTop: hp(2.5),
      },
      filterButton: {
        backgroundColor: colors.primary,
        padding: wp(0.5),
        borderRadius: 3,
      },
      pluse: {
        width: wp(8),
        height: wp(8),
        resizeMode: "contain",
      },
      title: {
        color: colors.black,
        fontFamily: FontPath.OutfitSemiBold,
        fontSize: RFValue(20),
      },
})