import React from 'react';
import {FlatList, Image, Platform, ScrollView, View} from 'react-native';
import {styles} from './styles';
import {Buttons, Gap, ImageNotFound, MenuButtons, Text} from '../../components';
import {moderateScale, verticalScale} from '../../utils/scale';
import Carousel from 'react-native-reanimated-carousel';
import ImagePromo from '../../assets/images/promo.png';
import ImageProduct from '../../assets/images/product.png';
import ImageRectangle from '../../assets/images/img-rectangle-top.png';
import ImageRectangleBottom from '../../assets/images/img-rectangle-bottom.png';
import {colors} from '../../utils/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

interface HomeSectionsProps {
  width: number;
  activeMenuIndex: number;
  handleMenuPress: any;
  addFavorite: (index: number) => void;
  goDetailProduct: () => void;
}

const HomeSections = ({
  width,
  activeMenuIndex,
  handleMenuPress,
  addFavorite,
  goDetailProduct,
}: HomeSectionsProps) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}>
      <Gap height={verticalScale(18)} width={0} />
      <Carousel
        loop
        width={width}
        height={verticalScale(120)}
        autoPlay={true}
        data={[...new Array(6).keys()]}
        scrollAnimationDuration={1000}
        onSnapToItem={index => console.log('current index:', index)}
        renderItem={({index}) => (
          <React.Fragment key={index}>
            <ImageNotFound uri={ImagePromo} style={styles.imgPromo} />
          </React.Fragment>
        )}
      />
      <FlatList
        key={'#'}
        data={[
          {id: 1, label: 'Baju'},
          {id: 2, label: 'Celana'},
        ]}
        horizontal
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}: {item: string; index: number}) => (
          <MenuButtons
            key={index}
            activeMenuIndex={activeMenuIndex}
            setActiveMenuIndex={() => handleMenuPress(index)}
            index={index}
            item={item}
            onPress={() => {}}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <FlatList
        data={[
          {id: 1, label: 'Baju'},
          {id: 2, label: 'Celana'},
        ]}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        renderItem={({item, index}: {item: string; index: number}) => (
          <Buttons onPress={goDetailProduct} style={styles.contentProduct}>
            <ImageNotFound uri={ImageProduct} style={styles.imgProduct} />
            <Image source={ImageRectangle} style={styles.imgRectangle} />
            <Buttons onPress={() => addFavorite(index)} style={styles.favorite}>
              <Icon
                name={'heart-o'}
                size={moderateScale(18)}
                color={colors.black}
                style={{}}
              />
            </Buttons>
            <Image
              source={ImageRectangleBottom}
              style={styles.imgRectangleBottom}
            />
            <View style={styles.price}>
              <Text style={styles.txtPrice}>Rp150k</Text>
            </View>
          </Buttons>
        )}
      />
    </ScrollView>
  );
};

export default HomeSections;
