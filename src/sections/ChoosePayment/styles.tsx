import {StyleSheet} from 'react-native';
import {moderateScale} from '../../utils/scale';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';

const styles = StyleSheet.create({
  content: {
    marginBottom: moderateScale(36),
  },
  img: {
    marginRight: moderateScale(6),
    position: 'relative',
  },
  imgBank: {
    marginRight: moderateScale(6),
    width: moderateScale(200),
    height: moderateScale(200),
    borderRadius: moderateScale(8),
    resizeMode: 'contain',
  },
  hover: {
    backgroundColor: colors.lightgray,
    opacity: 0.4,
    zIndex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: moderateScale(10),
    width: moderateScale(80),
    height: moderateScale(60),
    borderRadius: moderateScale(8),
  },
  text: {
    fontSize: moderateScale(16),
    color: colors.black,
    fontFamily: fonts.PoppinsSemiBold,
  },
  btn: {
    backgroundColor: colors.orange,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: moderateScale(8),
    height: moderateScale(50),
    paddingHorizontal: moderateScale(16),
  },
  txt: {
    color: colors.white,
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: moderateScale(16),
    marginTop: moderateScale(3),
  },
});

export default styles;
