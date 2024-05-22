import React, {useState} from 'react';
import {BackHeader, Buttons, CardCommons, Gap, Text} from '../../components';
import IconANT from 'react-native-vector-icons/AntDesign';
import {colors} from '../../utils/colors';
import {moderateScale} from '../../utils/scale';
import {SafeAreaView, ScrollView, StatusBar, View} from 'react-native';
import styles from './styles';
import {CartProps} from '../../navigation';
import {CartSections} from '../../sections';

const Cart = ({navigation}: CartProps) => {
  const [check, setCheck] = useState(false);

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
        icon={
          <IconANT
            name="logout"
            color={colors.black}
            size={moderateScale(20)}
          />
        }>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={styles.scroll}>
          <CartSections onPress={() => {}} check={check} setCheck={setCheck} />
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
        <Gap height={moderateScale(8)} width={0} />
      </BackHeader>
    </SafeAreaView>
  );
};

export default Cart;
