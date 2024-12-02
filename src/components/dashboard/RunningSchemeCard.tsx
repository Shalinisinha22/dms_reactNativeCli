import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { colors } from "../../utils/Colors";
import { hp, isiPAD, RFValue, wp } from "../../helper/Responsive";
import { FontPath } from "../../utils/FontPath";
import Animated from "react-native-reanimated";
import { useTranslation } from "react-i18next";

const RunningSchemeCard = () => {
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
        {t("dashboard.runningScheme")} <Text style={styles.number}>(3)</Text>
      </Text>
      <Animated.FlatList
        data={[1, 2, 3]}
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
                  uri: "https://images.unsplash.com/photo-1728327511297-948650da8ed9?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                }}
                style={styles.image}
              />
              <Text style={styles.title}>Sales Ms Road TMT Bar</Text>
              <Text style={styles.des}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry lorem.
              </Text>
            </View>
          );
        }}
      />
      <View style={styles.dotView}>
        {[1, 2, 3].map((item, index) => {
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
    height: hp(40),
    resizeMode: "cover",
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
  dotView: {
    flexDirection: "row",
    alignSelf: "center",
    width: isiPAD ? wp(13) : wp(18),
    justifyContent: "space-between",
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
});
