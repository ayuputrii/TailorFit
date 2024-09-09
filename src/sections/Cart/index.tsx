import React, {Dispatch, SetStateAction, useState} from 'react';
import {View} from 'react-native';
import {
  Buttons,
  CardCommons,
  Gap,
  ImageWithNotFound,
  Text,
} from '../../components';
import styles from './styles';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {moderateScale} from '../../utils/scale';
import {colors} from '../../utils/colors';
import NumericInput from 'react-native-numeric-input';
import {Cart, ProductsTypes} from '../../types';
import {formatIdr} from '../../utils/format-number';
import {useCartStore} from '../../store/useCartStore';
import {getData} from '../../utils/async-storage';
import {API_CART, BASE_URL, putDataWithToken} from '../../api';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDebouncedCallback} from 'use-debounce';

const CartSections = (
  cart: Cart & {
    onPressItem: () => void;
    setIsUpdatingQuantity?: Dispatch<SetStateAction<boolean>>;
  },
) => {
  const cartStore = useCartStore();

  const [quantity, setQuantity] = useState(() => cart?.quantity);

  const onCheck = () => {
    const listCart = cartStore.selectedCart;
    if (listCart.includes(cart?._id)) {
      cartStore.deleteSelectedCart(cart?._id);
    } else {
      cartStore.addSelectedCart(cart?._id);
    }
  };

  const debouncedSetQuantity = useDebouncedCallback((val: number) =>
    onSetQuantity(val),
  );

  const onSetQuantity = async (val: number) => {
    const token = await getData('ACCESS_TOKEN');
    setQuantity(val);
    if (cart.setIsUpdatingQuantity) {
      cart.setIsUpdatingQuantity(true);
    }
    try {
      const response = await putDataWithToken(
        `${BASE_URL}${API_CART}/quantity/${cart?._id}`,
        {
          quantity: val,
        },
        token,
      );
      cartStore.updateCart(cart?._id, response.data.data);
      if (cart.setIsUpdatingQuantity) {
        cart.setIsUpdatingQuantity(false);
      }
    } catch (err) {
      if (cart.setIsUpdatingQuantity) {
        cart.setIsUpdatingQuantity(false);
      }
    }
  };

  return (
    <View>
      <CardCommons
        title={''}
        subTitle={''}
        titleStyle={false}
        subTitleStyle={false}
        onPress={cart?.onPressItem}
        style={styles.card}>
        <View style={styles.contentProduct}>
          <Buttons
            disabled={false}
            style={false}
            onPress={onCheck}
            children={
              <React.Fragment>
                {cartStore.selectedCart.includes(cart?._id) ? (
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
              </React.Fragment>
            }
          />

          <View style={styles.boxProduct}>
            <Gap height={0} width={moderateScale(4)} />

            <ImageWithNotFound
              styleNoData={styles.notFound}
              uri={(cart?.productId as ProductsTypes).images?.[0] || false}
              style={styles.imgProduct}
            />

            <Gap height={0} width={moderateScale(6)} />

            <View style={styles.viewDesc}>
              <Text style={styles.title}>
                {(cart?.productId as ProductsTypes).name || '-'}
              </Text>

              <Text style={styles.textGraySemiBold}>
                {formatIdr((cart?.productId as ProductsTypes).price || 0)}
              </Text>

              <View style={[styles.flexRow, styles.variant]}>
                <Text style={styles.textGraySemiBold}>
                  {cart?.type} {cart?.type && cart?.size ? '-' : ''}{' '}
                  {cart?.size}
                </Text>
                <Gap width={moderateScale(3)} height={0} />
                <Icon name={'keyboard-arrow-down'} size={24} color="#666" />
              </View>
              <Text style={styles.textOrangeSemiBold}>
                Pre Order, Min{' '}
                {(cart?.productId as ProductsTypes).duration || 0} Days
              </Text>
            </View>
          </View>

          <View style={styles.numericInputStyle}>
            <NumericInput
              value={quantity}
              onChange={debouncedSetQuantity}
              onLimitReached={(isMax, msg) => console.log(isMax, msg)}
              totalWidth={moderateScale(70)}
              totalHeight={moderateScale(25)}
              step={1}
              minValue={1}
              valueType="real"
              rounded
              textColor={colors.orange}
              borderColor={colors.grey}
              rightButtonBackgroundColor={colors.white}
              leftButtonBackgroundColor={colors.white}
              upDownButtonsBackgroundColor={colors.white}
            />
          </View>
        </View>
      </CardCommons>
      <Gap height={moderateScale(8)} width={0} />
    </View>
  );
};

export default CartSections;
