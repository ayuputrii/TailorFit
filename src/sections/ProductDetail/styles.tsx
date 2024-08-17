import {StyleSheet} from 'react-native';
import {moderateScale, verticalScale} from '../../utils/scale';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';

const styles = StyleSheet.create({
  viewImages: {
    height: verticalScale(190),
    width: '92%',
    borderRadius: moderateScale(8),
    paddingTop: moderateScale(6),
    backgroundColor: colors.white,
  },
  images: {
    width: '100%',
    height: verticalScale(170),
    resizeMode: 'contain',
  },
  imgShimmerProduct: {
    width: '100%',
    height: verticalScale(180),
    resizeMode: 'cover',
    borderRadius: moderateScale(8),
    zIndex: moderateScale(100),
  },
  flexBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flexBetweenCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexCol: {
    flexDirection: 'column',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewTextRight: {
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(8),
    width: moderateScale(100),
    height: moderateScale(30),
    paddingHorizontal: moderateScale(16),
  },
  textName: {
    fontFamily: fonts.PoppinsBold,
    color: colors.black,
    fontSize: moderateScale(18),
  },
  flexRowRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: moderateScale(-5),
    marginBottom: moderateScale(8),
  },
  txtRating: {
    marginLeft: moderateScale(6),
  },
  textPrice: {
    fontFamily: fonts.PoppinsMedium,
    fontSize: moderateScale(12),
    color: colors.white,
  },
  txtPreOrder: {
    fontFamily: fonts.PoppinsMedium,
    fontSize: moderateScale(13),
    color: colors.darkgray,
  },
  btn: {
    backgroundColor: colors.orange,
    width: '50%',
    marginRight: moderateScale(6),
    borderRadius: moderateScale(8),
    height: moderateScale(50),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: moderateScale(16),
  },
  btnTake: {
    backgroundColor: colors.darkgray,
    width: '100%',
    marginBottom: moderateScale(0),
  },
  txtBtn: {
    color: colors.white,
    fontSize: moderateScale(14),
    fontFamily: fonts.PoppinsBold,
    textAlign: 'center',
  },
  noData: {
    flex: moderateScale(1),
  },
  contentModal: {
    padding: moderateScale(16),
  },
  titleModal: {
    fontSize: moderateScale(15),
    color: colors.black,
    fontFamily: fonts.PoppinsBold,
  },
  txtNotes: {
    fontSize: moderateScale(12),
    fontFamily: fonts.PoppinsMedium,
    color: colors.darkgrey,
  },
  contentTabs: {
    margin: moderateScale(2),
  },
  txtContentTab: {
    fontFamily: fonts.PoppinsMedium,
    color: colors.darkgrey,
    fontSize: moderateScale(13),
  },
  seeAll: {
    fontSize: moderateScale(14),
    color: colors.darkgrey,
    fontFamily: fonts.PoppinsSemiBold,
    paddingHorizontal: moderateScale(4),
  },
  hr: {
    color: colors.lightgray,
    width: '100%',
    borderWidth: moderateScale(0.2),
    marginVertical: moderateScale(10),
  },
});

export default styles;
