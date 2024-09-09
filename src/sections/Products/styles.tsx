import {Platform, StyleSheet} from 'react-native';
import {moderateScale, verticalScale} from '../../utils/scale';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';

export const styles = StyleSheet.create({
  container: {
    width: '50%',
  },
  contentProduct: {
    borderRadius: moderateScale(8),
    paddingHorizontal: moderateScale(6),
    paddingVertical: moderateScale(8),
    width: '100%',
  },
  imgProduct: {
    height: moderateScale(170),
    resizeMode: 'cover',
    width: '100%',
  },
  imgStyle: {
    borderRadius: moderateScale(8),
  },
  imgRectangle: {
    right: moderateScale(-2),
    position: 'absolute',
    width: moderateScale(60),
    height: moderateScale(60),
  },
  favorite: {
    width: moderateScale(35),
    height: moderateScale(35),
    borderRadius: moderateScale(35),
    right: moderateScale(3),
    top: moderateScale(3),
    position: 'absolute',
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: moderateScale(2),
    shadowOpacity: moderateScale(Platform.OS === 'ios' ? 0.2 : 0.8),
    shadowRadius: moderateScale(Platform.OS === 'ios' ? 6 : 3),
    shadowOffset: {
      width: moderateScale(0),
      height: verticalScale(Platform.OS === 'ios' ? -5 : -10),
    },
    shadowColor: colors.black,
  },
  imgRectangleBottom: {
    bottom: moderateScale(-6),
    position: 'absolute',
    marginLeft: moderateScale(-10),
    width: moderateScale(130),
  },
  price: {
    backgroundColor: colors.black,
    bottom: moderateScale(0),
    left: moderateScale(2),
    position: 'absolute',
    borderRadius: moderateScale(8),
    width: moderateScale(90),
    height: moderateScale(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtPrice: {
    color: colors.white,
    fontSize: moderateScale(12),
    fontFamily: fonts.PoppinsSemiBold,
  },
});
