import React from 'react';
import {Buttons, CardCommons, Gap, Text} from '../../components';
import {View} from 'react-native';
import styles from './styles';
import {moderateScale} from '../../utils/scale';
import {colors} from '../../utils/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import IconFeather from 'react-native-vector-icons/Feather';
import {AddressTypes} from '../../types';

interface AddressProps {
  onPress: () => void;
  data: AddressTypes;
  onTrash: () => void;
}

const AddressSections = ({onPress, data, onTrash}: AddressProps) => {
  return (
    <View>
      <Gap height={moderateScale(8)} width={0} />
      <CardCommons
        title={''}
        subTitle={''}
        titleStyle={false}
        subTitleStyle={false}
        onPress={() => {}}
        disabled={false}
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

            <View>
              <Text style={styles.title}>{data?.name || '-'}</Text>
              <Text style={styles.text}>(+62) {data?.phone || '-'}</Text>
              <Text style={styles.text}>
                {data?.addressDetail || '-'} | {data?.postalCode || '-'}
              </Text>
            </View>
          </View>

          <Buttons disabled={false} onPress={onTrash} style={{}}>
            <IconFeather
              name="trash-2"
              size={moderateScale(20)}
              color={colors.orange}
            />
          </Buttons>
          <Buttons disabled={false} onPress={onPress} style={{}}>
            <IconMaterial
              name="keyboard-arrow-right"
              size={moderateScale(28)}
              color={colors.orange}
            />
          </Buttons>
        </View>
      </CardCommons>
    </View>
  );
};

export default AddressSections;
