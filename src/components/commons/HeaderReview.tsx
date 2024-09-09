import React from 'react';
import {StyleSheet, View} from 'react-native';
import PhotoWithNotFound from './PhotoWithNotFound';
import {colors} from '../../utils/colors';
import {moderateScale, verticalScale} from '../../utils/scale';
import Text from './Text';
import {fonts} from '../../utils/fonts';
import Shimmer from './Shimmer';
import Gap from './Gap';

interface HeaderReviewProps {
  title: string;
  subTitle: string;
  image: string | undefined;
  loading: boolean;
}

const HeaderReview = ({title, subTitle, image, loading}: HeaderReviewProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <PhotoWithNotFound
          image={image}
          loading={loading}
          style={styles.image}
          width={moderateScale(40)}
          height={moderateScale(40)}
          size={moderateScale(45)}
        />
        <Gap width={moderateScale(6)} height={0} />
        <View style={styles.headerContent}>
          {loading ? (
            <React.Fragment>
              <Shimmer style={styles.shimmer} />
              <Gap height={verticalScale(6)} width={0} />
              <Shimmer style={styles.shimmer} />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.subTitle}>{subTitle}</Text>
            </React.Fragment>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(40),
  },
  headerContent: {
    flexDirection: 'column',
  },
  title: {
    fontSize: moderateScale(12),
    color: colors.black,
    fontFamily: fonts.PoppinsSemiBold,
  },
  subTitle: {
    fontSize: moderateScale(10),
    color: colors.darkgrey,
    fontFamily: fonts.PoppinsSemiBold,
  },
  viewIcon: {
    backgroundColor: colors.white,
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  shimmer: {
    width: '100%',
  },
});

export default HeaderReview;
