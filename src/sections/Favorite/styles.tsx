import {StyleSheet} from 'react-native';
import {moderateScale, verticalScale} from '../../utils/scale';

export const styles = StyleSheet.create({
  productShimmerContainer: {
    marginRight: moderateScale(8),
    marginBottom: moderateScale(8),
    width: '48%',
  },
  productShimmer: {
    height: verticalScale(200),
    borderRadius: moderateScale(8),
    width: '100%',
  },
  noData: {
    flex: 1,
  },
});
