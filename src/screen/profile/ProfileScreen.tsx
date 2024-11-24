import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import SafeAreaContainer from '../../components/common/SafeAreaContainer';
import {colors} from '../../utils/Colors';
import {hp, isiPAD, RFValue, wp} from '../../helper/Responsive';
import {FontPath} from '../../utils/FontPath';
import {userProfileImage} from '../../utils/JsonData';
import UserInfoRowView from '../../components/common/UserInfoRowView';
import {IconsPath} from '../../utils/IconPath';
import TextInputFieldOptional from '../../components/common/TextInputFieldOptional';
import Button from '../../components/common/Button';
import {useTranslation} from 'react-i18next';

const ProfileScreen = () => {
  const {t} = useTranslation();
  const [isEdit, setIsEdit] = useState(false);
  const [birthDate, setBirthDate] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [relationShip, setRelationShip] = useState('');
  const [dob, setDob] = useState('');

  return (
    <SafeAreaContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.redView}>
          <Text style={styles.myProfile}>{t('myProfile.myProfile')}</Text>
          <View style={styles.profileView}>
            <View style={styles.shadowView}>
              <Image
                source={{uri: userProfileImage}}
                style={styles.userProfile}
              />
            </View>
            <Text style={styles.userName}>Rajesh Kumar</Text>
            <Text style={styles.dealerCode}>{t('drawer.dealerCode')} : BDMDL0001</Text>
          </View>
        </View>
        {isEdit ? (
          <View style={{marginTop: hp(15)}}>
            <Text style={styles.personalInfo}>
              {t('myProfile.personalInfo')}
            </Text>
            <TextInputFieldOptional
              title={t('registration.yourBirthDate')}
              placeholder={t('registration.DDMM')}
              value={birthDate}
              onChangeText={text => setBirthDate(text)}
            />
            <View style={styles.moreMemberView}>
              <TextInputFieldOptional
                title={t('registration.familyMemberName')}
                placeholder={t('registration.entreFamilyMemberName')}
                mainViewStyle={styles.mainViewStyle}
                labelStyle={styles.labelStyle}
                InputViewStyle={styles.inputViewStyle}
                value={familyName}
                onChangeText={text => setFamilyName(text)}
              />
              <TextInputFieldOptional
                title={t('registration.relationShipWithMember')}
                placeholder={t('registration.enterRelatioshipWithEmeber')}
                labelStyle={styles.labelStyle}
                InputViewStyle={styles.inputViewStyle}
                value={relationShip}
                onChangeText={text => setRelationShip(text)}
              />
              <TextInputFieldOptional
                title={t('registration.birthDate')}
                placeholder={t('registration.DDMM')}
                labelStyle={styles.labelStyle}
                InputViewStyle={styles.inputViewStyle}
                value={dob}
                onChangeText={text => setDob(text)}
              />
            </View>
            <Button
              buttonName={t('myProfile.save')}
              isLoading={false}
              onPress={() => setIsEdit(false)}
              buttonStyle={{marginBottom: hp(2)}}
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
              ]}>
              <UserInfoRowView
                title={t('myProfile.email')}
                userInfo="Andrewmarcel@gmail.com"
              />
              <UserInfoRowView
                title={t('myProfile.mobileNo')}
                userInfo="+918989898989"
              />
              <UserInfoRowView
                title={t('myProfile.birthData')}
                userInfo="12 Sept"
              />
              <UserInfoRowView
                title={t('myProfile.counterAddress')}
                userInfo="D-23 Apple Square Building Nr Mater place banglore"
              />
            </View>
            <View style={styles.userInfoCard}>
              <View style={styles.memberRowView}>
                <Text style={styles.member}>{t('myProfile.member')} 1</Text>
                <Pressable onPress={() => setIsEdit(true)}>
                  <Image source={IconsPath.edit} style={styles.edit} />
                </Pressable>
              </View>
              <View>
                <Text style={styles.familyName}>
                  {t('registration.familyMemberName')}
                </Text>
                <Text style={styles.name}>Rajesh Shah</Text>
              </View>
              <View style={{marginVertical: hp(1.5)}}>
                <Text style={styles.familyName}>
                  {t('registration.relationShipWithMember')}
                </Text>
                <Text style={styles.name}>My Memeber</Text>
              </View>
              <View>
                <Text style={styles.familyName}>
                  {t('myProfile.birthData')}
                </Text>
                <Text style={styles.name}>15 Sept 1954</Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>
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
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
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
    resizeMode: 'cover',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(1.5),
  },
  member: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(16),
  },
  edit: {
    width: isiPAD ? wp(4.5) : wp(6.5),
    height:  isiPAD ? wp(4.5) :  wp(6.5),
    resizeMode: 'contain',
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
