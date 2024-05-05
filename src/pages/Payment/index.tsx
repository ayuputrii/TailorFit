import React, {useState} from 'react';
import {View} from 'react-native';
import {PaymentSections} from '../../sections';
import {BackHeader, Buttons, ModalConfirmation, Text} from '../../components';
import styles from './styles';
import {PaymentProps} from '../../navigation';
import IconANT from 'react-native-vector-icons/AntDesign';
import {colors} from '../../utils/colors';
import {moderateScale} from '../../utils/scale';

const Payment = ({navigation}: PaymentProps) => {
  const [showModal, setShowModal] = useState(false);

  const goPayment = () => {
    setShowModal(true);
  };

  return (
    <View style={styles.container}>
      <BackHeader
        title="Payment"
        goBack={() => navigation?.goBack()}
        icon={
          <IconANT
            name="logout"
            color={colors.black}
            size={moderateScale(20)}
          />
        }>
        <PaymentSections />
        <Buttons
          style={styles.btn}
          onPress={goPayment}
          children={undefined}
          disabled={false}>
          <Text style={styles.txt}>Pay Now</Text>
        </Buttons>
      </BackHeader>
      <ModalConfirmation
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        title="Successfully"
        message="Please confirm new password."
        textBtn="Back to Home"
        onSubmit={() => navigation.replace('MainTabs')}
        style={undefined}
      />
    </View>
  );
};

export default Payment;
