import {StyleSheet} from 'react-native';
import {moderateScale} from '../../utils/scale';
import {fonts} from '../../utils/fonts';
import {colors} from '../../utils/colors';

const styles = StyleSheet.create({
  card: {
    paddingTop: moderateScale(14),
    width: '100%',
  },
  notFound: {
    width: moderateScale(60),
    height: moderateScale(60),
    resizeMode: 'cover',
    borderRadius: moderateScale(8),
  },
  viewDesc: {
    flexDirection: 'column',
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
  textGraySemiBold: {
    fontSize: moderateScale(10),
    fontFamily: fonts.PoppinsSemiBold,
    color: '#857E7E',
  },
  textOrangeSemiBold: {
    fontSize: moderateScale(10),
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.orange,
  },
  boxProduct: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  variant: {
    color: colors.orange,
    paddingVertical: moderateScale(2),
    borderRadius: moderateScale(4),
  },
});

export default styles;
