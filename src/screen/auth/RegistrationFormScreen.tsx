import {Alert, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import SafeAreaContainer from '../../components/common/SafeAreaContainer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {colors} from '../../utils/Colors';
import {FontPath} from '../../utils/FontPath';
import {hp, isiPAD, RFValue, wp} from '../../helper/Responsive';
import TextInputField from '../../components/common/TextInputField';
import {useFormik} from 'formik';
import {useAppSelector} from '../../redux/Store';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {dealerValidationSchema} from '../../utils/ValidationSchema';
import {RouteString} from '../../navigation/RouteString';
import TextInputFieldOptional from '../../components/common/TextInputFieldOptional';
import {IconsPath} from '../../utils/IconPath';
import DocumentUploadView from '../../components/registration/DocumentUploadView';
import Button from '../../components/common/Button';
import CheckIcons from '../../assets/svg/CheckIcons';
import DocumentPicker from 'react-native-document-picker';
import { useTranslation } from 'react-i18next';

const RegistrationFormScreen = () => {
  const {t} = useTranslation();
  const {portal} = useAppSelector(state => state.auth);
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [birthDate, setBirthDate] = useState('');
  const [isCheck, setIsCheck] = useState(false);
  const [familyMembers, setFamilyMembers] = useState([
    {id: Date.now(), name: '', relationship: '', birthDate: ''},
  ]);
  const [uploadedDocuments, setUploadedDocuments] = useState<any>({}); // State to store documents


  const {handleChange, handleBlur, handleSubmit, values, touched, errors} =
    useFormik({
      initialValues: {
        firmName: '',
        workCity: '',
        zipCode: '',
        counterAddress: '',
      },
      validationSchema: dealerValidationSchema,
      onSubmit: values => navigation.navigate(RouteString.SignUpScreen),
    });

    const handleDocumentSelection = useCallback(async (docType: any) => {
      try {
        const response = await DocumentPicker.pick({
          type: [DocumentPicker.types.pdf], // Restrict to PDFs
          presentationStyle: 'fullScreen',
        });
  
        // Store the document in the state
        setUploadedDocuments((prevState: any) => ({
          ...prevState,
          [docType]: response[0], // Use docType as the key, e.g., 'aadharCard'
        }));
  
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          console.warn('User canceled the document picker');
        } else {
          console.error('Error selecting document:', err);
        }
      }
    }, []);

  // Handler to add a new member form
  const addMember = () => {
    setFamilyMembers([
      ...familyMembers,
      {id: Date.now(), name: '', relationship: '', birthDate: ''},
    ]);
  };

  // Handler to remove a member form by id
  const removeMember = (id: number) => {
    setFamilyMembers(familyMembers.filter(member => member.id !== id));
  };

  // Handler to update the member details and validate the name field
  const handleInputChange = (id: number, field: string, value: string) => {
    if (field === 'name' && value.toLowerCase() === 'all') {
      Alert.alert(
        'Invalid Input',
        '"all" is not allowed as a name. Please enter a different name.',
      );
      return;
    }

    setFamilyMembers(
      familyMembers.map(member =>
        member.id === id ? {...member, [field]: value} : member,
      ),
    );
  };

  return (
    <SafeAreaContainer showHeader={false}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        extraScrollHeight={hp(-10)} // Adjust as needed
        contentContainerStyle={{paddingBottom: hp(5)}}>
        <Text style={styles.title}>{t('registration.completeRegistration')}</Text>
        <TextInputField
          title={t('registration.enterprise')}
          placeholder={t('registration.enterEnterprise')}
          isPassword={false}
          value={values.firmName}
          onChangeText={handleChange('firmName')}
          onBlur={handleBlur('firmName')}
          touched={touched.firmName}
          errors={errors.firmName}
          isRequired={true}
        />
        <TextInputField
          title={t('registration.workCity')}
          placeholder={t('registration.enterWorkCity')}
          isPassword={false}
          value={values.workCity}
          onChangeText={handleChange('workCity')}
          onBlur={handleBlur('workCity')}
          touched={touched.workCity}
          errors={errors.workCity}
          isRequired={true}
        />
        <TextInputField
          title={t('registration.zipCode')}
          placeholder={t('registration.enterZipCode')}
          isPassword={false}
          value={values.zipCode}
          onChangeText={handleChange('zipCode')}
          onBlur={handleBlur('zipCode')}
          touched={touched.zipCode}
          errors={errors.zipCode}
          maxLength={6}
          isRequired={true}
        />
        <TextInputField
          title={t('registration.counterAddress')}
          placeholder={t('registration.enterCounterAddress')}
          isPassword={false}
          value={values.counterAddress}
          onChangeText={handleChange('counterAddress')}
          onBlur={handleBlur('counterAddress')}
          touched={touched.counterAddress}
          errors={errors.counterAddress}
          InputViewStyle={styles.inputView}
          multiline
          isRequired={true}
        />
        <Text style={styles.personalInfo}>{t('registration.personalInfo')}</Text>
        <TextInputFieldOptional
          title={t('registration.yourBirthDate')}
          placeholder={t('registration.DDMM')}
          value={birthDate}
          onChangeText={text => setBirthDate(text)}
        />
        {familyMembers.map((member, index) => (
          <View style={styles.moreMemberView}>
            <Pressable
              style={styles.closeButton}
              onPress={() => removeMember(member.id)}>
              <Image source={IconsPath.closeRound} style={styles.close} />
            </Pressable>
            <TextInputFieldOptional
              title={t('registration.familyMemberName')}
              placeholder={t('registration.entreFamilyMemberName')}
              mainViewStyle={styles.mainViewStyle}
              labelStyle={styles.labelStyle}
              InputViewStyle={styles.inputViewStyle}
              value={member.name}
              onChangeText={value =>
                handleInputChange(member.id, 'name', value)
              }
            />
            <TextInputFieldOptional
              title={t('registration.relationShipWithMember')}
              placeholder={t('registration.enterRelatioshipWithEmeber')}
              labelStyle={styles.labelStyle}
              InputViewStyle={styles.inputViewStyle}
              value={member.relationship}
              onChangeText={value =>
                handleInputChange(member.id, 'relationship', value)
              }
            />
            <TextInputFieldOptional
              title={t('registration.birthDate')}
              placeholder={t('registration.DDMM')}
              labelStyle={styles.labelStyle}
              InputViewStyle={styles.inputViewStyle}
              value={member.birthDate}
              onChangeText={value =>
                handleInputChange(member.id, 'birthDate', value)
              }
            />
          </View>
        ))}
        <Pressable style={styles.addMoreMemberButton} onPress={addMember}>
          <Image source={IconsPath.pluse} style={styles.pluse} />
          <Text style={styles.addMoreMember}>{t('registration.addMoreMember')}</Text>
        </Pressable>
        <DocumentUploadView
          icons={uploadedDocuments?.aadharCard?.name ? IconsPath.success : IconsPath.upload}
          onPress={() => handleDocumentSelection('aadharCard')}
          title={t('registration.aadharCardUpload')}
          fileName={uploadedDocuments?.aadharCard?.name}
        />
        <DocumentUploadView
          icons={ uploadedDocuments?.panCard?.name ? IconsPath.success : IconsPath.upload}
          onPress={() => handleDocumentSelection('panCard')}
          title={t('registration.panCardUpload')}
          fileName={uploadedDocuments?.panCard?.name}
        />
        <DocumentUploadView
          icons={uploadedDocuments?.gstCertificate?.name ? IconsPath.success : IconsPath.upload}
          onPress={() => handleDocumentSelection('gstCertificate')}
          title={t('registration.GSTCertificateUpload')}
          fileName={uploadedDocuments?.gstCertificate?.name}
        />
        <DocumentUploadView
          icons={uploadedDocuments?.photo?.name ? IconsPath.success :IconsPath.upload}
          onPress={() => handleDocumentSelection('photo')}
          title={t('registration.photoUpload')}
          fileName={uploadedDocuments?.photo?.name}
        />
        <DocumentUploadView
          icons={uploadedDocuments?.signedCheque?.name ? IconsPath.success : IconsPath.upload}
          onPress={() => handleDocumentSelection('signedCheque')}
          title={t('registration.signedChequeUpload')}
          fileName={uploadedDocuments?.signedCheque?.name}
        />
        <View style={styles.termsView}>
          <Pressable
            style={[
              styles.checkButton,
              {
                backgroundColor: isCheck ? colors.primary : colors.white,
                borderColor: isCheck ? colors.primary : colors.black,
              },
            ]}
            onPress={() => setIsCheck(!isCheck)}>
            {isCheck && (
              <CheckIcons fill={isCheck ? colors.white : colors.black} />
            )}
          </Pressable>
          <Text style={styles.agreeText}>
          {t('registration.iAgreeWithAllTheTermsComditions')}
          </Text>
        </View>
        <Button
          buttonName={t('registration.submitForApproval')}
          isLoading={false}
          buttonStyle={{marginTop: 0}}
          onPress={() =>
            navigation.navigate(RouteString.CompletingRegistrationScreen)
          }
        />
      </KeyboardAwareScrollView>
    </SafeAreaContainer>
  );
};

export default RegistrationFormScreen;

const styles = StyleSheet.create({
  title: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(18),
    marginHorizontal: wp(5),
    lineHeight:hp(4)
  },
  inputView: {
    height: hp(15),
    alignItems: 'flex-start',
    paddingVertical: hp(2),
  },
  personalInfo: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(15),
    marginHorizontal: wp(5),
    marginTop: hp(2),
    lineHeight:hp(4)
  },
  close: {
    width: isiPAD ? wp(5) : wp(7),
    height:  isiPAD ? wp(5) : wp(7),
    resizeMode: 'contain',
  },
  moreMemberView: {
    backgroundColor: colors.lightblack,
    borderWidth: 1,
    borderColor: colors.black_100,
    marginHorizontal: wp(5),
    marginTop: hp(2),
    paddingBottom: hp(3),
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginRight: wp(4),
    marginTop: hp(2),
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
  addMoreMemberButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp(5),
    marginVertical: hp(3),
  },
  pluse: {
    width: isiPAD ? wp(6) : wp(8),
    height: isiPAD ? wp(6) : wp(8),
    resizeMode: 'contain',
  },
  addMoreMember: {
    color: colors.primary,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(14),
    lineHeight:hp(3)
  },
  termsView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: hp(2),
    marginBottom: hp(4),
  },
  checkButton: {
    width: wp(5),
    height: wp(5),
    borderWidth: 2,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  agreeText: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(14),
    marginLeft: wp(2),
    lineHeight:hp(3)
  },
});
