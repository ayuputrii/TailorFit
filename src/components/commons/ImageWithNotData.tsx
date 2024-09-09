import React from 'react';
import {StyleSheet, View} from 'react-native';
import IlustrationNotFound from '../../assets/ilustration/il-not-found.svg';
import Text from './Text';
import Gap from './Gap';
import {moderateScale, verticalScale} from '../../utils/scale';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';

interface ImageWithNoDataProps {
  style?: any;
}

const ImageWithNotData = ({style}: ImageWithNoDataProps) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.content}>
        <IlustrationNotFound
          width={'100%'}
          height={moderateScale(120)}
          style={styles.image}
        />
      </View>
      <Gap height={verticalScale(20)} width={0} />
      <Text style={styles.text}>Maaf, data ini kosong..</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: moderateScale(60),
  },
  content: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  image: {
    width: '100%',
  },
  text: {
    color: colors.orange,
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: moderateScale(16),
  },
});

export default ImageWithNotData;
