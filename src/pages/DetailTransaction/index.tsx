import React, {useEffect, useState} from 'react';
import {BackHeader, Buttons, Gap, LoadingDots, Text} from '../../components';
import {AppState, SafeAreaView, StatusBar} from 'react-native';
import {DetailTransactionSections} from '../../sections';
import {DetailTransactionProps} from '../../navigation';
import styles from './styles';
import {useRoute} from '@react-navigation/native';
import {API_ORDER, BASE_URL, patchDataWithToken} from '../../api';
import {getData} from '../../utils/async-storage';
import {moderateScale} from '../../utils/scale';
import {colors} from '../../utils/colors';
import {OrderParam, ProductsTypes} from '../../types';
import {usePaymentSnapStore} from '../../store/usePaymentSnap';

const DetailTransaction = ({navigation}: DetailTransactionProps) => {
  const route = useRoute<DetailTransactionProps['route']>();

  const detail = route?.params;

  const paymentSnapStore = usePaymentSnapStore();

  const [loadingDots, setLoadingDots] = useState(false);
  const [isReview, setIsReview] = useState(() => detail?.item.isReceived);

  const [appState, setAppState] = useState(AppState.currentState);
  const [timeDiff, setTimeDiff] = useState(0);

  const handleAppStateChange = (nextAppState: any) => {
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      const expirationTime: any = new Date(detail?.item?.expiredAt);
      const now: any = new Date();
      setTimeDiff(Math.floor((expirationTime - now) / 1000));
    }
    setAppState(nextAppState);
  };

  const onReceive = async () => {
    try {
      const orderId = (detail?.item as OrderParam)?.orderId;
      const token = await getData('ACCESS_TOKEN');
      const response = await patchDataWithToken(
        BASE_URL + API_ORDER + `/${orderId}`,
        token,
      );
      setIsReview(true);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const goToReview = () => {
    navigation.navigate('Rating', {
      idProduct:
        (detail?.item.products?.[0]?.productId as ProductsTypes)._id || '',
      orderId: (detail?.item as OrderParam)?.orderId,
    });
  };

  const goToReturn = () => {
    navigation.navigate('Return', {
      idProduct:
        (detail?.item.products?.[0]?.productId as ProductsTypes)._id || '',
      orderId: (detail?.item as OrderParam)?.orderId,
    });
  };

  const goToPayment = async () => {
    const details = detail?.item;
    setLoadingDots(true);

    try {
      navigation.navigate('Payment');
      paymentSnapStore.setPaymentSnap(details?.snapUrl);
    } catch (err) {
      setLoadingDots(false);
    }
  };

  useEffect(() => {
    const expirationTime: any = new Date(detail?.item?.expiredAt);
    const now: any = new Date();
    setTimeDiff(Math.floor((expirationTime - now) / 1000));

    const subscription = AppState?.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription?.remove?.();
    };
  }, [detail?.item?.expiredAt]);
  console.log('PAGE__', route?.params?.titleParam);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={false}
        backgroundColor={colors.basebg}
        barStyle="dark-content"
      />
      {loadingDots && <LoadingDots />}

      <BackHeader
        title={
          route?.params?.titleParam === 'Order'
            ? 'Detail Pesanan'
            : 'Detail Transaksi'
        }
        goBack={() => navigation?.goBack()}
        icon={false}>
        <DetailTransactionSections
          detail={detail}
          timeDiff={timeDiff}
          pathOrder={route?.params?.titleParam === 'Order'}
        />

        {!detail.item?.reviewedProduct?.includes(
          (detail?.item?.products?.[0]?.productId as ProductsTypes)?._id || '',
        ) && (
          <React.Fragment>
            {Boolean(timeDiff > 0) && (
              <>
                {detail?.item?.status === 'UNPAID' && (
                  <Buttons onPress={goToPayment} style={styles.btn}>
                    <Text style={styles.txtBtn}>Bayar Sekarang</Text>
                  </Buttons>
                )}
              </>
            )}
            {detail?.item?.status === 'ON_DELIVERY' && (
              <>
                {isReview ? (
                  <Buttons
                    onPress={() => goToReview()}
                    style={[styles.btn, {backgroundColor: colors.darkblue}]}>
                    <Text style={styles.txtBtn}>Beri Ulasan</Text>
                  </Buttons>
                ) : (
                  <React.Fragment>
                    <Buttons
                      onPress={goToReturn}
                      style={[styles.btn, {backgroundColor: '#424242'}]}>
                      <Text style={styles.txtBtn}>Pengembalian Barang</Text>
                    </Buttons>
                    <Gap height={moderateScale(8)} width={0} />
                    <Buttons onPress={onReceive} style={styles.btn}>
                      <Text style={styles.txtBtn}>Barang di Terima</Text>
                    </Buttons>
                  </React.Fragment>
                )}
              </>
            )}
          </React.Fragment>
        )}
      </BackHeader>
    </SafeAreaView>
  );
};

export default DetailTransaction;
