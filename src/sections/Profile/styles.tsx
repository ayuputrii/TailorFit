import {StyleSheet} from 'react-native';
import {colors} from '../../utils/colors';
import {moderateScale} from '../../utils/scale';
import {fonts} from '../../utils/fonts';

const styles = StyleSheet.create({
  content: {
    width: '100%',
  },
  viewButtonPhoto: {
    height: moderateScale(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnPhoto: {
    width: moderateScale(70),
    height: moderateScale(70),
    borderRadius: moderateScale(70),
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    elevation: moderateScale(4),
  },
  iconProfile: {
    position: 'absolute',
    zIndex: moderateScale(100),
    right: moderateScale(0),
    bottom: moderateScale(0),
    backgroundColor: colors.orange,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: moderateScale(25),
    height: moderateScale(25),
    borderRadius: moderateScale(60),
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
  text: {
    color: colors.white,
    fontWeight: 'bold',
    fontFamily: fonts.PoppinsBold,
    fontSize: moderateScale(16),
  },
});

export default styles;
