import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../utils/Colors'
import { hp, RFValue, wp } from '../../helper/Responsive'
import CheckIcons from '../../assets/svg/CheckIcons'
import { FontPath } from '../../utils/FontPath'
import { useTranslation } from 'react-i18next'

const ApproveButton = ({onPress}: {onPress?: () => void}) => {
    const {t} = useTranslation();
  return (
    <Pressable style={styles.button} onPress={onPress}>
        <View style={styles.checkView}>
            <CheckIcons fill={colors.white} width={wp(3)} height={wp(3)}/>
        </View>
        <Text style={styles.approve}>{t('dashboard.approve')}</Text>
    </Pressable>
  )
}

export default ApproveButton

const styles = StyleSheet.create({
    button:{
        flexDirection: 'row',
        alignItems:'center',
        backgroundColor:colors.green_1,
        height:hp(3.5),
        width:wp(22),
        justifyContent:'center',
        borderRadius:50,
        marginBottom:hp(1)
    },
    checkView:{
        width:wp(4.5),
        height:wp(4.5),
        borderWidth:1.2,
        borderColor:colors.white,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:50
    },
    approve:{
        color:colors.white,
        fontFamily:FontPath.OutfitSemiBold,
        fontSize:RFValue(11),
        marginLeft:wp(1),
        width:wp(13)
    }
})