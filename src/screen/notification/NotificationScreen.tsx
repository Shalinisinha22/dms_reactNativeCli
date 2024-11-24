import {
  Image,
  Pressable,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import SafeAreaContainer from '../../components/common/SafeAreaContainer';
import {IconsPath} from '../../utils/IconPath';
import {hp, RFValue, wp} from '../../helper/Responsive';
import {FontPath} from '../../utils/FontPath';
import {colors} from '../../utils/Colors';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const NotificationScreen = () => {
  const {t} = useTranslation();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const notificationData = [
    {
      title: '24th nOV',
      data: [
        {
          id: '1',
          des: 'Win a trip to, complete 60 MT order by 30th dec.',
          isNew: true,
          time: '8:30 Am',
          colors: '#8BD399',
        },
        {
          id: '2',
          des: 'Win a trip to, complete 60 MT order by 30th dec.',
          isNew: false,
          time: '8:30 Am',
          colors: '#F5F6F8',
        },
        {
          id: '3',
          des: 'Win a trip to, complete 60 MT order by 30th dec.',
          isNew: false,
          time: '8:30 Am',
          colors: '#B5B0F7',
        },
      ],
    },
  ];

  return (
    <SafeAreaContainer>
      <View style={styles.headerView}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image source={IconsPath.backArrow1} style={styles.backButton} />
        </Pressable>
        <Text style={styles.notification}>{t('notification.notification')}</Text>
      </View>
      {/* <View style={styles.centerView}>
        <Image
          source={IconsPath.notificationRed}
          style={styles.notificationIcon}
        />
        <Text
          style={styles.nothingHere}>
          {t('notification.nothingHere')}
        </Text>
        <Text
          style={styles.des}>
          {t('notification.des')}
        </Text>
        <Button
          buttonName={t('notification.notificationSettings')}
          isLoading={false}
          onPress={() => null}
        />
      </View> */}
      <SectionList
        sections={notificationData}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <View
              style={[
                styles.cardView,
                {
                  backgroundColor: item.colors,
                },
              ]}>
              <View style={styles.rowView}>
                <Text style={styles.notificationDes}>{item.des}</Text>
                {item.isNew && (
                  <View style={styles.newView}>
                    <Text style={styles.new}>{t('notification.new')}</Text>
                  </View>
                )}
              </View>
              <Text style={styles.time}>{item.time}</Text>
            </View>
          );
        }}
        renderSectionHeader={({section}) => (
          <Text style={styles.title}>{section.title}</Text>
        )}
      />
    </SafeAreaContainer>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  headerView: {
    marginHorizontal: wp(5),
    marginBottom: hp(2),
  },
  backButton: {
    width: wp(9),
    height: wp(9),
    resizeMode: 'contain',
  },
  notification: {
    fontSize: RFValue(22),
    fontFamily: FontPath.OutfitSemiBold,
    color: colors.black,
    position: 'absolute',
    alignSelf: 'center',
  },
  notificationIcon: {
    width: wp(40),
    height: wp(40),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  nothingHere: {
    color: colors.black,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(22),
    textAlign: 'center',
    marginVertical: hp(4),
  },
  des: {
    color: colors.black,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(20),
    textAlign: 'center',
    marginHorizontal: wp(5),
  },
  centerView: {
    flex: 1,
    justifyContent: 'center',
  },
  rowView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  notificationDes: {
    color: colors.black,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(14),
    maxWidth: wp(70),
    paddingLeft: wp(5),
  },
  newView: {
    backgroundColor: colors.yellow,
    width: wp(12),
    height: hp(3.5),
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
  },
  new: {
    color: colors.black,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(13),
  },
  title: {
    marginHorizontal: wp(5),
    marginBottom: hp(2),
    fontFamily: FontPath.OutfitBold,
    fontSize: RFValue(14),
  },
  cardView: {
    height: hp(12),
    marginHorizontal: wp(5),
    borderRadius: 5,
    marginBottom: hp(3),
    justifyContent: 'center',
  },
  time: {
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(14),
    color: colors.black,
    textAlign: 'right',
    marginRight: wp(8),
  },
});
