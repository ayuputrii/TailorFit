import React from 'react';
import {CardCommons, Gap, ImageWithNotFound, Text} from '../../components';
import {View} from 'react-native';
import {moderateScale} from '../../utils/scale';
import styles from './styles';

const ProductCheckout = () => {
  return (
    <CardCommons
      title={''}
      subTitle={''}
      titleStyle={false}
      subTitleStyle={false}
      onPress={false}
      style={styles.card}>
      <View style={styles.flexRowBetween}>
        <View style={styles.contentProduct}>
          <ImageWithNotFound
            uri={false}
            style={{}}
            styleNoData={styles.notFound}
          />

          <Gap height={0} width={moderateScale(8)} />

          <View>
            <Text style={styles.titleProduct}>Kebaya Kelalawar</Text>
            <Text style={styles.text}>Size: XL</Text>
            <Text style={styles.textPrice}>Rp 50.000</Text>
          </View>
        </View>
        <Text style={styles.text}>x1</Text>
      </View>
    </CardCommons>
  );
};

export default ProductCheckout;
