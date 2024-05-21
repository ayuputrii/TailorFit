import React from 'react';
import Icons from 'react-native-vector-icons/Ionicons';
import {moderateScale} from '../../utils/scale';
import {colors} from '../../utils/colors';
import {Image} from 'react-native';

interface ImageWithNotFoundProps {
  uri: string | any;
  style: any;
}

const ImageWithNotFound = ({uri, style}: ImageWithNotFoundProps) => {
  return (
    <React.Fragment>
      {uri && isNaN(uri) ? (
        <Image source={{uri: uri}} style={style} />
      ) : (
        <Icons name="images" size={moderateScale(120)} color={colors.black} />
      )}
    </React.Fragment>
  );
};

export default ImageWithNotFound;
