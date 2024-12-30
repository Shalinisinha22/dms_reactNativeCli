import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
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
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import {
  useApproveUser,
  useGetUserDetailsByID,
} from "../../api/query/DealerManagementService";
import { ParamsType } from "../../navigation/ParamsType";
import { UserType } from "../../interfaces/Types";
import Toast from "react-native-toast-message";
import DocumentViewModal from "../../components/modal/DocumentViewModal";
import { useAppSelector } from "../../redux/Store";

const ViewDealerDetailScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const routes = useRoute<RouteProp<ParamsType, "ViewDealerDetailScreen">>();
  const {portal} = useAppSelector((state) => state.auth);
  const { mutateAsync: getUserDetailsById, data } = useGetUserDetailsByID();
  const { mutateAsync: aprroveUser } = useApproveUser();
  const [isDocumentView, setIsDocumentView] = useState(false);
  const [document, setDocument] = useState();

  useEffect(() => {
    if (routes.params.id) {
      handleGetData();
    }
  }, [routes.params.id]);

  const handleGetData = () => {
    getUserDetailsById({ role: routes.params.type, userId: routes.params.id });
  };

  // const handleToggle = (isOn: boolean) => {
  //   console.log("Toggle is now:", isOn);
  // };

  const handleApproveUser = async (status: string) => {
    try {
      const res = await aprroveUser({
        userId: data?.id,
        status: status,
        role: UserType.DEALER,
      });
      if (res) {
        Toast.show({
          type: "success",
          text1: res.message,
        });
        handleGetData();
      }
    } catch (error) {
      console.log("handleApproveOrder", error);
    }
  };

  const handleDocumentsView = (data: any) => {
    setDocument(data);
    setIsDocumentView(true);
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

      {((data?.status?.by_distributor === "pending" &&
        data?.status?.by_aso === "pending") ||
        (data?.status?.by_admin === "pending") || (data?.status?.by_aso === "pending" && portal === UserType.MASON)  && (
          <View style={styles.rowView}>
            <ApproveButton onPress={() => handleApproveUser("approved")} />
            <RejectButton onPress={() => handleApproveUser("declined")} />
          </View>
        ))}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <View style={styles.changeStatusRowView}>
          <Text style={styles.changeStatus}>
            {t("viewDealerDetails.changeDealerStatus")} :
          </Text>
          <CustomToggle initialValue={false} onToggle={handleToggle} />
        </View> */}
        <DealerInfoView title={t("viewDealerDetails.name")} des={data?.name} />
        <DealerInfoView
          title={t("viewDealerDetails.emailAddress")}
          des={data?.email}
        />
        <DealerInfoView
          title={t("viewDealerDetails.mobileNo")}
          des={"+91 " + data?.mobile_number}
        />
        <DealerInfoView
          title={t("viewDealerDetails.city")}
          des={data?.work_city}
        />
        <DealerInfoView
          title={t("viewDealerDetails.address")}
          des={data?.address}
        />
        <Text style={styles.uploadedTitle}>
          {t("viewDealerDetails.uplodedDocuments")}
        </Text>
        <DocumentUploadView
          icons={IconsPath.success}
          onPress={() => handleDocumentsView(data?.aadhaar_card)}
          title={t("registration.aadharCardUpload")}
          fileName={data?.aadhaar_card.name}
          isRequired={false}
        />
        <DocumentUploadView
          icons={IconsPath.success}
          onPress={() => handleDocumentsView(data?.pan_card)}
          title={t("registration.panCardUpload")}
          fileName={data?.pan_card.name}
          isRequired={false}
        />
        <DocumentUploadView
          icons={IconsPath.success}
          onPress={() => handleDocumentsView(data?.gst_certificate)}
          title={t("registration.GSTCertificateUpload")}
          fileName={data?.gst_certificate.name}
          isRequired={false}
        />
        <DocumentUploadView
          icons={IconsPath.success}
          onPress={() => handleDocumentsView(data?.profile_pic)}
          title={t("registration.photoUpload")}
          fileName={data?.profile_pic.name}
          isRequired={false}
        />
        <DocumentUploadView
          icons={IconsPath.success}
          onPress={() => handleDocumentsView(data?.cheque)}
          title={t("registration.signedChequeUpload")}
          fileName={data?.cheque.name}
          isRequired={false}
        />
      </ScrollView>
      <DocumentViewModal
        isVisible={isDocumentView}
        backOnPress={() => setIsDocumentView(false)}
        item={document}
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
