import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import {ActivityIndicator, TextInput, View} from 'react-native';
import {colors} from '../../utils/colors';
import {
  Buttons,
  Gap,
  InputCalendar,
  InputDropdown,
  InputNumber,
  InputText,
  PhotoWithNotFound,
  Text,
} from '../../components';
import styles from './styles';
import {moderateScale} from '../../utils/scale';
import {menu, UserDataTypes} from '../../types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Asset,
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import {Gender} from '../../constants/MenuDropdown';
import {useNavigation} from '@react-navigation/native';
interface ProfileSectionsProps {
  user: UserDataTypes;
  photo: Asset[] | undefined | string;
  setPhoto: Dispatch<SetStateAction<Asset[] | undefined | string>>;
  fullName: string | undefined;
  setFullName: Dispatch<SetStateAction<string | undefined>>;
  gender: string | undefined;
  setGender: Dispatch<SetStateAction<string | undefined>>;
  birthday: string | null | undefined;
  setBirthday: Dispatch<SetStateAction<string | null | undefined>>;
  phone: string | undefined;
  setPhone: Dispatch<SetStateAction<string | undefined>>;
  email: string | undefined;
  setEmail: Dispatch<SetStateAction<string | undefined>>;
  onPress: () => void;
  disabled: boolean;
  loading: boolean;
  goShowModalCalendar: () => void;
}

const ProfileSections = ({
  user,
  photo,
  setPhoto,
  fullName,
  setFullName,
  gender,
  setGender,
  birthday,
  setBirthday,
  phone,
  setPhone,
  email,
  setEmail,
  onPress,
  disabled,
  loading,
  goShowModalCalendar,
}: ProfileSectionsProps) => {
  const navigation = useNavigation();

  const [isFocus, setIsFocus] = useState<boolean>(false);

  const refFullName = useRef<TextInput>(null);

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

  const onChangeGender = (gender: menu) => {
    setGender(gender?.id);
  };

  useEffect(() => {
    if (user?.profilePicture) {
      setPhoto(user?.profilePicture);
    }
    setFullName(user?.fullName);
    setGender(user?.gender);
    setBirthday(user?.birthday);
    setPhone(user?.phone);
    setEmail(user?.email);
  }, [
    setPhoto,
    setFullName,
    setGender,
    setBirthday,
    setPhone,
    setEmail,
    user,
    user?.profilePicture,
    user?.fullName,
    user?.gender,
    user?.birthday,
    user?.phone,
  ]);

  return (
    <View style={styles.content}>
      <View style={styles.viewButtonPhoto}>
        <Buttons
          disabled={false}
          style={styles.btnPhoto}
          onPress={(isCamera: boolean) => chooseFile(isCamera)}>
          <PhotoWithNotFound
            loading={loading}
            image={typeof photo === 'string' ? photo : photo?.[0]?.uri || ''}
            size={moderateScale(40)}
            width={moderateScale(50)}
            height={moderateScale(50)}
          />
          <View style={styles.iconProfile}>
            <Icon name="edit" size={moderateScale(14)} color={colors.white} />
          </View>
        </Buttons>
      </View>
      <Gap height={moderateScale(24)} width={0} />
      <InputText
        ref={refFullName}
        value={fullName}
        onChangeText={setFullName}
        placeholder="Fullname"
        placeholderTextColor={colors.gray}
        styleInput={undefined}
        styleText={undefined}
        error={false}
      />
      <InputDropdown
        data={Gender}
        value={gender}
        setValue={onChangeGender}
        isFocus={isFocus}
        setIsFocus={setIsFocus}
      />
      <InputCalendar birthday={birthday} onPress={goShowModalCalendar} />
      <InputNumber
        value={phone}
        onChangeText={setPhone}
        placeholder="Phone"
        placeholderTextColor={colors.gray}
        styleInput={undefined}
        styleText={undefined}
        error={false}
        onSubmitEditing={onPress}
      />
      <InputText
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        placeholderTextColor={colors.gray}
        styleInput={{
          backgroundColor: email ? colors.gray : colors.white,
        }}
        styleText={undefined}
        error={false}
        editable={false}
        onFocus={() => navigation.navigate('ChangeEmail')}
      />
      <Buttons
        onPress={onPress}
        disabled={disabled}
        style={[
          styles.btn,
          // {
          //   marginTop: isFocus ? moderateScale(110) : moderateScale(24),
          // },
        ]}
        children={
          <View style={styles.flexRow}>
            {loading && <ActivityIndicator size="small" color={colors.white} />}
            <Gap width={moderateScale(3)} height={0} />
            <Text style={styles.text}>Update Profile</Text>
          </View>
        }
      />
    </View>
  );
};

export default ProfileSections;
