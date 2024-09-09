import React, {useCallback, useState} from 'react';
import {BackHeader, Gap} from '../../components';
import {moderateScale} from '../../utils/scale';
import {SafeAreaView, ScrollView, StatusBar} from 'react-native';
import styles from './styles';
import {HistoryTransactionProps} from '../../navigation';
import {HistoryTransactionSections} from '../../sections';
import {Order, ProductsTypes} from '../../types';
import {getData} from '../../utils/async-storage';
import {API_ORDER, BASE_URL, getDataWithToken} from '../../api';
import {DataHistoryStatus} from '../../constants';
import {useFocusEffect} from '@react-navigation/native';
import {colors} from '../../utils/colors';

const HistoryTransaction = ({navigation}: HistoryTransactionProps) => {
  const [loading, setLoading] = useState(false);

  const [dataOrder, setDataOrder] = useState<Order[]>([]);

  const [activeMenuIndex, setActiveMenuIndex] = useState(0);

  const [categoryStatus, setCategoryStatus] = useState('COMPLETED');

  const handleMenuPress = (index: number, item: ProductsTypes) => {
    setActiveMenuIndex(index);
    setCategoryStatus(item?.slug as string);
    getOrder(item?.slug as string);
  };

  const goDetailTransaction = async (item: Order) => {
    navigation.navigate('DetailTransaction', {
      item,
    });
  };

  const getOrder = async (cat?: string) => {
    setLoading(true);

    try {
      const token = await getData('ACCESS_TOKEN');
      const response = await getDataWithToken(
        BASE_URL + API_ORDER + `?status=${cat || categoryStatus}`,
        token,
      );

      if (response?.data?.data.length) {
        setLoading(false);
        setDataOrder(response?.data?.data);
      } else {
        setLoading(false);
        setDataOrder([]);
      }
    } catch (err) {
      setLoading(false);
      setDataOrder([]);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getOrder();
    }, []),
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={false}
        backgroundColor={colors.basebg}
        barStyle="dark-content"
      />
      <BackHeader
        title="Riwayat Transaksi"
        goBack={() => navigation?.goBack()}
        icon={false}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <Gap height={moderateScale(8)} width={0} />
          <HistoryTransactionSections
            loading={loading}
            data={dataOrder}
            onPress={goDetailTransaction}
            category={DataHistoryStatus}
            activeMenuIndex={activeMenuIndex}
            handleMenuPress={handleMenuPress}
          />
          <Gap height={moderateScale(8)} width={0} />
        </ScrollView>
      </BackHeader>
    </SafeAreaView>
  );
};

export default HistoryTransaction;
