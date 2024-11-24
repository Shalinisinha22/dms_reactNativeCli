import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../utils/Colors'
import { hp, RFValue, wp } from '../../helper/Responsive'
import { FontPath } from '../../utils/FontPath'
import { IconsPath } from '../../utils/IconPath'
import { useTranslation } from 'react-i18next'

const RejectButton = ({onPress}: {onPress?: () => void}) => {
    const {t} = useTranslation();
  return (
    <Pressable style={styles.button} onPress={onPress}>
    <View style={styles.checkView}>
       <Image source={IconsPath.close} 
       tintColor={colors.white}
       style={styles.close}/>
    </View>
    <Text style={styles.approve}>{t('dashboard.reject')}</Text>
</Pressable>
  )
}

export default RejectButton

const styles = StyleSheet.create({
    button:{
        flexDirection: 'row',
        alignItems:'center',
        backgroundColor:colors.primary,
        height:hp(3.5),
        width:wp(22),
        justifyContent:'center',
        borderRadius:50
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
    },
    close:{
        width:wp(2),
        height:wp(2),
        resizeMode:'contain'
       }
})