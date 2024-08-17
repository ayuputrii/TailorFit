import React, {useMemo, useState} from 'react';
import {Buttons, CardCommons, Gap, Shimmer, Text} from '../../components';
import {colors} from '../../utils/colors';
import {moderateScale} from '../../utils/scale';
import {View} from 'react-native';
import styles from './styles';
import IconFeather from 'react-native-vector-icons/Feather';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {formatIdr} from '../../utils/format-number';
import ListCart from './ListCart';
import {useCartStore} from '../../store/useCartStore';

interface CartLoginProps {
  loading: boolean;
  onCheckAll: () => void;
  isChecked: boolean;
  onDeleteCart: () => void;
  refreshing: boolean;
  onRefresh: () => void;
  onPressItem: (id: string) => void;
  navigation: any;
  totalPrice: number;
}

const CartLogin = ({
  loading,
  onCheckAll,
  isChecked,
  onDeleteCart,
  refreshing,
  onRefresh,
  onPressItem,
  navigation,
  totalPrice,
}: CartLoginProps) => {
  const cartStore = useCartStore();

  const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);

  const totalAndQuantity = useMemo(() => {
    const selectedCart = cartStore.cart.filter(item =>
      cartStore.selectedCart.includes(item._id),
    );
    const checkoutCount = selectedCart.reduce((acc, cur) => {
      return acc + cur.quantity;
    }, 0);

    return checkoutCount;
  }, [cartStore.selectedCart, cartStore.cart]);

  return (
    <React.Fragment>
      <Gap height={moderateScale(8)} width={0} />

      {loading ? (
        <View style={styles.viewChoose}>
          <Shimmer style={styles.shimmerChoose} />
        </View>
      ) : (
        <React.Fragment>
          {Boolean(cartStore?.cart?.length) && (
            <View style={styles.viewChoose}>
              <View style={styles.chooseCard}>
                <Buttons
                  style={false}
                  disabled={false}
                  onPress={onCheckAll}
                  children={
                    <View style={styles.flexRow}>
                      <Text style={styles.txtChoose}>Choose All</Text>
                      <Gap width={8} height={0} />
                      {isChecked ? (
                        <Icons
                          name="checkbox-outline"
                          size={moderateScale(22)}
                          color={colors.orange}
                        />
                      ) : (
                        <Icons
                          name="checkbox-blank-outline"
                          size={moderateScale(22)}
                          color={colors.orange}
                        />
                      )}
                    </View>
                  }
                />
              </View>

              {!!cartStore?.selectedCart.length && (
                <React.Fragment>
                  <Gap height={0} width={moderateScale(6)} />
                  <Buttons disabled={false} onPress={onDeleteCart} style={{}}>
                    <IconFeather
                      name="trash-2"
                      size={moderateScale(22)}
                      color={colors.orange}
                    />
                  </Buttons>
                </React.Fragment>
              )}
            </View>
          )}
        </React.Fragment>
      )}

      <ListCart
        data={cartStore?.cart}
        loading={loading}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onPressItem={onPressItem}
        setIsUpdatingQuantity={setIsUpdatingQuantity}
      />

      {Boolean(cartStore?.selectedCart?.length) && (
        <CardCommons
          title={''}
          subTitle={''}
          titleStyle={false}
          subTitleStyle={false}
          onPress={() => navigation.navigate('Checkout')}
          style={styles.cardBottom}>
          <View style={styles.flexRowBetween}>
            <View style={styles.viewBottom}>
              <Text style={styles.title}>Total</Text>
              <Text style={styles.text1}>{formatIdr(totalPrice || 0)}</Text>
            </View>
            <Buttons
              disabled={isUpdatingQuantity}
              style={
                isUpdatingQuantity
                  ? [
                      styles.btn,
                      {
                        backgroundColor: colors.gray,
                      },
                    ]
                  : styles.btn
              }
              onPress={() => navigation.navigate('Checkout')}>
              <Text style={styles.txtCheckout}>
                Checkout ({totalAndQuantity || 0})
              </Text>
            </Buttons>
          </View>
        </CardCommons>
      )}
    </React.Fragment>
  );
};

export default CartLogin;
