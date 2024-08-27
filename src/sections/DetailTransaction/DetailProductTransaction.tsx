import React, {useState} from 'react';
import {CardCommons, Gap, Text} from '../../components';
import {TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {moderateScale} from '../../utils/scale';
import Accordion from 'react-native-collapsible/Accordion';
import ProductCheckout from '../Checkout/ProductCheckout';
import ContentProductCO from '../Checkout/ContentProductCO';
import {colors} from '../../utils/colors';
import {formatDate} from '../../utils/format-date';
import {ProductsTypes} from '../../types';
import {fonts} from '../../utils/fonts';
import CountDown from 'react-native-countdown-component';
import {DataStatus} from '../../constants';

interface DetailProductTransactionProps {
  data: any;
  timeDiff: number;
  pathOrder: boolean;
}

const DetailProductTransaction = ({
  data,
  timeDiff,
  pathOrder,
}: DetailProductTransactionProps) => {
  const detail = data?.item;
  const detailProduct = data?.item?.products;

  const [activeSections, setActiveSections] = useState([]);

  const setSections = (sections: []) => {
    setActiveSections(sections);
  };

  const renderHeader = (item: any, _: any) => {
    return <ProductCheckout key={item?._id} {...item} />;
  };

  const renderContent = (item: any, _: any) => {
    return <ContentProductCO key={item?._id} {...item} />;
  };

  return (
    <React.Fragment>
      {Boolean(pathOrder && detail?.status === 'UNPAID') && (
        <React.Fragment>
          <CardCommons
            disabled={true}
            onPress={() => {}}
            title={''}
            subTitle={''}
            titleStyle={undefined}
            subTitleStyle={undefined}
            style={styles.card}>
            {detailProduct?.map((item: ProductsTypes, index: number) => {
              return (
                <View
                  style={[styles.flexRowBetween, {width: '100%'}]}
                  key={index}>
                  <Text style={styles.txtOrder}>Bayar sebelum : </Text>
                  {Boolean(timeDiff > 0) ? (
                    <CountDown
                      until={timeDiff}
                      size={moderateScale(12)}
                      digitStyle={{backgroundColor: '#FFF'}}
                      digitTxtStyle={{
                        color: colors.red,
                        marginTop: moderateScale(14),
                      }}
                      timeToShow={['D', 'H', 'M', 'S']}
                      timeLabels={{d: 'Hari', h: 'Jam', m: 'Menit', s: 'Detik'}}
                      showSeparator={true}
                      style={{
                        marginBottom: moderateScale(8),
                        marginTop: moderateScale(-2),
                      }}
                    />
                  ) : (
                    <Text
                      style={[
                        styles.txtRight,
                        {
                          color: colors.orange,
                          fontFamily: fonts.PoppinsBold,
                          textTransform: 'uppercase',
                          fontSize: moderateScale(10),
                        },
                      ]}>
                      Pembayaran Kedaluwarsa
                    </Text>
                  )}
                </View>
              );
            })}
          </CardCommons>
          <Gap height={moderateScale(16)} width={0} />
        </React.Fragment>
      )}

      <Accordion
        activeSections={activeSections}
        sections={detailProduct}
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

      <Gap height={moderateScale(8)} width={0} />

      <CardCommons
        disabled={true}
        onPress={() => {}}
        title={''}
        subTitle={''}
        titleStyle={undefined}
        subTitleStyle={undefined}
        style={[styles.card, {marginTop: moderateScale(6)}]}>
        {detailProduct?.map((item: ProductsTypes, index: number) => {
          const product = item?.productId;

          const status = DataStatus?.find(
            items => items?.slug === detail?.status,
          );

          return (
            <React.Fragment key={index}>
              <View style={[styles.flexRowBetween, {width: '100%'}]}>
                <Text style={styles.txtOrder}>ID Pesanan : </Text>
                <Text
                  style={[
                    styles.txtRight,
                    {
                      fontFamily: fonts.PoppinsBold,
                      textTransform: 'uppercase',
                      color: colors.darkblue,
                      fontSize: moderateScale(12),
                    },
                  ]}>
                  {detail?.orderId ? '#' + detail?.orderId : '-'}
                </Text>
              </View>
              <View style={styles.hr} />
              <View style={[styles.flexRowBetween, {width: '100%'}]}>
                <Text style={styles.txtOrder}>Tanggal Pesanan : </Text>
                <Text style={styles.txtRight}>
                  {formatDate(detail?.createdAt)}
                </Text>
              </View>
              <View style={styles.hr} />
              <View style={[styles.flexRowBetween, {width: '100%'}]}>
                <Text style={styles.txtOrder}>Bahan :</Text>
                <Text style={styles.txtRight}>
                  {item?.materialProvider ? item?.materialProvider : '-'}
                </Text>
              </View>
              <View style={styles.hr} />
              <View style={[styles.flexRowBetween, {width: '100%'}]}>
                <Text style={styles.txtOrder}>Total Waktu Pengerjaan :</Text>
                <Text style={styles.txtRight}>
                  Pre Order {product?.duration ? product?.duration : 0} Days
                </Text>
              </View>

              <View style={styles.hr} />
              <View style={[styles.flexRowBetween, {width: '100%'}]}>
                <Text style={styles.txtOrder}>Status Pesanan :</Text>
                <Text
                  style={[
                    styles.txtRight,
                    {
                      fontFamily: fonts.PoppinsBold,
                      textTransform: 'uppercase',
                      color: status?.color,
                      fontSize: moderateScale(12),
                    },
                  ]}>
                  {status?.name ? status?.name : '-'}
                </Text>
              </View>

              <View style={styles.hr} />
              {detail?.status === 'SEWING_PROCESS' && (
                <>
                  <View style={[styles.flexRowBetween, {width: '100%'}]}>
                    <Text style={styles.txtOrder}>Status Pengerjaan :</Text>
                    <Text style={styles.txtRight}>{detail?.workingStatus}</Text>
                  </View>
                  <View style={styles.hr} />
                </>
              )}
            </React.Fragment>
          );
        })}
      </CardCommons>

      <Gap height={moderateScale(16)} width={0} />

      <CardCommons
        disabled={true}
        onPress={() => {}}
        title={''}
        subTitle={''}
        titleStyle={undefined}
        subTitleStyle={undefined}
        style={[styles.card, {marginTop: moderateScale(6)}]}>
        {detailProduct?.map((item: ProductsTypes, index: number) => {
          return (
            <React.Fragment key={index}>
              <View style={[styles.flexRowBetween, {width: '100%'}]}>
                <Text style={styles.txtOrder}>Metode Pembayaran :</Text>
                <Text
                  style={[
                    styles.txtRight,
                    {
                      fontFamily: fonts.PoppinsBold,
                      color: colors.choco,
                      fontSize: moderateScale(12),
                    },
                  ]}>
                  {detail?.paymentType ? detail?.paymentType : '-'}
                </Text>
              </View>
              <View style={[styles.flexRowBetween, {width: '100%'}]}>
                <Text style={styles.txtOrder}>DP/Full Payment :</Text>
                <Text
                  style={[
                    styles.txtRight,
                    {
                      fontFamily: fonts.PoppinsBold,
                      color: detail?.isFullPayment
                        ? colors.green
                        : colors.orange,
                      fontSize: moderateScale(12),
                    },
                  ]}>
                  {detail?.isFullPayment ? 'Full Payment' : 'Down Payment'}
                </Text>
              </View>
            </React.Fragment>
          );
        })}
      </CardCommons>
    </React.Fragment>
  );
};

export default DetailProductTransaction;
