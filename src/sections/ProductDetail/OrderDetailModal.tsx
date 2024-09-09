import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {
  Buttons,
  Gap,
  InputMultipleFile,
  ModalBottom,
  Text,
} from '../../components';
import {ScrollView, View} from 'react-native';
import styles from './styles';
import {colors} from '../../utils/colors';
import {RadioGroup} from 'react-native-radio-buttons-group';
import {moderateScale} from '../../utils/scale';
import CategorySections from '../Home/CategorySections';
import {ProductsTypes} from '../../types';
import NumericInput from 'react-native-numeric-input';
import {Asset} from 'react-native-image-picker';
import {getData} from '../../utils/async-storage';
import {API_SIZE, BASE_URL, getDataWithToken} from '../../api';
import {useIsBuyStore} from '../../store/useIsBuyStore';
import {useDesiredSizeStore} from '../../store/useDesiredSizeStore';
import {useSizeStore} from '../../store/useSizeStore';
import LoadingDots from '../../components/commons/LoadingDots';

export interface OrderDetailModalProps {
  materialProvider: string;
  onShowBuy: () => void;
  onShowCart: () => void;
  refRBSheet: any;
  quality: {id: number; name: string}[];
  type: {id: number; name: string}[];
  selectedType: number;
  selectedQuality: number;
  selectedSize: number;
  handleMenuPress: (val: number, segment: 'quality' | 'size' | 'type') => void;
  radioButtons: any;
  setMaterialProvider: Dispatch<SetStateAction<string>>;
  quantity: number;
  onQuantity: ({v}: {v: number}) => void;
  file: (Asset | string)[];
  setFile: Dispatch<SetStateAction<(Asset | string)[]>>;
  onCustomizeSize: () => void;
  detail: ProductsTypes;
  onOrder: () => void;
  enableContinue: boolean;
  enableCustom: boolean;
  trigger?: React.ReactNode;
  setLoadingDots?: Dispatch<SetStateAction<boolean>>;
  loadingDots?: boolean;
  onCloseModalBottom?: () => void;
}

const OrderDetailModal = ({
  materialProvider,
  onShowBuy,
  onShowCart,
  refRBSheet,
  quality,
  type,
  selectedQuality,
  selectedSize,
  selectedType,
  handleMenuPress,
  radioButtons,
  setMaterialProvider,
  quantity,
  onQuantity,
  file,
  setFile,
  onCustomizeSize,
  detail,
  onOrder,
  enableContinue,
  enableCustom,
  trigger,
  setLoadingDots,
  loadingDots,
  onCloseModalBottom,
}: OrderDetailModalProps) => {
  const desiredSizeStore = useDesiredSizeStore();
  const sizeStore = useSizeStore();

  const {isBuy} = useIsBuyStore();

  const getSize = async () => {
    try {
      const token = await getData('ACCESS_TOKEN');
      const idCategory = detail?.category;
      const response = await getDataWithToken(
        BASE_URL + API_SIZE + '/' + idCategory,
        token,
      );
      if (response?.data?.data) {
        sizeStore.setSize(response.data?.data);
        if (setLoadingDots) {
          setLoadingDots(false);
          refRBSheet.current?.open();
        }
      }
    } catch (err) {
      if (setLoadingDots) {
        setLoadingDots(false);
      }
    }
  };

  const onClickOrder = () => {
    onOrder();
  };

  const startCustomize = () => {
    desiredSizeStore.setSize({
      name: 'CUSTOM',
      _id: '',
      sizeDetail: sizeStore.size?.[0]?.sizeDetail,
    });
    onCustomizeSize();
  };

  useEffect(() => {
    if (detail?.category) {
      getSize();
    }
  }, [detail]);

  if (setLoadingDots && loadingDots) {
    return <LoadingDots />;
  }

  return (
    <ModalBottom
      height={720}
      refRBSheet={refRBSheet}
      onCloseModalBottom={onCloseModalBottom}
      button={
        trigger || (
          <View style={styles.flexRow}>
            <Buttons disabled={false} onPress={onShowBuy} style={styles.btn}>
              <Text style={styles.txtBtn}>Beli Sekarang</Text>
            </Buttons>
            <Buttons
              disabled={false}
              onPress={onShowCart}
              style={[
                styles.btn,
                {
                  backgroundColor: colors.darkChoco,
                },
              ]}>
              <Text style={styles.txtBtn}>Tambahkan ke Keranjang</Text>
            </Buttons>
          </View>
        )
      }>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.contentModal}>
          <View>
            <Text style={styles.titleModal}>Bahan</Text>
            <View style={styles.hr} />
            <View style={styles.flexRow}>
              <RadioGroup
                radioButtons={radioButtons}
                onPress={setMaterialProvider}
                selectedId={materialProvider}
                layout="row"
              />
            </View>
            <View style={styles.hr} />
          </View>

          {materialProvider !== '2' && (
            <React.Fragment>
              <Gap height={moderateScale(8)} width={2} />

              <View>
                <Text style={styles.titleModal}>Kualitas Bahan</Text>
                <CategorySections
                  category={quality}
                  activeMenuIndex={selectedQuality}
                  handleMenuPress={(val: number) =>
                    handleMenuPress(val, 'quality')
                  }
                  bgColor={'#FFA76C'}
                  bgColorInActive={'rgba(255, 167, 108, 0.56)'}
                  txtColor={colors.white}
                  txtColorInActive={colors.white}
                />
              </View>
            </React.Fragment>
          )}

          <Gap height={moderateScale(8)} width={2} />

          <View>
            <Text style={styles.titleModal}>Tipe Model</Text>
            <CategorySections
              category={type}
              activeMenuIndex={selectedType}
              handleMenuPress={(val: number) => handleMenuPress(val, 'type')}
              bgColor={'#FFA76C'}
              bgColorInActive={'rgba(255, 167, 108, 0.56)'}
              txtColor={colors.white}
              txtColorInActive={colors.white}
            />
          </View>

          <Gap height={moderateScale(8)} width={2} />

          <View>
            <Text style={styles.titleModal}>Ukuran</Text>
            <CategorySections
              activeMenuIndex={selectedSize}
              availableSize={sizeStore.size}
              handleMenuPress={(val: number) => handleMenuPress(val, 'size')}
              bgColor={'#FFA76C'}
              bgColorInActive={'rgba(255, 167, 108, 0.56)'}
              txtColor={colors.white}
              txtColorInActive={colors.white}
            />
          </View>

          <Gap height={moderateScale(8)} width={2} />

          <View>
            <Text style={styles.titleModal}>Masukkan Foto</Text>
            <Text
              style={[
                styles.titleModal,
                {
                  fontSize: moderateScale(12),
                  color: colors.darkgray,
                },
              ]}>
              (Foto Model / Ukuran)
            </Text>
            <InputMultipleFile file={file} setFile={setFile} />
          </View>

          <Gap height={moderateScale(16)} width={2} />

          <View style={styles.flexBetweenCenter}>
            <Text style={styles.titleModal}>Jumlah</Text>
            <NumericInput
              value={quantity}
              onChange={(v: number) => onQuantity({v})}
              onLimitReached={(isMax, msg) => console.log(isMax, msg)}
              totalWidth={moderateScale(70)}
              totalHeight={moderateScale(25)}
              iconSize={moderateScale(12)}
              step={1}
              minValue={1}
              valueType="real"
              rounded
              textColor={colors.orange}
              borderColor={colors.grey}
              rightButtonBackgroundColor={colors.white}
              leftButtonBackgroundColor={colors.white}
              upDownButtonsBackgroundColor={colors.white}
            />
          </View>
          <Gap height={moderateScale(22)} width={0} />
          <Buttons
            disabled={!enableCustom}
            onPress={startCustomize}
            style={[styles.btn, styles.btnTake]}>
            <Text style={styles.txtBtn}>Customize Size</Text>
          </Buttons>
          <Gap height={moderateScale(8)} width={0} />
          <Buttons
            disabled={!enableContinue}
            onPress={onClickOrder}
            style={[
              styles.btn,
              styles.btnTake,
              {
                backgroundColor: enableContinue
                  ? isBuy
                    ? colors.orange
                    : colors.darkChoco
                  : colors.grey,
              },
            ]}>
            <Text style={styles.txtBtn}>
              {trigger
                ? 'Update Order'
                : isBuy
                ? 'Beli Sekarang'
                : 'Tambahkan ke Keranjang'}
            </Text>
          </Buttons>
        </View>
      </ScrollView>
      <Gap height={moderateScale(16)} width={2} />
    </ModalBottom>
  );
};

export default OrderDetailModal;
