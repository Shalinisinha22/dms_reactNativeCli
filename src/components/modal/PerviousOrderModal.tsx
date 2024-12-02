import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomBackDrop from "./CustomBackDrop";
import { colors } from "../../utils/Colors";
import { hp, isiPAD, RFValue, wp } from "../../helper/Responsive";
import Modal from "react-native-modal";
import { PerviousOrderModalProps } from "../../interfaces/Types";
import { commonStyle } from "../../utils/commonStyles";
import { FontPath } from "../../utils/FontPath";
import { useTranslation } from "react-i18next";
import { IconsPath } from "../../utils/IconPath";

const PerviousOrderModal = ({
  isVisible,
  backOnPress,
}: PerviousOrderModalProps) => {
  const { t } = useTranslation();

  return (
    <Modal
      isVisible={isVisible}
      statusBarTranslucent
      style={styles.modal}
      customBackdrop={<CustomBackDrop onPress={backOnPress} />}
    >
      <View style={styles.mainView}>
        <Pressable style={styles.closeButton} onPress={backOnPress}>
          <Image
            source={IconsPath.close}
            tintColor={colors.white}
            style={styles.closeIcons}
          />
        </Pressable>
        <View style={styles.orderNoView}>
          <View style={commonStyle.profileView}>
            <Text style={commonStyle.userNameText}>M</Text>
          </View>
          <View style={{ marginLeft: wp(3) }}>
            <Text style={styles.orderNo}>
              {t("orderHistory.orderNo")} : 121124
            </Text>
            <Text style={styles.dispatchDate}>
              {t("orderHistory.dispatchDate")} : 16 Spt 2024
            </Text>
          </View>
        </View>
        <View style={styles.orderInfoRowView}>
          <View>
            <Text style={styles.orderinfoText}>
              {t("orderHistory.orderDate")}
            </Text>
            <Text style={styles.orderInfoDes}>12 Sept 2024</Text>
          </View>
          <View>
            <Text style={styles.orderinfoText}>
              {t("orderHistory.totalWeight")}
            </Text>
            <Text style={styles.orderInfoDes}>10 MT</Text>
          </View>
          <View>
            <Text style={styles.orderinfoText}>
              {t("orderHistory.totalAmount")}
            </Text>
            <Text style={styles.orderInfoDes}>Rs.12,0000</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PerviousOrderModal;

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  mainView: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingHorizontal: wp(5),
    paddingVertical: hp(3),
  },
  orderNoView: {
    flexDirection: "row",
    alignItems: "center",
  },
  orderNo: {
    color: colors.black,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(14),
  },
  dispatchDate: {
    color: colors.black,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(11),
  },
  orderInfoDes: {
    color: colors.black,
    fontFamily: FontPath.OutfitMedium,
    fontSize: RFValue(11),
    marginTop: hp(0.3),
  },
  orderInfoRowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: wp(80),
    marginVertical: hp(2),
    marginHorizontal: wp(3),
  },
  orderinfoText: {
    color: colors.black,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(11),
  },
  closeButton: {
    backgroundColor: colors.primary,
    alignSelf: "flex-end",
    width: isiPAD ? wp(6) : wp(7),
    height: isiPAD ? wp(6) : wp(7),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  closeIcons: {
    width: isiPAD ? wp(3) : wp(3.5),
    height: isiPAD ? wp(3) : wp(3.5),
    resizeMode: "contain",
  },
});
