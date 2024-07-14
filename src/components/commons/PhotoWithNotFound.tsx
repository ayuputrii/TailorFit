import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {colors} from '../../utils/colors';
import IconAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {moderateScale} from '../../utils/scale';
import Shimmer from './Shimmer';

interface PhotoWithNotFoundProps {
  image?: string | any;
  loading?: boolean;
  style?: any;
  width?: number;
  height?: number;
  size?: number;
}

const PhotoWithNotFound = ({
  image,
  loading,
  style,
  width = 60,
  height = 60,
  size = moderateScale(50),
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
        <IconAwesome5 name="user-alt" size={size} color={colors.black} />
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
