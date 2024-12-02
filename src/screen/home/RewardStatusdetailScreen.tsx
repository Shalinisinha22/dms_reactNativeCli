import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import SafeAreaContainer from "../../components/common/SafeAreaContainer";
import { hp, RFValue, wp } from "../../helper/Responsive";
import { colors } from "../../utils/Colors";
import { FontPath } from "../../utils/FontPath";
import { IconsPath } from "../../utils/IconPath";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import UserInfoRowView from "../../components/common/UserInfoRowView";
import { userProfileImage } from "../../utils/JsonData";

const RewardStatusdetailScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  return (
    <SafeAreaContainer>
      <View style={styles.backRowView}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image source={IconsPath.backArrow1} style={styles.backIcons} />
        </Pressable>
        <Text style={styles.rewardStatus}>{t('rewardStatus.rewardStatusDetail')}</Text>
      </View>
      <View style={styles.userInfoCard}>
      <UserInfoRowView
          title={t("ASODealerOnboard.name")}
          userInfo="Mohit Shah"
        />
        <UserInfoRowView
          title={t("myProfile.email")}
          userInfo="Andrewmarcel@gmail.com"
        />
        <UserInfoRowView
          title={t("myProfile.mobileNo")}
          userInfo="+918989898989"
        />
        <UserInfoRowView title={t("referralSubmission.type")} userInfo="Type 1" />
        <UserInfoRowView title={t("referralSubmission.ProductUsed")} userInfo="My Product" />
        <UserInfoRowView
          title={t("ASODealerOnboard.address")}
          userInfo="D-23 Apple Square Building Nr Mater place banglore"
        />
      </View>
      <Text style={styles.proofDocument}>{t('rewardStatus.proofDocument')}</Text>
      <Image source={{uri: userProfileImage}} style={styles.image}/>
    </SafeAreaContainer>
  );
};

export default RewardStatusdetailScreen;

const styles = StyleSheet.create({
  backRowView: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: wp(3),
    marginVertical: hp(3),
  },
  backIcons: {
    width: wp(8),
    height: wp(8),
    resizeMode: "contain",
  },
  rewardStatus: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    marginLeft: wp(2),
    fontSize: RFValue(20),
  },
  userInfoCard: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10.65,
    elevation: 4,
    backgroundColor: colors.white,
    marginHorizontal: wp(5),
    paddingVertical: hp(2),
    paddingHorizontal: wp(5),
    marginBottom: hp(1.5),
    borderRadius: 10,
  },
  proofDocument:{
    color:colors.black,
    fontSize:RFValue(16),
    fontFamily:FontPath.OutfitSemiBold,
    marginHorizontal:wp(5)
  },
  image: {
    width:wp(90),
    height:hp(20),
    resizeMode:'cover',
    borderRadius:8,
    alignSelf:'center',
    marginTop:hp(2)
  }
});
