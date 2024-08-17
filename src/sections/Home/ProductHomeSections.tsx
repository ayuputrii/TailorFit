import React from 'react';
import {FlatList} from 'react-native';
import {ImageWithNotData} from '../../components';
import {ProductsTypes} from '../../types';
import ProductsSections from '../Products';

interface ProductHomeSectionsProps {
  filteredProducts: ProductsTypes[];
  addFavorite: (id: string) => void;
  isEmpty: boolean;
  isLogin: boolean | undefined;
  deleteFavorite: (id: string) => void;
  goDetailProduct: (item: ProductsTypes) => void;
}
const ProductHomeSections = ({
  filteredProducts,
  addFavorite,
  isEmpty,
  isLogin,
  deleteFavorite,
  goDetailProduct,
}: ProductHomeSectionsProps) => {
  return (
    <React.Fragment>
      {Boolean(filteredProducts?.length) ? (
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
