import {StyleSheet} from 'react-native';
import {moderateScale} from '../../utils/scale';

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(14),
    flex: 1,
  },
  noData: {
    flex: moderateScale(1),
  },
  cardShimmer: {
    marginTop: moderateScale(8),
    borderRadius: moderateScale(8),
    width: '100%',
    height: moderateScale(180),
  },
});

export default styles;
