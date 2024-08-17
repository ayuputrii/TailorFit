import {StyleSheet} from 'react-native';
import {moderateScale} from '../../utils/scale';
import {fonts} from '../../utils/fonts';
import {colors} from '../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: moderateScale(20),
  },
  title: {
    fontSize: moderateScale(24),
    fontFamily: fonts.PoppinsBold,
    marginBottom: moderateScale(20),
  },
  header: {
    backgroundColor: colors.grey,
    borderRadius: moderateScale(8),
    borderWidth: moderateScale(1),
    borderColor: colors.gray,
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(6),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: moderateScale(16),
    fontFamily: fonts.PoppinsRegular,
    color: colors.black,
  },
  content: {
    padding: moderateScale(20),
    backgroundColor: colors.basebg,
    borderWidth: moderateScale(1),
    borderBottomLeftRadius: moderateScale(8),
    borderBottomRightRadius: moderateScale(8),
    borderColor: colors.gray,
  },
  contentText: {
    fontSize: moderateScale(16),
  },
  active: {
    backgroundColor: colors.basebg,
  },
});
