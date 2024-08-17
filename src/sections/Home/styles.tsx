import {StyleSheet} from 'react-native';
import {moderateScale, verticalScale} from '../../utils/scale';
import {colors} from '../../utils/colors';

export const styles = StyleSheet.create({
  scroll: {
    marginVertical: moderateScale(12),
  },
  viewImages: {
    height: verticalScale(170),
    borderRadius: moderateScale(12),
    width: '98%',
    paddingTop: moderateScale(6),
  },
  imgPromo: {
    width: '94%',
    height: moderateScale(180),
    resizeMode: 'cover',
    borderRadius: moderateScale(8),
    zIndex: moderateScale(100),
  },
  imgNoData: {
    width: '96%',
    height: verticalScale(170),
    resizeMode: 'contain',
    borderRadius: moderateScale(8),
    backgroundColor: colors.white,
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
    height: verticalScale(35),
    marginBottom: moderateScale(16),
  },
  productShimmerContainer: {
    marginRight: moderateScale(8),
    marginBottom: moderateScale(8),
    width: '48%',
  },
  productShimmer: {
    height: verticalScale(170),
    borderRadius: moderateScale(8),
    width: '100%',
  },
  noData: {
    marginTop: moderateScale(80),
  },
});
