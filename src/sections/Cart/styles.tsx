import {StyleSheet} from 'react-native';
import {moderateScale, verticalScale} from '../../utils/scale';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: moderateScale(14),
    width: '100%',
    height: verticalScale(80),
    backgroundColor: colors.white,
    borderRadius: moderateScale(10),
  },
  flexRowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  contentProduct: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '85%',
  },
  viewDesc: {
    marginLeft: moderateScale(8),
    width: '70%',
  },
  viewBottom: {
    marginLeft: moderateScale(8),
    width: '60%',
  },
  viewImage: {
    backgroundColor: colors.black,
    width: moderateScale(40),
    height: verticalScale(38),
    borderRadius: moderateScale(4),
    marginLeft: moderateScale(6),
  },
  title: {
    fontSize: moderateScale(12),
    fontFamily: fonts.PoppinsSemiBold,
    color: '#2F2E41',
  },
  text: {
    fontSize: moderateScale(12),
    fontFamily: fonts.PoppinsRegular,
    color: '#857E7E',
  },
  textPrice: {
    fontSize: moderateScale(10),
    fontFamily: fonts.PoppinsSemiBold,
    color: '#857E7E',
  },
});

export default styles;
