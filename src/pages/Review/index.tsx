import React, {useEffect, useState} from 'react';
import {BackHeader, Gap, ImageWithNotData, Shimmer} from '../../components';
import {colors} from '../../utils/colors';
import {moderateScale} from '../../utils/scale';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import styles from './styles';
import {ReviewSections} from '../../sections';
import {ReviewProps} from '../../navigation';
import {API_REVIEW, BASE_URL, getDataResponse} from '../../api';

const Review = ({navigation}: ReviewProps) => {
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [review, setReview] = useState<string>('');

  const getReview = async () => {
    setIsLoading(true);

    try {
      const response = await getDataResponse(BASE_URL + API_REVIEW);
      if (response?.data?.data) {
        setIsLoading(false);
        setReview(response?.data?.data);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    getReview();
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  };

  useEffect(() => {
    getReview();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    getReview();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={false}
        backgroundColor={colors.basebg}
        barStyle="dark-content"
      />
      <BackHeader
        title="Semua Ulasan dan Penilaian"
        goBack={() => navigation?.goBack()}
        icon={false}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <Gap height={moderateScale(8)} width={0} />
          {isLoading ? (
            <FlatList
              data={Array(2).fill(1)}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              renderItem={({index}) => (
                <View style={styles.cardShimmer}>
                  <Shimmer key={index} style={styles.cardShimmer} />
                </View>
              )}
              keyExtractor={(_item, index) => index.toString()}
            />
          ) : review?.length ? (
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
          ) : (
            <ImageWithNotData style={styles.noData} />
          )}
          <Gap height={moderateScale(120)} width={0} />
        </ScrollView>
      </BackHeader>
    </SafeAreaView>
  );
};

export default Review;
