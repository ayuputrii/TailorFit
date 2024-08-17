import {StyleSheet} from 'react-native';
import {moderateScale} from '../../utils/scale';
import {fonts} from '../../utils/fonts';
import {colors} from '../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    padding: moderateScale(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateScale(2),
    width: '100%',
  },
  bgContent: {
    backgroundColor: colors.orange,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(8),
    width: moderateScale(50),
    height: moderateScale(26),
    borderRadius: moderateScale(16),
  },
  txt: {
    fontFamily: fonts.PoppinsBold,
    fontSize: moderateScale(16),
    color: colors.white,
  },
  flexCol: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '70%',
  },
  title: {
    fontFamily: fonts.PoppinsBold,
    fontSize: moderateScale(12),
    color: colors.black,
  },
  subTitle: {
    fontFamily: fonts.PoppinsBold,
    fontSize: moderateScale(12),
    color: colors.orange,
  },
});
