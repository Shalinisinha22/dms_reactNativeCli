import { StyleSheet, Text, View } from 'react-native'
import React, { PropsWithChildren } from 'react'
import { colors } from '../../utils/Colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TopHeader from './TopHeader';
import { hp } from '../../helper/Responsive';

interface SafeAreaContainerProps {
  showHeader?: boolean;
}

const SafeAreaContainer: React.FC<PropsWithChildren<SafeAreaContainerProps>> = ({ children, showHeader = true }) => {
  const { top } = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: top + hp(showHeader ? 0 : 2) }]}>
      {showHeader && <TopHeader />}
      {children}
    </View>
  );
};
  
  export default SafeAreaContainer;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
  });