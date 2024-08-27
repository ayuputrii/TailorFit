import {StyleSheet} from 'react-native';
import {moderateScale} from '../../utils/scale';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(14),
    flex: 1,
    backgroundColor: colors.basebg,
  },
  btn: {
    backgroundColor: colors.orange,
    width: '100%',
    height: moderateScale(50),
    borderRadius: moderateScale(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtBtn: {
    color: colors.white,
    fontSize: moderateScale(16),
    fontFamily: fonts.PoppinsSemiBold,
  },
});

export default styles;
