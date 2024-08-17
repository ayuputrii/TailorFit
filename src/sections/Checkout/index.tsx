import React, {useMemo, useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {Buttons, CardCommons, Gap, Text} from '../../components';
import styles from './styles';
import {moderateScale} from '../../utils/scale';
import {colors} from '../../utils/colors';
import ProductCheckout from './ProductCheckout';
import ChooseAddress from './ChooseAddress';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RadioButton} from 'react-native-paper';
import {AddressTypes, ProductsTypes} from '../../types';
import {useCartStore} from '../../store/useCartStore';
import IconDollar from '../../assets/icons/ic-dollar.svg';
import {usePaymentTypeStore} from '../../store/usePaymentTypeStore';
import {formatIdr} from '../../utils/format-number';
import Accordion from 'react-native-collapsible/Accordion';
import ContentProductCO from './ContentProductCO';
import {fonts} from '../../utils/fonts';

interface CheckoutSectionsProps {
  onPress: () => void;
  goPayment: () => void;
  checked: boolean | string;
  setChecked: any;
  choosePayment: () => void;
  dataAddress: AddressTypes[];
  isFullPayment: boolean;
  setIsFullPayment: (v: boolean) => void;
}
const CheckoutSections = ({
  onPress,
  goPayment,
  checked,
  setChecked,
  choosePayment,
  dataAddress,
  isFullPayment,
  setIsFullPayment,
}: CheckoutSectionsProps) => {
  const cartStore = useCartStore();
  const paymentTypeStore = usePaymentTypeStore();
  const dataFilter = dataAddress?.find((item: AddressTypes) => item?.isDefault);

  const [activeSections, setActiveSections] = useState([]);

  const setSections = (sections: []) => {
    setActiveSections(sections);
  };

  const selectedCart = useMemo(() => {
    return cartStore?.cart.filter(item =>
      cartStore?.selectedCart?.includes(item?._id),
    );
  }, []);

  const totalPrice = useMemo(() => {
    const selected = cartStore?.cart.filter(item =>
      cartStore?.selectedCart?.includes(item?._id),
    );
    const allPrice = selected.reduce((acc, cur) => {
      const price =
        cur?.quantity * ((cur.productId as ProductsTypes).price || 1);

      return acc + price;
    }, 0);

    return allPrice;
  }, [cartStore.cart, cartStore?.selectedCart]);

  const renderHeader = (item: any, _: any) => {
    return <ProductCheckout key={item?._id} {...item} />;
  };

  const renderContent = (item: any, _: any) => {
    return <ContentProductCO key={item?._id} {...item} />;
  };

  const total = totalPrice + 1e5;

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.scroll}>
        <ChooseAddress onPress={onPress} data={dataFilter} />

        <Gap height={moderateScale(11)} width={0} />

        <Accordion
          activeSections={activeSections}
          sections={selectedCart}
          touchableComponent={TouchableOpacity}
          expandMultiple={true}
          renderHeader={renderHeader}
          renderContent={renderContent}
          onChange={setSections}
          sectionContainerStyle={{
            backgroundColor: colors.white,
            borderRadius: moderateScale(8),
            marginBottom: moderateScale(8),
          }}
        />
      </ScrollView>

      <Gap height={moderateScale(260)} width={0} />

      <View style={styles.viewBottom}>
        <CardCommons
          title={''}
          subTitle={''}
          titleStyle={false}
          subTitleStyle={false}
          onPress={choosePayment}
          style={styles.cardPayment}>
          <View style={styles.flexRowBetween}>
            <View
              style={[
                styles.contentProduct,
                {marginTop: moderateScale(2), width: '50%'},
              ]}>
              <IconDollar />

              <Gap height={0} width={moderateScale(6)} />

              <Text style={styles.text}>Pilih Metode Pembayaran</Text>
            </View>

            <Text style={styles.txtTf}>
              {paymentTypeStore.paymentType === 'BCA'
                ? 'Transfer - Bank'
                : 'E-wallet - GOPAY'}
            </Text>

            <Icon
              name="arrow-outward"
              size={moderateScale(20)}
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
          onPress={() => {}}
          disabled={true}
          style={styles.card}>
          <View>
            <Text style={styles.titleDelivery}>
              Pilih Tipe Penjemputan dan Pengiriman
            </Text>

            <View style={styles.hr} />

            <View style={styles.flexRowBetween}>
              <View style={styles.contentDelivery}>
                <RadioButton
                  value="FU"
                  uncheckedColor={colors.choco}
                  status={checked === 'first' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('first')}
                  color={colors.orange}
                />

                <Gap height={moderateScale(2)} width={0} />

                <Text style={[styles.text, {color: colors.black}]}>
                  Standard
                </Text>
              </View>
              <Text style={styles.text}>Rp150.000</Text>
            </View>
          </View>

          <Text style={[styles.text, {color: colors.red}]}>
            *We set the price at 150,000, but this amount may be reduced
            depending on the distance. If the 150,000 is overcharged, the excess
            will be refunded via GoPay. If the opposite occurs, an additional
            charge will be applied according to the shortfall.
          </Text>

          <Gap height={moderateScale(8)} width={0} />
          <View style={styles.hr} />

          <View>
            <Text style={styles.titleDelivery}>Pilih Tipe Pembayaran</Text>

            <View style={styles.hr} />

            <View style={styles.flexRowBetween}>
              <View style={styles.contentDelivery}>
                <RadioButton
                  value="isFullPayment"
                  uncheckedColor={colors.choco}
                  status={isFullPayment ? 'checked' : 'unchecked'}
                  onPress={() => setIsFullPayment(true)}
                  color={colors.orange}
                />

                <Gap height={moderateScale(2)} width={0} />

                <Text style={[styles.text, {color: colors.black}]}>
                  Full Payment
                </Text>
              </View>
              <Text
                style={[
                  styles.text,
                  {color: colors.orange, fontFamily: fonts.PoppinsBold},
                ]}>
                {formatIdr(total)}
              </Text>
            </View>

            <View style={styles.flexRowBetween}>
              <View style={styles.contentDelivery}>
                <RadioButton
                  value="isFullPayment"
                  uncheckedColor={colors.choco}
                  status={!isFullPayment ? 'checked' : 'unchecked'}
                  onPress={() => setIsFullPayment(false)}
                  color={colors.orange}
                />

                <Gap height={moderateScale(2)} width={0} />

                <Text style={[styles.text, {color: colors.black}]}>
                  Down Payment
                </Text>
              </View>
              <Text
                style={[
                  styles.text,
                  {color: colors.orange, fontFamily: fonts.PoppinsBold},
                ]}>
                {formatIdr(total / 2)}
              </Text>
            </View>
          </View>

          <Gap height={moderateScale(6)} width={0} />

          {!isFullPayment && (
            <React.Fragment>
              <View style={styles.hr} />

              <Gap height={moderateScale(6)} width={0} />

              <View style={styles.flexRowBetween}>
                <Text style={styles.titleProduct}>Sisa Pembayaran:</Text>
                <Text style={styles.title}>
                  {formatIdr(isFullPayment ? total : total / 2)}
                </Text>
              </View>
            </React.Fragment>
          )}

          <View style={styles.hr} />
          <Gap height={moderateScale(6)} width={0} />
          <View style={styles.flexRowBetween}>
            <View>
              <Text style={styles.titleProduct}>Total</Text>
              <Text style={styles.title}>
                {formatIdr(isFullPayment ? total : total / 2)}
              </Text>
            </View>

            <Buttons
              disabled={false}
              style={styles.btnOrder}
              onPress={goPayment}>
              <Text style={styles.textOrder}>Pesan</Text>
            </Buttons>
          </View>
        </CardCommons>
      </View>
    </View>
  );
};

export default CheckoutSections;
