import {StyleSheet} from 'react-native';
import {colors} from '../../utils/colors';
import {moderateScale} from '../../utils/scale';
import {fonts} from '../../utils/fonts';

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: moderateScale(42),
    marginTop: moderateScale(120),
    zIndex: moderateScale(100),
    marginBottom: moderateScale(20),
  },
  txt: {
    color: colors.orange,
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontFamily: 'Poppins-SemiBold',
    paddingVertical: moderateScale(69),
  },
  btn: {
    width: '100%',
    backgroundColor: colors.orange,
    borderRadius: moderateScale(8),
    height: moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
    fontSize: moderateScale(16),
  },
  codeFieldRoot: {
    marginTop: moderateScale(69),
  },
  cell: {
    width: moderateScale(43),
    height: moderateScale(53),
    lineHeight: moderateScale(45),
    fontSize: moderateScale(24),
    borderWidth: moderateScale(2),
    borderColor: colors.orange,
    textAlign: 'center',
    borderRadius: moderateScale(8),
    color: colors.orange,
    textDecorationLine: 'underline',
    flexDirection: 'row',
  },
  focusCell: {
    borderColor: colors.orange,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    zIndex: moderateScale(100),
    backgroundColor: 'white',
    borderRadius: moderateScale(20),
    height: moderateScale(420),
  },
  error: {
    fontSize: moderateScale(10),
    color: colors.orange,
    fontFamily: fonts.PoppinsSemiBold,
    paddingHorizontal: moderateScale(12),
  },
});

export default styles;
