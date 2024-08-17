import React from 'react';
import {moderateScale} from '../../utils/scale';
import {colors} from '../../utils/colors';
import {Image, StyleSheet, View} from 'react-native';
import {images} from '../../assets';

interface ImageWithNotFoundProps {
  uri: string | any;
  style?: any;
  styleNoData?: any;
}

const ImageWithNotFound = ({
  uri,
  style,
  styleNoData,
}: ImageWithNotFoundProps) => {
  return (
    <React.Fragment>
      {uri && isNaN(uri) ? (
        <Image source={{uri: uri}} style={style} />
      ) : (
        <View style={[styles.viewNoData, styleNoData]}>
          <Image
            source={images.imgNoData}
            width={moderateScale(50)}
            height={moderateScale(50)}
            style={[styles.imgNoData, styleNoData]}
          />
        </View>
      )}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  viewNoData: {
    backgroundColor: colors.white,
    width: '92%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(8),
  },
  imgNoData: {
    width: moderateScale(200),
    height: moderateScale(200),
    resizeMode: 'cover',
  },
});

export default ImageWithNotFound;
