import { ScrollView, StyleSheet, Text } from 'react-native';
import React, { useState } from 'react';
import SafeAreaContainer from '../../components/common/SafeAreaContainer';
import { colors } from '../../utils/Colors';
import { FontPath } from '../../utils/FontPath';
import { hp, RFValue, wp } from '../../helper/Responsive';
import OrderPlacementCard from '../../components/dashboard/OrderPlacementCard';
import Button from '../../components/common/Button';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import { RouteString } from '../../navigation/RouteString';
import { useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const OrderPlacementScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  // State for order items
  const [orderItems, setOrderItems] = useState([
    { productName: 'TMT Bar 8mm', value: '' },
    { productName: 'TMT Bar 10mm',  value: '' },
    { productName: 'TMT Bar 12mm',  value: '' },
    { productName: 'TMT Bar 14mm', value: '' },
  ]);

  // Handler to update individual values
  const handleValueChange = (index: number, newValue: string) => {
    const updatedItems = [...orderItems];
    updatedItems[index].value = newValue;
    setOrderItems(updatedItems);
  };

  // Compute total weight and amount (example logic)
  const totalWeight = orderItems.reduce((acc, item) => acc + (parseFloat(item.value) || 0), 0);
  const totalAmount = totalWeight * 5000; // Assuming a price per unit

  return (
    <SafeAreaContainer>
      <Text style={styles.title}>{t('orderPlacement.orderPlacement')}</Text>
      <KeyboardAwareScrollView 
      extraScrollHeight={hp(-10)} // Adjust as needed
      showsVerticalScrollIndicator={false}>
        {orderItems.map((item, index) => (
          <OrderPlacementCard
            key={index}
            productName={item.productName}
            value={item.value}
            onChangeText={(text) => handleValueChange(index, text)}
          />
        ))}
        <Text style={styles.totalWeight}>
          {t('orderPlacement.totalWeight')} : {totalWeight} MT
        </Text>
        <Text style={styles.totalAmount}>
          {t('orderPlacement.totalAmount')}: Rs. {totalAmount}
        </Text>
        <Button
          buttonName={t('orderPlacement.orderPreview')}
          isLoading={false}
          onPress={() => navigation.navigate(RouteString.ConfirmOrderScreen)}
          buttonStyle={styles.button}
        />
      </KeyboardAwareScrollView>
    </SafeAreaContainer>
  );
};

export default OrderPlacementScreen;

const styles = StyleSheet.create({
  title: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(20),
    marginHorizontal: wp(5),
    marginVertical: hp(2.5),
  },
  totalWeight: {
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(17),
    textAlign: 'center',
    color: colors.black,
    marginTop: hp(2),
  },
  totalAmount: {
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(18),
    textAlign: 'center',
    color: colors.primary,
    marginTop: hp(0.8),
  },
  button: {
    marginBottom: hp(5),
    marginTop: hp(3),
  },
});
