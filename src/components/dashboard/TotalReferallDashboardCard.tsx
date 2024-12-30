import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../utils/Colors'
import { hp, RFValue, wp } from '../../helper/Responsive'
import { FontPath } from '../../utils/FontPath'
import { useTranslation } from 'react-i18next'

const TotalReferallDashboardCard = ({item}:{item:any}) => {
    const {t} = useTranslation();
  return (
    <View style={{marginBottom:hp(2)}}>
     <View style={styles.blueBox}>
        <Text style={styles.title}>{t('referralSubmission.totalReferralClaimed')}</Text>
        <Text style={styles.count}>{item?.total}</Text>
     </View>
     <View style={styles.secondRowBox}>
        <View style={styles.seoncdBox}>
            <Text style={styles.approved}>{t('referralSubmission.totalReferralClaimedApproved')}</Text>
            <Text style={styles.count}>{item?.approved}</Text>
        </View>
        <View style={[styles.seoncdBox,{backgroundColor:colors.primary}]}>
            <Text  style={styles.approved}>{t('referralSubmission.totalReferralClaimedRejected')}</Text>
            <Text style={styles.count}>{item?.rejected}</Text>
        </View>
     </View>
    </View>
  )
}

export default TotalReferallDashboardCard

const styles = StyleSheet.create({
    approved:{
        color:colors.white,
        fontFamily:FontPath.OutfitMedium,
        textAlign:'center',
        maxWidth:wp(40),
        lineHeight:hp(3),
        fontSize:RFValue(14)
    },
    seoncdBox:{
        backgroundColor:colors.green_1,
        width:wp(43),
        justifyContent:'center',
        alignItems:'center',
        height:hp(15),
        borderRadius:8,
    },
    count:{
        color:colors.white,
        fontFamily:FontPath.OutfitBold,
        fontSize:RFValue(38),
        marginTop:hp(1)
    },
    secondRowBox:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:wp(5)
     },
     blueBox:{
        backgroundColor:colors.blue_2,
        marginHorizontal:wp(5),
        marginBottom:hp(1),
        height:hp(15),
        borderRadius:8,
        justifyContent:'center',
        alignItems:'center'
     },
     title:{
        color:colors.white,
        fontFamily:FontPath.OutfitMedium,
        fontSize:RFValue(18),
        lineHeight:hp(4)
    }
})