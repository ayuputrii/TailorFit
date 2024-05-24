import React, {useEffect} from 'react';
import {BackHeader, Gap} from '../../components';
import {colors} from '../../utils/colors';
import {moderateScale} from '../../utils/scale';
import {SafeAreaView, ScrollView, StatusBar} from 'react-native';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {FavoriteProps} from '../../navigation';
import {FavoriteSections} from '../../sections';
import {getData} from '../../utils/async-storage';
import {API_FAVORITE, BASE_URL, postDataWithToken} from '../../api';

const Favorite = ({navigation}: FavoriteProps) => {
  const getFavorite = async () => {
    const token = await getData('ACCESS_TOKEN');
    try {
      const response = await postDataWithToken(BASE_URL + API_FAVORITE, token);
      console.log('response', response);
    } catch (error) {
      console.log('error', error);
    }
  };

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
        title="Favorite"
        goBack={() => navigation?.goBack()}
        icon={
          <Ionicons
            name="cart-outline"
            color={colors.black}
            size={moderateScale(22)}
            onPress={() => navigation.navigate('Cart')}
          />
        }>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <Gap height={moderateScale(8)} width={0} />
          <FavoriteSections navigation={navigation} />
          <Gap height={moderateScale(8)} width={0} />
        </ScrollView>
      </BackHeader>
    </SafeAreaView>
  );
};

export default Favorite;
