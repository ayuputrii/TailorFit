import React from 'react';
import {View} from 'react-native';

interface GapProps {
  width: number;
  height: number;
}

const Gap = ({width, height}: GapProps) => {
  return <View width={width} height={height} />;
};

export default Gap;
