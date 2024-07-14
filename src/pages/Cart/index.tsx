import React, {useState, useContext, useEffect} from 'react';
import {
  BackHeader,
  Buttons,
  CardCommons,
  Gap,
  ImageWithNotLogin,
  Text,
} from '../../components';
import {colors} from '../../utils/colors';
import {moderateScale} from '../../utils/scale';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import styles from './styles';
import {CartProps} from '../../navigation';
import {CartSections} from '../../sections';
import {AuthContext} from '../../context/AuthContext';
import IconFeather from 'react-native-vector-icons/Feather';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {API_CART, BASE_URL, getDataWithToken} from '../../api';
import {getData} from '../../utils/async-storage';

const Cart = ({navigation}: CartProps) => {
  const ctx = useContext(AuthContext);
  const isLogin = ctx?.isLogin;

  const [check, setCheck] = useState(false);

  const [value, setValue] = useState(0);
  const [dataCart, setDataCart] = useState([]);

  const onValue = ({v}: {v: number}) => {
    setValue(v);
  };

  const getDataCart = async () => {
    const token = await getData('ACCESS_TOKEN');
    try {
      const response = await getDataWithToken(BASE_URL + API_CART, token);
      if (response?.data?.data) {
        setDataCart(response?.data?.data);
      } else {
        setDataCart([]);
      }
    } catch (error) {
      console.log('get cart error', error);
      setDataCart([]);
    }
  };

  const goDetailProduct = () => {
    navigation?.navigate('ProductDetail');
  };

  const onTrash = () => {};

  useEffect(() => {
    getDataCart();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={false}
        backgroundColor={colors.basebg}
        barStyle="dark-content"
      />
      <BackHeader
        title="My Cart"
        goBack={() => navigation?.goBack()}
        icon={false}>
        {isLogin ? (
          <React.Fragment>
            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              style={styles.scroll}>
              <View style={styles.viewChoose}>
                <View style={styles.chooseCard}>
                  <Buttons
                    style={false}
                    disabled={false}
                    onPress={() => setCheck(!check)}
                    children={
                      <View style={styles.flexRow}>
                        <Text style={styles.txtChoose}>Choose All</Text>
                        <Gap width={8} height={0} />
                        {check ? (
                          <Icons
                            name="checkbox-outline"
                            size={moderateScale(22)}
                            color={colors.orange}
                          />
                        ) : (
                          <Icons
                            name="checkbox-blank-outline"
                            size={moderateScale(22)}
                            color={colors.orange}
                          />
                        )}
                      </View>
                    }
                  />
                </View>

                {check && (
                  <React.Fragment>
                    <Gap height={0} width={moderateScale(6)} />
                    <Buttons disabled={false} onPress={onTrash} style={{}}>
                      <IconFeather
                        name="trash-2"
                        size={moderateScale(22)}
                        color={colors.orange}
                      />
                    </Buttons>
                  </React.Fragment>
                )}
              </View>

              <FlatList
                data={dataCart}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                keyExtractor={(_item, index) => index.toString()}
                renderItem={({item, index}) => {
                  return (
                    <CartSections
                      key={index}
                      onPress={() => goDetailProduct()}
                      check={check}
                      setCheck={setCheck}
                      value={value}
                      onValue={onValue}
                      data={item}
                    />
                  );
                }}
              />

              <Gap height={moderateScale(8)} width={0} />
            </ScrollView>

            <CardCommons
              title={''}
              subTitle={''}
              titleStyle={false}
              subTitleStyle={false}
              onPress={() => navigation.navigate('Checkout')}
              style={styles.cardBottom}>
              <View style={styles.flexRowBetween}>
                <View style={styles.viewBottom}>
                  <Text style={styles.title}>Total</Text>
                  <Text style={styles.text1}>Rp 100.000</Text>
                </View>
                <Buttons
                  disabled={false}
                  style={styles.btn}
                  onPress={() => navigation.navigate('Checkout')}>
                  <Text style={styles.txtCheckout}>Checkout (16)</Text>
                </Buttons>
              </View>
            </CardCommons>
          </React.Fragment>
        ) : (
          <ImageWithNotLogin navigation={navigation} />
        )}
        <Gap height={moderateScale(8)} width={0} />
      </BackHeader>
    </SafeAreaView>
  );
};

export default Cart;
