import React, {useEffect, useState} from 'react';
import {Dimensions, SafeAreaView, StatusBar} from 'react-native';
import {Buttons, Gap, Header} from '../../components';
import Icon from 'react-native-vector-icons/Ionicons';
import {moderateScale} from '../../utils/scale';
import {colors} from '../../utils/colors';
import styles from './styles';
import {HomeProps} from '../../navigation';
import {HomeSections} from '../../sections';
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

const Home = ({navigation}: HomeProps) => {
  const width = Dimensions.get('window').width;

  const [activeMenuIndex, setActiveMenuIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(0);

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const [userData, setUserData] = useState<UserDataTypes>({} as UserDataTypes);
  const [promotion, setPromotion] = useState<PromotionTypes[]>([]);
  const [category, setCategory] = useState<CategoryTypes[]>([]);
  const [products, setProducts] = useState<ProductsTypes[]>([]);

  const [filteredProducts, setFilteredProducts] = useState<ProductsTypes[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>('');

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
      }
    } catch (error) {
      console.log('Get promotion error...', error);
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

  const goDetailProduct = () => {};

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
    if (selectedCategory !== null) {
      const filtered = products.filter(
        product => product?.category === selectedCategory,
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategory, products]);

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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={false}
        backgroundColor={colors.basebg}
        barStyle="dark-content"
      />
      <Header
        title="Halo, "
        subTitle={userData?.fullName ? firstName : '-'}
        image={undefined}
        icon={
          <React.Fragment>
            <Buttons disabled={false} onPress={() => {}} style={{}}>
              <Icon
                name="search-outline"
                size={moderateScale(30)}
                color={colors.black}
              />
            </Buttons>

            <Gap width={moderateScale(14)} height={0} />

            <Buttons disabled={false} onPress={() => {}} style={{}}>
              <Icon
                name="notifications-outline"
                size={moderateScale(30)}
                color={colors.black}
              />
            </Buttons>
          </React.Fragment>
        }
        loading={loading || refreshing}>
        <HomeSections
          category={category}
          width={width}
          activeMenuIndex={activeMenuIndex}
          handleMenuPress={handleMenuPress}
          addFavorite={addFavorite}
          goDetailProduct={goDetailProduct}
          refreshing={refreshing}
          onRefresh={onRefresh}
          promotion={promotion}
          filteredProducts={products}
          loading={loading || refreshing}
        />
      </Header>
    </SafeAreaView>
  );
};

export default Home;
