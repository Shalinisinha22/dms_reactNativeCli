import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import SafeAreaContainer from "../../components/common/SafeAreaContainer";
import { colors } from "../../utils/Colors";
import { hp, isiPAD, RFValue, wp } from "../../helper/Responsive";
import { FontPath } from "../../utils/FontPath";
import { userProfileImage } from "../../utils/JsonData";
import UserInfoRowView from "../../components/common/UserInfoRowView";
import { IconsPath } from "../../utils/IconPath";
import TextInputFieldOptional from "../../components/common/TextInputFieldOptional";
import Button from "../../components/common/Button";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "../../redux/Store";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useGetUser, useUpdateProfile } from "../../api/query/ProfileService";
import { authActions } from "../../redux/slice/AuthSlice";
import { UserType } from "../../interfaces/Types";
import { useDeleteAccount } from "../../api/query/AuthService";
import DeleteAccountModal from "../../components/modal/DeleteAccountModal";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { RouteString } from "../../navigation/RouteString";
import { IMAGE_URL } from "@env";

const ProfileScreen = () => {
  const { portal, userInfo } = useAppSelector((state) => state.auth);
  const { t } = useTranslation();
  const [isEdit, setIsEdit] = useState(false);
  const [birthDate, setBirthDate] = useState(userInfo?.dob);
  const [members, setMembers] = useState(userInfo?.member || []);
  const [editMemberId, setEditMemberId] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    relationship: "",
    dob: "",
  });
  const { mutateAsync: updateProfile } = useUpdateProfile();
  const [isLoading, setIsLoading] = useState(false);
  const { mutateAsync: getUserData } = useGetUser();
  const dispatch = useAppDispatch();
  const { mutateAsync: deleteAccount } = useDeleteAccount();
  const [isDeleteAccount, setIsDeleteAccount] = useState(false);
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [isError, setIsError] = useState(false);

  const IdDes =
    portal === UserType.DEALER
      ? t("drawer.dealerCode")
      : portal === UserType.DISTRIBUTOR
      ? t("drawer.distributorID")
      : portal === UserType.ASO
      ? "ASO ID"
      : portal === UserType.MASON
      ? "Mason ID"
      : "Engineer ID";

  const handleEdit = (member: any) => {
    setIsEdit(true);
    setEditMemberId(member.id);
    setFormData({
      name: member.name,
      relationship: member.relationship,
      dob: moment(member.dob).format("YYYY-MM-DD"),
    });
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const updatedMembers = members.map((member: any) =>
        member.id === editMemberId
          ? {
              ...member,
              ...formData,
              dob: new Date(formData.dob).toISOString(),
            }
          : member
      );
      const res = await updateProfile(updatedMembers);
      if (res) {
        const data = await getUserData();
        if (data) {
          setIsLoading(false);
          dispatch(authActions.setUserInfo(data));
          setMembers(updatedMembers);
          setIsEdit(false);
          setEditMemberId(null);
        }
      }
    } catch (error) {
      setIsLoading(false);
      console.log("handleSave", error);
    }
  };

  const handleConfirm = (date: any) => {
    const formattedDate = date.toISOString().split("T")[0];
    // Calculate the cutoff date for 18 years ago
    const today = new Date();
    const eighteenYearsAgo = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );

    // Check if the selected date is before or equal to the cutoff date
    if (date > eighteenYearsAgo) {
      Toast.show({
        type: "error",
        text1: `${t("error.AgeMustBeOrAbove")}`,
      });
      setDatePickerVisibility(false);
      return;
    } else {
      setBirthDate(formattedDate);
    }
    setDatePickerVisibility(false);
  };

  const handleDeleteOnPress = async () => {
    try {
      const res = await deleteAccount({
        userId: userInfo.id,
      });
      if (res) {
        dispatch(authActions.setPortal(""));
        dispatch(authActions.setToken(""));
        dispatch(authActions.setUserInfo({}));
        dispatch(authActions.setUserStatus("pending"));
        navigation.reset({
          index: 0,
          routes: [{ name: RouteString.OnBording }],
        });
      }
    } catch (error: any) {
      setIsDeleteAccount(false);
      Toast.show({
        type: "error",
        text1: error.response?.data?.message,
      });
    }
  };

  const imageUrl = userInfo.profile_pic?.file_path 
  ? { uri: `${IMAGE_URL}${userInfo.profile_pic.file_path}` }
  : null;

  return (
    <SafeAreaContainer>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: hp(2) }}
      >
        <View style={styles.redView}>
          <Text style={styles.myProfile}>{t("myProfile.myProfile")}</Text>
          <View style={styles.profileView}>
            <View style={styles.shadowView}>
              <Image
               source={isError || !imageUrl ? IconsPath.user : imageUrl}
                style={styles.userProfile}
                onError={() => setIsError(true)}
              />
            </View>
            <Text style={styles.userName}>{userInfo?.name}</Text>
            <Text style={styles.dealerCode}>
              {IdDes} :{" "}
              {userInfo?.distributorNumber ||
                userInfo?.dealerNumber ||
                userInfo?.asoNumber ||
                userInfo?.masonNumber}
            </Text>
          </View>
        </View>
        {isEdit ? (
          <View style={{ marginTop: hp(15) }}>
            <Text style={styles.personalInfo}>
              {t("myProfile.personalInfo")}
            </Text>

            <TextInputFieldOptional
              title={t("registration.yourBirthDate")}
              placeholder={t("registration.DDMM")}
              value={birthDate}
              maxLength={5}
              onChangeText={() => null}
              editable
              onTouchStart={() => {
                setDatePickerVisibility(true);
              }}
            />
            <View style={styles.moreMemberView}>
              <TextInputFieldOptional
                title={t("registration.familyMemberName")}
                placeholder={t("registration.entreFamilyMemberName")}
                mainViewStyle={styles.mainViewStyle}
                labelStyle={styles.labelStyle}
                InputViewStyle={styles.inputViewStyle}
                value={formData.name}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, name: text }))
                }
              />
              <TextInputFieldOptional
                title={t("registration.relationShipWithMember")}
                placeholder={t("registration.enterRelatioshipWithEmeber")}
                labelStyle={styles.labelStyle}
                InputViewStyle={styles.inputViewStyle}
                value={formData.relationship}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, relationship: text }))
                }
              />
              <TextInputFieldOptional
                title={t("myProfile.birthData")}
                placeholder={t("registration.DDMM")}
                labelStyle={styles.labelStyle}
                InputViewStyle={styles.inputViewStyle}
                value={formData.dob}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, dob: text }))
                }
              />
            </View>
            <Button
              buttonName={t("myProfile.save")}
              isLoading={isLoading}
              onPress={handleSave}
              buttonStyle={{ marginBottom: hp(2) }}
            />
          </View>
        ) : (
          <>
            <View
              style={[
                styles.userInfoCard,
                {
                  marginTop: hp(15),
                },
              ]}
            >
              <UserInfoRowView
                title={t("myProfile.email")}
                userInfo={userInfo?.email || ""}
              />
              <UserInfoRowView
                title={t("myProfile.mobileNo")}
                userInfo={userInfo?.mobile_number || ""}
              />
              <UserInfoRowView
                title={t("myProfile.birthData")}
                userInfo={
                  userInfo?.dob ? moment(userInfo?.dob).format("DD MMM") : ""
                }
              />
              <UserInfoRowView
                title={t("myProfile.counterAddress")}
                userInfo={userInfo?.address || ""}
              />
            </View>
            {members?.map((member: any, index: number) => (
              <View style={styles.userInfoCard} key={index}>
                <View style={styles.memberRowView}>
                  <Text style={styles.member}>
                    {t("myProfile.member")} {index + 1}
                  </Text>
                  <Pressable onPress={() => handleEdit(member)}>
                    <Image source={IconsPath.edit} style={styles.edit} />
                  </Pressable>
                </View>
                <View>
                  <Text style={styles.familyName}>
                    {t("registration.familyMemberName")}
                  </Text>
                  <Text style={styles.name}>{member.name}</Text>
                </View>
                <View style={{ marginVertical: hp(1.5) }}>
                  <Text style={styles.familyName}>
                    {t("registration.relationShipWithMember")}
                  </Text>
                  <Text style={styles.name}>{member.relationship}</Text>
                </View>
                <View>
                  <Text style={styles.familyName}>
                    {t("myProfile.birthData")}
                  </Text>
                  <Text style={styles.name}>
                    {moment(member.dob).format("DD MMM YYYY")}
                  </Text>
                </View>
              </View>
            ))}
          </>
        )}
        <Button
          buttonName={t("drawer.deleteAccount")}
          buttonStyle={{ marginTop: hp(0), width: wp(50) }}
          onPress={() => setIsDeleteAccount(true)}
          isLoading={false}
        />
      </ScrollView>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => setDatePickerVisibility(false)}
      />
      <DeleteAccountModal
        isVisible={isDeleteAccount}
        backOnPress={() => setIsDeleteAccount(!isDeleteAccount)}
        yesOnPress={handleDeleteOnPress}
      />
    </SafeAreaContainer>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  redView: {
    backgroundColor: colors.primary,
    height: hp(14),
  },
  myProfile: {
    color: colors.white,
    fontSize: RFValue(18),
    fontFamily: FontPath.OutfitSemiBold,
    marginTop: hp(2),
    marginLeft: wp(2),
  },
  profileView: {
    marginTop: hp(8),
    position: "absolute",
    alignSelf: "center",
    alignItems: "center",
  },
  shadowView: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4.65,
    elevation: 4,
  },
  userProfile: {
    width: isiPAD ? wp(16) : wp(25),
    height: isiPAD ? wp(16) : wp(25),
    resizeMode: "cover",
    borderRadius: 100,
    borderWidth: 5,
    borderColor: colors.white,
  },
  userName: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(20),
    marginTop: hp(1),
    marginBottom: hp(0.2),
  },
  dealerCode: {
    color: colors.darkGray,
    fontFamily: FontPath.OutfitLight,
    fontSize: RFValue(12),
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
  memberRowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp(1.5),
  },
  member: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(16),
  },
  edit: {
    width: isiPAD ? wp(4.5) : wp(6.5),
    height: isiPAD ? wp(4.5) : wp(6.5),
    resizeMode: "contain",
  },
  familyName: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(14),
    marginBottom: hp(0.3),
  },
  name: {
    color: colors.black,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(14),
  },
  personalInfo: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(18),
    marginHorizontal: wp(5),
    marginTop: hp(2),
  },
  moreMemberView: {
    backgroundColor: colors.lightblack,
    borderWidth: 1,
    borderColor: colors.black_100,
    marginHorizontal: wp(5),
    marginTop: hp(2),
    paddingVertical: hp(3),
  },
  mainViewStyle: {
    marginTop: 0,
  },
  labelStyle: {
    marginBottom: hp(1),
  },
  inputViewStyle: {
    borderWidth: 1,
    borderColor: colors.black_50,
  },
});
