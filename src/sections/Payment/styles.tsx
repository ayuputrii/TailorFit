import {StyleSheet} from 'react-native';
import {moderateScale} from '../../utils/scale';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
  scroll: {
    marginVertical: moderateScale(8),
  },
  card: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: moderateScale(8),
    paddingVertical: moderateScale(16),
  },
  flexRowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },
  title: {
    fontSize: moderateScale(10),
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.orange,
  },
  text: {
    fontSize: moderateScale(10),
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.black,
  },
  subText: {
    fontSize: moderateScale(10),
    fontFamily: fonts.PoppinsRegular,
    color: '#857E7E',
  },
  hr: {
    borderWidth: 1,
    width: '100%',
    borderColor: '#DEDEDE',
    opacity: moderateScale(0.6),
    marginVertical: moderateScale(12),
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;
