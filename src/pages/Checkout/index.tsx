import React, {useEffect, useState} from 'react';
import {BackHeader} from '../../components';
import IconANT from 'react-native-vector-icons/AntDesign';
import {colors} from '../../utils/colors';
import {moderateScale} from '../../utils/scale';
import {View} from 'react-native';
import styles from './styles';
import {CheckoutSections} from '../../sections';
import {CheckoutProps} from '../../navigation';
import {getData} from '../../utils/async-storage';
import {API_ADDRESS, BASE_URL, getDataWithToken} from '../../api';
import {AddressTypes} from '../../types';

const Checkout = ({navigation}: CheckoutProps) => {
  const [checked, setChecked] = useState('first');

  const [dataAddress, setDataAdsress] = useState<AddressTypes[]>([]);
  console.log('data Address', dataAddress);

  const getAddress = async () => {
    try {
      const token = await getData('ACCESS_TOKEN');
      const response = await getDataWithToken(BASE_URL + API_ADDRESS, token);
      if (response) {
        setDataAdsress(response?.data?.data);
      }
    } catch (error) {
      console.log('error get address', error);
    }
  };

  const goAddress = () => {
    navigation.navigate('Address');
  };

  const goPayment = () => {
    navigation.navigate('Payment');
  };

  const choosePayment = () => {
    navigation.navigate('ChoosePayment');
  };

  useEffect(() => {
    getAddress();
  }, []);

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
          dataAddress={dataAddress}
        />
      </BackHeader>
    </View>
  );
};

export default Checkout;
