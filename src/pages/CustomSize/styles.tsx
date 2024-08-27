import {StyleSheet} from 'react-native';
import {moderateScale} from '../../utils/scale';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(14),
    backgroundColor: colors.basebg,
    flex: 1,
    position: 'relative',
  },
  contentFooter: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: moderateScale(14),
    paddingBottom: moderateScale(24),
    position: 'absolute',
    bottom: moderateScale(0),
    right: moderateScale(20),
    left: moderateScale(20),
    backgroundColor: colors.basebg,
  },
  txtFooter: {
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: moderateScale(16),
    color: colors.black,
    paddingTop: moderateScale(24),
    paddingBottom: moderateScale(30),
    textAlign: 'center',
  },
  flexRowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  btnConfirm: {
    backgroundColor: colors.orange,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: moderateScale(8),
    borderRadius: moderateScale(10),
  },
  btnReset: {
    backgroundColor: 'rgba(126, 71, 65, 0.7)',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: moderateScale(8),
    borderRadius: moderateScale(10),
  },
  txtBtn: {
    color: colors.white,
    fontFamily: fonts.PoppinsBold,
    fontSize: moderateScale(16),
  },
});

export default styles;
