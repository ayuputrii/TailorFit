import {StyleSheet} from 'react-native';
import {colors} from '../../utils/colors';
import {moderateScale} from '../../utils/scale';

const styles = StyleSheet.create({
  content: {
    width: '100%',
    marginTop: moderateScale(55),
  },
  viewRemember: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(4),
    marginTop: moderateScale(6),
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txt: {
    color: '#A39797',
    fontFamily: 'Poppins-Regular',
  },
  btn: {
    width: '100%',
    backgroundColor: colors.orange,
    borderRadius: moderateScale(10),
    height: moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: moderateScale(24),
  },
  loginText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
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
    marginBottom: moderateScale(15),
    marginTop: moderateScale(0),
  },
  signUp: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  colorLightBlack: {
    fontFamily: 'Poppins-Light',
    color: colors.black,
  },
  colorBoldBlack: {
    fontFamily: 'Poppins-Bold',
    color: colors.black,
    opacity: moderateScale(0.6),
  },
});

export default styles;
