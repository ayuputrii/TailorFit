import React, {useState, useContext, useEffect, useMemo} from 'react';
import {BackHeader, Gap, ImageWithNotLogin} from '../../components';
import {colors} from '../../utils/colors';
import {moderateScale} from '../../utils/scale';
import {SafeAreaView, StatusBar, View} from 'react-native';
import styles from './styles';
import {CartProps} from '../../navigation';
import {AuthContext} from '../../context/AuthContext';
import {
  API_CART,
  BASE_URL,
  getDataWithToken,
  postDataWithToken,
} from '../../api';
import {getData} from '../../utils/async-storage';
import {useCartStore} from '../../store/useCartStore';
import {ProductsTypes} from '../../types';
import {useIsBuyStore} from '../../store/useIsBuyStore';
import useCartConfig from '../../hooks/useCartConfig';
import CartLogin from './CartLogin';
import OrderDetailModal from '../../sections/ProductDetail/OrderDetailModal';

const Cart = ({navigation}: CartProps) => {
  const ctx = useContext(AuthContext);
  const isLogin = ctx?.isLogin;

  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingDots, setLoadingDots] = useState(false);

  const [cartId, setCartId] = useState('');
  const cartConfig = useCartConfig({
    cartId,
  });

  const cartStore = useCartStore();
  const isBuyStore = useIsBuyStore();

  const getDataCart = async () => {
    setLoading(true);
    const token = await getData('ACCESS_TOKEN');

    try {
      const response = await getDataWithToken(BASE_URL + API_CART, token);
      if (response?.data?.data) {
        cartStore?.setCart(response?.data?.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);

    await getDataCart();
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  };

  const totalPrice = useMemo(() => {
    const selected = cartStore?.cart.filter(item =>
      cartStore?.selectedCart?.includes(item?._id),
    );
    const allPrice = selected.reduce((acc, cur) => {
      const price =
        cur?.quantity * ((cur.productId as ProductsTypes)?.price || 1);

      return acc + price;
    }, 0);

    return allPrice;
  }, [cartStore?.cart, cartStore?.selectedCart]);

  const onCheckAll = () => {
    setCheck(!check);
    if (check) {
      cartStore?.setSelectedCart([]);
    } else {
      cartStore?.setSelectedCart(cartStore?.cart.map(item => item?._id));
    }
  };

  const onDeleteCart = async () => {
    setLoadingDots(true);
    try {
      const token = await getData('ACCESS_TOKEN');
      await postDataWithToken(
        `${BASE_URL}${API_CART}/delete/multiple/`,
        {
          cartIds: cartStore?.selectedCart,
        },
        token,
      );
      cartStore?.setCart(
        cartStore?.cart.filter(
          item => !cartStore?.selectedCart.includes(item?._id),
        ),
      );
      cartStore?.setSelectedCart([]);
      setCheck(false);
      setLoadingDots(false);
    } catch (err) {
      setLoadingDots(false);
    }
  };

  const isChecked = useMemo(() => {
    const equalLength =
      cartStore?.cart.length === cartStore?.selectedCart.length;
    const notZero =
      cartStore?.cart.length !== 0 && cartStore?.selectedCart.length !== 0;
    return check || (equalLength && notZero);
  }, [check, cartStore?.cart, cartStore?.selectedCart]);

  const onPressItem = (id: string) => {
    setLoadingDots(true);
    setCartId(id);
  };

  const onCloseModalBottom = () => {
    setCartId('');
  };

  useEffect(() => {
    getDataCart();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    getDataCart();
  }, []);

  useEffect(() => {
    isBuyStore.setNotBuy();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={false}
        backgroundColor={colors.basebg}
        barStyle="dark-content"
      />
      <BackHeader
        title="Keranjang Saya"
        goBack={() => navigation?.goBack()}
        icon={false}>
        {isLogin ? (
          <React.Fragment>
            <CartLogin
              loading={loading}
              onCheckAll={onCheckAll}
              isChecked={isChecked}
              onDeleteCart={onDeleteCart}
              refreshing={refreshing}
              onRefresh={onRefresh}
              onPressItem={onPressItem}
              navigation={navigation}
              totalPrice={totalPrice}
            />
            <OrderDetailModal
              materialProvider={cartConfig!.materialProvider}
              onOrder={cartConfig!.onOrder}
              onShowBuy={cartConfig!.onShowBuy}
              onShowCart={cartConfig!.onShowCart}
              refRBSheet={cartConfig!.refRBSheet}
              quality={cartConfig!.quality}
              type={cartConfig!.type}
              selectedQuality={cartConfig!.selectedQuality}
              selectedSize={cartConfig!.selectedSize}
              selectedType={cartConfig!.selectedType}
              handleMenuPress={cartConfig!.handleMenuPress}
              radioButtons={cartConfig!.radioButtons}
              setMaterialProvider={cartConfig!.setMaterialProvider}
              quantity={cartConfig!.quantity}
              onQuantity={cartConfig!.onQuantity}
              file={cartConfig!.file}
              setFile={cartConfig!.setFile}
              onCustomizeSize={cartConfig!.onCustomizeSize}
              detail={cartConfig!.detail}
              enableContinue={cartConfig!.enableContinue}
              enableCustom={cartConfig!.enableCustom}
              trigger={<View />}
              setLoadingDots={setLoadingDots}
              loadingDots={loadingDots}
              onCloseModalBottom={onCloseModalBottom}
            />
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
