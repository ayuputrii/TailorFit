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
  },
  flexRowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    width: '40%',
    alignItems: 'center',
  },
  rightContent: {
    width: '60%',
    textAlign: 'right',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: moderateScale(12),
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.black,
  },
  text: {
    fontSize: moderateScale(10),
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.darkgrey,
  },
  txtDate: {
    fontSize: moderateScale(8),
    fontFamily: fonts.PoppinsMedium,
    color: colors.gray,
    textAlign: 'right',
    marginTop: moderateScale(4),
  },
  imageNoData: {
    width: moderateScale(60),
    height: moderateScale(60),
  },
  txtOrder: {
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.choco,
    fontSize: moderateScale(12),
  },
  txtRight: {
    fontFamily: fonts.PoppinsMedium,
    color: colors.darkgray,
    fontSize: moderateScale(9),
    textTransform: 'capitalize',
  },
  hr: {
    borderWidth: moderateScale(0.6),
    width: '100%',
    borderColor: '#C3BFBF',
    opacity: moderateScale(0.6),
    marginVertical: moderateScale(6),
  },
  mark: {
    backgroundColor: colors.choco,
    justifyContent: 'center',
    alignItems: 'center',
    color: colors.white,
    width: moderateScale(120),
    textAlign: 'center',
    padding: moderateScale(4),
    fontFamily: fonts.PoppinsBold,
    borderRadius: moderateScale(8),
  },
});

export default styles;
