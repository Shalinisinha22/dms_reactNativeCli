import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { commonStyle } from '../../utils/commonStyles'
import { colors } from '../../utils/Colors'
import { hp, RFValue, wp } from '../../helper/Responsive'
import { FontPath } from '../../utils/FontPath'
import { useTranslation } from 'react-i18next'
import { IconsPath } from '../../utils/IconPath'

const DealerWiseSalesCard = ({item}:{item:any}) => {
    const {t} = useTranslation();
  return (
    <View style={styles.cardView}>
    <View style={styles.orderNoView}>
      <View style={commonStyle.profileView}>
        <Text style={commonStyle.userNameText}>{item.dealerName.slice(0,1)}</Text>
      </View>
      <View style={styles.textView}>
        <View style={styles.rowView}>
        <View>
          <Text style={styles.salesName}>{item.dealerName}</Text>
          <Text style={styles.orderNo}>{t('dealerwiseSales.dealerNo')} : {item.dealerNumber}</Text>
        </View>
        <Text style={styles.amount}>Rs.{item.totalSale}</Text>
        </View>
        <View style={styles.locationRowView}>
            <Image source={IconsPath.location} style={styles.location} />
            <Text style={styles.locationText}>
            {item.city}
            </Text>
          </View>
      </View>
    </View>
  </View>
  )
}

export default DealerWiseSalesCard

const styles = StyleSheet.create({
    cardView: {
        backgroundColor: colors.white,
        shadowColor: colors.black,
        shadowOffset: {
          width: 0,
          height: 3,
        },
        marginHorizontal: wp(5),
        shadowOpacity: 0.05,
        shadowRadius: 10.65,
        elevation: 8,
        marginBottom: hp(2),
        paddingHorizontal: wp(3),
        paddingVertical: hp(2),
        marginTop:hp(2)
      },
      orderNoView: {
        flexDirection: 'row',
      },
      orderNo: {
        color: colors.black,
        fontFamily: FontPath.OutfitRegular,
        fontSize: RFValue(12),
        marginTop: hp(0.5),
      },
      textView: {
        marginLeft: wp(3),
        flex: 1,
      },
      salesName: {
        color: colors.black,
        fontFamily: FontPath.OutfitSemiBold,
        fontSize: RFValue(16),
      },
      location: {
        width: wp(6),
        height: wp(6),
        resizeMode: 'contain',
      },
      locationText: {
        color: colors.black,
        fontFamily: FontPath.OutfitMedium,
        fontSize: RFValue(11),
        marginLeft: wp(2),
      },
      locationRowView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: hp(1),
      },
      rowView:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    amount:{
        color:colors.primary,
        fontFamily:FontPath.OutfitSemiBold,
        fontSize:RFValue(16)
    }
})