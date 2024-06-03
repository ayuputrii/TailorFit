import {Dimensions, StyleSheet} from 'react-native';
import {moderateScale} from '../../utils/scale';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';

const height = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(16),
    position: 'relative',
  },
  scroll: {
    paddingVertical: moderateScale(8),
    height: height - 180,
  },
  viewBtnAddress: {
    position: 'absolute',
    bottom: moderateScale(20),
    right: moderateScale(0),
    left: moderateScale(0),
    marginHorizontal: moderateScale(16),
  },
  btnAddress: {
    backgroundColor: colors.orange,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: moderateScale(8),
    height: moderateScale(50),
  },
  txt: {
    color: colors.white,
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: moderateScale(16),
    marginTop: moderateScale(3),
  },
  shimmer: {
    width: '100%',
    borderRadius: moderateScale(8),
    height: moderateScale(80),
    marginVertical: moderateScale(8),
  },
});

export default styles;
