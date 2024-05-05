import React, {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import PhotoWithNotFound from './PhotoWithNotFound';
import {colors} from '../../utils/colors';
import {moderateScale} from '../../utils/scale';
import Text from './Text';
import {fonts} from '../../utils/fonts';

interface HeaderProps {
  title: string;
  subTitle: string;
  icon: ReactNode;
  image: string | undefined;
  children: ReactNode;
}

const Header = ({title, subTitle, icon, image, children}: HeaderProps) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.content}>
          <PhotoWithNotFound image={image} />
          <View style={styles.headerContent}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subTitle}>{subTitle}</Text>
          </View>
        </View>
        {icon && <View style={styles.content}>{icon}</View>}
      </View>
      {children}
    </>
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
});

export default Header;
