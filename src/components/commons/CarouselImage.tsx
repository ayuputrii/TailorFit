import React, {useState} from 'react';
import Carousel from 'react-native-reanimated-carousel';
import Gap from './Gap';
import {moderateScale} from '../../utils/scale';
import {Pagination} from 'react-native-snap-carousel';
import {StyleSheet} from 'react-native';
import {colors} from '../../utils/colors';

interface CarouselImageProps {
  width: number;
  height: number;
  autoPlay: boolean;
  data: any;
  renderItem: any;
  loop: boolean;
}

const CarouselImage = ({
  width,
  height,
  autoPlay,
  data,
  renderItem,
  loop,
}: CarouselImageProps) => {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <>
      <Carousel
        loop={loop}
        width={width}
        height={height}
        autoPlay={autoPlay}
        data={data}
        scrollAnimationDuration={500}
        onSnapToItem={index => setActiveSlide(index)}
        renderItem={renderItem}
      />
      <Gap height={moderateScale(16)} width={0} />
      <Pagination
        dotsLength={data?.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.dotStyle}
        inactiveDotStyle={styles.inactiveDotStyle}
        inactiveDotOpacity={0.6}
        inactiveDotScale={0.6}
      />
    </>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    paddingTop: moderateScale(8),
    paddingBottom: moderateScale(20),
  },
  dotStyle: {
    width: moderateScale(10),
    height: moderateScale(10),
    borderRadius: moderateScale(5),
    backgroundColor: colors.black,
  },
  inactiveDotStyle: {
    backgroundColor: colors.gray,
  },
});

export default CarouselImage;
