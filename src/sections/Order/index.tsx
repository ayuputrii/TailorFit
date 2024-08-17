import React from 'react';
import {ScrollView, View} from 'react-native';
import {Cart, CategoryTypes, ProductsTypes} from '../../types';
import {
  CardCommons,
  Gap,
  ImageWithNotData,
  ImageWithNotFound,
  Shimmer,
  Text,
} from '../../components';
import {moderateScale} from '../../utils/scale';
import {FlatList} from 'react-native-gesture-handler';
import {styles} from './styles';
import CategoryOrderSections from './CategoryOrder';
import {formatIdr} from '../../utils/format-number';

interface OrderSectionsProps {
  data: ProductsTypes[];
  category: CategoryTypes[];
  activeMenuIndex: number;
  handleMenuPress: any;
  onPress: (item: ProductsTypes) => void;
  loading: boolean;
}

const OrderSections = ({
  data,
  category,
  activeMenuIndex,
  handleMenuPress,
  onPress,
  loading,
}: OrderSectionsProps) => {
  return (
    <View style={styles.container}>
      <CategoryOrderSections
        category={category}
        activeMenuIndex={activeMenuIndex}
        handleMenuPress={handleMenuPress}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.scroll}>
        {loading ? (
          <FlatList
            data={[1, 2, 3, 4, 5, 6]}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_item, index) => index.toString()}
            renderItem={({}) => {
              return <Shimmer style={styles.cardShimmer} />;
            }}
          />
        ) : Boolean(data?.length) ? (
          <FlatList
            data={data}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_item, index) => index.toString()}
            renderItem={({
              item,
              index,
            }: {
              item: ProductsTypes;
              index: number;
            }) => {
              return (
                <React.Fragment key={index}>
                  {Boolean(item?.products) ? (
                    item?.products?.map((items: Cart, id: number) => {
                      const products = items?.productId;

                      return (
                        <View
                          style={{
                            width: '100%',
                            marginBottom: moderateScale(8),
                          }}
                          key={id}>
                          <CardCommons
                            title={''}
                            subTitle={''}
                            titleStyle={false}
                            subTitleStyle={false}
                            onPress={() =>
                              onPress({
                                ...item,
                                products: item.products.filter(
                                  prod => prod._id === items._id,
                                ),
                                orderId: item._id,
                                isReceived: item.isReceived,
                                reviewedProduct: item.reviewedProduct,
                              })
                            }
                            style={styles.card}>
                            <View style={styles.flexJustifyBetween}>
                              <View style={styles.boxProduct}>
                                <ImageWithNotFound
                                  styleNoData={styles.notFound}
                                  uri={products?.images[0]}
                                  style={{
                                    resizeMode: 'contain',
                                    width: moderateScale(50),
                                    height: moderateScale(50),
                                    borderRadius: moderateScale(8),
                                  }}
                                />

                                <Gap height={0} width={moderateScale(8)} />

                                <View style={styles.viewDesc}>
                                  <Text style={styles.title}>
                                    {products?.name ? products?.name : '-'}
                                  </Text>

                                  <Text style={styles.textGraySemiBold}>
                                    {formatIdr(
                                      products?.price ? products?.price : 0,
                                    )}
                                  </Text>
                                </View>
                              </View>
                              <Text style={styles.text}>
                                {items?.quantity ? 'x' + items?.quantity : '-'}
                              </Text>
                            </View>
                          </CardCommons>
                        </View>
                      );
                    })
                  ) : (
                    <ImageWithNotData />
                  )}
                </React.Fragment>
              );
            }}
          />
        ) : (
          <ImageWithNotData />
        )}
      </ScrollView>
    </View>
  );
};

export default OrderSections;
