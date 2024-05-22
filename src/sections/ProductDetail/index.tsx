import React from 'react';
import {ScrollView} from 'react-native';
import {Gap, ImageWithNotFound} from '../../components';
import {moderateScale, verticalScale} from '../../utils/scale';
import Carousel from 'react-native-reanimated-carousel';
import {ProductsTypes} from '../../types';
import styles from './styles';

interface ProductDetailSectionsProps {
  width: any;
  products: ProductsTypes[];
}

const ProductDetailSections = ({
  width,
  products,
}: ProductDetailSectionsProps) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      <Gap height={moderateScale(8)} width={0} />

      <Carousel
        loop
        width={width}
        height={verticalScale(180)}
        autoPlay={false}
        data={products}
        scrollAnimationDuration={1000}
        renderItem={({item, index}) => {
          return (
            <ImageWithNotFound key={index} uri={item} style={styles.images} />
          );
        }}
      />
    </ScrollView>
  );
};

export default ProductDetailSections;
