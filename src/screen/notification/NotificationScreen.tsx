import {
  ActivityIndicator,
  Image,
  Pressable,
  SectionList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import SafeAreaContainer from "../../components/common/SafeAreaContainer";
import { IconsPath } from "../../utils/IconPath";
import { hp, RFValue, wp } from "../../helper/Responsive";
import { FontPath } from "../../utils/FontPath";
import { colors } from "../../utils/Colors";
import {
  NavigationProp,
  ParamListBase,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useGetNotificationUnRead } from "../../api/query/NotificationService";
import moment from "moment";

const NotificationScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const getNotificationUnRead = useGetNotificationUnRead();
  const [data, setData] = React.useState<any>([]);
  const [totalPage, setTotalPage] = useState(0);
  const [nextPage, setNextPage] = useState<any>(null);
  const [curPage, setCurPage] = useState(1);
  const isFoused = useIsFocused();
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (isFoused) {
      getunReadNotification();
      setCurPage(1);
      setTotalPage(0);
      setNextPage(null);
    }
  }, [isFoused]);

  const getunReadNotification = async () => {
    try {
      const res = await getNotificationUnRead.mutateAsync({ page: curPage });
      if (nextPage >= curPage && nextPage != null) {
        setIsFetching(true);
      }
      if (res?.data) {
        const notificationDatas =
          res?.data.reduce(
            (
              acc: any[],
              item: {
                createdAt: moment.MomentInput;
                id: any;
                body: any;
                isRead: any;
              }
            ) => {
              if (!item?.createdAt) return acc; // Skip if createdAt is invalid

              const formattedDate = moment(item.createdAt).format("DD MMM");

              // Check if the date already exists in the accumulator
              let existingDate = acc.find(
                (entry: { title: string }) => entry.title === formattedDate
              );

              // If it doesn't exist, create a new entry
              if (!existingDate) {
                existingDate = {
                  title: formattedDate, // Format date as required
                  data: [],
                };
                acc.push(existingDate);
              }

              // Push the notification item into the corresponding data array
              existingDate.data.push({
                id: item.id,
                des: item.body,
                isNew: item.isRead,
                time: moment(item.createdAt).format("h:mm A"), // Format time
                colors: item.isRead ? "#F5F6F8" : "#8BD399", // Use different colors based on read status
              });

              return acc;
            },
            [] // Correct initialization of the accumulator
          ) || [];
        setData((prevData: any) =>
          curPage === 1
            ? notificationDatas
            : [...prevData, ...notificationDatas]
        );
        if (res?.hasMore) {
          setTotalPage(res.totalPage);
          setNextPage(res.nextPage);
        }
        setIsFetching(false);
      }
    } catch (error) {
      setIsFetching(false);
      console.log("getunReadNotification", error);
    }
  };

  const onEndReached = () => {
    if (nextPage <= totalPage && nextPage != null) {
      setCurPage(curPage + 1);
      getunReadNotification();
    }
  };

  return (
    <SafeAreaContainer showHeader={false}>
      <View style={styles.headerView}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image source={IconsPath.backArrow1} style={styles.backButton} />
        </Pressable>
        <Text style={styles.notification}>
          {t("notification.notification")}
        </Text>
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
        sections={data}
        keyExtractor={(item, index) => `${item.id}_${index}`}
        stickyHeaderHiddenOnScroll
        stickySectionHeadersEnabled
        showsVerticalScrollIndicator={false}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() =>
          isFetching ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : null
        }
        renderItem={({ item, index }) => {
          return (
            <View
              key={index}
              style={[
                styles.cardView,
                {
                  backgroundColor: item.colors,
                },
              ]}
            >
              <View style={styles.rowView}>
                <Text style={styles.notificationDes}>{item.des}</Text>
                {item.isNew && (
                  <View style={styles.newView}>
                    <Text style={styles.new}>{t("notification.new")}</Text>
                  </View>
                )}
              </View>
              <Text style={styles.time}>{item.time}</Text>
            </View>
          );
        }}
        renderSectionHeader={({ section }) => (
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
    resizeMode: "contain",
  },
  notification: {
    fontSize: RFValue(22),
    fontFamily: FontPath.OutfitSemiBold,
    color: colors.black,
    position: "absolute",
    alignSelf: "center",
  },
  notificationIcon: {
    width: wp(40),
    height: wp(40),
    resizeMode: "contain",
    alignSelf: "center",
  },
  nothingHere: {
    color: colors.black,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(22),
    textAlign: "center",
    marginVertical: hp(4),
  },
  des: {
    color: colors.black,
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(20),
    textAlign: "center",
    marginHorizontal: wp(5),
  },
  centerView: {
    flex: 1,
    justifyContent: "center",
  },
  rowView: {
    justifyContent: "space-between",
    flexDirection: "row",
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
    justifyContent: "center",
    alignItems: "center",
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
    color:colors.black,
    fontFamily: FontPath.OutfitBold,
    fontSize: RFValue(14),
  },
  cardView: {
    height: hp(12),
    marginHorizontal: wp(5),
    borderRadius: 5,
    marginBottom: hp(3),
    justifyContent: "center",
  },
  time: {
    fontFamily: FontPath.OutfitRegular,
    fontSize: RFValue(14),
    color: colors.black,
    textAlign: "right",
    marginRight: wp(8),
  },
});
