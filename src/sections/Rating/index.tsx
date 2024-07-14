import React, {Dispatch, SetStateAction} from 'react';
import {View} from 'react-native';
import {Buttons, Gap, InputTextArea, Text} from '../../components';
import {styles} from './styles';
import StarRating from 'react-native-star-rating-widget';
import {moderateScale} from '../../utils/scale';
import {
  Asset,
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import IconFeather from 'react-native-vector-icons/Feather';
import {colors} from '../../utils/colors';

interface RatingSectionsProps {
  rating: number;
  setRating: Dispatch<SetStateAction<number>>;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  onSubmit: () => void;
  photo: Asset[] | undefined | string;
  setPhoto: Dispatch<SetStateAction<Asset[] | undefined | string>>;
}

const RatingSections = ({
  rating,
  setRating,
  comment,
  setComment,
  onSubmit,
  photo,
  setPhoto,
}: RatingSectionsProps) => {
  const chooseFile = async (isCamera: boolean) => {
    const options: ImageLibraryOptions = {
      mediaType: isCamera ? 'photo' : 'video',
    };

    try {
      const response = await launchImageLibrary(options);
      setPhoto(response?.assets);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.content}>
      <Text style={styles.txt}>Give us a star</Text>
      <StarRating
        rating={rating}
        onChange={setRating}
        starSize={moderateScale(48)}
        color="#FFC806"
        style={styles.centerRating}
      />

      <Gap height={moderateScale(16)} width={0} />

      <Text style={styles.txt}>Add Photo</Text>
      <View style={styles.flexRowCenter}>
        <Buttons
          disabled={false}
          style={styles.btnPhoto}
          onPress={(isCamera: boolean) => chooseFile(isCamera)}>
          <IconFeather
            name="camera"
            color={colors.gray}
            size={moderateScale(30)}
          />
        </Buttons>

        <Buttons
          disabled={false}
          style={styles.btnPhoto}
          onPress={(isCamera: boolean) => chooseFile(isCamera)}>
          {/* <ImageWithNotFound uri={} /> */}
        </Buttons>
      </View>

      <Gap height={moderateScale(16)} width={0} />

      <Text style={styles.txt}>Tell us what you think</Text>
      <InputTextArea
        value={comment}
        onChangeText={setComment}
        placeholder="Awesome product.."
        placeholderTextColor={'#AFAFAF'}
        styleInput={undefined}
        styleText={undefined}
      />

      <Gap height={moderateScale(16)} width={0} />

      <Buttons style={styles.btn} onPress={onSubmit}>
        <Text style={styles.txtBtn}>Send</Text>
      </Buttons>
    </View>
  );
};

export default RatingSections;
