import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { colors } from '../../utils/Colors';
import { isiPAD, wp } from '../../helper/Responsive';

const DotView = ({data, currentPage, dotViewStyle}: {
    data:any
    currentPage:number
    dotViewStyle?: StyleProp<ViewStyle>
}) => {
  return (
    <View style={[styles.dotView, dotViewStyle]}>
    {data?.map((item: any, index: number) => {
      const isActive = index === currentPage;
      return (
        <View
          style={[
            styles.outerView,
            {
              backgroundColor: isActive ? colors.white : colors.lightGray_1,
              shadowColor: isActive ? colors.black : colors.white,
            },
          ]}
        >
          {isActive && <View style={styles.innerView} />}
        </View>
      );
    })}
  </View>
  )
}

export default DotView

const styles = StyleSheet.create({
    dotView: {
        flexDirection: "row",
        alignSelf: "center",
      },
      outerView: {
        width: isiPAD ? wp(3) : wp(4),
        height: isiPAD ? wp(3) : wp(4),
        borderRadius: 50,
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.15,
        shadowRadius: 2.65,
        marginRight:wp(2),
        elevation: 8,
        justifyContent: "center",
        alignItems: "center",
      },
      innerView: {
        width: isiPAD ? wp(2) : wp(2.5),
        height: isiPAD ? wp(2) : wp(2.5),
        borderRadius: 50,
        backgroundColor: colors.primary,
      },
})