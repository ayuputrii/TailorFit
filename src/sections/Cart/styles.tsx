import {StyleSheet} from 'react-native';
import {moderateScale} from '../../utils/scale';
import {fonts} from '../../utils/fonts';

const styles = StyleSheet.create({
  card: {
    paddingTop: moderateScale(14),
  },
  contentProduct: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
  },
  notFound: {
    width: moderateScale(60),
    height: moderateScale(60),
    resizeMode: 'cover',
    borderRadius: moderateScale(8),
  },
  viewDesc: {
    width: '40%',
  },
  numericInputStyle: {
    marginRight: moderateScale(16),
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
