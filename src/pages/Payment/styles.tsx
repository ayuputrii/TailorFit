import {StyleSheet} from 'react-native';
import {moderateScale} from '../../utils/scale';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(16),
    flex: 1,
  },
  btn: {
    backgroundColor: colors.orange,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: moderateScale(8),
    height: moderateScale(50),
    marginVertical: moderateScale(14),
  },
  txt: {
    color: colors.white,
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: moderateScale(16),
    marginTop: moderateScale(3),
  },
});

export default styles;
