import React from 'react';
import {View} from 'react-native';
import {BackHeader} from '../../components';
import styles from './styles';
import {ChoosePaymentProps} from '../../navigation';
import {ChoosePaymentSections} from '../../sections';

const ChoosePayment = ({navigation}: ChoosePaymentProps) => {
  const goCheckout = () => {
    navigation.navigate('Checkout');
  };

  return (
    <View style={styles.container}>
      <BackHeader
        title="Pilih Metode Pembayaran"
        goBack={() => navigation?.goBack()}
        icon={false}>
        <ChoosePaymentSections goCheckout={goCheckout} />
      </BackHeader>
    </View>
  );
};

export default ChoosePayment;
