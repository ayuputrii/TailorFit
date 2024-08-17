import React, {useState} from 'react';
import {View} from 'react-native';
import {BackHeader, ModalConfirmation} from '../../components';
import styles from './styles';
import {PaymentProps} from '../../navigation';
import {WebView} from 'react-native-webview';
import {usePaymentSnapStore} from '../../store/usePaymentSnap';

const Payment = ({navigation}: PaymentProps) => {
  const [showModal, setShowModal] = useState(false);

  const paymentSnapStore = usePaymentSnapStore();

  return (
    <View style={styles.container}>
      <BackHeader
        title="Payment"
        goBack={() => navigation?.navigate('Home')}
        icon={false}>
        <WebView source={{uri: paymentSnapStore?.url}} style={{flex: 1}} />
      </BackHeader>
      <ModalConfirmation
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        title="Successfully"
        message="Successfully payment!"
        textBtn="Kembali ke Beranda"
        onSubmit={() => navigation?.replace('MainTabs')}
        style={undefined}
      />
    </View>
  );
};

export default Payment;
