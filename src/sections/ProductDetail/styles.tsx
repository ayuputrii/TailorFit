import {StyleSheet} from 'react-native';
import {moderateScale, verticalScale} from '../../utils/scale';

const styles = StyleSheet.create({
  images: {
    width: '100%',
    height: verticalScale(150),
    resizeMode: 'contain',
    borderRadius: moderateScale(8),
    zIndex: moderateScale(100),
  },
});

export default styles;
