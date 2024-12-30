import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../utils/Colors";
import { hp, isiPAD, RFValue, wp } from "../../helper/Responsive";
import { FontPath } from "../../utils/FontPath";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { RouteString } from "../../navigation/RouteString";

const DashboardActionCard = ({ data }: { data: any }) => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  return (
    <View style={styles.statusUpdateView}>
      {data.map((item: any, index: number) => {
        return (
          <Pressable
            style={styles.button}
            key={index}
            onPress={() => {
              if(item.name === 'dashboard.approveOrder'){
                navigation.navigate(item.routes,{ type : 'orderHistory.pending'})
              } else {
                navigation.navigate(item.routes)
              }
            }}
          >
            <Image
              source={item.icons}
              style={styles.edit}
              tintColor={colors.darkGray}
            />
            <Text style={styles.buttonName}>{t(`${item.name}`)}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default DashboardActionCard;

const styles = StyleSheet.create({
  statusUpdateView: {
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
    borderRadius: 8,
    paddingTop: hp(3),
    marginBottom: hp(2),
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: wp(5),
    marginBottom: hp(3),
  },
  buttonName: {
    fontSize: RFValue(15),
    fontFamily: FontPath.OutfitRegular,
    marginLeft: wp(3),
    lineHeight:hp(3),
    color: colors.black,
  },
  edit: {
    width: isiPAD? wp(4) : wp(6),
    height:  isiPAD? wp(4) : wp(6),
    resizeMode: "cover",
  },
});
