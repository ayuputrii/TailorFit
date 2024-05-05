import {Platform, StyleSheet} from 'react-native';
import {moderateScale, verticalScale} from '../../utils/scale';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';

export const styles = StyleSheet.create({
  scroll: {
    marginVertical: moderateScale(8),
  },
  imgPromo: {
    width: '92%',
    height: verticalScale(100),
    resizeMode: 'contain',
  },
  card: {
    width: '100%',
    backgroundColor: colors.basebg,
    borderRadius: moderateScale(10),
    elevation: moderateScale(2),
    shadowOpacity: moderateScale(Platform.OS === 'ios' ? 0.2 : 0.8),
    shadowRadius: moderateScale(Platform.OS === 'ios' ? 6 : 3),
    shadowOffset: {
      width: moderateScale(0),
      height: verticalScale(Platform.OS === 'ios' ? -5 : -10),
    },
    shadowColor: colors.black,
    position: 'relative',
    padding: 0,
  },
  contentProduct: {
    position: 'relative',
    marginBottom: moderateScale(8),
  },
  imgProduct: {
    height: moderateScale(200),
    width: moderateScale(170),
    resizeMode: 'cover',
    marginRight: moderateScale(16),
    borderRadius: moderateScale(8),
  },
  imgRectangle: {
    right: moderateScale(14),
    position: 'absolute',
    width: moderateScale(60),
    height: moderateScale(60),
  },
  favorite: {
    width: moderateScale(35),
    height: moderateScale(35),
    borderRadius: moderateScale(35),
    right: moderateScale(16),
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
    bottom: moderateScale(-2),
    left: moderateScale(0),
    position: 'absolute',
  },
  price: {
    backgroundColor: colors.black,
    bottom: moderateScale(0),
    left: moderateScale(2),
    position: 'absolute',
    borderRadius: moderateScale(10),
    width: moderateScale(70),
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
