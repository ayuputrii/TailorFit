import {StyleSheet} from 'react-native';
import {fonts} from '../../utils/fonts';
import {moderateScale} from '../../utils/scale';
import {colors} from '../../utils/colors';

export const styles = StyleSheet.create({
  content: {
    paddingTop: moderateScale(8),
  },
  txt: {
    fontFamily: fonts.PoppinsMedium,
    fontSize: moderateScale(16),
    color: colors.black,
  },
  centerRating: {
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    paddingTop: moderateScale(16),
  },
  flexRowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  btnPhoto: {
    borderWidth: moderateScale(1),
    width: '30%',
    height: moderateScale(100),
    borderRadius: moderateScale(4),
    borderColor: colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(10),
    backgroundColor: colors.white,
  },
  btn: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.orange,
    padding: moderateScale(14),
    borderRadius: moderateScale(10),
    flexDirection: 'row',
  },
  txtBtn: {
    color: colors.white,
    fontSize: moderateScale(15),
    fontFamily: fonts.PoppinsSemiBold,
  },
});
