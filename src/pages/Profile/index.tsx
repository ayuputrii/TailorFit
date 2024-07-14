import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import styles from './styles';
import {ProfileProps} from '../../navigation';
import {API_PROFILE, BASE_URL, getDataWithToken, putFormData} from '../../api';
import {colors} from '../../utils/colors';
import {getData} from '../../utils/async-storage';
import {UserDataTypes} from '../../types';
import ProfilePage from './ProfilePage';
import ModalCalendar from '../../components/modal/ModalCalendar';
import moment from 'moment';
import {Asset} from 'react-native-image-picker';

const Profile = ({navigation}: ProfileProps) => {
  const [photo, setPhoto] = useState<Asset[] | undefined | string>('');
  const [fullName, setFullName] = useState<string | undefined>('');
  const [gender, setGender] = useState<string | undefined>('');
  const [birthday, setBirthday] = useState<string | null | undefined>(null);
  const [phone, setPhone] = useState<string | undefined>('');
  const [email, setEmail] = useState<string | undefined>('');
  const [title, setTitle] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [user, setUser] = useState<UserDataTypes>({} as UserDataTypes);

  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalCalendar, setShowModalCalendar] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  const getUser = async () => {
    const token = await getData('ACCESS_TOKEN');

    const response = await getDataWithToken(BASE_URL + API_PROFILE, token);

    if (response?.data?.data) {
      setUser(response?.data?.data);
    }
  };

  const onDateChange = (date: string | null | undefined) => {
    setShowModalCalendar(false);
    setBirthday(date);
  };

  const onUpdateProfile = async () => {
    setLoading(true);
    setDisabled(true);

    const token = await getData('ACCESS_TOKEN');
    const formData = new FormData();

    if (typeof photo !== 'string') {
      Array.from(photo).forEach((item: any) => {
        formData.append('images', {
          uri: item?.uri,
          name: 'photo.jpg',
          type: 'image/jpeg',
        });
      });
    }

    formData.append('dir', 'profile');
    formData.append('fullName', fullName);
    formData.append('gender', (gender || '').toUpperCase());
    formData.append(
      'birthday',
      moment(birthday || new Date()).format('YYYY-MM-DD'),
    );
    formData.append('phone', phone);

    try {
      const response: any = await putFormData(
        BASE_URL + API_PROFILE,
        formData,
        token,
      );

      if (response?.data?.success) {
        setLoading(false);
        setDisabled(false);
        setShowModal(true);
        setTitle('Update Profile is Success');
        setMessage(
          response?.data?.message ||
            'Congratulation Update profile is success.',
        );
        getUser();
      } else {
        setLoading(false);
        setDisabled(false);
        setShowModal(true);
        setTitle('Update Profile is Failed');
        setMessage(
          response?.message ||
            response?.error?.message ||
            "Server is encountered with problem! We'll fix it soon.",
        );
        getUser();
      }
    } catch (error: any) {
      setLoading(false);
      setDisabled(false);
      setShowModal(true);
      setTitle('Update Profile is Failed');
      setMessage(error?.message);
      getUser();
    }
  };

  const goShowModalCalendar = () => {
    setShowModalCalendar(true);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={false}
        backgroundColor={colors.basebg}
        barStyle="dark-content"
      />
      <ProfilePage
        photo={photo}
        setPhoto={setPhoto}
        fullName={fullName}
        setFullName={setFullName}
        gender={gender}
        setGender={setGender}
        birthday={birthday}
        setBirthday={setBirthday}
        phone={phone}
        setPhone={setPhone}
        email={email}
        setEmail={setEmail}
        onUpdateProfile={onUpdateProfile}
        disabled={disabled}
        loading={loading}
        user={user}
        title={title}
        message={message}
        showModal={showModal}
        setShowModal={() => setShowModal(false)}
        navigation={navigation}
        goShowModalCalendar={goShowModalCalendar}
      />
      <ModalCalendar
        showCalendar={showModalCalendar}
        setShowCalendar={setShowModalCalendar}
        onDateChange={onDateChange}
      />
    </SafeAreaView>
  );
};

export default Profile;
