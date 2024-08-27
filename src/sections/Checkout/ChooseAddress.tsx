import React from 'react';
import {Buttons, CardCommons, Gap, Text} from '../../components';
import {View} from 'react-native';
import styles from './styles';
import {moderateScale} from '../../utils/scale';
import {colors} from '../../utils/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import {useRoute} from '@react-navigation/native';

interface ChooseAddressProps {
  onPress: () => void;
  data: any;
  disabled?: boolean;
}

const ChooseAddress = ({onPress, data, disabled}: ChooseAddressProps) => {
  const route = useRoute();
  const pathDetailTransaction = route?.name === 'DetailTransaction';

  return (
    <CardCommons
      title={''}
      subTitle={''}
      titleStyle={false}
      subTitleStyle={false}
      onPress={onPress}
      disabled={disabled}
      style={styles.card}>
      <View style={styles.flexRowBetween}>
        <View style={styles.content}>
          <Gap height={0} width={moderateScale(8)} />
          <Icon
            name="map-marker-alt"
            size={moderateScale(28)}
            color={colors.orange}
          />
          <Gap height={0} width={moderateScale(8)} />

          {Boolean(data) ? (
            <View>
              <Text style={styles.title}>{data?.name || '-'}</Text>
              <Text style={styles.text}>(+62) {data?.phone || '-'}</Text>
              <Text style={styles.text}>
                {data?.addressDetail || '-'} | {data?.postalCode || '-'}
              </Text>
            </View>
          ) : (
            <View style={styles.contentProduct}>
              <Text style={styles.txtAddressNoData}>Pilih Alamat</Text>
            </View>
          )}
        </View>

        {!pathDetailTransaction && (
          <Buttons disabled={false} onPress={onPress} style={{}}>
            <IconMaterial
              name="keyboard-arrow-right"
              size={moderateScale(28)}
              color={colors.orange}
            />
          </Buttons>
        )}
      </View>
    </CardCommons>
  );
};

export default ChooseAddress;
