import React, {useEffect, useState} from 'react';
import {Dimensions, SafeAreaView, StatusBar} from 'react-native';
import {ButtonLogin, Buttons, Gap, Header, Text} from '../../components';
import Icon from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import {moderateScale} from '../../utils/scale';
import {colors} from '../../utils/colors';
import styles from './styles';
import {HomeProps} from '../../navigation';
import {HomeSections, ProductSearch} from '../../sections';
import {useDebounce} from 'use-debounce';
import {
  API_CATEGORY,
  API_PRODUCT,
  API_PROFILE,
  API_PROMOTION,
  BASE_URL,
  getDataResponse,
} from '../../api';
import {getData} from '../../utils/async-storage';
import {
  CategoryTypes,
  ProductsTypes,
  PromotionTypes,
  UserDataTypes,
} from '../../types';
import {fonts} from '../../utils/fonts';

const Home = ({navigation}: HomeProps) => {
  const width = Dimensions.get('window').width;

  const isLogin = false;

  const [activeMenuIndex, setActiveMenuIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(0);

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [isInitialSearch, setIsInitialSearch] = useState(true);

  const [userData, setUserData] = useState<UserDataTypes>({} as UserDataTypes);
  const [promotion, setPromotion] = useState<PromotionTypes[]>([]);
  const [category, setCategory] = useState<CategoryTypes[]>([]);
  const [products, setProducts] = useState<ProductsTypes[]>([]);

  const [filteredProducts, setFilteredProducts] = useState<ProductsTypes[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>('');
  const [keyword, setKeyword] = useState<string>('');
  const [textSearch] = useDebounce(keyword, 500);
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);

  const [isEmpty, setIsEmpty] = useState(false);

  const firstName = `${
    userData?.fullName?.split(' ')[0] + ' ' + userData?.fullName?.split(' ')[1]
  }`;

  const getProfile = async () => {
    try {
      const token = await getData('ACCESS_TOKEN');
      const response = await getDataResponse(BASE_URL + API_PROFILE, token);
      if (response?.data?.data) {
        setUserData(response?.data?.data);
      }
    } catch (error) {
      console.log('Get profile error...', error);
    }
  };

  const getPromotion = async () => {
    try {
      const token = await getData('ACCESS_TOKEN');
      const response = await getDataResponse(BASE_URL + API_PROMOTION, token);
      if (response?.data?.data) {
        setPromotion(response?.data?.data);
      }
    } catch (error) {
      console.log('Get promotion error...', error);
    }
  };

  const getCategory = async () => {
    try {
      const token = await getData('ACCESS_TOKEN');
      const response = await getDataResponse(BASE_URL + API_CATEGORY, token);
      if (response?.data?.data) {
        setCategory([{_id: '', name: 'All'}, ...response?.data?.data]);
      }
    } catch (error) {
      console.log('Get category error...', error);
    }
  };

  const getProducts = async (cat?: string) => {
    try {
      const token = await getData('ACCESS_TOKEN');
      const response = await getDataResponse(
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
      console.log('Get products error...', error);
    }
  };

  const getSearchProduct = async () => {
    try {
      const token = await getData('ACCESS_TOKEN');
      const response = await getDataResponse(
        BASE_URL +
          `${API_PRODUCT}?page=${page}&perPage=${perPage}&q=${keyword}`,
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

  const handleMenuPress = (index: number, id: string) => {
    setActiveMenuIndex(index);
    setSelectedCategory(id);
    getProducts(id);
  };

  const addFavorite = (index: number) => {
    setIsFavorite(index);
  };

  const onShowSearch = () => {
    setShowSearch(true);
  };

  const onCloseSearch = () => {
    setShowSearch(false);
    setFilteredProducts([]);
    setIsInitialSearch(false);
    setIsEmpty(false);
  };

  const onSearchDelete = () => {
    setFilteredProducts([]);
  };

  const onNotifications = () => {};

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
      if (textSearch) {
        await getSearchProduct();
      } else {
        setFilteredProducts([]);
      }
    };
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textSearch]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={false}
        backgroundColor={colors.basebg}
        barStyle="dark-content"
      />
      {showSearch ? (
        <ProductSearch
          value={textSearch}
          onChangeText={setKeyword}
          onSubmitEditing={() => {}}
          onClose={onCloseSearch}
          onNotifications={onNotifications}
          onSearchDelete={onSearchDelete}
        />
      ) : (
        <Header
          children={false}
          title="Halo, "
          subTitle={
            isLogin ? (userData?.fullName ? firstName : '-') : 'Welcome!'
          }
          image={undefined}
          icon={
            <React.Fragment>
              {isLogin ? (
                <React.Fragment>
                  <Buttons disabled={false} onPress={onShowSearch} style={{}}>
                    <Icon
                      name="search"
                      size={moderateScale(28)}
                      color={colors.black}
                    />
                  </Buttons>

                  <Gap width={moderateScale(14)} height={0} />

                  <Buttons disabled={false} onPress={() => {}} style={{}}>
                    <Octicons
                      name="bell"
                      size={moderateScale(24)}
                      color={colors.black}
                    />
                  </Buttons>
                </React.Fragment>
              ) : (
                <ButtonLogin navigation={navigation} />
              )}
            </React.Fragment>
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
      />
    </SafeAreaView>
  );
};

export default Home;
