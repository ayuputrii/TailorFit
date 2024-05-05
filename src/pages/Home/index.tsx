import React, {useEffect, useState} from 'react';
import {Dimensions, View} from 'react-native';
import {Buttons, Gap, Header} from '../../components';
import Icon from 'react-native-vector-icons/Ionicons';
import {moderateScale} from '../../utils/scale';
import {colors} from '../../utils/colors';
import styles from './styles';
import {HomeProps} from '../../navigation';
import {HomeSections} from '../../sections';
import {API_PROFILE, BASE_URL, getData} from '../../api';

const Home = ({navigation}: HomeProps) => {
  const width = Dimensions.get('window').width;

  const [activeMenuIndex, setActiveMenuIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(0);

  const handleMenuPress = (index: number) => {
    setActiveMenuIndex(index);
  };

  const addFavorite = (index: number) => {
    setIsFavorite(index);
  };

  const goDetailProduct = () => {};

  const getProfile = async () => {
    const response = await getData(BASE_URL + API_PROFILE);
    console.log('response profile', response);
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <View style={styles.container}>
      <Header
        title="Hello"
        subTitle="Ayu Mahirun"
        image={undefined}
        icon={
          <>
            <Buttons onPress={() => {}} style={{}}>
              <Icon
                name="search-outline"
                size={moderateScale(30)}
                color={colors.black}
              />
            </Buttons>

            <Gap width={moderateScale(14)} height={0} />

            <Buttons onPress={() => {}} style={{}}>
              <Icon
                name="notifications-outline"
                size={moderateScale(30)}
                color={colors.black}
              />
            </Buttons>
          </>
        }>
        <HomeSections
          width={width}
          activeMenuIndex={activeMenuIndex}
          handleMenuPress={handleMenuPress}
          addFavorite={addFavorite}
          goDetailProduct={goDetailProduct}
        />
      </Header>
    </View>
  );
};

export default Home;
