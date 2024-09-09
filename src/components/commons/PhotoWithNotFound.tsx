import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {colors} from '../../utils/colors';
import IconAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {moderateScale} from '../../utils/scale';
import Shimmer from './Shimmer';
import IconUser from '../../assets/icons/ic-user.svg';

interface PhotoWithNotFoundProps {
  image?: string | any;
  loading?: boolean;
  style?: any;
  width?: number;
  height?: number;
}

const PhotoWithNotFound = ({
  image,
  loading,
  style,
  width = 60,
  height = 60,
}: PhotoWithNotFoundProps) => {
  return (
    <View style={styles.container}>
      {loading ? (
        <Shimmer style={[styles.image, style]} />
      ) : image && isNaN(image) ? (
        <Image
          source={{uri: image}}
          width={width}
          height={height}
          style={[styles.image, style]}
        />
      ) : (
        <IconUser
          name="user-alt"
          color={colors.black}
          width={moderateScale(50)}
          height={moderateScale(50)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(60),
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(60),
    resizeMode: 'cover',
  },
});
export default PhotoWithNotFound;
