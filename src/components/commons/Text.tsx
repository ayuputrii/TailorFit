import React, {ReactNode} from 'react';
import {StyleSheet, Text as Texting, TextStyle} from 'react-native';
import {fonts} from '../../utils/fonts';

interface TextProps {
  children: ReactNode;
  style: TextStyle | any;
}

const Text = ({children, style}: TextProps) => {
  return (
    <Texting style={[style ? style : styles.fontFamily]}>{children}</Texting>
  );
};

const styles = StyleSheet.create({
  fontFamily: {
    fontFamily: fonts.PoppinsRegular,
  },
});

export default Text;
