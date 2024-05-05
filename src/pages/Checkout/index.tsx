import React, {useState} from 'react';
import {BackHeader} from '../../components';
import IconANT from 'react-native-vector-icons/AntDesign';
import {colors} from '../../utils/colors';
import {moderateScale} from '../../utils/scale';
import {View} from 'react-native';
import styles from './styles';
import {CheckoutSections} from '../../sections';
import {CheckoutProps} from '../../navigation';

const Checkout = ({navigation}: CheckoutProps) => {
  const [checked, setChecked] = useState('first');

  const goAddress = () => {
    navigation.navigate('Address');
  };

  const goPayment = () => {
    navigation.navigate('Payment');
  };

  const choosePayment = () => {
    navigation.navigate('ChoosePayment');
  };

  return (
    <View style={styles.container}>
      <BackHeader
        title="Checkout"
        goBack={() => navigation?.goBack()}
        icon={
          <IconANT
            name="logout"
            color={colors.black}
            size={moderateScale(20)}
          />
        }>
        <CheckoutSections
          onPress={goAddress}
          goPayment={goPayment}
          checked={checked}
          setChecked={setChecked}
          choosePayment={choosePayment}
        />
      </BackHeader>
    </View>
  );
};

export default Checkout;
