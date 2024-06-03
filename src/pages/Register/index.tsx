import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {colors} from '../../utils/colors';
import {BackgroundWithImage, HeaderNotLogin} from '../../components/commons';
import {RegisterSections} from '../../sections';
import styles from './styles';
import {RegisterProps} from '../../navigation';
import {
  API_GOOGLE_REGISTER_LOGIN,
  API_REGISTER,
  BASE_URL,
  postData,
} from '../../api';
import {ModalConfirmation} from '../../components';
import {images} from '../../assets';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const Register = ({navigation}: RegisterProps) => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorFullName, setErrorFullName] = useState('');
  const [errorPhone, setErrorPhone] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const onRegister = async () => {
    const data = {
      email,
      fullName,
      phone,
      password,
      role: 'CUSTOMER',
    };
    console.log('data', data);
    if (email === '') {
      setErrorEmail('Email is required');
    } else {
      setErrorEmail('');
    }
    if (fullName === '') {
      setErrorFullName('FullName is required');
    } else {
      setErrorFullName('');
    }
    if (phone === '') {
      setErrorPhone('Phone Number is required');
    } else {
      setErrorPhone('');
    }
    if (password === '') {
      setErrorPassword('Password is required');
    } else {
      setErrorPassword('');
    }

    if (email && fullName && phone && password) {
      setLoading(true);
      setDisabled(true);

      try {
        const response: any = await postData(BASE_URL + API_REGISTER, data);
        if (response?.data?.success) {
          setLoading(false);
          setDisabled(false);
          setErrors(false);
          setShowModal(true);
          setTitle('Register is Success');
          setMessage(response?.data?.message);
        } else {
          setLoading(false);
          setDisabled(false);
          setErrors(true);
          setShowModal(true);
          setTitle('Register is Failed');
          setMessage(
            response?.data?.message ||
              response?.data?.error?.message ||
              "Server is encountered with problem! We'll fix it soon.",
          );
        }
      } catch (error: any) {
        setLoading(false);
        setDisabled(false);
        setErrors(true);
        setShowModal(true);
        setTitle('Register is Failed');
        setMessage(
          error?.data?.message ||
            "Server is encountered with problem! We'll fix it soon.",
        );
      }
    } else {
      setLoading(false);
      setDisabled(false);
      setShowModal(false);
    }
  };

  const onGoogle = async () => {
    const userInfo = await GoogleSignin.signIn();

    try {
      const data = {
        fullName: userInfo?.user?.name,
        email: userInfo?.user?.email,
        profilePicture: userInfo?.user?.photo,
      };

      const response = await postData(
        BASE_URL + API_GOOGLE_REGISTER_LOGIN,
        data,
      );
      if (response?.data?.success) {
        setLoading(false);
        setDisabled(false);
        setErrors(false);
        setShowModal(true);
        setTitle('Register is Success');
        setMessage(response?.data?.message);
      } else {
        setLoading(false);
        setDisabled(false);
        setErrors(true);
        setShowModal(true);
        setTitle('Register is Failed');
        setMessage(
          response?.data?.message ||
            response?.data?.error?.message ||
            "Server is encountered with problem! We'll fix it soon.",
        );
      }
    } catch (error: any) {
      setLoading(false);
      setDisabled(false);
      setErrors(true);
      setShowModal(true);
      setTitle('Register is Failed');
      setMessage(
        error?.data?.message ||
          "Server is encountered with problem! We'll fix it soon.",
      );
    }
  };

  return (
    <BackgroundWithImage backgroundChildren={false} src={images.imgRainbow}>
      <ScrollView
        style={styles.scroll}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <HeaderNotLogin
            title="Sign Up"
            subTitle={`Please enter your fullname, email, ${'\n'} userName and enter password.`}
            fontSizeSub={12}
            subColor={colors.lightgray}
            marginTop={0}
          />

          <RegisterSections
            email={email}
            setEmail={setEmail}
            fullName={fullName}
            setFullName={setFullName}
            password={password}
            setPassword={setPassword}
            phone={phone}
            setPhone={setPhone}
            navigation={navigation}
            onRegister={onRegister}
            onGoogle={onGoogle}
            disabled={disabled}
            errorEmail={errorEmail}
            errorFullName={errorFullName}
            errorPhone={errorPhone}
            errorPassword={errorPassword}
            loading={loading}
          />
        </View>
      </ScrollView>
      <ModalConfirmation
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        title={title}
        message={message}
        textBtn={errors ? 'Close' : 'Login'}
        onSubmit={() => {
          errors ? setShowModal(false) : navigation.replace('Login');
        }}
        style={undefined}
      />
    </BackgroundWithImage>
  );
};

export default Register;
