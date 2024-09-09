import {Platform, StyleSheet} from 'react-native';
import {moderateScale, verticalScale} from '../../utils/scale';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: moderateScale(8),
  },
  scroll: {
    marginVertical: moderateScale(8),
    marginBottom: moderateScale(40),
  },
  card: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: moderateScale(8),
    paddingVertical: moderateScale(16),
  },
  cardPayment: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: moderateScale(10),
    paddingVertical: moderateScale(8),
  },
  flexRowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexRowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    width: '80%',
  },
  contentProduct: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
  },
  contentDelivery: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '25%',
  },
  title: {
    fontSize: moderateScale(12),
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.orange,
  },
  titleProduct: {
    fontSize: moderateScale(12),
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.black,
  },
  titleDelivery: {
    fontSize: moderateScale(12),
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.choco,
  },
  txtTf: {
    fontSize: moderateScale(10),
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.choco,
    marginTop: moderateScale(6),
  },
  text: {
    fontSize: moderateScale(10),
    fontFamily: fonts.PoppinsRegular,
    color: '#857E7E',
  },
  textPrice: {
    fontSize: moderateScale(10),
    fontFamily: fonts.PoppinsSemiBold,
    color: '#857E7E',
  },
  viewBottom: {
    position: 'absolute',
    bottom: moderateScale(10),
    right: moderateScale(0),
    left: moderateScale(0),
  },
  hr: {
    borderWidth: moderateScale(0.6),
    width: '100%',
    borderColor: '#C3BFBF',
    opacity: moderateScale(0.6),
    marginVertical: moderateScale(6),
  },
  btnOrder: {
    backgroundColor: colors.orange,
    height: moderateScale(32),
    width: moderateScale(90),
    borderRadius: moderateScale(8),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: moderateScale(2),
    shadowOpacity: moderateScale(Platform.OS === 'ios' ? 0.2 : 0.8),
    shadowRadius: moderateScale(Platform.OS === 'ios' ? 6 : 3),
    shadowOffset: {
      width: moderateScale(0),
      height: verticalScale(Platform.OS === 'ios' ? -5 : -10),
    },
    shadowColor: colors.black,
  },
  textOrder: {
    color: colors.white,
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: moderateScale(12),
  },
  imgProduct: {
    width: moderateScale(50),
    height: moderateScale(50),
    resizeMode: 'cover',
    borderRadius: moderateScale(8),
  },
  notFound: {
    width: moderateScale(50),
    height: moderateScale(50),
    resizeMode: 'cover',
    borderRadius: moderateScale(8),
  },
  txtAddressNoData: {
    color: colors.grey,
    fontFamily: fonts.PoppinsBold,
    fontSize: moderateScale(14),
    marginTop: moderateScale(4),
  },
  contentAccordion: {
    paddingHorizontal: moderateScale(16),
    paddingBottom: moderateScale(24),
  },
  flexColumn: {
    flexDirection: 'column',
  },
  cardSize: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(4),
  },
  size: {
    fontSize: moderateScale(12),
    fontWeight: 'bold',
    textTransform: 'capitalize',
    color: colors.black,
    textAlign: 'center',
    marginBottom: moderateScale(4),
  },
  valueSize: {
    fontSize: moderateScale(12),
    fontWeight: 'bold',
    textTransform: 'capitalize',
    color: colors.white,
    textAlign: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: colors.orange,
    borderRadius: moderateScale(16),
    width: moderateScale(50),
    paddingVertical: moderateScale(4),
  },
  mark: {
    color: colors.white,
    backgroundColor: colors.choco,
    width: moderateScale(60),
    textAlign: 'center',
    marginLeft: moderateScale(8),
    borderRadius: moderateScale(8),
  },
});

export default styles;
