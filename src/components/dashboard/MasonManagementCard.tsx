import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../utils/Colors";
import { hp, RFValue, wp } from "../../helper/Responsive";
import { commonStyle } from "../../utils/commonStyles";
import { FontPath } from "../../utils/FontPath";
import { useTranslation } from "react-i18next";
import TwoStepOrderTracking from "../common/TwoStepOrderTracking";
import ApproveButton from "../common/ApproveButton";
import RejectButton from "../common/RejectButton";

const MasonManagementCard = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.cardView}>
      <View style={styles.orderNoView}>
        <View style={commonStyle.profileView}>
          <Text style={commonStyle.userNameText}>M</Text>
        </View>
        <View style={styles.mainTextView}>
          <View>
            <Text style={styles.salesName}>Mohin Shah</Text>
            <Text style={styles.orderNo}>{t('masonManagement.masonId')} : 121124</Text>
          </View>
          <View style={styles.dateRowView}>
            <View>
              <Text style={styles.date}>{t('masonManagement.date')}</Text>
              <Text style={styles.fullDate}>12 Sept 2024</Text>
            </View>
            <TwoStepOrderTracking
              selectedStep={1}
              isCheckIcons
              containerStyle={{ bottom: hp(2) }}
            />
          </View>
          <View style={styles.buttonRowView}>
            <ApproveButton onPress={() => null} />
            <RejectButton onPress={() => null} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default MasonManagementCard;

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
    height: hp(22),
    paddingHorizontal: wp(3),
    paddingVertical: hp(2),
  },
  orderNoView: {
    flexDirection: "row",
  },
  mainTextView: {
    flex: 1,
    marginLeft: wp(3),
  },
  salesName: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(16),
  },
  orderNo: {
    color: colors.black,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(12),
    marginTop: hp(0.5),
  },
  dateRowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hp(2),
    width: wp(60),
  },
  date: {
    color: colors.black,
    fontSize: RFValue(11),
    fontFamily: FontPath.OutfitSemiBold,
  },
  fullDate: {
    color: colors.black,
    fontSize: RFValue(11),
    fontFamily: FontPath.OutfitMedium,
  },
  buttonRowView:{
    flexDirection:'row',
    marginTop:hp(3),
    justifyContent:'space-between',
    width:wp(46)
  }
});
