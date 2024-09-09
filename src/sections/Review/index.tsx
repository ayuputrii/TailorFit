import React from 'react';
import {CardCommons, Gap, HeaderReview, Text} from '../../components';
import {moderateScale} from '../../utils/scale';
import {colors} from '../../utils/colors';
import {FlatList, View} from 'react-native';
import styles from './styles';
import {ImagePreview} from 'react-native-images-preview';
import {images} from '../../assets';
import {StarRatingDisplay} from 'react-native-star-rating-widget';

interface ReviewSectionsProps {
  data: any;
}

const ReviewSections = ({data}: ReviewSectionsProps) => {
  const customer = data?.userId;

  return (
    <View
      style={{
        flexDirection: 'column',
        width: '100%',
      }}>
      <CardCommons
        title={''}
        subTitle={''}
        titleStyle={false}
        subTitleStyle={false}
        onPress={() => {}}
        disabled={false}
        style={styles.cardReview}>
        <View style={styles.contentReview}>
          <View style={styles.headerReview}>
            <HeaderReview
              title={customer?.fullName || '-'}
              subTitle={customer?.title || 'N/A'}
              image={customer?.profilePicture}
              loading={false}
            />

            <StarRatingDisplay
              rating={data?.rating || 0}
              emptyColor={colors.black}
              color={colors.orange}
              starSize={moderateScale(18)}
              starStyle={{
                width: moderateScale(10),
              }}
              maxStars={5}
            />
          </View>
          <Gap height={moderateScale(10)} width={0} />
        </View>
        <View style={styles.hr} />
        <View style={styles.contentReview}>
          <Gap height={moderateScale(10)} width={0} />
          <View style={styles.commentFileView}>
            <Text style={styles.comment}>
              Komentar: {data?.comment + '.' || '-'}
            </Text>
            <FlatList
              data={data?.media}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              numColumns={5}
              renderItem={({item, index}) => {
                return (
                  <React.Fragment key={index}>
                    <ImagePreview
                      imageSource={item ? {uri: item} : images.imgNoData}
                      imageStyle={styles.imageReview}
                    />
                    <Gap width={moderateScale(6)} height={0} />
                  </React.Fragment>
                );
              }}
              keyExtractor={(_item, index) => index.toString()}
            />
          </View>
        </View>
      </CardCommons>
      <Gap height={moderateScale(10)} width={0} />
    </View>
  );
};

export default ReviewSections;
