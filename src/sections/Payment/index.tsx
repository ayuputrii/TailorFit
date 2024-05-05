import React from 'react';
import {CardCommons, Gap, Text} from '../../components';
import {ScrollView, View} from 'react-native';
import styles from './styles';
import {moderateScale} from '../../utils/scale';
import {colors} from '../../utils/colors';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';

const PaymentSections = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}>
      <CardCommons
        title={''}
        subTitle={''}
        titleStyle={false}
        subTitleStyle={false}
        onPress={false}
        style={styles.card}>
        <View style={styles.flexRowBetween}>
          <Text style={styles.text}>Total Payment</Text>
          <Text style={styles.title}>Rp160.000</Text>
        </View>
        <View style={styles.hr} />
        <View style={styles.flexRowBetween}>
          <Text style={styles.text}>Expired Time</Text>
          <View>
            <Text style={styles.title}>23 Jam 57 menit 23 detik</Text>
            <Text style={styles.subText}>Expired 16 Juli 2023, 10:20</Text>
          </View>
        </View>
      </CardCommons>

      <Gap height={moderateScale(12)} width={0} />

      <CardCommons
        title={''}
        subTitle={''}
        titleStyle={false}
        subTitleStyle={false}
        onPress={false}
        style={styles.card}>
        <View style={styles.flexRow}>
          <IconMaterial
            name="payment"
            size={moderateScale(18)}
            color={colors.orange}
          />

          <Gap width={moderateScale(4)} height={0} />

          <Text style={styles.text}>Bank BCA</Text>
        </View>
        <View style={styles.hr} />
        <Text style={styles.text}>No Rekening</Text>
        <Text style={styles.title}>126 0815 8285 006</Text>
      </CardCommons>
    </ScrollView>
  );
};

export default PaymentSections;
