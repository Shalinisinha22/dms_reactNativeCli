import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryTheme,
} from "victory-native";
import { hp, isiPAD, wp } from "../../helper/Responsive";
import { FontPath } from "../../utils/FontPath";
import { colors } from "../../utils/Colors";
import { useTranslation } from "react-i18next";

const BarChartView = ({ data }: { data: any }) => {
  const {t} = useTranslation();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const transformedData = data?.map(
    (item: { date: string | number | Date; totalSale: any }) => {
      const date = new Date(item.date);
      const month = months[date.getMonth()];
      return {
        month,
        earnings: item.totalSale.toString(),
      };
    }
  );

  const hasData = transformedData?.some(
    (item: { earnings: number }) => item.earnings > 0
  );

  return (
    <View style={styles.container}>
      {hasData ? (
        <VictoryChart
          width={isiPAD ? wp(90) : wp(100)}
          height={hp(30)}
          theme={VictoryTheme.clean}
        >
          <VictoryAxis
            tickLabelComponent={<VictoryLabel angle={90} dy={-10} />}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(y) => `₹${y / 1000}k`} // Format y-axis labels
          />
          <VictoryBar
            data={transformedData}
            x="month"
            y="earnings"
            alignment="start"
          />
        </VictoryChart>
      ) : (
        <View style={styles.mainView}>
          <Text style={styles.noData}>{t('error.NoDataAvailable')}</Text>
        </View>
      )}
    </View>
  );
};

export default BarChartView;

const styles = StyleSheet.create({
  container: {
    height: hp(30),
  },
  mainView: {
    justifyContent: "center",
    height: hp(30),
    alignItems: "center",
  },
  noData: {
    fontFamily: FontPath.OutfitMedium,
    color: colors.darkGray,
  },
});
