import React, {Dispatch, SetStateAction} from 'react';
import {Buttons, Header, ModalNotif} from '../../components';
import Icon from 'react-native-vector-icons/Ionicons';
import {moderateScale} from '../../utils/scale';
import {colors} from '../../utils/colors';
import {HomeSections, ProductSearch} from '../../sections';
import {
  CategoryTypes,
  ProductsTypes,
  PromotionTypes,
  UserDataTypes,
} from '../../types';

interface HomePageProps {
  showSearch: boolean;
  keyword: string;
  setKeyword: Dispatch<SetStateAction<string>>;
  onCloseSearch: () => void;
  onSearchDelete: () => void;
  isLogin: boolean | undefined;
  userData: UserDataTypes;
  firstName: string;
  onShowSearch: () => void;
  loading: boolean;
  refreshing: boolean;
  category: CategoryTypes[];
  filteredProducts: ProductsTypes[];
  promotion: PromotionTypes[];
  onRefresh: () => void;
  width: number;
  activeMenuIndex: number;
  handleMenuPress: any;
  addFavorite: (id: string) => void;
  navigation: any;
  isEmpty: boolean;
  deleteFavorite: (id: string) => void;
  products: ProductsTypes[];
  showModalNotif: boolean;
  onClose: () => void;
  titleModalNotif: string;
  errorFavorite: boolean;
  loadProduct: boolean;
}

const HomePage = ({
  showSearch,
  keyword,
  setKeyword,
  onCloseSearch,
  onSearchDelete,
  isLogin,
  userData,
  firstName,
  onShowSearch,
  loading,
  refreshing,
  category,
  filteredProducts,
  promotion,
  onRefresh,
  width,
  activeMenuIndex,
  handleMenuPress,
  addFavorite,
  navigation,
  isEmpty,
  deleteFavorite,
  products,
  showModalNotif,
  onClose,
  titleModalNotif,
  errorFavorite,
  loadProduct,
}: HomePageProps) => {
  return (
    <React.Fragment>
      {showSearch ? (
        <ProductSearch
          value={keyword}
          onChangeText={setKeyword}
          onSubmitEditing={() => {}}
          onClose={onCloseSearch}
          onClearText={() => setKeyword('')}
          onSearchDelete={onSearchDelete}
        />
      ) : (
        <Header
          children={false}
          title="Halo, "
          subTitle={
            isLogin ? (userData?.fullName ? firstName : '-') : 'Welcome!'
          }
          image={userData?.profilePicture}
          icon={
            <Buttons disabled={false} onPress={onShowSearch} style={{}}>
              <Icon
                name="search-outline"
                size={moderateScale(28)}
                color={colors.black}
              />
            </Buttons>
          }
          loading={loading || refreshing}
        />
      )}
      <HomeSections
        category={category}
        width={width}
        activeMenuIndex={activeMenuIndex}
        handleMenuPress={handleMenuPress}
        addFavorite={addFavorite}
        navigation={navigation}
        refreshing={refreshing}
        onRefresh={onRefresh}
        promotion={promotion}
        filteredProducts={showSearch ? filteredProducts : products}
        loading={loading || refreshing}
        showSearch={showSearch}
        isEmpty={isEmpty}
        isLogin={isLogin}
        deleteFavorite={deleteFavorite}
        loadProduct={loadProduct}
      />

      <ModalNotif
        isVisible={showModalNotif}
        onClose={onClose}
        title={titleModalNotif}
        style={{}}
        error={errorFavorite}
      />
    </React.Fragment>
  );
};

export default HomePage;
