import React from 'react';
import {ProgressBar} from 'react-native-paper';
import {moderateScale} from '../../utils/scale';
import {StyleSheet} from 'react-native';

interface ProgressBarProps {
  colors: string;
  progress: number;
}

const ProgressBarCommons = ({colors, progress}: ProgressBarProps) => {
  return (
    <ProgressBar progress={progress} color={colors} style={styles.progress} />
  );
};

const styles = StyleSheet.create({
  progress: {
    height: moderateScale(16),
    borderRadius: moderateScale(8),
  },
});

export default ProgressBarCommons;
