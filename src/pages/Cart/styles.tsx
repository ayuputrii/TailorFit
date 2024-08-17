import {Platform, StyleSheet} from 'react-native';
import {moderateScale, verticalScale} from '../../utils/scale';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';

const styles = StyleSheet.create({
  container: {
    paddingTop: moderateScale(16),
    paddingHorizontal: moderateScale(16),
    backgroundColor: colors.basebg,
    flex: 1,
  },
  scroll: {
    paddingVertical: moderateScale(8),
  },
  viewChoose: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: moderateScale(16),
    alignItems: 'center',
  },
  chooseCard: {
    backgroundColor: colors.white,
    borderRadius: moderateScale(6),
    justifyContent: 'center',
    alignItems: 'center',
    width: '35%',
    height: moderateScale(35),
  },
  flexRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  txtChoose: {
    color: colors.darkgrey,
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: moderateScale(12),
  },
  flexRowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  viewBottom: {
    marginLeft: moderateScale(8),
    width: '60%',
  },
  title: {
    fontSize: moderateScale(12),
    fontFamily: fonts.PoppinsSemiBold,
    color: '#2F2E41',
  },
  cardBottom: {
    paddingVertical: moderateScale(28),
    width: '100%',
    height: verticalScale(80),
    position: 'absolute',
    bottom: verticalScale(100),
    backgroundColor: colors.white,
    borderRadius: moderateScale(8),
  },
  text1: {
    fontSize: moderateScale(12),
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.choco,
  },
  textPrice: {
    fontSize: moderateScale(10),
    fontFamily: fonts.PoppinsSemiBold,
    color: '#857E7E',
  },
  btn: {
    backgroundColor: colors.orange,
    width: moderateScale(120),
    height: moderateScale(40),
    borderRadius: moderateScale(8),
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
  txtCheckout: {
    color: colors.white,
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: moderateScale(12),
  },
  productShimmerContainer: {
    marginRight: moderateScale(8),
    marginBottom: moderateScale(8),
    width: '100%',
  },
  productShimmer: {
    height: verticalScale(100),
    borderRadius: moderateScale(8),
    width: '100%',
  },
  shimmerChoose: {
    width: '35%',
    borderRadius: moderateScale(6),
    height: moderateScale(35),
  },
});

export default styles;
