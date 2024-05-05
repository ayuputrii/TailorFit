import React from 'react';
import {View} from 'react-native';
import {Buttons, CardCommons, Gap, ImageNotFound, Text} from '../../components';
import styles from './styles';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {moderateScale} from '../../utils/scale';
import {colors} from '../../utils/colors';

interface CartSectionsProps {
  onPress: () => void;
  check: boolean;
  setCheck: any;
}
const CartSections = ({onPress, check, setCheck}: CartSectionsProps) => {
  return (
    <CardCommons
      title={''}
      subTitle={''}
      titleStyle={false}
      subTitleStyle={false}
      onPress={onPress}
      style={styles.card}>
      <View style={styles.flexRowBetween}>
        <View style={styles.contentProduct}>
          <Buttons
            style={false}
            onPress={() => setCheck(!check)}
            children={
              <View style={styles.flexRowBetween}>
                {check ? (
                  <Icons
                    name="checkbox-outline"
                    size={moderateScale(24)}
                    color={colors.orange}
                  />
                ) : (
                  <Icons
                    name="checkbox-blank-outline"
                    size={moderateScale(24)}
                    color={colors.orange}
                  />
                )}
              </View>
            }
          />

          <Gap height={0} width={moderateScale(8)} />

          <ImageNotFound uri={false} style={{}} />

          <Gap height={0} width={moderateScale(8)} />

          <View style={styles.viewDesc}>
            <Text style={styles.title}>Kebaya</Text>
            <Text style={styles.text}>Size: XL</Text>
            <Text style={styles.textPrice}>Rp 50.000</Text>
          </View>
        </View>
      </View>
    </CardCommons>
  );
};

export default CartSections;
