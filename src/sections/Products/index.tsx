import React from 'react';
import {Buttons} from '../../components';
import {Image, ImageBackground, View} from 'react-native';
import {colors} from '../../utils/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from './styles';
import {ProductsTypes} from '../../types';
import {moderateScale} from '../../utils/scale';
import {formatMoney} from '../../utils/format-number';
import {Text} from 'react-native-paper';
import {images} from '../../assets';

interface ProductsProps {
  goDetailProduct: () => void;
  addFavorite: () => void;
  deleteFavorite: () => void;
  data: ProductsTypes;
  isLogin: boolean | undefined;
}

const ProductsSections = ({
  goDetailProduct,
  addFavorite,
  deleteFavorite,
  data,
  isLogin,
}: ProductsProps) => {
  return (
    <View style={styles.container}>
      <Buttons
        disabled={false}
        onPress={goDetailProduct}
        style={styles.contentProduct}>
        {data?.images?.length ? (
          <ImageBackground
            source={{uri: data?.images[0]}}
            style={styles.imgProduct}
            imageStyle={styles.imgStyle}>
            {isLogin && (
              <>
                <Image
                  source={images.imgRectangleTop}
                  style={styles.imgRectangle}
                />

                {data?.favorite?._id ? (
                  <Buttons
                    disabled={false}
                    onPress={deleteFavorite}
                    style={styles.favorite}>
                    <Icon
                      name={'heart'}
                      size={moderateScale(18)}
                      color={colors.darkRed}
                      style={{}}
                    />
                  </Buttons>
                ) : (
                  <Buttons
                    disabled={false}
                    onPress={addFavorite}
                    style={styles.favorite}>
                    <Icon
                      name={'heart-o'}
                      size={moderateScale(18)}
                      color={colors.black}
                      style={{}}
                    />
                  </Buttons>
                )}
              </>
            )}
            <Image
              source={images.imgRectangleBottom}
              style={styles.imgRectangleBottom}
            />
            <View style={styles.price}>
              <Text style={styles.txtPrice}>
                {data?.price ? 'Rp ' + formatMoney(data?.price) : 'Rp 0'}
              </Text>
            </View>
          </ImageBackground>
        ) : (
          <ImageBackground
            source={images.imgNoData}
            style={styles.imgProduct}
            imageStyle={styles.imgStyle}>
            {isLogin && (
              <>
                {data?.favorite?._id ? (
                  <Buttons
                    disabled={false}
                    onPress={deleteFavorite}
                    style={styles.favorite}>
                    <Icon
                      name={'heart'}
                      size={moderateScale(18)}
                      color={colors.darkRed}
                      style={{}}
                    />
                  </Buttons>
                ) : (
                  <Buttons
                    disabled={false}
                    onPress={addFavorite}
                    style={styles.favorite}>
                    <Icon
                      name={'heart-o'}
                      size={moderateScale(18)}
                      color={colors.black}
                      style={{}}
                    />
                  </Buttons>
                )}
              </>
            )}
            <Image
              source={images.imgRectangleBottom}
              style={styles.imgRectangleBottom}
            />
            <View style={styles.price}>
              <Text style={styles.txtPrice}>
                {data?.price ? 'Rp ' + formatMoney(data?.price) : 'Rp 0'}
              </Text>
            </View>
          </ImageBackground>
        )}
      </Buttons>
    </View>
  );
};

export default ProductsSections;
