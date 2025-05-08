import { Image, Pressable, StyleSheet } from "react-native";
import React from "react";
import SafeAreaContainer from "../../components/common/SafeAreaContainer";
import { IconsPath } from "../../utils/IconPath";
import { hp, wp } from "../../helper/Responsive";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import RunningSchemeCard from "../../components/dashboard/RunningSchemeCard";
import { useMySchemes } from "../../api/query/DashboardService";

const ViewSchemeScreen = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const schemes = useMySchemes()

  return (
    <SafeAreaContainer>
      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={IconsPath.backArrow1} style={styles.backArrow} />
      </Pressable>
      <RunningSchemeCard  data={schemes.data}/>
    </SafeAreaContainer>
  );
};

export default ViewSchemeScreen;

const styles = StyleSheet.create({
  backArrow: {
    width: wp(10),
    height: wp(10),
    resizeMode: "contain",
  },
  backButton: {
    marginHorizontal: wp(5),
    marginVertical: hp(2),
  },
});
