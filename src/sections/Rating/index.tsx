import React, {Dispatch, SetStateAction} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {
  Buttons,
  Gap,
  InputMultipleFile,
  InputTextArea,
  Text,
} from '../../components';
import {styles} from './styles';
import StarRating from 'react-native-star-rating-widget';
import {moderateScale} from '../../utils/scale';
import {Asset} from 'react-native-image-picker';
import {colors} from '../../utils/colors';

interface RatingSectionsProps {
  rating: number;
  setRating: Dispatch<SetStateAction<number>>;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  onSubmit: () => void;
  file: (Asset | string)[];
  setFile: Dispatch<SetStateAction<(Asset | string)[]>>;
  disabled?: boolean;
  loading?: boolean;
}

const RatingSections = ({
  rating,
  setRating,
  comment,
  setComment,
  onSubmit,
  file,
  setFile,
  disabled,
  loading,
}: RatingSectionsProps) => {
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

      <Text style={styles.txt}>Tambahkan Foto</Text>

      <InputMultipleFile file={file} setFile={setFile} />

      <Gap height={moderateScale(16)} width={0} />

      <Text style={styles.txt}>Komentar</Text>
      <InputTextArea
        value={comment}
        onChangeText={setComment}
        placeholder="Baju ini bagus..."
        placeholderTextColor={'#AFAFAF'}
        styleInput={undefined}
        styleText={undefined}
      />

      <Gap height={moderateScale(16)} width={0} />

      <Buttons
        style={[
          styles.btn,
          {
            backgroundColor: disabled ? colors.grey : colors.orange,
          },
        ]}
        onPress={onSubmit}
        disabled={disabled}>
        <Text style={styles.txtBtn}>Kirim</Text>
        {loading && (
          <>
            <Gap width={moderateScale(8)} height={0} />
            <ActivityIndicator size="small" color={colors.white} />
          </>
        )}
      </Buttons>
    </View>
  );
};

export default RatingSections;
