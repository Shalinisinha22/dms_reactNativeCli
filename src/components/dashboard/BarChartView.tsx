import { StyleSheet, View} from 'react-native';
import React from 'react';
import {VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryTheme} from 'victory-native';
import { hp, isiPAD, wp } from '../../helper/Responsive';

const BarChartView = () => {
  const data = [
    {month: 'Jan', earnings: 1000},
    {month: 'Feb', earnings: 1500},
    {month: 'Mar', earnings: 2000},
    {month: 'Apr', earnings: 2500},
    {month: 'May', earnings: 3000},
    {month: 'Jun', earnings: 3500},
    {month: 'Jul', earnings: 4000},
    {month: 'Aug', earnings: 4500},
    {month: 'Sep', earnings: 5000},
    {month: 'Oct', earnings: 5500},
    {month: 'Nov', earnings: 6000},
    {month: 'Dec', earnings: 6500},
  ];

  return (
    <View style={styles.container}>
      <VictoryChart
        width={ isiPAD ? wp(90) :  wp(100)}
        height={hp(30)}
        theme={VictoryTheme.clean}>
       <VictoryAxis
          tickLabelComponent={<VictoryLabel angle={90} dy={-10}   />}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(y) => `$${y / 1000}k`} // Format y-axis labels
        />
        <VictoryBar data={data} x="month" y="earnings" alignment="start" />
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
