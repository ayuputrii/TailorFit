import React from 'react';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

interface ShimmerProps {
  style: any;
}

const Shimmer = ({style}: ShimmerProps) => {
  return <ShimmerPlaceholder LinearGradient={LinearGradient} style={style} />;
};

export default Shimmer;
