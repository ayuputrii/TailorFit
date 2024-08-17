import React from 'react';
import {FlatList, View} from 'react-native';
import {Buttons, Gap, ImageWithNotData, TabViews, Text} from '../../components';
import styles from './styles';
import {moderateScale} from '../../utils/scale';
import {ProductsTypes} from '../../types';
import ReviewSections from '../Review';

interface TabsProductDetailProps {
  detailProduct: ProductsTypes;
  navigation: any;
  isLogin: boolean | undefined;
  review: string;
  totalReview: number | undefined;
}

const TabsProductDetail = ({
  detailProduct,
  navigation,
  isLogin,
  review,
  totalReview,
}: TabsProductDetailProps) => {
  const renderTab = ({route}: {route: {key: string; title: string}}) => {
    switch (route.key) {
      case 'detail':
        return (
          <>
            {detailProduct?.description ? (
              <View style={styles.contentTabs}>
                <Text style={styles.txtContentTab}>
                  {detailProduct?.description || ''}
                </Text>
                <Gap height={moderateScale(16)} width={0} />
              </View>
            ) : (
              <ImageWithNotData
                style={[styles.noData, {marginTop: moderateScale(24)}]}
              />
            )}
          </>
        );
      case 'review':
        return (
          <>
            {review?.length ? (
              <View style={styles.contentTabs}>
                {isLogin && (
                  <>
                    <Buttons
                      onPress={() => navigation?.navigate('Review')}
                      disabled={false}
                      style={styles.flexBetweenCenter}>
                      <Text style={styles.seeAll}>Ulasan dan Penilaian</Text>
                      <Text style={styles.seeAll}>Lihat Semua</Text>
                    </Buttons>
                    <Gap height={moderateScale(12)} width={0} />
                  </>
                )}
                <FlatList
                  data={review}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item, index}) => {
                    return (
                      <React.Fragment key={index}>
                        <ReviewSections data={item} />
                        <Gap height={moderateScale(12)} width={0} />
                      </React.Fragment>
                    );
                  }}
                  keyExtractor={(_item, index) => index.toString()}
                />

                <Gap height={moderateScale(16)} width={0} />
              </View>
            ) : (
              <ImageWithNotData
                style={[styles.noData, {marginTop: moderateScale(24)}]}
              />
            )}
          </>
        );
      default:
        return null;
    }
  };

  return <TabViews renderScene={renderTab} length={totalReview || 0} />;
};

export default TabsProductDetail;
