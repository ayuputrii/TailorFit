import React from 'react';
import {RefreshControl, ScrollView} from 'react-native';
import {styles} from './styles';
import {Gap} from '../../components';
import {verticalScale} from '../../utils/scale';
import {CategoryTypes, ProductsTypes, PromotionTypes} from '../../types';
import ProductHomeSections from './ProductHomeSections';
import HomeSearchSections from './HomeSearchSections';

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
      <HomeSearchSections
        promotion={promotion}
        category={category}
        width={width}
        activeMenuIndex={activeMenuIndex}
        handleMenuPress={handleMenuPress}
        loading={loading}
        showSearch={showSearch}
      />
      <ProductHomeSections
        filteredProducts={filteredProducts}
        addFavorite={addFavorite}
        isEmpty={isEmpty}
        isLogin={isLogin}
        deleteFavorite={deleteFavorite}
        goDetailProduct={goDetailProduct}
      />
      <Gap height={verticalScale(100)} width={0} />
    </ScrollView>
  );
};

export default HomeSections;
