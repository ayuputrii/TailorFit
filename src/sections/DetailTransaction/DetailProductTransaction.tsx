import React, {useState} from 'react';
import {CardCommons, Text} from '../../components';
import {TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {moderateScale} from '../../utils/scale';
import Accordion from 'react-native-collapsible/Accordion';
import ProductCheckout from '../Checkout/ProductCheckout';
import ContentProductCO from '../Checkout/ContentProductCO';
import {colors} from '../../utils/colors';
import {formatDate} from '../../utils/format-date';
import {ProductsTypes} from '../../types';

interface DetailProductTransactionProps {
  data: any;
}

const DetailProductTransaction = ({data}: DetailProductTransactionProps) => {
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

          return (
            <React.Fragment key={index}>
              <View style={[styles.flexRowBetween, {width: '100%'}]}>
                <Text style={styles.txtOrder}>Transaction ID : </Text>
                <Text style={[styles.txtRight, styles.mark]}>
                  {detail?.trxId ? detail?.trxId : '-'}
                </Text>
              </View>
              <View style={styles.hr} />
              <View style={[styles.flexRowBetween, {width: '100%'}]}>
                <Text style={styles.txtOrder}>Order Date : </Text>
                <Text style={styles.txtRight}>
                  {formatDate(detail?.createdAt)}
                </Text>
              </View>
              <View style={styles.hr} />
              <View style={[styles.flexRowBetween, {width: '100%'}]}>
                <Text style={styles.txtOrder}>Material By :</Text>
                <Text style={styles.txtRight}>
                  {item?.materialProvider ? item?.materialProvider : '-'}
                </Text>
              </View>
              <View style={styles.hr} />
              <View style={[styles.flexRowBetween, {width: '100%'}]}>
                <Text style={styles.txtOrder}>Total Working :</Text>
                <Text style={styles.txtRight}>
                  Pre Order {product?.duration ? product?.duration : 0} Days
                </Text>
              </View>
              <View style={styles.hr} />
              {detail?.status === 'SEWING_PROCESS' && (
                <>
                  <View style={[styles.flexRowBetween, {width: '100%'}]}>
                    <Text style={styles.txtOrder}>Working Status :</Text>
                    <Text style={styles.txtRight}>{detail?.workingStatus}</Text>
                  </View>
                  <View style={styles.hr} />
                </>
              )}
            </React.Fragment>
          );
        })}
      </CardCommons>
    </React.Fragment>
  );
};

export default DetailProductTransaction;
