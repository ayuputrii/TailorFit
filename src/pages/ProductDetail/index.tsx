import React from 'react';
import {Dimensions, SafeAreaView, StatusBar} from 'react-native';
import {colors} from '../../utils/colors';
import styles from './styles';
import {useRoute} from '@react-navigation/native';
import {ProductsTypes} from '../../types';
import {BackHeader} from '../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {moderateScale} from '../../utils/scale';
import {ProductDetailProps} from '../../navigation';
import {ProductDetailSections} from '../../sections';

const ProductDetail = ({navigation}: ProductDetailProps) => {
  const route = useRoute();
  const width = Dimensions.get('window').width;

  const detail = route.params as ProductsTypes;
  const products = detail?.images;

  const onTransactionCart = () => {
    navigation.replace('Cart');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={false}
        backgroundColor={colors.basebg}
        barStyle="dark-content"
      />

      <BackHeader
        title="Product Details"
        goBack={() => navigation?.goBack()}
        icon={
          <Ionicons
            name="cart-outline"
            color={colors.black}
            size={moderateScale(22)}
            onPress={onTransactionCart}
          />
        }>
        <ProductDetailSections products={products} width={width} />
      </BackHeader>
    </SafeAreaView>
  );
};

export default ProductDetail;
