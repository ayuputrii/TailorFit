/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useRef, useState} from 'react';
import {Dimensions, SafeAreaView, StatusBar} from 'react-native';
import {colors} from '../../utils/colors';
import styles from './styles';
import {useRoute} from '@react-navigation/native';
import {ProductsTypes, RatingTypes} from '../../types';
import {BackHeader, ModalConfirmation} from '../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {moderateScale} from '../../utils/scale';
import {ProductDetailProps} from '../../navigation';
import {ProductDetailSections} from '../../sections';
import {AuthContext} from '../../context/AuthContext';
import {API_REVIEW, BASE_URL, getDataResponse} from '../../api';

type RBSheetRef = {
  open: () => void;
  close: () => void;
};

const ProductDetail = ({navigation}: ProductDetailProps) => {
  const ctx = useContext(AuthContext);
  const isLogin = ctx?.isLogin;

  const route = useRoute();
  const width = Dimensions.get('window').width;

  const refRBSheet = useRef<RBSheetRef | null>(null);

  const detail = route.params as ProductsTypes;
  const productImages = detail?.images;

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isBuy, setIsBuy] = useState(false);
  const [isCart, setIsCart] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState<RatingTypes | undefined>();
  const [review, setReview] = useState<string>('');

  const getRating = async () => {
    try {
      const response = await getDataResponse(
        BASE_URL + API_REVIEW + '/' + detail?._id,
      );
      if (response?.data?.data) {
        setRating(response?.data?.data);
      }
    } catch (error) {
      console.log('error get rating', error);
    }
  };

  const getReview = async () => {
    try {
      const response = await getDataResponse(
        BASE_URL + API_REVIEW + `?productId=${detail?._id}`,
      );
      if (response?.data?.data) {
        setReview(response?.data?.data);
      }
    } catch (error) {
      console.log('error get rating', error);
    }
  };

  const onTransactionCart = () => {
    navigation?.replace('Cart');
  };

  const onBuy = () => {
    setIsBuy(true);
    setIsCart(false);
    if (isLogin) {
      refRBSheet?.current?.open();
    } else {
      setShowModal(true);
      setTitle('Sorry, you have not access account!');
      setMessage('Please login you account');
    }
  };

  const onCart = () => {
    setIsCart(true);
    setIsBuy(false);
    if (isLogin) {
      refRBSheet?.current?.open();
    } else {
      setShowModal(true);
      setTitle('Sorry, you dont have access account!');
      setMessage('Please login you account');
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    getRating();
    getReview();
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  };

  useEffect(() => {
    const getDataAsync = async () => {
      setLoading(false);
      getRating();
      getReview();
    };
    getDataAsync();
    setRefreshing(false);
  }, [detail]);

  useEffect(() => {
    getRating();
    getReview();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={false}
        backgroundColor={colors.basebg}
        barStyle="dark-content"
      />

      <BackHeader
        title="Product Details"
        goBack={() => navigation?.goBack()}
        icon={
          <Ionicons
            name="cart-outline"
            color={colors.black}
            size={moderateScale(22)}
            onPress={onTransactionCart}
          />
        }>
        <ProductDetailSections
          products={detail}
          productImages={productImages}
          width={width}
          refreshing={refreshing}
          onRefresh={onRefresh}
          loading={loading}
          onBuy={onBuy}
          onCart={onCart}
          refRBSheet={refRBSheet}
          isBuy={isBuy}
          isCart={isCart}
          isLogin={isLogin}
          navigation={navigation}
          rating={rating}
          review={review}
        />
      </BackHeader>
      <ModalConfirmation
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        title={title}
        message={message}
        style={{
          height: isCart ? moderateScale(420) : moderateScale(400),
        }}
        onSubmit={() => {
          setShowModal(false);
          navigation.navigate('Login');
        }}
        textBtn="Login"
      />
    </SafeAreaView>
  );
};

export default ProductDetail;
