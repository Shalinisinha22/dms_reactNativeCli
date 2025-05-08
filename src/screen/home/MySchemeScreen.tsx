import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import SafeAreaContainer from "../../components/common/SafeAreaContainer";
import { colors } from "../../utils/Colors";
import { FontPath } from "../../utils/FontPath";
import { hp, RFValue, wp } from "../../helper/Responsive";
import DealerSchemeView from "../../components/scheme/DealerSchemeView";
import { ImagePath } from "../../utils/ImagePath";
import { useTranslation } from "react-i18next";
import { useMySchemes } from "../../api/query/DashboardService";

const MySchemeScreen = () => {
  const { t } = useTranslation();
  const schemes = useMySchemes();

  return (
    <SafeAreaContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View style={styles.mySchemeView}>
            <Text style={styles.title}>{t("myScheme.myScheme")}</Text>
            <DealerSchemeView item={schemes.data} />
          </View>
        </View>
        <Image source={ImagePath.scheme} style={styles.schemeImage} />
      </ScrollView>
    </SafeAreaContainer>
  );
};

export default MySchemeScreen;

const styles = StyleSheet.create({
  title: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(20),
    marginHorizontal: wp(5),
    marginTop: hp(2.5),
  },
  mySchemeView: {
    backgroundColor: colors.lightBlack_1,
    paddingBottom: hp(2),
  },
  schemeImage: {
    width: wp(100),
    resizeMode: "contain",
    height: wp(50),
  },
});
