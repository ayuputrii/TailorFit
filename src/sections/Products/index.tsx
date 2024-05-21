import React from 'react';
import {Buttons} from '../../components';
import {Image, ImageBackground, View} from 'react-native';
import ImageRectangle from '../../assets/images/img-rectangle-top.png';
import ImageRectangleBottom from '../../assets/images/img-rectangle-bottom.png';
import {colors} from '../../utils/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from './styles';
import {ProductsTypes} from '../../types';
import {moderateScale} from '../../utils/scale';
import {formatMoney} from '../../utils/format-number';
import {Text} from 'react-native-paper';

interface ProductsProps {
  goDetailProduct: () => void;
  addFavorite: () => void;
  data: ProductsTypes;
}

const ProductsSections = ({
  goDetailProduct,
  addFavorite,
  data,
}: ProductsProps) => {
  return (
    <Buttons
      disabled={false}
      onPress={goDetailProduct}
      style={styles.contentProduct}>
      <ImageBackground
        source={{uri: data?.images[0]}}
        style={styles.imgProduct}
        imageStyle={styles.imgStyle}>
        <Image source={ImageRectangle} style={styles.imgRectangle} />
        <Buttons disabled={false} onPress={addFavorite} style={styles.favorite}>
          <Icon
            name={'heart-o'}
            size={moderateScale(18)}
            color={colors.black}
            style={{}}
          />
        </Buttons>
        <Image
          source={ImageRectangleBottom}
          style={styles.imgRectangleBottom}
        />
        <View style={styles.price}>
          <Text style={styles.txtPrice}>
            {data?.price ? 'Rp ' + formatMoney(data?.price) : 'Rp 0'}
          </Text>
        </View>
      </ImageBackground>
    </Buttons>
  );
};

export default ProductsSections;
