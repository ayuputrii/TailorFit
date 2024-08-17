import {StyleSheet} from 'react-native';
import {moderateScale} from '../../utils/scale';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';

const styles = StyleSheet.create({
  container: {
    paddingTop: moderateScale(16),
    paddingHorizontal: moderateScale(16),
    backgroundColor: colors.basebg,
    flex: 1,
    position: 'relative',
  },
  viewCart: {
    position: 'relative',
  },
  lengthCart: {
    backgroundColor: colors.red,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: moderateScale(-4),
    top: moderateScale(-4),
    width: moderateScale(16),
    height: moderateScale(16),
    borderRadius: moderateScale(16),
    zIndex: 1,
  },
  txtCart: {
    fontSize: moderateScale(10),
    fontFamily: fonts.PoppinsBold,
    color: colors.white,
  },
});

export default styles;
