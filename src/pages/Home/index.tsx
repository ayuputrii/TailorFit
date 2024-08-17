import React, {useEffect, useState, useContext} from 'react';
import {Dimensions, SafeAreaView, StatusBar} from 'react-native';
import {colors} from '../../utils/colors';
import styles from './styles';
import {HomeProps} from '../../navigation';
import {useDebouncedCallback} from 'use-debounce';
import {AuthContext} from '../../context/AuthContext';
import {
  API_CATEGORY,
  API_FAVORITE,
  API_PRODUCT,
  API_PROFILE,
  API_PROMOTION,
  BASE_URL,
  deleteWithToken,
  getDataResponse,
  getDataWithToken,
  postDataWithToken,
} from '../../api';
import {getData} from '../../utils/async-storage';
import {
  CategoryTypes,
  ProductsTypes,
  PromotionTypes,
  UserDataTypes,
} from '../../types';
import HomePage from './HomePage';

const Home = ({navigation}: HomeProps) => {
  const ctx = useContext(AuthContext);
  const isLogin = ctx?.isLogin;

  const width = Dimensions.get('window').width;

  const [activeMenuIndex, setActiveMenuIndex] = useState(0);

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [showModalNotif, setShowModalNotif] = useState(false);
  const [errorFavorite, setErrorFavorite] = useState(false);

  const [userData, setUserData] = useState<UserDataTypes>({} as UserDataTypes);
  const [promotion, setPromotion] = useState<PromotionTypes[]>([]);
  const [category, setCategory] = useState<CategoryTypes[]>([]);
  const [products, setProducts] = useState<ProductsTypes[]>([]);

  const [titleModalNotif, setTitleModalNotif] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<ProductsTypes[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>('');
  const [keyword, setKeyword] = useState<string>('');

  console.log('response category', category);

  const firstName = `${
    userData?.fullName?.split(' ')[0] + ' ' + userData?.fullName?.split(' ')[1]
  }`;

  const getProfile = async () => {
    try {
      const token = await getData('ACCESS_TOKEN');
      const response = await getDataWithToken(BASE_URL + API_PROFILE, token);
      if (response?.data?.data) {
        setUserData(response?.data?.data);
      }
    } catch (error) {
      setUserData({});
    }
  };

  const getPromotion = async () => {
    try {
      const response = await getDataResponse(BASE_URL + API_PROMOTION);
      if (response?.data?.data) {
        setPromotion(response?.data?.data);
      }
    } catch (error) {
      setPromotion([]);
    }
  };

  const getCategory = async () => {
    try {
      const response = await getDataResponse(BASE_URL + API_CATEGORY);
      if (response?.data?.data) {
        setCategory([{_id: '', name: 'All'}, ...response?.data?.data]);
      }
    } catch (error) {
      setCategory([]);
    }
  };

  const getProducts = async (cat?: string) => {
    const token = await getData('ACCESS_TOKEN');
    try {
      const response = await getDataWithToken(
        BASE_URL + `${API_PRODUCT}?category=${cat || selectedCategory}`,
        token,
      );
      if (response?.data?.data) {
        setProducts(response?.data?.data);
        if (response?.data?.data?.length) {
          setIsEmpty(false);
        } else {
          setIsEmpty(true);
        }
      }
    } catch (error) {
      setIsEmpty(true);
    }
  };

  const getSearchProduct = async () => {
    const token = await getData('ACCESS_TOKEN');
    try {
      const response = await getDataWithToken(
        BASE_URL + `${API_PRODUCT}?q=${keyword}`,
        token,
      );
      if (response?.data?.data) {
        setFilteredProducts(response?.data?.data);
        if (response?.data?.data?.length) {
          setIsEmpty(false);
        } else {
          setIsEmpty(true);
        }
      }
    } catch (error) {
      return [];
    }
  };
  const debouncedSearchProduct = useDebouncedCallback(getSearchProduct, 500);

  const handleMenuPress = (index: number, id: string) => {
    setActiveMenuIndex(index);
    setSelectedCategory(id);
    getProducts(id);
  };

  const addFavorite = async (id: string | any) => {
    try {
      const token = await getData('ACCESS_TOKEN');
      const response = await postDataWithToken(
        BASE_URL + API_FAVORITE,
        {productId: id},
        token,
      );
      if (response?.data?.success) {
        getProducts();
        setShowModalNotif(true);
        setErrorFavorite(false);
        setTitleModalNotif(
          response?.data?.message || 'Produk Berhasil ditambahkan ke favorit',
        );
      } else {
        setShowModalNotif(true);
        setErrorFavorite(true);
        setTitleModalNotif('Produk belum berhasil ditambahkan ke favorit');
      }
    } catch (error) {
      setShowModalNotif(true);
      setErrorFavorite(true);
      setTitleModalNotif('Produk belum berhasil ditambahkan ke favorit');
    }
  };

  const deleteFavorite = async (id: string) => {
    try {
      const token = await getData('ACCESS_TOKEN');
      const response = await deleteWithToken(
        BASE_URL + API_FAVORITE + '/' + id,
        token,
      );
      if (response?.data?.success) {
        getProducts();
        setShowModalNotif(true);
        setErrorFavorite(false);
        setTitleModalNotif(
          response?.data?.message || 'Produk Berhasil dihapus dari favorit',
        );
      } else {
        setShowModalNotif(true);
        setErrorFavorite(true);
        setTitleModalNotif('Produk belum berhasil dihapus dari favorit');
      }
    } catch (error) {
      setShowModalNotif(true);
      setErrorFavorite(true);
      setTitleModalNotif('Produk belum berhasil dihapus dari favorit');
    }
  };

  const onShowSearch = () => {
    setShowSearch(true);
  };

  const onCloseSearch = () => {
    setShowSearch(false);
    setFilteredProducts([]);
    setIsEmpty(false);
    setKeyword('');
  };

  const onSearchDelete = () => {
    setFilteredProducts([]);
  };

  const onRefresh = async () => {
    setRefreshing(true);

    await getProfile();
    await getPromotion();
    await getCategory();
    await getProducts();
    setSelectedCategory('');
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  };

  useEffect(() => {
    const getDataAsync = async () => {
      const promises = [
        getProfile(),
        getPromotion(),
        getCategory(),
        getProducts(),
      ];
      try {
        await Promise.all(promises);
      } catch (err) {}
      setLoading(false);
    };
    getDataAsync();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    const handleSearch = async () => {
      if (keyword) {
        debouncedSearchProduct();
      } else {
        setFilteredProducts([]);
      }
    };
    handleSearch();
  }, [keyword]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={false}
        backgroundColor={colors.basebg}
        barStyle="dark-content"
      />
      <HomePage
        showSearch={showSearch}
        keyword={keyword}
        setKeyword={setKeyword}
        onCloseSearch={onCloseSearch}
        onSearchDelete={onSearchDelete}
        isLogin={isLogin}
        userData={userData}
        firstName={firstName}
        onShowSearch={onShowSearch}
        loading={loading}
        refreshing={refreshing}
        category={category}
        filteredProducts={filteredProducts}
        promotion={promotion}
        onRefresh={onRefresh}
        width={width}
        activeMenuIndex={activeMenuIndex}
        handleMenuPress={handleMenuPress}
        addFavorite={addFavorite}
        navigation={navigation}
        isEmpty={isEmpty}
        deleteFavorite={deleteFavorite}
        products={products}
        showModalNotif={showModalNotif}
        onClose={() => setShowModalNotif(false)}
        titleModalNotif={titleModalNotif}
        errorFavorite={errorFavorite}
      />
    </SafeAreaView>
  );
};

export default Home;
