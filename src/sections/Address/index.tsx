import React from 'react';
import {Buttons, CardCommons, Gap, Text} from '../../components';
import {View} from 'react-native';
import styles from './styles';
import {moderateScale} from '../../utils/scale';
import {colors} from '../../utils/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';

interface AddressProps {
  onPress: () => void;
}

const AddressSections = ({onPress}: AddressProps) => {
  return (
    <CardCommons
      title={''}
      subTitle={''}
      titleStyle={false}
      subTitleStyle={false}
      onPress={onPress}
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
            <Text style={styles.text}>
              Ayu Armadani Putri Mahirun | (+62) 8158285006 | Jl. Americ RT
              04/RW 02. | CINERE, KOTA DEPOK, JAWA BARAT, ID 16514
            </Text>
          </View>
        </View>
        <Buttons onPress={onPress} style={{}}>
          <IconMaterial
            name="keyboard-arrow-right"
            size={moderateScale(28)}
            color={colors.orange}
          />
        </Buttons>
      </View>
    </CardCommons>
  );
};

export default AddressSections;
