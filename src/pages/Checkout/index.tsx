import React, {useEffect, useRef, useState} from 'react';
import {BackHeader, LoadingDots} from '../../components';
import {View, Alert} from 'react-native';
import styles from './styles';
import {CheckoutSections} from '../../sections';
import {CheckoutProps} from '../../navigation';
import {getData} from '../../utils/async-storage';
import {
  API_ADDRESS,
  BASE_URL,
  getDataWithToken,
  deleteWithToken,
  API_CART,
  postDataWithToken,
  API_ORDER,
} from '../../api';
import {AddressTypes} from '../../types';
import {useCartStore} from '../../store/useCartStore';
import {useIsBuyStore} from '../../store/useIsBuyStore';
import {usePaymentTypeStore} from '../../store/usePaymentTypeStore';
import {usePaymentSnapStore} from '../../store/usePaymentSnap';

type RBSheetRef = {
  open: () => void;
  close: () => void;
};

const Checkout = ({navigation}: CheckoutProps) => {
  const [checked, setChecked] = useState('first');
  const isBuy = useIsBuyStore();

  const refRBSheet = useRef<RBSheetRef | null>(null);

  const [dataAddress, setDataAdsress] = useState<AddressTypes[]>([]);

  const [loadingDots, setLoadingDots] = useState(false);
  const [isFullPayment, setIsFullPayment] = useState(false);

  const cartStore = useCartStore();
  const paymentTypeStore = usePaymentTypeStore();
  const paymentSnapStore = usePaymentSnapStore();

  const getAddress = async () => {
    try {
      const token = await getData('ACCESS_TOKEN');
      const response = await getDataWithToken(BASE_URL + API_ADDRESS, token);
      if (response) {
        setDataAdsress(response?.data?.data);
      }
    } catch (error) {
      setDataAdsress([]);
    }
  };

  const goAddress = () => {
    navigation.navigate('Address');
  };

  const goPayment = async () => {
    setLoadingDots(true);
    refRBSheet?.current?.close();

    try {
      const token = await getData('ACCESS_TOKEN');
      const response = await postDataWithToken(
        `${BASE_URL}${API_ORDER}`,
        {
          addressId: dataAddress.find(item => item.isDefault)?._id,
          products: cartStore.selectedCart,
          paymentType: paymentTypeStore.paymentType,
          isFullPayment,
        },
        token,
      );

      paymentSnapStore.setPaymentSnap(response.data?.snapUrl);

      cartStore.setCart(
        cartStore.cart.filter(
          item => !cartStore.selectedCart.includes(item._id),
        ),
      );
      cartStore.setSelectedCart([]);
      setLoadingDots(false);
      navigation.replace('Payment');
    } catch (err) {
      setLoadingDots(false);
    }
  };

  const choosePayment = () => {
    navigation.navigate('ChoosePayment');
  };

  const onBack = () => {
    Alert.alert(
      'Cancel Checkout',
      'Are you sure you want to cancel this order?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'Yes', onPress: removeCurrentCart},
      ],
      {cancelable: false},
    );
  };

  const removeCurrentCart = async () => {
    navigation.goBack();

    if (isBuy.isBuy) {
      try {
        const token = await getData('ACCESS_TOKEN');
        await deleteWithToken(
          `${BASE_URL}${API_CART}/${cartStore.cart[0]._id}`,
          token,
        );
        cartStore.clearCart();
        cartStore.setSelectedCart([]);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getAddress();
  }, []);

  return (
    <View style={styles.container}>
      <BackHeader title="Checkout" goBack={onBack} icon={false}>
        {loadingDots && <LoadingDots />}
        <CheckoutSections
          onPress={goAddress}
          goPayment={goPayment}
          checked={checked}
          setChecked={setChecked}
          choosePayment={choosePayment}
          dataAddress={dataAddress}
          isFullPayment={isFullPayment}
          setIsFullPayment={setIsFullPayment}
          refRBSheet={refRBSheet}
        />
      </BackHeader>
    </View>
  );
};

export default Checkout;
