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
  const [email, setEmail] = useState<string | undefined>('');
  const [fullName, setFullName] = useState<string | undefined>('');
  const [phone, setPhone] = useState<string | undefined>('');
  const [password, setPassword] = useState<string | undefined>('');
  const [title, setTitle] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [errorEmail, setErrorEmail] = useState<string>('');
  const [errorFullName, setErrorFullName] = useState<string>('');
  const [errorPhone, setErrorPhone] = useState<string>('');
  const [errorPassword, setErrorPassword] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [errors, setErrors] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  const onRegister = async () => {
    const data = {
      email,
      fullName,
      phone,
      password,
      role: 'CUSTOMER',
    };

    if (email === '') {
      setErrorEmail('Email harus diisi');
    } else {
      setErrorEmail('');
    }
    if (fullName === '') {
      setErrorFullName('Nama Lengkap harus diisi');
    } else {
      setErrorFullName('');
    }
    if (phone === '') {
      setErrorPhone('Nomor Handphone harus diisi');
    } else {
      setErrorPhone('');
    }
    if (password === '') {
      setErrorPassword('Kata Sandi harus diisi');
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
          setTitle('Registrasi Berhasil');
          setMessage(response?.data?.message);
        } else {
          setLoading(false);
          setDisabled(false);
          setErrors(true);
          setShowModal(true);
          setTitle('Registrasi Belum Berhasil');
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
        setTitle('Register Belum Berhasil');
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
        setTitle('Register Berhasil');
        setMessage(response?.data?.message);
      } else {
        setLoading(false);
        setDisabled(false);
        setErrors(true);
        setShowModal(true);
        setTitle('Register Belum Berhasil');
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
      setTitle('Register Belum Berhasil');
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
            subTitle={`Harap masukkan nama lengkap, nomor handphone, ${'\n'} email, dan kata sandi Anda.`}
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
        textBtn={errors ? 'Tutup' : 'Sign In'}
        onSubmit={() => {
          errors ? setShowModal(false) : navigation.replace('Login');
        }}
        style={undefined}
      />
    </BackgroundWithImage>
  );
};

export default Register;
