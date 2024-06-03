import React, {useState, useContext} from 'react';
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
import {SafeAreaView, ScrollView, StatusBar, View} from 'react-native';
import styles from './styles';
import {CartProps} from '../../navigation';
import {CartSections} from '../../sections';
import {AuthContext} from '../../context/AuthContext';

const Cart = ({navigation}: CartProps) => {
  const ctx = useContext(AuthContext);
  const isLogin = ctx?.isLogin;

  const [check, setCheck] = useState(false);

  const [value, setValue] = useState(0);

  const onValue = ({v}: {v: number}) => {
    setValue(v);
  };

  const goDetailProduct = () => {
    navigation?.navigate('ProductDetail');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={false}
        backgroundColor={colors.basebg}
        barStyle="dark-content"
      />
      <BackHeader
        title="Transaction Cart"
        goBack={() => navigation?.goBack()}
        icon={false}>
        <Gap height={moderateScale(8)} width={0} />
        {isLogin ? (
          <React.Fragment>
            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              style={styles.scroll}>
              <CartSections
                onPress={() => goDetailProduct()}
                check={check}
                setCheck={setCheck}
                value={value}
                onValue={onValue}
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
