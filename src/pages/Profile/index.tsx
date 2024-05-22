import React, {useEffect, useState} from 'react';
import {BackHeader, Gap, ModalConfirmation} from '../../components';
import {moderateScale} from '../../utils/scale';
import {SafeAreaView, ScrollView, StatusBar} from 'react-native';
import styles from './styles';
import {ProfileProps} from '../../navigation';
import {ProfileSections} from '../../sections';
import {API_PROFILE, BASE_URL, putData} from '../../api';
import {colors} from '../../utils/colors';
import {getData} from '../../utils/async-storage';
import {UserDataTypes} from '../../types';

interface User {
  customer: UserDataTypes;
}

const Profile = ({navigation}: ProfileProps) => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [user, setUser] = useState<User>({} as User);

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const getUser = async () => {
    const response = await getData('USER_DATA_LOGIN');
    setUser(response);
  };

  const onUpdateProfile = async () => {
    const data = {
      email,
      fullName,
      phone,
      address,
      gender,
      role: 'CUSTOMER',
    };

    setLoading(true);
    setDisabled(true);

    const token = await getData('ACCESS_TOKEN');

    try {
      const response: any = await putData(BASE_URL + API_PROFILE, data, token);
      if (response?.data?.success) {
        setLoading(false);
        setDisabled(false);
        setShowModal(true);
        setTitle('Update Profile is Success');
        setMessage(response?.data?.message);
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
      }
    } catch (error: any) {
      console.log('error', error);
      setLoading(false);
      setDisabled(false);
      setShowModal(true);
      setTitle('Update Profile is Failed');
      setMessage(error?.message);
    }
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
      <BackHeader
        title="Edit Profile"
        goBack={() => navigation?.goBack()}
        icon={false}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <Gap height={moderateScale(8)} width={0} />
          <ProfileSections
            gender={gender}
            setGender={setGender}
            birthday={birthday}
            setBirthday={setBirthday}
            email={email}
            setEmail={setEmail}
            fullName={fullName}
            setFullName={setFullName}
            phone={phone}
            setPhone={setPhone}
            address={address}
            setAddress={setAddress}
            onPress={onUpdateProfile}
            disabled={disabled}
            loading={loading}
            user={user?.customer}
          />
          <Gap height={moderateScale(8)} width={0} />
        </ScrollView>
      </BackHeader>

      <ModalConfirmation
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        title={title}
        message={message}
        textBtn="Close"
        onSubmit={() => setShowModal(false)}
        style={undefined}
      />
    </SafeAreaView>
  );
};

export default Profile;
