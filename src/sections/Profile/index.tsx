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
  InputNumber,
  InputText,
  PhotoWithNotFound,
  Text,
} from '../../components';
import styles from './styles';
import {moderateScale} from '../../utils/scale';
import {UserDataTypes} from '../../types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {launchImageLibrary} from 'react-native-image-picker';

interface ProfileSectionsProps {
  user: UserDataTypes;
  fullName: string;
  setFullName: Dispatch<SetStateAction<string>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  phone: string;
  setPhone: Dispatch<SetStateAction<string>>;
  address: string;
  setAddress: Dispatch<SetStateAction<string>>;
  gender: string;
  setGender: Dispatch<SetStateAction<string>>;
  birthday: string;
  setBirthday: Dispatch<SetStateAction<string>>;
  onPress: () => void;
  disabled: boolean;
  loading: boolean;
}

const ProfileSections = ({
  user,
  fullName,
  setFullName,
  email,
  setEmail,
  phone,
  setPhone,
  address,
  setAddress,
  gender,
  setGender,
  birthday,
  setBirthday,
  onPress,
  disabled,
  loading,
}: ProfileSectionsProps) => {
  const refFullName = useRef<TextInput>(null);
  const refEmail = useRef<TextInput>(null);
  const refphone = useRef<TextInput>(null);
  const refAddress = useRef<TextInput>(null);

  const [userPhoto, setUserPhoto] = useState('');

  const chooseFile = async (isCamera: boolean) => {
    const options = {
      mediaType: isCamera ? 'photo' : 'video',
    };

    try {
      const response = await launchImageLibrary(options);
      setUserPhoto(response?.assets[0]);
      console.log('pickedFile', response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    setFullName(user?.fullName);
    setEmail(user?.email);
    setPhone(user?.phone);
    setAddress(user?.address);
  }, [
    setFullName,
    setEmail,
    setPhone,
    setAddress,
    user?.fullName,
    user?.email,
    user?.phone,
    user?.address,
  ]);

  return (
    <View style={styles.content}>
      <View style={styles.viewButtonPhoto}>
        <Buttons
          disabled={false}
          onPress={(isCamera: boolean) => chooseFile(isCamera)}
          style={styles.btnPhoto}>
          <PhotoWithNotFound
            loading={loading}
            image={userPhoto?.uri}
            style={styles.photo}
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
        onSubmitEditing={() => refEmail.current?.focus()}
      />
      <InputText
        ref={refAddress}
        value={address}
        onChangeText={setAddress}
        placeholder="Address"
        placeholderTextColor={colors.gray}
        styleInput={undefined}
        styleText={undefined}
        error={false}
        onSubmitEditing={onPress}
      />
      <InputText
        ref={refEmail}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        placeholderTextColor={colors.gray}
        styleInput={undefined}
        styleText={undefined}
        error={false}
        onSubmitEditing={() => refphone.current?.focus()}
      />
      <InputNumber
        ref={refphone}
        value={phone}
        onChangeText={setPhone}
        placeholder="Phone Number"
        placeholderTextColor={colors.gray}
        styleInput={undefined}
        styleText={undefined}
        error={false}
        onSubmitEditing={() => refAddress.current?.focus()}
      />
      <Buttons
        onPress={onPress}
        disabled={disabled}
        style={styles.btn}
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
