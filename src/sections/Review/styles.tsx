import {StyleSheet} from 'react-native';
import {moderateScale} from '../../utils/scale';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';

const styles = StyleSheet.create({
  cardReview: {
    marginTop: moderateScale(8),
    borderRadius: moderateScale(8),
    paddingHorizontal: moderateScale(-20),
  },
  contentReview: {
    paddingHorizontal: moderateScale(8),
    paddingRight: moderateScale(16),
  },
  headerReview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  hr: {
    borderWidth: moderateScale(0.8),
    borderColor: colors.grey,
    width: '100%',
  },
  comment: {
    fontSize: moderateScale(12),
    color: colors.darkgrey,
    fontFamily: fonts.PoppinsSemiBold,
    paddingHorizontal: moderateScale(8),
  },
  imageReview: {
    height: moderateScale(65),
    width: moderateScale(65),
    resizeMode: 'cover',
    borderRadius: moderateScale(2),
  },
});

export default styles;
