import {StyleSheet} from 'react-native';
import {moderateScale} from '../../utils/scale';
import {fonts} from '../../utils/fonts';
import {colors} from '../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: moderateScale(100),
  },
  card: {
    paddingTop: moderateScale(14),
    width: '100%',
  },
  cardShimmer: {
    width: '100%',
    borderRadius: moderateScale(8),
    height: moderateScale(80),
    marginVertical: moderateScale(4),
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
  text: {
    fontSize: moderateScale(12),
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.darkgray,
  },
  scroll: {
    paddingVertical: moderateScale(8),
  },
  title: {
    fontSize: moderateScale(12),
    fontFamily: fonts.PoppinsSemiBold,
    color: '#2F2E41',
  },
  textGraySemiBold: {
    fontSize: moderateScale(10),
    fontFamily: fonts.PoppinsSemiBold,
    color: '#857E7E',
  },
  boxProduct: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexJustifyBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
