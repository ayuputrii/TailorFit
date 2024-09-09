import {StyleSheet} from 'react-native';
import {moderateScale} from '../../utils/scale';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: moderateScale(100),
  },
  content: {
    paddingTop: moderateScale(100),
    paddingHorizontal: moderateScale(16),
  },
});

export default styles;
