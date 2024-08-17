import React from 'react';
import {FlatList, View} from 'react-native';
import {ImageWithNotData, Shimmer} from '../../components';
import {ProductsTypes} from '../../types';
import ProductsSections from '../Products';
import {styles} from './styles';

interface ProductHomeSectionsProps {
  filteredProducts: ProductsTypes[];
  addFavorite: (id: string) => void;
  isEmpty: boolean;
  isLogin: boolean | undefined;
  deleteFavorite: (id: string) => void;
  goDetailProduct: (item: ProductsTypes) => void;
  loadProduct: boolean;
}
const ProductHomeSections = ({
  filteredProducts,
  addFavorite,
  isEmpty,
  isLogin,
  deleteFavorite,
  goDetailProduct,
  loadProduct,
}: ProductHomeSectionsProps) => {
  return (
    <React.Fragment>
      {loadProduct && (
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
      )}
      {!loadProduct && Boolean(filteredProducts?.length) ? (
        <FlatList
          data={filteredProducts}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={({item, index}: {item: ProductsTypes; index: any}) => {
            return (
              <ProductsSections
                key={index}
                goDetailProduct={() => goDetailProduct({...item})}
                addFavorite={() => addFavorite(item?._id as string)}
                deleteFavorite={() =>
                  deleteFavorite(item?.favorite?._id as string)
                }
                data={item}
                isLogin={isLogin}
              />
            );
          }}
        />
      ) : isEmpty ? (
        <ImageWithNotData style={{}} />
      ) : (
        <ImageWithNotData style={{}} />
      )}
    </React.Fragment>
  );
};

export default ProductHomeSections;
