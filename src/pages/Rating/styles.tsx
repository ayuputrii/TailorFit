import {StyleSheet} from 'react-native';
import {moderateScale, verticalScale} from '../../utils/scale';
import {fonts} from '../../utils/fonts';
import {colors} from '../../utils/colors';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: moderateScale(16),
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: verticalScale(50),
    paddingTop: moderateScale(14),
  },
  text: {
    fontSize: moderateScale(12),
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.darkgray,
  },
  modalError: {
    height: moderateScale(450),
  },
});

export default styles;
