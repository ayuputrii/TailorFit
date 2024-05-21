import {StyleSheet} from 'react-native';
import {moderateScale} from '../../utils/scale';

const styles = StyleSheet.create({
  scroll: {
    zIndex: moderateScale(100),
    marginTop: moderateScale(10),
  },
  content: {
    paddingTop: moderateScale(100),
    paddingHorizontal: moderateScale(16),
  },
});

export default styles;
