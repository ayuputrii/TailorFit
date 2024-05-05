import {StyleSheet} from 'react-native';
import {moderateScale} from '../../utils/scale';
import {fonts} from '../../utils/fonts';

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(16),
  },
  txtDesc: {
    fontSize: moderateScale(18),
    fontFamily: fonts.PoppinsMedium,
    paddingHorizontal: moderateScale(8),
  },
});

export default styles;
