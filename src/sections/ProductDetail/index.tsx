import React, {useState} from 'react';
import {RefreshControl, ScrollView, View} from 'react-native';
import {
  Buttons,
  CarouselImage,
  Gap,
  ImageWithNotData,
  ModalBottom,
  Shimmer,
  Text,
} from '../../components';
import {moderateScale, verticalScale} from '../../utils/scale';
import {ProductsTypes, RatingTypes} from '../../types';
import styles from './styles';
import {formatMoney} from '../../utils/format-number';
import {colors} from '../../utils/colors';
import {StarRatingDisplay} from 'react-native-star-rating-widget';
import TabsProductDetail from './TabsProductDetail';
import {images} from '../../assets';
import {ImagePreview} from 'react-native-images-preview';
import NumericInput from 'react-native-numeric-input';

interface ProductDetailSectionsProps {
  width: any;
  products: ProductsTypes;
  productImages: ProductsTypes[];
  refreshing: boolean;
  onRefresh: () => void;
  loading: boolean;
  onBuy: () => void;
  onCart: () => void;
  refRBSheet: any;
  navigation: any;
  isLogin: boolean | undefined;
  rating: RatingTypes | undefined;
  review: string;
}

const ProductDetailSections = ({
  width,
  products,
  productImages,
  refreshing,
  onRefresh,
  loading,
  onBuy,
  onCart,
  refRBSheet,
  navigation,
  isLogin,
  rating,
  review,
}: ProductDetailSectionsProps) => {
  const [value, setValue] = useState(0);

  const onValue = ({v}: {v: number}) => {
    setValue(v);
  };

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {loading ? (
          <>
            <Shimmer style={styles.imgShimmerProduct} />
          </>
        ) : products ? (
          <>
            <Gap height={moderateScale(8)} width={0} />

            {productImages ? (
              <CarouselImage
                loop={false}
                width={width}
                height={verticalScale(180)}
                autoPlay={false}
                data={productImages}
                renderItem={({
                  item,
                  index,
                }: {
                  item: ProductsTypes;
                  index: number;
                }) => {
                  return (
                    <View style={styles.viewImages}>
                      <ImagePreview
                        key={index}
                        imageSource={item ? {uri: item} : images.imgNoData}
                        imageStyle={styles.images}
                      />
                    </View>
                  );
                }}
              />
            ) : (
              <CarouselImage
                loop={false}
                width={width}
                height={verticalScale(180)}
                autoPlay={false}
                data={productImages}
                renderItem={({index}: {index: number}) => {
                  return (
                    <View style={styles.viewImages}>
                      <ImagePreview
                        key={index}
                        imageSource={images.imgNoData}
                        imageStyle={styles.images}
                      />
                    </View>
                  );
                }}
              />
            )}

            <Gap
              height={
                productImages?.length >= 2
                  ? moderateScale(0)
                  : moderateScale(12)
              }
              width={0}
            />

            <View style={styles.flexBetween}>
              <View style={styles.flexCol}>
                <Text style={styles.textName}>{products?.name || 'N/A'}</Text>

                <View style={styles.flexRowRating}>
                  <StarRatingDisplay
                    rating={rating?.averageRating || 0}
                    emptyColor={colors.black}
                    color={colors.orange}
                    starSize={moderateScale(18)}
                    starStyle={{
                      width: moderateScale(10),
                    }}
                    maxStars={5}
                  />
                  <Text style={styles.txtRating}>{`(${
                    rating?.count || 0
                  })`}</Text>
                </View>
              </View>
              <View style={styles.viewTextRight}>
                <Text style={styles.textPrice}>
                  {'Rp' + formatMoney(products?.price) || 'N/A'}
                </Text>
              </View>
            </View>
            {products?.duration && (
              <Text
                style={
                  styles.txtPreOrder
                }>{`Pre Order, Min ${products?.duration} Days`}</Text>
            )}
            <TabsProductDetail
              detailProduct={products}
              isLogin={isLogin}
              navigation={navigation}
              review={review}
              totalReview={rating?.count}
            />
          </>
        ) : (
          <ImageWithNotData style={styles.noData} />
        )}
      </ScrollView>

      <ModalBottom
        height={200}
        refRBSheet={refRBSheet}
        button={
          <View style={styles.flexRow}>
            <Buttons disabled={false} onPress={onBuy} style={styles.btn}>
              <Text style={styles.txtBtn}>Buy Now</Text>
            </Buttons>
            <Buttons
              disabled={false}
              onPress={onCart}
              style={[
                styles.btn,
                {
                  backgroundColor: colors.darkChoco,
                },
              ]}>
              <Text style={styles.txtBtn}>Add to Cart</Text>
            </Buttons>
          </View>
        }>
        <View style={styles.contentModal}>
          <View style={styles.flexBetweenCenter}>
            <Text style={styles.titleModal}>Total QTY</Text>
            <NumericInput
              value={value}
              onChange={v => onValue({v})}
              onLimitReached={(isMax, msg) => console.log(isMax, msg)}
              totalWidth={moderateScale(100)}
              totalHeight={moderateScale(30)}
              iconSize={moderateScale(12)}
              step={1}
              minValue={0}
              valueType="real"
              rounded
              textColor={colors.orange}
              borderColor={colors.grey}
              iconStyle={{color: colors.black}}
              rightButtonBackgroundColor={colors.white}
              leftButtonBackgroundColor={colors.white}
              upDownButtonsBackgroundColor={colors.white}
            />
          </View>
          <Gap height={moderateScale(16)} width={0} />
          <Buttons
            disabled={false}
            onPress={onCart}
            style={[styles.btn, styles.btnTake]}>
            <Text style={styles.txtBtn}>Take Body Size</Text>
          </Buttons>
        </View>
      </ModalBottom>
    </>
  );
};

export default ProductDetailSections;
