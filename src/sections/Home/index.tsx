import React from 'react';
import {FlatList, RefreshControl, ScrollView, View} from 'react-native';
import {styles} from './styles';
import {
  Gap,
  ImageWithNotData,
  ImageWithNotFound,
  MenuButtons,
  Shimmer,
} from '../../components';
import {verticalScale} from '../../utils/scale';
import Carousel from 'react-native-reanimated-carousel';
import {CategoryTypes, ProductsTypes, PromotionTypes} from '../../types';
import ProductsSections from '../Products';

interface HomeSectionsProps {
  filteredProducts: ProductsTypes[];
  promotion: PromotionTypes[];
  refreshing: boolean;
  onRefresh: any;
  category: CategoryTypes[];
  width: number;
  activeMenuIndex: number;
  handleMenuPress: any;
  addFavorite: (index: number) => void;
  goDetailProduct: () => void;
  loading: boolean;
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
  goDetailProduct,
  loading,
}: HomeSectionsProps) => {
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}>
      {loading ? (
        <View>
          <Shimmer style={styles.imgShimmerPromo} />
          <Gap height={verticalScale(14)} width={0} />
          <View style={styles.flexRow}>
            {[1, 2, 3, 4]?.map((_item, index) => (
              <Shimmer key={index} style={styles.category} />
            ))}
          </View>
          <View style={styles.flexWrapRow}>
            {[1, 2, 3, 4]?.map((_item, index) => (
              <Shimmer
                key={index}
                style={[styles.contentProduct, styles.productShimmer]}
              />
            ))}
          </View>
        </View>
      ) : (
        <React.Fragment>
          <Carousel
            loop
            width={width}
            height={verticalScale(180)}
            autoPlay={true}
            data={promotion}
            scrollAnimationDuration={1000}
            onSnapToItem={index => console.log('current index:', index)}
            renderItem={({item, index}) => {
              return (
                <ImageWithNotFound
                  key={index}
                  uri={item?.image}
                  style={styles.imgPromo}
                />
              );
            }}
          />
          <Gap height={verticalScale(14)} width={0} />

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
                setActiveMenuIndex={() => handleMenuPress(index, item?._id)}
                index={index}
                item={item}
                onPress={() => {}}
                disabled={false}
              />
            )}
            keyExtractor={(_item, index) => index.toString()}
          />
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
                    goDetailProduct={goDetailProduct}
                    addFavorite={() => addFavorite(index)}
                    data={item}
                  />
                );
              }}
            />
          ) : (
            <ImageWithNotData />
          )}
        </React.Fragment>
      )}

      <Gap height={verticalScale(100)} width={0} />
    </ScrollView>
  );
};

export default HomeSections;
