import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {Dimensions, SafeAreaView, StatusBar, View} from 'react-native';
import {colors} from '../../utils/colors';
import styles from './styles';
import {useRoute} from '@react-navigation/native';
import {ProductsTypes, RatingTypes} from '../../types';
import {BackHeader, ModalConfirmation, Text} from '../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {moderateScale} from '../../utils/scale';
import {ProductDetailProps} from '../../navigation';
import {ProductDetailSections} from '../../sections';
import {AuthContext} from '../../context/AuthContext';
import {useFocusEffect} from '@react-navigation/native';
import {
  API_REVIEW,
  BASE_URL,
  getDataResponse,
  postDataWithToken,
  API_CART,
} from '../../api';
import {DataQuality, DataType} from '../../constants';
import {Asset} from 'react-native-image-picker';
import {getData} from '../../utils/async-storage';
import {useCartStore} from '../../store/useCartStore';
import {useIsBuyStore} from '../../store/useIsBuyStore';
import {useSizeStore} from '../../store/useSizeStore';
import {useDesiredSizeStore} from '../../store/useDesiredSizeStore';

type RBSheetRef = {
  open: () => void;
  close: () => void;
};

const ProductDetail = ({navigation}: ProductDetailProps) => {
  const ctx = useContext(AuthContext);
  const isLogin = ctx?.isLogin;

  const cartStore = useCartStore();
  const {isBuy, setBuy, setNotBuy} = useIsBuyStore();
  const sizeStore = useSizeStore();
  const desiredSizeStore = useDesiredSizeStore();

  const route = useRoute<ProductDetailProps['route']>();

  const width = Dimensions.get('window').width;

  const refRBSheet = useRef<RBSheetRef | null>(null);

  const detail = route.params as ProductsTypes;
  const productImages = detail?.images;

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isCart, setIsCart] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loadingDots, setLoadingDots] = useState(false);

  const [title, setTitle] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [rating, setRating] = useState<RatingTypes | undefined>(
    0 as RatingTypes,
  );
  const [review, setReview] = useState<string>('');
  const [file, setFile] = useState<(Asset | string)[]>([]);

  const [quality, setQuality] = useState<number>(-1);
  const [type, setType] = useState<number>(-1);
  const [size, setSize] = useState<number>(-1);
  const [quantity, setQuantity] = useState(1);
  const [materialProvider, setMaterialProvider] = useState('1');

  const qualityMap: Record<string, string> = {
    '0': 'PREMIUM',
    '1': 'MEDIUM',
    '2': 'STANDARD',
  };

  const typeMap: Record<string, string> = {
    '0': 'REGULAR',
    '1': 'BODYFIT',
    '2': 'SLIMFIT',
  };

  const materialProviderMap: Record<string, string> = {
    '1': 'TAILOR',
    '2': 'CUSTOMER',
  };

  const onQuantity = ({v}: {v: number}) => {
    if (v !== 0) {
      setQuantity(v);
    }
  };

  const handleMenuPress = (index: number, segment: string) => {
    if (segment === 'quality') {
      setQuality(index);
    }

    if (segment === 'type') {
      setType(index);
    }

    if (segment === 'size') {
      setSize(index);
      desiredSizeStore.deleteSize();
    }
  };

  const getRating = async () => {
    try {
      const response = await getDataResponse(
        BASE_URL + API_REVIEW + '/' + detail?._id,
      );
      if (response?.data?.data) {
        setRating(response?.data?.data);
      }
    } catch (error) {
      setRating({});
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
      setReview('');
    }
  };

  const onTransactionCart = () => {
    navigation?.navigate('Cart');
  };

  useFocusEffect(
    useCallback(() => {
      if (route.params?.openBottomSheet) {
        refRBSheet?.current?.open();
      }
    }, [route.params?.openBottomSheet]),
  );

  const onShowBuy = () => {
    setBuy();
    setIsCart(false);
    if (isLogin) {
      refRBSheet?.current?.open();
    } else {
      setShowModal(true);
      setTitle('Sorry, you dont have access account!');
      setMessage('Please login you account');
    }
  };

  const onShowCart = () => {
    setIsCart(true);
    setNotBuy();
    if (isLogin) {
      refRBSheet?.current?.open();
    } else {
      setShowModal(true);
      setTitle('Sorry, you dont have access account!');
      setMessage('Please login you account');
    }
  };

  const onOrder = async () => {
    setLoadingDots(true);

    try {
      const token = await getData('ACCESS_TOKEN');
      const formData = new FormData();
      formData.append('productId', detail._id);
      formData.append('quantity', quantity);
      if (desiredSizeStore?.size) {
        formData.append('size', 'CUSTOM');
        formData.append(
          'sizeDetail',
          JSON.stringify(desiredSizeStore.size.sizeDetail),
        );
      } else {
        formData.append('size', sizeStore.size[size]?.name);
        formData.append(
          'sizeDetail',
          JSON.stringify(sizeStore.size[size]?.sizeDetail),
        );
      }
      formData.append('quality', qualityMap[quality]);
      formData.append('type', typeMap[type]);
      formData.append(
        'materialProvider',
        materialProviderMap[materialProvider],
      );
      Array.from(file).forEach(fl => {
        formData.append('images', {
          uri: (fl as Asset)?.uri,
          name: 'photo.jpg',
          type: 'image/jpeg',
        });
      });
      formData.append('dir', 'cart');
      const response = await postDataWithToken(
        `${BASE_URL}${API_CART}`,
        formData,
        token,
        'multipart/form-data',
      );
      cartStore.setCart(response?.data?.data);

      if (isBuy) {
        setLoadingDots(false);
        cartStore.addSelectedCart(response?.data.data[0]._id);
        navigation.navigate('Checkout');
        navigation.setParams({
          openBottomSheet: undefined,
        });
      } else {
        setLoadingDots(false);
        refRBSheet.current?.close();
      }
      setQuality(-1);
      setType(-1);
      setSize(-1);
      setFile([]);
      setQuantity(1);
    } catch (err) {
      setLoadingDots(false);
    }
  };

  const onCustomizeSize = () => {
    refRBSheet.current?.close();
    navigation.setParams({openBottomSheet: undefined});
    navigation.navigate('CustomSize');
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

  const enableContinue = useMemo(() => {
    const isByTailor = materialProvider === '1';
    const isTypeSelected = type !== -1;
    const isSizeSelected = size !== -1;
    const isQualitySelected = quality !== -1;

    if (isByTailor) {
      return isTypeSelected && isSizeSelected && isQualitySelected;
    }

    return isTypeSelected && isSizeSelected;
  }, [materialProvider, type, size, quality]);

  const enableCustom = useMemo(() => {
    const isSizeSelected = size !== -1;
    return isSizeSelected;
  }, [size]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={false}
        backgroundColor={colors.basebg}
        barStyle="dark-content"
      />

      <BackHeader
        title="Detail Produk"
        goBack={() => navigation?.goBack()}
        icon={
          <View style={styles.viewCart}>
            {!!cartStore?.cart?.length && (
              <View style={styles.lengthCart}>
                <Text style={styles.txtCart}>{cartStore?.cart?.length}</Text>
              </View>
            )}
            <Ionicons
              name="cart-outline"
              color={colors.black}
              size={moderateScale(25)}
              onPress={onTransactionCart}
            />
          </View>
        }>
        <ProductDetailSections
          products={detail}
          productImages={productImages}
          width={width}
          refreshing={refreshing}
          onRefresh={onRefresh}
          loading={loading}
          onOrder={onOrder}
          onShowBuy={onShowBuy}
          onShowCart={onShowCart}
          refRBSheet={refRBSheet}
          isLogin={isLogin}
          navigation={navigation}
          rating={rating}
          review={review}
          quality={DataQuality}
          type={DataType}
          selectedQuality={quality}
          selectedType={type}
          selectedSize={size}
          handleMenuPress={handleMenuPress}
          file={file}
          setFile={setFile}
          onCustomizeSize={onCustomizeSize}
          detail={detail}
          quantity={quantity}
          onQuantity={onQuantity}
          materialProvider={materialProvider}
          setMaterialProvider={setMaterialProvider}
          loadingDots={loadingDots}
          enableContinue={enableContinue}
          enableCustom={enableCustom}
        />
      </BackHeader>
      <ModalConfirmation
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        title={title}
        message={message}
        style={{
          height: isBuy
            ? moderateScale(420)
            : isCart
            ? moderateScale(420)
            : moderateScale(400),
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
