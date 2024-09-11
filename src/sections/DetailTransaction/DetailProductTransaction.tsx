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
import {Cart, OrderParam, ProductsTypes} from '../../types';
import {fonts} from '../../utils/fonts';
// @ts-ignore
import CountDown from 'react-native-countdown-fixed';
import {DataStatus} from '../../constants';
import {formatIdr} from '../../utils/format-number';
import {DetailTransactionProps} from '../../navigation';

interface DetailProductTransactionProps {
  data: DetailTransactionProps['route']['params'];
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
      {Boolean(pathOrder && detailProduct?.[0]?.status === 'UNPAID') && (
        <React.Fragment>
          <CardCommons
            disabled={true}
            onPress={() => {}}
            title={''}
            subTitle={''}
            titleStyle={undefined}
            subTitleStyle={undefined}
            style={styles.card}>
            {detailProduct?.map((item: Cart, index: number) => {
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
        {detailProduct?.map((item: Cart, index: number) => {
          const product = item?.productId;
          const status = DataStatus?.find(
            items => items?.slug === detailProduct?.[0]?.status,
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
                  {(detail as OrderParam)?.orderId
                    ? '#' + (detail as OrderParam)?.orderId
                    : '-'}
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
                  Pre Order{' '}
                  {(product as ProductsTypes)?.duration
                    ? (product as ProductsTypes)?.duration
                    : 0}{' '}
                  Days
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
              {item?.status === 'SEWING_PROCESS' && (
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
        {detailProduct?.map((item: Cart, index: number) => {
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
                        : colors.yellow,
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

      <Gap height={moderateScale(16)} width={0} />

      <CardCommons
        disabled={true}
        onPress={() => {}}
        title={''}
        subTitle={''}
        titleStyle={undefined}
        subTitleStyle={undefined}
        style={[styles.card, {marginTop: moderateScale(6)}]}>
        {detailProduct?.map((item: Cart, index: number) => {
          const price = (item?.productId as ProductsTypes)?.price;
          const total = (price || 0) + 25000;

          const status = DataStatus?.find(
            items => items?.slug === detailProduct?.[0]?.status,
          );

          console.log('status', status);

          return (
            <React.Fragment key={index}>
              <View style={[styles.flexRowBetween, {width: '100%'}]}>
                <Text style={styles.txtOrder}>Biaya Lainnya :</Text>
                <Text
                  style={[
                    styles.txtRight,
                    {
                      fontFamily: fonts.PoppinsBold,
                      color: colors.black,
                      fontSize: moderateScale(12),
                    },
                  ]}>
                  {formatIdr(25000)}
                </Text>
              </View>
              <View style={[styles.flexRowBetween, {width: '100%'}]}>
                <Text style={styles.txtOrder}>Total :</Text>
                <Text
                  style={[
                    styles.txtRight,
                    {
                      fontFamily: fonts.PoppinsBold,
                      color: colors.red,
                      fontSize: moderateScale(12),
                    },
                  ]}>
                  {formatIdr(total)}
                </Text>
              </View>
              {!detail?.isFullPayment && (
                <React.Fragment>
                  <View style={[styles.flexRowBetween, {width: '100%'}]}>
                    <Text style={styles.txtOrder}>Jumlah di Bayar :</Text>
                    <Text
                      style={[
                        styles.txtRight,
                        {
                          fontFamily: fonts.PoppinsBold,
                          color: colors.black,
                          fontSize: moderateScale(12),
                        },
                      ]}>
                      {status?.slug === 'UNPAID' ? '0' : formatIdr(total / 2)}
                    </Text>
                  </View>
                  {status?.slug !== 'COMPLETED' ? (
                    <View style={[styles.flexRowBetween, {width: '100%'}]}>
                      <Text style={styles.txtOrder}>Sisa Bayar :</Text>
                      <Text
                        style={[
                          styles.txtRight,
                          {
                            fontFamily: fonts.PoppinsBold,
                            color: colors.orange,
                            fontSize: moderateScale(12),
                          },
                        ]}>
                        {formatIdr(
                          status?.slug === 'UNPAID' ? total : total / 2 || 0,
                        )}
                      </Text>
                    </View>
                  ) : (
                    <View style={[styles.flexRowBetween, {width: '100%'}]}>
                      <Text style={styles.txtOrder}>Pembayaran :</Text>
                      <Text
                        style={[
                          styles.txtRight,
                          {
                            fontFamily: fonts.PoppinsBold,
                            color: colors.green,
                            fontSize: moderateScale(12),
                          },
                        ]}>
                        LUNAS
                      </Text>
                    </View>
                  )}
                </React.Fragment>
              )}
            </React.Fragment>
          );
        })}
      </CardCommons>
    </React.Fragment>
  );
};

export default DetailProductTransaction;
