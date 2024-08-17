import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import {CarouselImage} from '../../components';
import {verticalScale} from '../../utils/scale';
import {PromotionTypes} from '../../types';
import {ImagePreview} from 'react-native-images-preview';
import {images} from '../../assets';

interface PromotionSectionsProps {
  promotion: PromotionTypes[];
  width: number;
}

const PromotionsSections = ({promotion, width}: PromotionSectionsProps) => {
  return (
    <React.Fragment>
      {promotion?.length ? (
        <CarouselImage
          loop={true}
          width={width}
          height={verticalScale(170)}
          autoPlay={true}
          data={promotion}
          renderItem={({
            item,
            index,
          }: {
            item: PromotionTypes;
            index: number;
          }) => {
            return (
              <View style={styles.viewImages}>
                <ImagePreview
                  key={index}
                  imageSource={item ? {uri: item?.image} : images.imgNoData}
                  imageStyle={styles.imgPromo}
                />
              </View>
            );
          }}
        />
      ) : (
        <CarouselImage
          loop={true}
          width={width}
          height={verticalScale(180)}
          autoPlay={true}
          data={[1, 2, 3, 4]}
          renderItem={({index}: {index: number}) => {
            return (
              <View style={styles.viewImages}>
                <ImagePreview
                  key={index}
                  imageSource={images.imgNoData}
                  imageStyle={styles.imgNoData}
                />
              </View>
            );
          }}
        />
      )}
    </React.Fragment>
  );
};

export default PromotionsSections;
