import React, {useEffect, useState, useContext} from 'react';
import {BackHeader, Gap, ImageWithNotLogin, ModalNotif} from '../../components';
import {colors} from '../../utils/colors';
import {moderateScale} from '../../utils/scale';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import styles from './styles';
import {FavoriteProps} from '../../navigation';
import {FavoriteSections} from '../../sections';
import {getData} from '../../utils/async-storage';
import {
  API_FAVORITE,
  BASE_URL,
  deleteWithToken,
  getDataWithToken,
} from '../../api';
import {AuthContext} from '../../context/AuthContext';
import {ProductsTypes} from '../../types';

const Favorite = ({navigation}: FavoriteProps) => {
  const ctx = useContext(AuthContext);
  const isLogin = ctx?.isLogin;

  const [titleModalNotif, setTitleModalNotif] = useState<string>('');
  const [dataFavorite, setDataFavorite] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showModalNotif, setShowModalNotif] = useState(false);
  const [errorFavorite, setErrorFavorite] = useState(false);

  const getFavorite = async () => {
    setLoading(true);
    try {
      const token = await getData('ACCESS_TOKEN');
      const response = await getDataWithToken(BASE_URL + API_FAVORITE, token);
      if (response?.data?.data) {
        setDataFavorite(
          response?.data?.data?.map(
            (item: {productId: ProductsTypes}) => item?.productId,
          ),
        );
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setDataFavorite([]);
    }
  };

  const onDeleteFavorite = async (id: string) => {
    try {
      const token = await getData('ACCESS_TOKEN');
      const response = await deleteWithToken(
        BASE_URL + API_FAVORITE + '/' + id,
        token,
      );
      if (response?.data?.success) {
        getFavorite();
        setShowModalNotif(true);
        setErrorFavorite(false);
        setTitleModalNotif(
          response?.data?.message || 'Berhasil dihapus dari favorit',
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

  const onRefresh = async () => {
    setRefreshing(true);

    await getFavorite();
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  };

  useEffect(() => {
    getFavorite();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    getFavorite();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={false}
        backgroundColor={colors.basebg}
        barStyle="dark-content"
      />
      <BackHeader
        title="Favorit"
        goBack={() => navigation?.goBack()}
        icon={false}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {isLogin ? (
            <React.Fragment>
              <Gap height={moderateScale(8)} width={0} />

              <FavoriteSections
                data={dataFavorite}
                loading={loading || refreshing}
                isLogin={isLogin}
                navigation={navigation}
                onDeleteFavorite={onDeleteFavorite}
              />
            </React.Fragment>
          ) : (
            <ImageWithNotLogin navigation={navigation} />
          )}
          <Gap height={moderateScale(120)} width={0} />
        </ScrollView>
      </BackHeader>

      <ModalNotif
        isVisible={showModalNotif}
        onClose={() => setShowModalNotif(false)}
        title={titleModalNotif}
        style={{}}
        error={errorFavorite}
      />
    </SafeAreaView>
  );
};

export default Favorite;
