import React from 'react';
import {FlatList, RefreshControl, ScrollView, View} from 'react-native';
import {styles} from './styles';
import {
  CarouselImage,
  Gap,
  ImageWithNotData,
  MenuButtons,
  Shimmer,
} from '../../components';
import {verticalScale} from '../../utils/scale';
import {CategoryTypes, ProductsTypes, PromotionTypes} from '../../types';
import ProductsSections from '../Products';
import {ImagePreview} from 'react-native-images-preview';
import {images} from '../../assets';

interface HomeSectionsProps {
  filteredProducts: ProductsTypes[];
  promotion: PromotionTypes[];
  refreshing: boolean;
  onRefresh: any;
  category: CategoryTypes[];
  width: number;
  activeMenuIndex: number;
  handleMenuPress: any;
  addFavorite: (id: string) => void;
  navigation: any;
  loading: boolean;
  showSearch: boolean;
  isEmpty: boolean;
  isLogin: boolean | undefined;
  deleteFavorite: (id: string) => void;
}

const HomeSections = ({
  filteredProducts,
  promotion,
  refreshing,
  onRefresh,
  category,
  width,
  activeMenuIndex,
  handleMenuPress,
  addFavorite,
  navigation,
  loading,
  showSearch,
  isEmpty,
  isLogin,
  deleteFavorite,
}: HomeSectionsProps) => {
  const goDetailProduct = (item: ProductsTypes) => {
    navigation?.navigate('ProductDetail', item);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={!showSearch ? false : refreshing}
          onRefresh={onRefresh}
        />
      }
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}>
      {loading && !showSearch ? (
        <>
          <Shimmer style={styles.imgShimmerPromo} />
          <Gap height={verticalScale(14)} width={0} />
          <View style={styles.flexRow}>
            {[1, 2, 3, 4]?.map((_item, index) => (
              <Shimmer key={index} style={styles.category} />
            ))}
          </View>
          <FlatList
            data={[1, 2, 3, 4]}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            renderItem={({index}) => (
              <View style={styles.productShimmerContainer}>
                <Shimmer key={index} style={styles.productShimmer} />
              </View>
            )}
            keyExtractor={(_item, index) => index.toString()}
          />
        </>
      ) : (
        <React.Fragment>
          {showSearch ? null : (
            <>
              {promotion?.length ? (
                <CarouselImage
                  loop={true}
                  width={width}
                  height={verticalScale(180)}
                  autoPlay={true}
                  data={promotion}
                  renderItem={({
                    item,
                    index,
                  }: {
                    item: PromotionTypes;
                    index: number;
                  }) => {
                    return (
                      <View style={styles.viewImages}>
                        <ImagePreview
                          key={index}
                          imageSource={
                            item ? {uri: item?.image} : images.imgNoData
                          }
                          imageStyle={styles.imgPromo}
                        />
                      </View>
                    );
                  }}
                />
              ) : (
                <CarouselImage
                  loop={true}
                  width={width}
                  height={verticalScale(180)}
                  autoPlay={true}
                  data={[1, 2, 3, 4]}
                  renderItem={({index}: {index: number}) => {
                    return (
                      <View style={styles.viewImages}>
                        <ImagePreview
                          key={index}
                          imageSource={images.imgNoData}
                          imageStyle={styles.imgNoData}
                        />
                      </View>
                    );
                  }}
                />
              )}
              {category?.length ? (
                <>
                  <Gap height={verticalScale(8)} width={0} />

                  <FlatList
                    data={category}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    renderItem={({
                      item,
                      index,
                    }: {
                      item: CategoryTypes;
                      index: number;
                    }) => (
                      <MenuButtons
                        key={index}
                        activeMenuIndex={activeMenuIndex}
                        setActiveMenuIndex={() =>
                          handleMenuPress(index, item?._id)
                        }
                        index={index}
                        item={item}
                        onPress={() => {}}
                        disabled={false}
                      />
                    )}
                    keyExtractor={(_item, index) => index.toString()}
                  />
                </>
              ) : (
                <ImageWithNotData style={styles.noData} />
              )}
            </>
          )}
          {filteredProducts?.length ? (
            <FlatList
              data={filteredProducts}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              keyExtractor={(_item, index) => index.toString()}
              renderItem={({
                item,
                index,
              }: {
                item: ProductsTypes;
                index: any;
              }) => {
                return (
                  <ProductsSections
                    key={index}
                    goDetailProduct={() => goDetailProduct({...item})}
                    addFavorite={() => addFavorite(item?._id)}
                    deleteFavorite={() => deleteFavorite(item?.favorite?._id)}
                    data={item}
                    isLogin={isLogin}
                  />
                );
              }}
            />
          ) : isEmpty ? (
            <ImageWithNotData style={{}} />
          ) : null}
        </React.Fragment>
      )}

      <Gap height={verticalScale(100)} width={0} />
    </ScrollView>
  );
};

export default HomeSections;
