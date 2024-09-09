import React, {ReactNode, useEffect, useState} from 'react';
import {ImageBackground, Keyboard, StyleSheet, View} from 'react-native';
import {moderateScale, verticalScale} from '../../utils/scale';
import {colors} from '../../utils/colors';

interface BackgroundWithImageProps {
  children: ReactNode;
  backgroundChildren: ReactNode;
  src: string;
}

const BackgroundWithImage = ({
  children,
  backgroundChildren,
  src,
}: BackgroundWithImageProps) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      {children}
      {!isKeyboardVisible && (
        <View style={styles.viewRectangle}>
          <ImageBackground source={src} style={styles.imageBackground}>
            {backgroundChildren}
          </ImageBackground>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: colors.white,
  },
  viewRectangle: {
    position: 'absolute',
    bottom: moderateScale(0),
    right: moderateScale(0),
    left: moderateScale(0),
  },
  imageBackground: {
    resizeMode: 'cover',
    paddingTop: moderateScale(120),
    height: moderateScale(240),
  },
  bottom: {
    resizeMode: 'cover',
    height: verticalScale(235),
  },
});

export default BackgroundWithImage;
