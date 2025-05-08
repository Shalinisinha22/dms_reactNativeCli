import { StyleSheet } from "react-native";
import { hp, isiPAD, RFValue, wp } from "../helper/Responsive";
import { FontPath } from "./FontPath";
import { colors } from "./Colors";

export const commonStyle = StyleSheet.create({
  appLogo: {
    width: wp(30),
    height: wp(30),
    resizeMode: "contain",
    alignSelf: "center",
  },
  login: {
    fontFamily: FontPath.OutfitSemiBold,
    color: colors.black,
    fontSize: RFValue(19),
    textAlign: "center",
    lineHeight: hp(4),
  },
  filterButton: {
    backgroundColor: colors.primary,
    padding: isiPAD ? wp(1.2) : wp(2),
    borderRadius: 3,
  },
  filter: {
    width: isiPAD ? wp(3) : wp(6),
    height: isiPAD ? wp(3) : wp(6),
    resizeMode: "contain",
  },
  profileView: {
    backgroundColor: colors.black,
    width: isiPAD ? wp(7) : wp(10),
    height: isiPAD ? wp(7) : wp(10),
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  userNameText: {
    color: colors.white,
    fontSize: RFValue(16),
    fontFamily: FontPath.OutfitMedium,
  },
  logo: {
    width: wp(10),
    height: wp(10),
    resizeMode: "cover",
    borderRadius: 50,
  },
  mainViewStyle: {
    marginTop: hp(3),
    marginHorizontal: wp(5),
  },
});
