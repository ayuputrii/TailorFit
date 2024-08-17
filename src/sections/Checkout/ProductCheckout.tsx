import React from 'react';
import {CardCommons, Gap, ImageWithNotFound, Text} from '../../components';
import {View} from 'react-native';
import {moderateScale} from '../../utils/scale';
import styles from './styles';
import {Cart, ProductsTypes} from '../../types';
import {formatIdr} from '../../utils/format-number';
import {colors} from '../../utils/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProductCheckout = (cart: Cart) => {
  return (
    <View style={styles.container}>
      <CardCommons
        title={''}
        subTitle={''}
        titleStyle={false}
        subTitleStyle={false}
        onPress={() => {}}
        disabled={true}
        style={[styles.card, {marginBottom: moderateScale(-6)}]}>
        <View style={styles.flexRowBetween}>
          <View style={styles.contentProduct}>
            <ImageWithNotFound
              uri={
                typeof cart.productId === 'string'
                  ? cart.productId
                  : cart.productId.images[0]
              }
              style={styles.imgProduct}
              styleNoData={styles.notFound}
            />

            <Gap height={0} width={moderateScale(8)} />

            <View>
              <Text style={styles.titleProduct}>
                {typeof cart.productId === 'string'
                  ? cart.productId
                  : cart.productId?.name}
              </Text>

              <Text style={styles.textPrice}>
                {typeof cart.productId === 'string'
                  ? cart.productId
                  : formatIdr(
                      cart.productId?.price ? cart.productId?.price : 0,
                    ) || 1 * cart.quantity}
              </Text>
              <View style={styles.flexRowCenter}>
                <Text style={[styles.textPrice, {color: colors.orange}]}>
                  Pre Order, Min {(cart.productId as ProductsTypes)?.duration}{' '}
                  Days
                </Text>
                <Text style={[styles.textPrice, styles.mark]}>
                  {cart?.materialProvider ? cart?.materialProvider : '-'}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.flexRowBetween}>
            {cart?.quantity && (
              <Text style={styles.text}>x{cart.quantity}</Text>
            )}
            <Icon name={'keyboard-arrow-down'} size={20} color={'#857E7E'} />
          </View>
        </View>
      </CardCommons>
    </View>
  );
};

export default ProductCheckout;
