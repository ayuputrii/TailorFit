import React from 'react';
import Icons from 'react-native-vector-icons/Ionicons';
import {moderateScale} from '../../utils/scale';
import {colors} from '../../utils/colors';
import {Image} from 'react-native';

interface ImageNotFoundProps {
  uri: any;
  style: any;
}

const ImageNotFound = ({uri, style}: ImageNotFoundProps) => {
  return (
    <>
      {uri ? (
        <Image source={uri} style={style} />
      ) : (
        <Icons name="images" size={moderateScale(36)} color={colors.black} />
      )}
    </>
  );
};

export default ImageNotFound;
