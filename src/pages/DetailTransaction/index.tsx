import React, {useState} from 'react';
import {BackHeader, Buttons, Text} from '../../components';
import {View} from 'react-native';
import {DetailTransactionSections} from '../../sections';
import {DetailTransactionProps} from '../../navigation';
import styles from './styles';
import {useRoute} from '@react-navigation/native';
import {API_ORDER, BASE_URL, patchDataWithToken} from '../../api';
import {getData} from '../../utils/async-storage';

const DetailTransaction = ({navigation}: DetailTransactionProps) => {
  const route = useRoute();

  const detail = route?.params;

  const [isReview, setIsReview] = useState(() => detail?.item.isReceived);

  const onReceive = async () => {
    try {
      const orderId = detail?.item?.orderId;
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
      idProduct: detail?.item.products?.[0]?.productId._id,
      orderId: detail?.item.orderId,
    });
  };

  return (
    <View style={styles.container}>
      <BackHeader
        title="Detail Transaction"
        goBack={() => navigation?.goBack()}
        icon={false}>
        <DetailTransactionSections detail={detail} />

        {!detail.item?.reviewedProduct?.includes(
          detail?.item?.products?.[0]?.productId?._id,
        ) && (
          <>
            {isReview ? (
              <Buttons onPress={() => goToReview()} style={styles.btn}>
                <Text style={styles.txtBtn}>Review Order</Text>
              </Buttons>
            ) : (
              <Buttons onPress={() => onReceive()} style={styles.btn}>
                <Text style={styles.txtBtn}>Receive Order</Text>
              </Buttons>
            )}
          </>
        )}
      </BackHeader>
    </View>
  );
};

export default DetailTransaction;
