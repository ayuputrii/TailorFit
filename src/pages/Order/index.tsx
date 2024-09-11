import React, {useCallback, useContext, useState} from 'react';
import {BackHeader, Gap, ImageWithNotLogin} from '../../components';
import {colors} from '../../utils/colors';
import {moderateScale} from '../../utils/scale';
import {SafeAreaView, ScrollView, StatusBar} from 'react-native';
import styles from './styles';
import {OrderProps} from '../../navigation';
import {OrderSections} from '../../sections';
import {OrderParam, Order as OrderType, ProductsTypes} from '../../types';
import {API_ORDER, BASE_URL, getDataWithToken} from '../../api';
import {getData} from '../../utils/async-storage';
import {DataStatus} from '../../constants';
import {AuthContext} from '../../context/AuthContext';
import {useFocusEffect} from '@react-navigation/native';

const Order = ({navigation}: OrderProps) => {
  const ctx = useContext(AuthContext);
  const isLogin = ctx?.isLogin;

  const [activeMenuIndex, setActiveMenuIndex] = useState(0);

  const [dataOrder, setDataOrder] = useState<OrderType[]>([]);

  const [categoryStatus, setCategoryStatus] = useState('UNPAID');

  const [loading, setLoading] = useState(false);

  const handleMenuPress = (index: number, item: ProductsTypes) => {
    setActiveMenuIndex(index);
    setCategoryStatus(item?.slug as string);
    getOrder(item?.slug as string);
  };

  const goDetailTransaction = async (item: OrderParam) => {
    navigation.navigate('DetailTransaction', {
      item,
      titleParam: 'Order',
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
    }, [categoryStatus]),
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={false}
        backgroundColor={colors.basebg}
        barStyle="dark-content"
      />
      <BackHeader
        title="Pesanan Saya"
        goBack={() => navigation?.navigate('Home')}
        icon={false}>
        {isLogin ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <Gap height={moderateScale(8)} width={0} />
            <OrderSections
              loading={loading}
              category={DataStatus}
              data={dataOrder}
              activeMenuIndex={activeMenuIndex}
              handleMenuPress={handleMenuPress}
              onPress={goDetailTransaction}
            />
            <Gap height={moderateScale(8)} width={0} />
          </ScrollView>
        ) : (
          <ImageWithNotLogin navigation={navigation} />
        )}
      </BackHeader>
    </SafeAreaView>
  );
};

export default Order;
