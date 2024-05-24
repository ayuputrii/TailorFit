import React from 'react';
import {StyleSheet, View} from 'react-native';
import Text from './Text';
import Gap from './Gap';
import {moderateScale, verticalScale} from '../../utils/scale';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import ButtonLogin from './ButtonLogin';
import IlustrationAccount from '../../assets/ilustration/il-access-account.svg';

interface ImageWithNotLoginProps {
  navigation: any;
}

const ImageWithNotLogin = ({navigation}: ImageWithNotLoginProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <IlustrationAccount
          width={'100%'}
          height={moderateScale(250)}
          style={styles.image}
        />
      </View>
      <Gap height={verticalScale(20)} width={0} />
      <Text style={styles.text}>Sorry, you have not access login.</Text>
      <Gap height={moderateScale(8)} width={0} />
      <ButtonLogin
        style={styles.btn}
        navigation={() => navigation?.navigate('Login')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: moderateScale(100),
  },
  content: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  image: {
    width: '100%',
  },
  text: {
    color: colors.orange,
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: moderateScale(16),
  },
  btn: {
    width: '50%',
    height: moderateScale(40),
    backgroundColor: colors.orange,
  },
});

export default ImageWithNotLogin;
