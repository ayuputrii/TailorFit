import React from 'react';
import ProductsSections from '../Products';
import {ImageWithNotData, Shimmer} from '../../components';
import {FlatList, View} from 'react-native';
import {ProductsTypes} from '../../types';
import {styles} from './styles';

interface FavoriteSectionsProps {
  data: ProductsTypes[];
  loading: boolean;
  isLogin: boolean | undefined;
  navigation: any;
  onDeleteFavorite: (id: string) => void;
}

const FavoriteSections = ({
  data,
  loading,
  isLogin,
  navigation,
  onDeleteFavorite,
}: FavoriteSectionsProps) => {
  const goDetailProduct = (item: ProductsTypes) => {
    navigation?.navigate('ProductDetail', item);
  };

  return (
    <>
      {loading ? (
        <FlatList
          data={Array(6).fill(1)}
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
      ) : data?.length ? (
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
                addFavorite={() => {}}
                deleteFavorite={() =>
                  onDeleteFavorite(item?.favorite?._id as string)
                }
                data={item}
                isLogin={isLogin}
              />
            );
          }}
        />
      ) : (
        <ImageWithNotData style={styles.noData} />
      )}
    </>
  );
};

export default FavoriteSections;
