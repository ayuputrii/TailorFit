import React, {useState} from 'react';
import {BackHeader, Gap} from '../../components';
import IconANT from 'react-native-vector-icons/AntDesign';
import {colors} from '../../utils/colors';
import {moderateScale} from '../../utils/scale';
import {ScrollView, View} from 'react-native';
import styles from './styles';
import {RatingSections} from '../../sections';
import {Asset} from 'react-native-image-picker';
import {RatingProps} from '../../navigation';
import {getData} from '../../utils/async-storage';

const Rating = ({navigation}: RatingProps) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [photo, setPhoto] = useState<Asset[] | undefined | string>('');

  const onSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('rating', rating);
      formData.append('comment', comment);
      formData.append('dir', 'profile');
      if (typeof photo !== 'string') {
        Array.from(photo).forEach((item: any) => {
          formData.append('images', {
            uri: item?.uri,
            name: 'photo.jpg',
            type: 'image/jpeg',
          });
        });
      }

      const token = await getData('ACCESS_TOKEN');
    } catch (error) {
      console.log('error submit rating', error);
    }
  };

  return (
    <View style={styles.container}>
      <BackHeader
        title="Rating"
        goBack={() => navigation?.goBack()}
        icon={
          <IconANT
            name="logout"
            color={colors.black}
            size={moderateScale(20)}
          />
        }>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <Gap height={moderateScale(8)} width={0} />
          <RatingSections
            rating={rating}
            setRating={setRating}
            comment={comment}
            setComment={setComment}
            photo={photo}
            setPhoto={setPhoto}
            onSubmit={onSubmit}
          />
          <Gap height={moderateScale(8)} width={0} />
        </ScrollView>
      </BackHeader>
    </View>
  );
};

export default Rating;
