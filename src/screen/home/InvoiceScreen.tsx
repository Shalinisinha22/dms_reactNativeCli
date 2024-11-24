import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import SafeAreaContainer from '../../components/common/SafeAreaContainer';
import {IconsPath} from '../../utils/IconPath';
import {hp, RFValue, wp} from '../../helper/Responsive';
import {colors} from '../../utils/Colors';
import {FontPath} from '../../utils/FontPath';
import InvoiceCard from '../../components/common/InvoiceCard';
import FilterModal from '../../components/modal/FilterModal';
import { useTranslation } from 'react-i18next';
import { commonStyle } from '../../utils/commonStyles';

const InvoiceScreen = () => {
  const {t} = useTranslation();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  return (
    <SafeAreaContainer>
      <View style={styles.headerRowView}>
        <Text style={styles.title}>{t('invoice.invoice')}</Text>
        <Pressable
          style={commonStyle.filterButton}
          onPress={() => setIsFilterOpen(!isFilterOpen)}>
          <Image source={IconsPath.filter} style={commonStyle.filter} />
        </Pressable>
      </View>
      <InvoiceCard />
      <FilterModal
        isVisible={isFilterOpen}
        backOnPress={() => setIsFilterOpen(!isFilterOpen)}
      />
    </SafeAreaContainer>
  );
};

export default InvoiceScreen;

const styles = StyleSheet.create({
  headerRowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: wp(5),
    marginVertical: hp(2.5),
  },
  title: {
    color: colors.black,
    fontFamily: FontPath.OutfitSemiBold,
    fontSize: RFValue(20),
  },
});
