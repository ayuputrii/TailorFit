import React from 'react';
import {BackHeader, Gap} from '../../components';
import {colors} from '../../utils/colors';
import {moderateScale} from '../../utils/scale';
import {ScrollView, View} from 'react-native';
import styles from './styles';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {FavoriteProps} from '../../navigation';

const Favorite = ({navigation}: FavoriteProps) => {
  return (
    <View style={styles.container}>
      <BackHeader
        title="Favorite"
        goBack={() => navigation?.goBack()}
        icon={
          <Icons
            name="cart-outline"
            size={moderateScale(24)}
            color={colors.black}
            onPress={() => navigation.navigate('Cart')}
          />
        }>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <Gap height={moderateScale(8)} width={0} />

          <Gap height={moderateScale(8)} width={0} />
        </ScrollView>
      </BackHeader>
    </View>
  );
};

export default Favorite;
