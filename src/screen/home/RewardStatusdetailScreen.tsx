import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import SafeAreaContainer from "../../components/common/SafeAreaContainer";
import { hp, RFValue, wp } from "../../helper/Responsive";
import { colors } from "../../utils/Colors";
import { FontPath } from "../../utils/FontPath";
import { IconsPath } from "../../utils/IconPath";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import UserInfoRowView from "../../components/common/UserInfoRowView";
import { useGetreferralDetails } from "../../api/query/RewardService";
import { IMAGE_URL } from "@env";
import { useGetProductList } from "../../api/query/OrderPlacementService";

const RewardStatusdetailScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const routes = useRoute<any>();
  const referralDetails = useGetreferralDetails();
  const [userData, setData] = useState<any>({});
  const [productName, setProductName] = useState("");
  const { data } = useGetProductList();

  useEffect(() => {
    if (routes.params.id) {
      handleGetReferralDetails();
    }
  }, [routes.params.id]);

  const handleGetReferralDetails = async () => {
    try {
      const res = await referralDetails.mutateAsync({
        referralId: routes.params.id,
      });
      if (res) {
        setData(res);
        if (data?.data && res?.referral_products[0]) {
          // Ensure referral_products exists and is not empty before accessing index 0
          const updatedData = data?.data.find(
            (i: any) => i.id === res?.referral_products[0]
          );
          if (updatedData?.name) {
            setProductName(updatedData?.name);
          }
        }
      }
    } catch (error) {
      console.log("handleGetReferralDetails", error);
    }
  };

  return (
    <SafeAreaContainer>
      <View style={styles.backRowView}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image source={IconsPath.backArrow1} style={styles.backIcons} />
        </Pressable>
        <Text style={styles.rewardStatus}>
          {t("rewardStatus.rewardStatusDetail")}
        </Text>
      </View>
      <View style={styles.userInfoCard}>
        <UserInfoRowView
          title={t("ASODealerOnboard.name")}
          userInfo={userData?.referral_name}
        />
        <UserInfoRowView
          title={t("myProfile.email")}
          userInfo={userData?.email}
        />
        <UserInfoRowView
          title={t("myProfile.mobileNo")}
          userInfo={userData?.mobile_number}
        />
        {/* <UserInfoRowView
          title={t("referralSubmission.type")}
          userInfo={userData?.referral_type}
        /> */}
        <UserInfoRowView
          title={t("referralSubmission.ProductUsed")}
          userInfo={productName}
        />
        <UserInfoRowView
          title={t("ASODealerOnboard.address")}
          userInfo={userData?.address}
        />
      </View>
      <Text style={styles.proofDocument}>
        {t("rewardStatus.proofDocument")}
      </Text>
      <Image
        source={{ uri: IMAGE_URL + userData?.proof?.file_path }}
        style={styles.image}
      />
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
  proofDocument: {
    color: colors.black,
    fontSize: RFValue(16),
    fontFamily: FontPath.OutfitSemiBold,
    marginHorizontal: wp(5),
  },
  image: {
    width: wp(90),
    height: hp(20),
    resizeMode: "cover",
    borderRadius: 8,
    alignSelf: "center",
    marginTop: hp(2),
  },
});
