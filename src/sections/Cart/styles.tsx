import {StyleSheet} from 'react-native';
import {moderateScale} from '../../utils/scale';
import {fonts} from '../../utils/fonts';
import {colors} from '../../utils/colors';

const styles = StyleSheet.create({
  card: {
    paddingTop: moderateScale(14),
  },
  contentProduct: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  notFound: {
    width: moderateScale(60),
    height: moderateScale(60),
    resizeMode: 'cover',
    borderRadius: moderateScale(8),
  },
  imgProduct: {
    width: moderateScale(50),
    height: moderateScale(50),
    resizeMode: 'cover',
    borderRadius: moderateScale(8),
  },
  viewDesc: {
    flexDirection: 'column',
  },
  numericInputStyle: {},
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
    width: '70%',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  variant: {
    backgroundColor: colors.gray,
    color: colors.black,
    paddingHorizontal: moderateScale(6),
    paddingVertical: moderateScale(2),
    borderRadius: moderateScale(4),
    maxWidth: '100%',
  },
  txtSize: {
    fontSize: moderateScale(10),
    fontFamily: fonts.PoppinsSemiBold,
    color: '#857E7E',
    textAlign: 'right',
  },
});

export default styles;
