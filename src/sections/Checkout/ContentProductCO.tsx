import React from 'react';
import {View} from 'react-native';
import {moderateScale} from '../../utils/scale';
import styles from './styles';
import {Gap, Text} from '../../components';
import {Cart} from '../../types';

const ContentProductCO = (cart: Cart) => {
  const data = cart?.sizeDetail;

  return (
    <View style={styles.contentAccordion}>
      <View style={styles.hr} />
      <Text style={styles.titleDelivery}>
        Detail Ukuran -{' '}
        {cart?.materialProvider === 'TAILOR'
          ? cart?.quality + ' - ' + cart?.type + ' - ' + cart?.size
          : cart?.type + ' - ' + cart?.size}
      </Text>
      <View style={styles.hr} />

      <Gap height={moderateScale(8)} width={0} />

      <View style={styles.flexRowBetween}>
        <View style={[styles.flexColumn]}>
          {Object.keys(data)
            .slice(0, 5)
            .map((key, index) => {
              return (
                <React.Fragment key={index}>
                  <View style={styles.cardSize}>
                    <Text style={styles.size}>
                      {data[key as keyof Cart['sizeDetail']].label}
                    </Text>
                    <Text style={styles.valueSize}>
                      {data[key as keyof Cart['sizeDetail']].value}
                    </Text>
                  </View>
                  <Gap height={moderateScale(10)} width={0} />
                </React.Fragment>
              );
            })}
        </View>

        <View style={[styles.flexColumn]}>
          {Object.keys(data)
            .slice(0, 5)
            .map((key, index) => {
              return (
                <React.Fragment key={index}>
                  <View
                    style={[styles.cardSize, {marginRight: moderateScale(8)}]}>
                    <Text style={styles.size}>
                      {data[key as keyof Cart['sizeDetail']].label}
                    </Text>
                    <Text style={styles.valueSize}>
                      {data[key as keyof Cart['sizeDetail']].value}
                    </Text>
                  </View>
                  <Gap height={moderateScale(10)} width={0} />
                </React.Fragment>
              );
            })}
        </View>
      </View>
    </View>
  );
};

export default ContentProductCO;
