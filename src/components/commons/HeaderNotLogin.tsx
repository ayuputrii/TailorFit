import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import Text from './Text';

interface HeaderNotLoginProps {
  marginTop: number;
  subColor: string;
  fontSizeSub: number;
  title: string;
  subTitle: string;
}

const HeaderNotLogin = ({
  marginTop,
  subColor,
  fontSizeSub,
  title,
  subTitle,
}: HeaderNotLoginProps) => {
  return (
    <View style={{marginTop}}>
      <Text style={styles.title}>{title}</Text>
      <Text style={[styles.subTitle, {color: subColor, fontSize: fontSizeSub}]}>
        {subTitle}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: fonts.PoppinsBold,
    fontSize: 30,
    color: colors.black,
    textAlign: 'center',
  },
  subTitle: {
    fontFamily: fonts.PoppinsLight,
    textAlign: 'center',
  },
});

export default HeaderNotLogin;
