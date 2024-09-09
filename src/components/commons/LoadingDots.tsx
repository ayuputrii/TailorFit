import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {DotIndicator} from 'react-native-indicators';
import {colors} from '../../utils/colors';
import {moderateScale} from '../../utils/scale';

const LoadingDots = () => {
  return (
    <View style={styles.container}>
      <DotIndicator color={colors.darkChoco} size={moderateScale(12)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(133, 126, 126, 0.27)',
    zIndex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: Dimensions.get('screen').width,
  },
});

export default LoadingDots;
