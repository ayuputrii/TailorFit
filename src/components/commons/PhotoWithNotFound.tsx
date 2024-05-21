import React, {createRef} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {colors} from '../../utils/colors';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import {moderateScale} from '../../utils/scale';
import Shimmer from './Shimmer';

interface PhotoWithNotFoundProps {
  image: string | undefined;
  loading: boolean;
}

const PhotoWithNotFound = ({image, loading}: PhotoWithNotFoundProps) => {
  const avatarRef = createRef();

  return (
    <View style={styles.container}>
      {loading ? (
        <Shimmer ref={avatarRef} style={styles.image} />
      ) : !image ? (
        <IconAwesome name="user-circle-o" size={50} color={colors.black} />
      ) : (
        <Image
          source={{uri: image}}
          width={60}
          height={60}
          style={styles.image}
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
    marginRight: 16,
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
