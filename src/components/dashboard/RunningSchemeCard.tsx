import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { colors } from "../../utils/Colors";
import { hp, isiPAD, RFValue, wp } from "../../helper/Responsive";
import { FontPath } from "../../utils/FontPath";
import Animated from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import DotView from "../common/DotView";
import { IMAGE_URL } from "@env";

const RunningSchemeCard = ({ data }: { data: any }) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);

  const onMomentumScrollEnd = (event: {
    nativeEvent: {
      contentOffset: { x: number };
      layoutMeasurement: { width: number };
    };
  }) => {
    const index = Math.floor(
      event?.nativeEvent?.contentOffset.x /
        event?.nativeEvent?.layoutMeasurement.width
    );
    setCurrentPage(index);
  };

  return (
    <View style={styles.mainView}>
      <Text style={styles.scheme}>
        {t("dashboard.runningScheme")}{" "}
        <Text style={styles.number}>({data?.length})</Text>
      </Text>
      <Animated.FlatList
        data={data}
        horizontal
        pagingEnabled
        initialScrollIndex={0}
        scrollEventThrottle={1}
        style={styles.listView}
        bounces={false}
        bouncesZoom={false}
        initialNumToRender={1}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index?.toString()}
        onMomentumScrollEnd={onMomentumScrollEnd}
        removeClippedSubviews={false}
        renderItem={({ item, index }) => {
          return (
            <View key={index}>
              <Image
                source={{
                  uri: IMAGE_URL + item?.scheme_pic?.file_path,
                }}
                style={styles.image}
              />
              <Text style={styles.title}>{item?.name}</Text>
              {/* <Text style={styles.des}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry lorem.
              </Text> */}
            </View>
          );
        }}
      />
      <DotView data={data} currentPage={currentPage} />
    </View>
  );
};

export default RunningSchemeCard;

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    marginHorizontal: wp(5),
    shadowOpacity: 0.05,
    shadowRadius: 10.65,
    elevation: 8,
    borderRadius: 8,
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
    marginBottom: hp(2),
  },
  scheme: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(20),
    marginBottom: hp(2),
  },
  number: {
    color: colors.green_1,
  },
  listView: {
    borderRadius: 10,
  },
  image: {
    width: wp(80),
    height: hp(50),
    resizeMode: "contain",
    borderRadius: 10,
  },
  title: {
    color: colors.primary,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(18),
    marginHorizontal: wp(2),
    marginVertical: hp(1),
  },
  des: {
    color: colors.black,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(14),
    width: wp(70),
    marginHorizontal: wp(2),
    marginBottom: hp(2),
  },
});
