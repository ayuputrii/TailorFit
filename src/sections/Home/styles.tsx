import {StyleSheet} from 'react-native';
import {moderateScale, verticalScale} from '../../utils/scale';
import {colors} from '../../utils/colors';

export const styles = StyleSheet.create({
  scroll: {
    marginVertical: moderateScale(12),
  },
  imgPromo: {
    width: '92%',
    height: verticalScale(180),
    resizeMode: 'cover',
    borderRadius: moderateScale(8),
    zIndex: moderateScale(100),
  },
  imgShimmerPromo: {
    width: '100%',
    height: verticalScale(180),
    resizeMode: 'cover',
    borderRadius: moderateScale(8),
    zIndex: moderateScale(100),
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexWrapRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  category: {
    width: moderateScale(100),
    borderRadius: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
    height: verticalScale(40),
    marginBottom: moderateScale(16),
  },
  contentProduct: {
    height: verticalScale(180),
    borderRadius: moderateScale(8),
    marginRight: moderateScale(14),
    marginBottom: moderateScale(8),
    paddingHorizontal: moderateScale(6),
    paddingVertical: moderateScale(12),
    backgroundColor: colors.white,
  },
  productShimmer: {
    height: verticalScale(180),
    borderRadius: moderateScale(8),
    marginRight: moderateScale(14),
    marginBottom: moderateScale(8),
    paddingHorizontal: moderateScale(0),
    paddingVertical: moderateScale(0),
    backgroundColor: colors.white,
  },
});
