import {StyleSheet} from 'react-native';
import {colors} from '../../utils/colors';
import {moderateScale} from '../../utils/scale';

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
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(80),
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    elevation: moderateScale(4),
  },
  photo: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(80),
    resizeMode: 'cover',
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
  text: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
    fontSize: moderateScale(16),
  },
});

export default styles;
