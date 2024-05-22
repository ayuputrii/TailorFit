import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {colors} from '../../utils/colors';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import {moderateScale} from '../../utils/scale';
import Shimmer from './Shimmer';

interface PhotoWithNotFoundProps {
  image: string | any;
  loading: boolean;
  style: any;
}

const PhotoWithNotFound = ({image, loading, style}: PhotoWithNotFoundProps) => {
  return (
    <View style={styles.container}>
      {loading ? (
        <Shimmer style={[styles.image, style]} />
      ) : image && isNaN(image) ? (
        <Image
          source={{uri: image}}
          width={60}
          height={60}
          style={[styles.image, style]}
        />
      ) : (
        <IconAwesome
          name="user-circle-o"
          size={moderateScale(50)}
          color={colors.black}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: moderateScale(60),
    height: moderateScale(60),
    backgroundColor: colors.white,
    borderRadius: moderateScale(60),
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(60),
  },
});
export default PhotoWithNotFound;
