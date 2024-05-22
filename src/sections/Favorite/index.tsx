import React from 'react';
import ProductsSections from '../Products';
import {ImageWithNotData} from '../../components';
import {FlatList} from 'react-native';
import {ProductsTypes} from '../../types';

interface FavoriteSectionsProps {
  data: ProductsTypes[];
  isEmpty: boolean;
}

const FavoriteSections = ({data, isEmpty}: FavoriteSectionsProps) => {
  const goDetailProduct = (item: ProductsTypes) => {
    console.log('items', item);
  };
  const goFavorite = (index: number) => {
    console.log(index, 'index');
  };

  return (
    <>
      {data?.length ? (
        <FlatList
          data={data}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={({item, index}: {item: ProductsTypes; index: any}) => {
            return (
              <ProductsSections
                key={index}
                goDetailProduct={() => goDetailProduct({...item})}
                addFavorite={() => goFavorite(index)}
                data={item}
              />
            );
          }}
        />
      ) : isEmpty ? (
        <ImageWithNotData />
      ) : null}
    </>
  );
};

export default FavoriteSections;
