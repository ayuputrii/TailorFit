import React from 'react';
import ProductsSections from '../Products';
import {ImageWithNotData, ImageWithNotLogin} from '../../components';
import {FlatList, View} from 'react-native';
import {ProductsTypes} from '../../types';
import {colors} from '../../utils/colors';
import IlustrationAccount from '../../assets/ilustration/il-access-account.svg';
import {moderateScale} from '../../utils/scale';

interface FavoriteSectionsProps {
  data: ProductsTypes[];
  isEmpty: boolean;
  navigation: any;
}

const FavoriteSections = ({
  data,
  isEmpty,
  navigation,
}: FavoriteSectionsProps) => {
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
      ) : (
        <ImageWithNotLogin navigation={navigation} />
      )}
    </>
  );
};

export default FavoriteSections;
