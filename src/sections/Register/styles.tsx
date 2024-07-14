import {StyleSheet} from 'react-native';
import {colors} from '../../utils/colors';
import {moderateScale} from '../../utils/scale';
import {fonts} from '../../utils/fonts';

const styles = StyleSheet.create({
  content: {
    width: '100%',
    marginTop: moderateScale(55),
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txt: {
    color: '#A39797',
    fontFamily: fonts.PoppinsRegular,
  },
  btn: {
    width: '100%',
    backgroundColor: colors.orange,
    borderRadius: moderateScale(8),
    height: moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: moderateScale(24),
  },
  loginText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontFamily: fonts.PoppinsBold,
    fontSize: moderateScale(16),
  },
  viewList: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  borderTop: {
    borderTopWidth: moderateScale(0.6),
    borderColor: '#A39797',
    width: moderateScale(130),
  },
  logoView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
    marginTop: 0,
  },
  signIn: {
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: moderateScale(100),
  },
  colorLightBlack: {
    fontFamily: fonts.PoppinsLight,
    color: colors.black,
  },
  colorBoldBlack: {
    fontFamily: fonts.PoppinsBold,
    color: colors.black,
    opacity: moderateScale(0.6),
  },
});

export default styles;
