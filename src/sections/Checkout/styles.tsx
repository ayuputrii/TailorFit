import {Platform, StyleSheet} from 'react-native';
import {moderateScale, verticalScale} from '../../utils/scale';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
  scroll: {
    marginVertical: moderateScale(8),
  },
  card: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: moderateScale(8),
    paddingVertical: moderateScale(16),
  },
  flexRowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexRowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    width: '80%',
  },
  contentProduct: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
  },
  contentDelivery: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '25%',
  },
  title: {
    fontSize: moderateScale(12),
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.orange,
  },
  titleProduct: {
    fontSize: moderateScale(12),
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.black,
  },
  titleDelivery: {
    fontSize: moderateScale(12),
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.choco,
  },
  text: {
    fontSize: moderateScale(10),
    fontFamily: fonts.PoppinsRegular,
    color: '#857E7E',
  },
  textPrice: {
    fontSize: moderateScale(10),
    fontFamily: fonts.PoppinsSemiBold,
    color: '#857E7E',
  },
  viewBottom: {
    position: 'absolute',
    bottom: moderateScale(10),
    right: moderateScale(0),
    left: moderateScale(0),
  },
  hr: {
    borderWidth: moderateScale(1),
    width: '100%',
    borderColor: '#C3BFBF',
    opacity: moderateScale(0.6),
    marginVertical: moderateScale(6),
  },
  btnOrder: {
    backgroundColor: colors.orange,
    height: moderateScale(32),
    width: moderateScale(90),
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
  textOrder: {
    color: colors.white,
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: moderateScale(12),
  },
  notFound: {
    width: moderateScale(80),
    height: moderateScale(80),
    resizeMode: 'cover',
    borderRadius: moderateScale(8),
  },
});

export default styles;
