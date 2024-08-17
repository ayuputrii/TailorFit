import React, {useEffect, useState} from 'react';
import {BackHeader, Gap} from '../../components';
import {moderateScale} from '../../utils/scale';
import {ScrollView, View} from 'react-native';
import styles from './styles';
import {HistoryTransactionProps} from '../../navigation';
import {HistoryTransactionSections} from '../../sections';
import {ProductsTypes} from '../../types';
import {getData} from '../../utils/async-storage';
import {API_ORDER, BASE_URL, getDataWithToken} from '../../api';

const data: ProductsTypes[] = [
  {
    _id: '1',
    label: 'Kebaya',
    price: 150000,
    total: '1',
  },
];

const HistoryTransaction = ({navigation}: HistoryTransactionProps) => {
  const [loading, setLoading] = useState(false);

  const [dataOrder, setDataOrder] = useState([]);

  const goDetailTransaction = async (item: ProductsTypes) => {
    navigation.navigate('DetailTransaction', {
      item,
    });
  };

  const getOrder = async () => {
    setLoading(true);
    try {
      const token = await getData('ACCESS_TOKEN');
      const response = await getDataWithToken(BASE_URL + API_ORDER, token);

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

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <View style={styles.container}>
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
          />
          <Gap height={moderateScale(8)} width={0} />
        </ScrollView>
      </BackHeader>
    </View>
  );
};

export default HistoryTransaction;
