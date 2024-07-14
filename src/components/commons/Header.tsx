import React, {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import PhotoWithNotFound from './PhotoWithNotFound';
import {colors} from '../../utils/colors';
import {moderateScale, verticalScale} from '../../utils/scale';
import Text from './Text';
import {fonts} from '../../utils/fonts';
import Shimmer from './Shimmer';
import Gap from './Gap';

interface HeaderProps {
  title: string;
  subTitle: string;
  icon: ReactNode;
  image: string | undefined;
  children: ReactNode;
  loading: boolean;
}

const Header = ({
  title,
  subTitle,
  icon,
  image,
  children,
  loading,
}: HeaderProps) => {
  return (
    <React.Fragment>
      <View style={styles.container}>
        <View style={styles.content}>
          <PhotoWithNotFound
            image={image}
            loading={loading}
            style={undefined}
            width={moderateScale(50)}
            height={moderateScale(50)}
            size={moderateScale(30)}
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
        {icon && <View style={styles.content}>{icon}</View>}
      </View>
      {children}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'column',
  },
  title: {
    fontSize: moderateScale(16),
    color: colors.black,
    fontFamily: fonts.PoppinsMedium,
  },
  subTitle: {
    fontSize: moderateScale(20),
    color: colors.black,
    fontFamily: fonts.PoppinsBold,
    marginTop: moderateScale(-6),
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

export default Header;
