import {StyleSheet} from 'react-native';
import {moderateScale, verticalScale} from '../../utils/scale';
import {colors} from '../../utils/colors';

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(16),
    marginTop: verticalScale(8),
    paddingHorizontal: moderateScale(16),
    backgroundColor: colors.basebg,
    flex: 1,
  },
  image: {
    height: 230,
    resizeMode: 'stretch',
  },
  contentProduct: {
    width: '50%',
    backgroundColor: colors.black,
    position: 'relative',
  },
  viewRectangleTop: {
    zIndex: 100,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  viewImgProduct: {
    backgroundColor: 'green',
    width: '100%',
  },
  btnIcon: {
    position: 'absolute',
    right: moderateScale(4),
    top: moderateScale(2),
    zIndex: 100,
    borderRadius: moderateScale(30),
    width: moderateScale(30),
    height: verticalScale(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgProduct: {
    borderRadius: moderateScale(16),
    width: moderateScale(160),
    height: verticalScale(160),
    resizeMode: 'cover',
  },
});

export default styles;
