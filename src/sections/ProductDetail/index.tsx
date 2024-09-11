import React, {Dispatch, SetStateAction, useMemo} from 'react';
import {RefreshControl, ScrollView, View} from 'react-native';
import {
  CarouselImage,
  Gap,
  ImageWithNotData,
  LoadingDots,
  Shimmer,
  Text,
} from '../../components';
import {moderateScale, verticalScale} from '../../utils/scale';
import {ProductsTypes, RatingTypes} from '../../types';
import styles from './styles';
import {formatIdr} from '../../utils/format-number';
import {colors} from '../../utils/colors';
import {StarRatingDisplay} from 'react-native-star-rating-widget';
import TabsProductDetail from './TabsProductDetail';
import {images} from '../../assets';
import {ImagePreview} from 'react-native-images-preview';
import OrderDetailModal from './OrderDetailModal';
import {Asset} from 'react-native-image-picker';
interface ProductDetailSectionsProps {
  width: any;
  products: ProductsTypes;
  productImages: ProductsTypes[];
  refreshing: boolean;
  onRefresh: () => void;
  loading: boolean;
  onOrder: () => void;
  refRBSheet: any;
  navigation: any;
  isLogin: boolean | undefined;
  rating: RatingTypes | undefined;
  review: string;
  quality: {id: number; name: string}[];
  type: {id: number; name: string}[];
  selectedType: number;
  selectedQuality: number;
  selectedSize: number;
  handleMenuPress: (val: number, segment: 'quality' | 'size' | 'type') => void;
  file: (Asset | string)[];
  setFile: Dispatch<SetStateAction<(Asset | string)[]>>;
  onCustomizeSize: () => void;
  detail: ProductsTypes;
  onShowBuy: () => void;
  onShowCart: () => void;
  materialProvider: string;
  setMaterialProvider: Dispatch<SetStateAction<string>>;
  quantity: number;
  onQuantity: ({v}: {v: number}) => void;
  loadingDots: boolean;
  enableContinue: boolean;
  enableCustom: boolean;
}

const ProductDetailSections = ({
  width,
  products,
  productImages,
  refreshing,
  onRefresh,
  loading,
  onOrder,
  refRBSheet,
  navigation,
  isLogin,
  rating,
  review,
  quality,
  type,
  selectedQuality,
  selectedSize,
  selectedType,
  handleMenuPress,
  file,
  setFile,
  onCustomizeSize,
  detail,
  onShowBuy,
  onShowCart,
  materialProvider,
  setMaterialProvider,
  quantity,
  onQuantity,
  loadingDots,
  enableContinue,
  enableCustom,
}: ProductDetailSectionsProps) => {
  const radioButtons = useMemo(
    () => [
      {
        id: '1',
        label: 'Tailor',
        value: 'tailor',
      },
      {
        id: '2',
        label: 'Me',
        value: 'me',
      },
    ],
    [],
  );

  return (
    <React.Fragment>
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
              <Gap width={moderateScale(4)} height={0} />
              <View style={styles.viewTextRight}>
                <Text style={styles.textPrice}>
                  {formatIdr(products?.price ? products?.price : 0)}
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

      {loadingDots ? (
        <LoadingDots />
      ) : (
        <OrderDetailModal
          materialProvider={materialProvider}
          onOrder={onOrder}
          onShowBuy={onShowBuy}
          onShowCart={onShowCart}
          refRBSheet={refRBSheet}
          quality={quality}
          type={type}
          selectedQuality={selectedQuality}
          selectedSize={selectedSize}
          selectedType={selectedType}
          handleMenuPress={handleMenuPress}
          radioButtons={radioButtons}
          setMaterialProvider={setMaterialProvider}
          quantity={quantity}
          onQuantity={onQuantity}
          file={file}
          setFile={setFile}
          onCustomizeSize={onCustomizeSize}
          detail={detail}
          enableContinue={enableContinue}
          enableCustom={enableCustom}
        />
      )}
    </React.Fragment>
  );
};

export default ProductDetailSections;
