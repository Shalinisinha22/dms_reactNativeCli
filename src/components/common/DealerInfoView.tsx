import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { hp, RFValue, wp } from '../../helper/Responsive'
import { FontPath } from '../../utils/FontPath'
import { colors } from '../../utils/Colors'
import { DealerInfoViewProps } from '../../interfaces/Types'

const DealerInfoView = ({title, des} : DealerInfoViewProps) => {
  return (
    <View style={styles.mainView}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.userInfo}>{des}</Text>
      </View>
  )
}

export default DealerInfoView

const styles = StyleSheet.create({
    mainView: {
        marginHorizontal:wp(5),
        marginTop:hp(2)
      },
      title:{
        fontFamily:FontPath.OutfitSemiBold,
        fontSize:RFValue(14),
        color:colors.black
    },
    userInfo: {
        fontFamily:FontPath.OutfitRegular,
        fontSize:RFValue(14),
        color:colors.darkGray,
        marginTop:hp(0.5)
    }
})