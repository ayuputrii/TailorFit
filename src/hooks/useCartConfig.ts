import {ToastAndroid} from 'react-native';
import {useCartStore} from '../store/useCartStore';
import {useMemo, useState, useRef, useEffect} from 'react';
import {BASE_URL, API_CART, putFormData} from '../api';
import {getData} from '../utils/async-storage';
import {Asset} from 'react-native-image-picker';
import {DataQuality, DataType, DataSize} from '../constants';
import {useNavigation} from '@react-navigation/native';

import {useSizeStore} from '../store/useSizeStore';
import {useDesiredSizeStore} from '../store/useDesiredSizeStore';
import {useDeletedFile} from '../store/useDeletedFile';
import {ProductDetailProps} from '../navigation';
import {ProductsTypes} from '../types';

const radioButtons = [
  {
    id: '1',
    label: 'Tailor',
    value: 'tailor',
  },
  {
    id: '2',
    label: 'Me',
    value: 'me',
  },
];

type RBSheetRef = {
  open: () => void;
  close: () => void;
};

const qualityMap: Record<string, string> = {
  PREMIUM: '0',
  MEDIUM: '1',
  STANDARD: '2',
};

const typeMap: Record<string, string> = {
  REGULAR: '0',
  BODYFIT: '1',
  SLIMFIT: '2',
};

const materialProviderMap: Record<string, string> = {
  TAILOR: '1',
  CUSTOMER: '2',
};

export default function useProductConfig({cartId}: {cartId: string}) {
  const cartStore = useCartStore();
  const sizeStore = useSizeStore();
  const desiredSizeStore = useDesiredSizeStore();
  const deletedFile = useDeletedFile();

  const navigation = useNavigation<ProductDetailProps['navigation']>();
  const targetCart = useMemo(() => {
    return cartStore.cart.find(item => item._id === cartId);
  }, [cartId]);

  const sizeMap: Record<string, string> = useMemo(() => {
    return sizeStore.size.reduce((acc, cur, index) => {
      return {
        ...acc,
        [cur.name]: index,
      };
    }, {});
  }, [sizeStore.size]);

  const refRBSheet = useRef<RBSheetRef | null>(null);

  const [file, setFile] = useState<(Asset | string)[]>([]);
  const [quality, setQuality] = useState<number>(
    () => +qualityMap[targetCart?.quality || '0'],
  );
  const [type, setType] = useState<number>(
    () => +typeMap[targetCart?.type || '0'],
  );
  const [size, setSize] = useState<number>(
    () => +sizeMap[targetCart?.size || '0'],
  );
  const [quantity, setQuantity] = useState(() => targetCart?.quantity || 1);
  const [materialProvider, setMaterialProvider] = useState(
    () => materialProviderMap[targetCart?.materialProvider || '1'],
  );
  useEffect(() => {
    setSize(+sizeMap[targetCart?.size || '0']);
    setQuality(+qualityMap[targetCart?.quality || '0']);
    setType(+typeMap[targetCart?.type || '0']);
    setMaterialProvider(
      materialProviderMap[targetCart?.materialProvider || '1'],
    );
    setFile(targetCart?.references as string[]);
  }, [sizeStore.size]);

  const onOpen = () => {
    refRBSheet.current?.open();
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

  const onCustomizeSize = () => {
    refRBSheet.current?.close();
    navigation.setParams({openBottomSheet: undefined});
    navigation.navigate('CustomSize');
  };

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

  const onOrder = async () => {
    try {
      const token = await getData('ACCESS_TOKEN');
      const formData = new FormData();

      formData.append(
        'materialProvider',
        Object.fromEntries(
          Object.entries(materialProviderMap).map(([prop, val]) => [val, prop]),
        )[materialProvider] || targetCart?.materialProvider,
      );
      formData.append('quantity', quantity || targetCart?.quantity);
      formData.append(
        'size',
        Object.fromEntries(
          Object.entries(sizeMap).map(([prop, val]) => [val, prop]),
        )[size] || targetCart?.size,
      );
      formData.append(
        'sizeDetail',
        JSON.stringify(desiredSizeStore.size || targetCart?.sizeDetail),
      );
      formData.append(
        'quality',
        Object.fromEntries(
          Object.entries(qualityMap).map(([prop, val]) => [val, prop]),
        )[quality] || targetCart?.quality,
      );
      formData.append(
        'type',
        Object.fromEntries(
          Object.entries(typeMap).map(([prop, val]) => [val, prop]),
        )[type] || targetCart?.type,
      );
      Array.from(file).forEach(fl => {
        if (typeof fl !== 'string') {
          formData.append('images', {
            uri: fl?.uri,
            name: 'photo.jpg',
            type: 'image/jpeg',
          });
        }
      });
      formData.append('dir', 'cart');
      deletedFile.files.forEach(item => {
        formData.append('deletedFile', item);
      });
      const response = await putFormData(
        `${BASE_URL}${API_CART}/${targetCart?._id}`,
        formData,
        token,
      );
      cartStore.updateCart(targetCart!._id, response.data.data);
      ToastAndroid.showWithGravity(
        'Product updated',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      deletedFile.clearFile();
      desiredSizeStore.deleteSize();
      refRBSheet.current?.close();
    } catch (err) {
      ToastAndroid.showWithGravity(
        'Failed update product',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
    }
  };

  return {
    materialProvider,
    onOrder,
    onShowBuy: onOpen,
    onShowCart: onOpen,
    refRBSheet,
    selectedQuality: +quality,
    selectedType: +type,
    selectedSize: +size,
    quality: DataQuality,
    type: DataType,
    size: DataSize,
    handleMenuPress,
    radioButtons,
    setMaterialProvider,
    quantity: targetCart?.quantity || 1,
    onQuantity,
    file,
    setFile,
    onCustomizeSize,
    detail: targetCart?.productId as ProductsTypes,
    enableContinue,
    enableCustom,
  };
}
