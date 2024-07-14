import {StyleSheet} from 'react-native';
import {moderateScale} from '../../utils/scale';
import {colors} from '../../utils/colors';

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(16),
    backgroundColor: colors.basebg,
    flex: 1,
  },
});

export default styles;
