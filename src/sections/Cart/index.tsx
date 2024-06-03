import React from 'react';
import {View} from 'react-native';
import {
  Buttons,
  CardCommons,
  Gap,
  ImageWithNotFound,
  Text,
} from '../../components';
import styles from './styles';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {moderateScale} from '../../utils/scale';
import {colors} from '../../utils/colors';
import NumericInput from 'react-native-numeric-input';

interface CartSectionsProps {
  onPress: () => void;
  check: boolean;
  setCheck: any;
  onValue: (v: any) => void;
  value: number;
}
const CartSections = ({
  onPress,
  check,
  setCheck,
  onValue,
  value,
}: CartSectionsProps) => {
  return (
    <CardCommons
      title={''}
      subTitle={''}
      titleStyle={false}
      subTitleStyle={false}
      onPress={onPress}
      style={styles.card}>
      <View style={styles.contentProduct}>
        <Buttons
          disabled={false}
          style={false}
          onPress={() => setCheck(!check)}
          children={
            <React.Fragment>
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
            </React.Fragment>
          }
        />

        <Gap height={0} width={moderateScale(8)} />

        <ImageWithNotFound
          styleNoData={styles.notFound}
          uri={false}
          style={{}}
        />

        <Gap height={0} width={moderateScale(4)} />

        <View style={styles.viewDesc}>
          <Text style={styles.title}>Kebaya</Text>
          <Text style={styles.text}>Size: XL</Text>
          <Text style={styles.textPrice}>Rp 50.000</Text>
        </View>

        <View style={styles.numericInputStyle}>
          <NumericInput
            value={value}
            onChange={v => onValue({v})}
            onLimitReached={(isMax, msg) => console.log(isMax, msg)}
            totalWidth={moderateScale(100)}
            totalHeight={moderateScale(30)}
            iconSize={moderateScale(12)}
            step={1}
            minValue={0}
            valueType="real"
            rounded
            textColor={colors.orange}
            borderColor={colors.grey}
            iconStyle={{color: colors.black}}
            rightButtonBackgroundColor={colors.white}
            leftButtonBackgroundColor={colors.white}
            upDownButtonsBackgroundColor={colors.white}
          />
        </View>
      </View>
    </CardCommons>
  );
};

export default CartSections;
