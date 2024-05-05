import {StyleSheet} from 'react-native';
import {moderateScale, verticalScale} from '../../utils/scale';
import {fonts} from '../../utils/fonts';
import {colors} from '../../utils/colors';

const styles = StyleSheet.create({
  container: {
    margin: moderateScale(14),
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
});

export default styles;
