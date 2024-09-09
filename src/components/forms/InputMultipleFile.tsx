import React, {Dispatch, SetStateAction} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Buttons} from '../commons';
import {moderateScale} from '../../utils/scale';
import {colors} from '../../utils/colors';
import {
  Asset,
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import IconFeather from 'react-native-vector-icons/Feather';
import {ImagePreview} from 'react-native-images-preview';
import {images} from '../../assets';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDeletedFile} from '../../store/useDeletedFile';

interface InputMultipleFileProps {
  file: (Asset | string)[];
  setFile: Dispatch<SetStateAction<(Asset | string)[]>>;
}

const InputMultipleFile = ({file, setFile}: InputMultipleFileProps) => {
  const deletedFile = useDeletedFile();

  const chooseFile = async (isCamera: boolean) => {
    const options: ImageLibraryOptions = {
      mediaType: isCamera ? 'photo' : 'video',
    };

    try {
      const response = await launchImageLibrary(options);
      setFile(response?.assets as Asset[]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const onRemove = (index: number) => {
    if (typeof file[index] === 'string') {
      deletedFile.addFile(file[index]);
    }
    setFile(file?.filter((_, i) => i !== index));
  };

  return (
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

      <FlatList
        data={file}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={({item, index}) => {
          return (
            <View style={styles.viewFile}>
              <Buttons
                onPress={() => onRemove(index)}
                style={styles.btnClose}
                disabled={false}>
                <Icon
                  name="closecircle"
                  size={moderateScale(20)}
                  color={colors.red}
                />
              </Buttons>
              <ImagePreview
                key={index}
                imageSource={
                  item ? {uri: (item as Asset)?.uri || item} : images.imgNoData
                }
                imageStyle={styles.file}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flexRowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  viewFile: {
    paddingTop: moderateScale(8),
    position: 'relative',
  },
  btnPhoto: {
    borderWidth: moderateScale(1),
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: moderateScale(4),
    borderColor: colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(10),
    marginTop: moderateScale(8),
    backgroundColor: colors.white,
  },
  file: {
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: moderateScale(2),
    resizeMode: 'cover',
    borderWidth: moderateScale(1),
    backgroundColor: colors.white,
    borderColor: colors.gray,
  },
  btnClose: {
    position: 'absolute',
    right: -10,
    top: 0,
    zIndex: 100,
  },
});

export default InputMultipleFile;
