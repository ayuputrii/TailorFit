import React, {Dispatch, SetStateAction} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {
  Buttons,
  Gap,
  InputMultipleFile,
  InputTextArea,
  Text,
} from '../../components';
import {moderateScale} from '../../utils/scale';
import {Asset} from 'react-native-image-picker';
import {colors} from '../../utils/colors';
import {styles} from './styles';

interface ReturnSectionsProps {
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  onSubmit: () => void;
  file: (Asset | string)[];
  setFile: Dispatch<SetStateAction<(Asset | string)[]>>;
  disabled?: boolean;
  loading?: boolean;
}

const ReturnSections = ({
  comment,
  setComment,
  onSubmit,
  file,
  setFile,
  disabled,
  loading,
}: ReturnSectionsProps) => {
  return (
    <View style={styles.content}>
      <Text style={styles.txt}>Tambahkan Bukti Foto</Text>

      <InputMultipleFile file={file} setFile={setFile} />

      <Gap height={moderateScale(16)} width={0} />

      <Text style={styles.txt}>Alasan Pengembalian</Text>
      <InputTextArea
        value={comment}
        onChangeText={setComment}
        placeholder="Masukkan alasan..."
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

export default ReturnSections;
