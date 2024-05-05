import {StyleSheet} from 'react-native';
import {moderateScale} from '../../utils/scale';

const styles = StyleSheet.create({
  scroll: {
    marginTop: moderateScale(70),
    zIndex: moderateScale(100),
    marginBottom: moderateScale(20),
    paddingHorizontal: moderateScale(16),
  },
});

export default styles;
