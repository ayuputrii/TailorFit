import React, {useMemo} from 'react';
import {FlatList, Image, View} from 'react-native';
import {Buttons, Text} from '../../components';
import styles from './styles';
import {colors} from '../../utils/colors';
import {moderateScale} from '../../utils/scale';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImageGopay from '../../assets/images/img-gopay.svg';
import {useCartStore} from '../../store/useCartStore';
import {usePaymentTypeStore} from '../../store/usePaymentTypeStore';
import {ProductsTypes} from '../../types';
import {images} from '../../assets';

interface ChoosePaymentSectionsProps {
  goCheckout: () => void;
}

const ChoosePaymentSections = ({goCheckout}: ChoosePaymentSectionsProps) => {
  const cartStore = useCartStore();
  const paymentTypeStore = usePaymentTypeStore();

  const totalPrice = useMemo(() => {
    const selected = cartStore.cart.filter(item =>
      cartStore.selectedCart.includes(item._id),
    );
    const allPrice = selected.reduce((acc, cur) => {
      const price =
        cur.quantity * ((cur.productId as ProductsTypes).price || 1);

      return acc + price;
    }, 0);

    return allPrice;
  }, [cartStore.cart, cartStore.selectedCart]);

  return (
    <View>
      <View style={styles.content}>
        <Text style={styles.text}>Bank Payment</Text>
        <FlatList
          data={[1]}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          numColumns={4}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <Buttons
                style={styles.img}
                onPress={() => paymentTypeStore.setPaymentType('BCA')}>
                <Image
                  source={images.imgBank}
                  style={[
                    styles.imgBank,
                    paymentTypeStore.paymentType === 'BCA'
                      ? {
                          backgroundColor: colors.lightgray,
                        }
                      : {},
                  ]}
                  width={moderateScale(20)}
                  height={moderateScale(20)}
                />
              </Buttons>
            );
          }}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.text}>E-Wallet</Text>
        <FlatList
          data={[1]}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          numColumns={4}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={({}) => {
            return (
              <Buttons
                style={styles.img}
                onPress={() => paymentTypeStore.setPaymentType('GOPAY')}>
                <ImageGopay
                  style={
                    paymentTypeStore.paymentType === 'GOPAY'
                      ? {
                          backgroundColor: colors.lightgray,
                        }
                      : {}
                  }
                  width={moderateScale(80)}
                  height={moderateScale(80)}
                />
              </Buttons>
            );
          }}
        />
      </View>
      <Buttons style={styles.btn} onPress={goCheckout} disabled={false}>
        <Text style={styles.txt}>Konfirmasi</Text>

        <Icon
          name="arrow-outward"
          size={moderateScale(20)}
          color={colors.white}
        />
      </Buttons>
    </View>
  );
};

export default ChoosePaymentSections;
