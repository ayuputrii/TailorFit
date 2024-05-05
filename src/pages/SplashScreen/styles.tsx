import {StyleSheet} from 'react-native';
import {colors} from '../../utils/colors';
import {moderateScale} from '../../utils/scale';
import {fonts} from '../../utils/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: colors.white,
    padding: moderateScale(16),
  },
  viewLogo: {
    position: 'absolute',
    bottom: moderateScale(100),
    right: moderateScale(0),
    left: moderateScale(25),
    justifyContent: 'center',
    display: 'flex',
    textAlign: 'center',
    flexDirection: 'row',
  },
  logo: {
    elevation: moderateScale(20),
    shadowColor: 'gray',
    shadowOffset: {
      width: moderateScale(10),
      height: moderateScale(13),
    },
    shadowOpacity: moderateScale(0),
    shadowRadius: moderateScale(4),
  },
  viewRectangle: {
    position: 'absolute',
    bottom: moderateScale(0),
    right: moderateScale(0),
    left: moderateScale(0),
  },
  imageBackground: {
    resizeMode: 'cover',
    paddingTop: moderateScale(120),
    height: moderateScale(240),
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    padding: moderateScale(24),
  },
  text: {
    fontSize: moderateScale(24),
    color: colors.black,
    fontFamily: fonts.PoppinsBold,
    marginTop: moderateScale(8),
  },
  viewIconArrow: {
    backgroundColor: colors.orange,
    width: moderateScale(64),
    height: moderateScale(64),
    borderRadius: moderateScale(64),
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;
