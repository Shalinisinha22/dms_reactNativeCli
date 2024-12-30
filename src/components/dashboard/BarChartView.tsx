import { StyleSheet, View} from 'react-native';
import React from 'react';
import {VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryTheme} from 'victory-native';
import { hp, isiPAD, wp } from '../../helper/Responsive';

const BarChartView = ({data}: {data: any}) => {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  
  const transformedData = data?.map((item: { date: string | number | Date; totalSale: any; }) => {
    const date = new Date(item.date);
    const month = months[date.getMonth()]; // Get month name from index
    return {
      month,
      earnings: item.totalSale
    };
  });

  return (
    <View style={styles.container}>
      <VictoryChart
        width={ isiPAD ? wp(90) :  wp(100)}
        height={hp(30)}
        theme={VictoryTheme.clean}>
       <VictoryAxis
          tickLabelComponent={<VictoryLabel angle={90} dy={-10}    />}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(y) => `₹${y / 1000}k`} // Format y-axis labels
        />
        <VictoryBar data={transformedData} x="month" y="earnings" alignment="start"  />
      </VictoryChart>
    </View>
  );
};

export default BarChartView;

const styles = StyleSheet.create({
  container: {
    height:hp(30),
  },
});
