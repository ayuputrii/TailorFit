import {Platform, StyleSheet} from 'react-native';
import {moderateScale, verticalScale} from '../../utils/scale';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(16),
    flex: 1,
  },
  scroll: {
    paddingVertical: moderateScale(8),
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
    borderRadius: moderateScale(10),
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
    borderRadius: moderateScale(10),
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
});

export default styles;
