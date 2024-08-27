import React from 'react';
import Buttons from './Buttons';
import {StyleSheet} from 'react-native';
import {fonts} from '../../utils/fonts';
import {moderateScale} from '../../utils/scale';
import {colors} from '../../utils/colors';
import Text from './Text';

interface ButtonLoginProps {
  navigation: any;
  style: any;
}

const ButtonLogin = ({navigation, style}: ButtonLoginProps) => {
  return (
    <Buttons
      disabled={false}
      onPress={() => navigation.navigate('Login')}
      style={[styles.btnLogin, style]}>
      <Text style={styles.txt}>Login</Text>
    </Buttons>
  );
};

const styles = StyleSheet.create({
  btnLogin: {
    backgroundColor: colors.black,
    borderWidth: moderateScale(1),
    borderColor: colors.gray,
    width: moderateScale(80),
    height: moderateScale(30),
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: moderateScale(8),
  },
  txt: {
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: moderateScale(12),
    color: colors.white,
  },
});

export default ButtonLogin;
