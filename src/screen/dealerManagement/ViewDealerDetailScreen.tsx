import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import SafeAreaContainer from "../../components/common/SafeAreaContainer";
import { useTranslation } from "react-i18next";
import { colors } from "../../utils/Colors";
import { FontPath } from "../../utils/FontPath";
import { hp, RFValue, wp } from "../../helper/Responsive";
import ApproveButton from "../../components/common/ApproveButton";
import RejectButton from "../../components/common/RejectButton";
import RejectOrderModal from "../../components/modal/RejectOrderModal";
import CustomToggle from "../../components/common/CustomToggle";
import DealerInfoView from "../../components/common/DealerInfoView";
import DocumentUploadView from "../../components/registration/DocumentUploadView";
import { IconsPath } from "../../utils/IconPath";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";

const ViewDealerDetailScreen = () => {
  const { t } = useTranslation();
  const [isRejectOpenModal, setIsRejectOpenModal] = useState(false);
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const handleToggle = (isOn: boolean) => {
    console.log("Toggle is now:", isOn);
  };

  return (
    <SafeAreaContainer>
       <View style={styles.backRowView}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image source={IconsPath.backArrow} style={styles.backIcons} />
        </Pressable>
        <Text style={styles.title}>
        {t("viewDealerDetails.viewDealerDetails")}
      </Text>
      </View>
      <View style={styles.rowView}>
        <ApproveButton onPress={() => null} />
        <RejectButton onPress={() => setIsRejectOpenModal(true)} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.changeStatusRowView}>
          <Text style={styles.changeStatus}>
            {t("viewDealerDetails.changeDealerStatus")} :
          </Text>
          <CustomToggle initialValue={false} onToggle={handleToggle} />
        </View>
        <DealerInfoView title={t("viewDealerDetails.name")} des="Mohin Shah" />
        <DealerInfoView
          title={t("viewDealerDetails.emailAddress")}
          des="mohinshah@gmail.com"
        />
        <DealerInfoView
          title={t("viewDealerDetails.mobileNo")}
          des="+91 8401272041"
        />
        <DealerInfoView title={t("viewDealerDetails.city")} des="Surat" />
        <DealerInfoView
          title={t("viewDealerDetails.address")}
          des="D 210 Apple Square Nr Bangalore"
        />
        <Text style={styles.uploadedTitle}>
          {t("viewDealerDetails.uplodedDocuments")}
        </Text>
        <DocumentUploadView
          icons={IconsPath.success}
          onPress={() => null}
          title={t("registration.aadharCardUpload")}
          fileName={""}
          isRequired={false}
        />
        <DocumentUploadView
          icons={IconsPath.success}
          onPress={() => null}
          title={t("registration.panCardUpload")}
          fileName={""}
          isRequired={false}
        />
        <DocumentUploadView
          icons={IconsPath.success}
          onPress={() => null}
          title={t("registration.GSTCertificateUpload")}
          fileName={""}
          isRequired={false}
        />
        <DocumentUploadView
          icons={IconsPath.success}
          onPress={() => null}
          title={t("registration.photoUpload")}
          fileName={""}
          isRequired={false}
        />
        <DocumentUploadView
          icons={IconsPath.success}
          onPress={() => null}
          title={t("registration.signedChequeUpload")}
          fileName={""}
          isRequired={false}
        />
      </ScrollView>
      <RejectOrderModal
        isVisible={isRejectOpenModal}
        backOnPress={() => setIsRejectOpenModal(false)}
      />
    </SafeAreaContainer>
  );
};

export default ViewDealerDetailScreen;

const styles = StyleSheet.create({
  title: {
    color: colors.black,
    marginLeft: wp(1),
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(16),
  },
  rowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: wp(45),
    alignSelf: "center",
  },
  changeStatusRowView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: wp(5),
  },
  changeStatus: {
    color: colors.primary,
    fontFamily: FontPath.OutfitMedium,
    fontSize: RFValue(16),
  },
  uploadedTitle: {
    marginHorizontal: wp(5),
    marginVertical: hp(2),
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(18),
  },
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
});
