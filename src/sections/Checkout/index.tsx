import React from 'react';
import {ScrollView, View} from 'react-native';
import {Buttons, CardCommons, Gap, Text} from '../../components';
import styles from './styles';
import {moderateScale} from '../../utils/scale';
import {colors} from '../../utils/colors';
import ProductCheckout from './ProductCheckout';
import ChooseAddress from './ChooseAddress';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RadioButton} from 'react-native-paper';

interface CheckoutSectionsProps {
  onPress: () => void;
  goPayment: () => void;
  checked: boolean | string;
  setChecked: any;
  choosePayment: () => void;
}
const CheckoutSections = ({
  onPress,
  goPayment,
  checked,
  setChecked,
  choosePayment,
}: CheckoutSectionsProps) => {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.scroll}>
        <ChooseAddress onPress={onPress} />

        <Gap height={moderateScale(11)} width={0} />

        <ProductCheckout />
      </ScrollView>

      <View style={styles.viewBottom}>
        <CardCommons
          title={''}
          subTitle={''}
          titleStyle={false}
          subTitleStyle={false}
          onPress={choosePayment}
          style={styles.card}>
          <View style={styles.flexRowBetween}>
            <View style={styles.contentProduct}>
              <Gap height={0} width={moderateScale(8)} />
              <Icon
                name="payments"
                size={moderateScale(28)}
                color={colors.orange}
              />
              <Gap height={0} width={moderateScale(8)} />

              <Text style={styles.text}>Choose Payment</Text>
            </View>

            <Icon
              name="arrow-outward"
              size={moderateScale(28)}
              color={colors.orange}
            />
          </View>
        </CardCommons>

        <Gap height={moderateScale(16)} width={0} />

        <CardCommons
          title={''}
          subTitle={''}
          titleStyle={false}
          subTitleStyle={false}
          onPress={goPayment}
          style={styles.card}>
          <Text style={styles.titleDelivery}>Choose Delivery</Text>

          <View style={styles.hr} />

          <View style={styles.flexRowBetween}>
            <View style={styles.contentDelivery}>
              <RadioButton
                value="first"
                uncheckedColor={colors.choco}
                status={checked === 'first' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('first')}
                color={colors.orange}
              />

              <Gap height={moderateScale(2)} width={0} />

              <Text style={[styles.text, {color: colors.black}]}>JNE</Text>
            </View>
            <Text style={styles.text}>Rp10.000</Text>
          </View>

          <View style={styles.hr} />

          <Gap height={moderateScale(16)} width={0} />

          <View style={styles.flexRowBetween}>
            <View>
              <Text style={styles.titleProduct}>Total</Text>
              <Text style={styles.title}>RP160.000</Text>
            </View>
            <Buttons style={styles.btnOrder} onPress={goPayment}>
              <Text style={styles.textOrder}>Order</Text>
            </Buttons>
          </View>
        </CardCommons>
      </View>
    </View>
  );
};

export default CheckoutSections;
