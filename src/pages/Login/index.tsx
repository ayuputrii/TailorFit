import React, {useContext, useState} from 'react';
import {SafeAreaView, ScrollView, StatusBar, View} from 'react-native';
import {colors} from '../../utils/colors';
import {BackgroundWithImage, HeaderNotLogin} from '../../components/commons';
import LoginSections from '../../sections/Login';
import styles from './styles';
import {LoginProps} from '../../navigation';
import {
  API_GOOGLE_REGISTER_LOGIN,
  API_LOGIN,
  BASE_URL,
  postData,
} from '../../api';
import {ModalConfirmation} from '../../components';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {removeData, saveData} from '../../utils/async-storage';
import {KeyboardAvoidingView} from 'react-native';
import {AuthContext} from '../../context/AuthContext';
import {images} from '../../assets';

const Login = ({navigation}: LoginProps) => {
  const ctx = useContext(AuthContext);
  const login = ctx?.onLogin;

  const [email, setEmail] = useState<string | undefined>('');
  const [password, setPassword] = useState<string | undefined>('');
  const [title, setTitle] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [errorEmail, setErrorEmail] = useState<string>('');
  const [errorPassword, setErrorPassword] = useState<string>('');

  const [showRemember, setShowRemember] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  const onLogin = async () => {
    const data = {
      email,
      password,
    };

    if (email === '') {
      setErrorEmail('Email harus diisi');
    } else {
      setErrorEmail('');
    }
    if (password === '') {
      setErrorPassword('Password harus diisi');
    } else {
      setErrorPassword('');
    }

    if (email && password) {
      setLoading(true);
      setDisabled(true);

      try {
        const response: any = await postData(BASE_URL + API_LOGIN, data);
        if (response?.data?.success) {
          setLoading(false);
          setDisabled(false);
          setShowModal(false);
          if (showRemember) {
            await saveData('USER_LOGIN', JSON.stringify({email, password}));
          } else {
            await removeData('USER_LOGIN');
          }
          await saveData('USER_DATA_LOGIN', response?.data?.data);
          await saveData('ACCESS_TOKEN', response.data.data.accessToken);
          if (login) {
            login();
          }
          navigation.replace('MainTabs');
        } else {
          setLoading(false);
          setDisabled(false);
          setShowModal(true);
          setTitle('Login Belum Berhasil');
          setMessage(
            response?.data?.message ||
              response?.data?.error?.message ||
              "Server is encountered with problem! We'll fix it soon.",
          );
        }
      } catch (error: any) {
        setLoading(false);
        setDisabled(false);
        setShowModal(true);
        setTitle('Login Belum Berhasil');
        setMessage("Server is encountered with problem! We'll fix it soon.");
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
        setShowModal(false);
        if (showRemember) {
          await saveData('USER_LOGIN', JSON.stringify({email, password}));
        } else {
          await removeData('USER_LOGIN');
        }
        await saveData('USER_DATA_LOGIN', response?.data?.data);
        await saveData('ACCESS_TOKEN', response.data.data.accessToken);
        if (login) {
          login();
        }
        navigation.replace('MainTabs');
      } else {
        setLoading(false);
        setDisabled(false);
        setShowModal(true);
        setTitle('Login Belum Berhasil');
        setMessage(
          response?.data?.message ||
            response?.data?.error?.message ||
            "Server is encountered with problem! We'll fix it soon.",
        );
      }
    } catch {
      setLoading(false);
      setDisabled(false);
      setShowModal(true);
      setTitle('Login Belum Berhasil');
      setMessage("Server is encountered with problem! We'll fix it soon.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={false}
        backgroundColor={colors.white}
        barStyle="dark-content"
      />
      <BackgroundWithImage backgroundChildren={false} src={images.imgRainbow}>
        <KeyboardAvoidingView behavior={'height'} style={styles.container}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
              <HeaderNotLogin
                title="Login"
                subTitle="Harap masukkan email dan kata sandi Anda."
                fontSizeSub={12}
                subColor={colors.lightgray}
                marginTop={0}
              />

              <LoginSections
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                showRemember={showRemember}
                setShowRemember={() => setShowRemember(!showRemember)}
                navigation={navigation}
                onLogin={onLogin}
                loading={loading}
                disabled={disabled}
                errorEmail={errorEmail}
                errorPassword={errorPassword}
                loginWithGoogle={onGoogle}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        <ModalConfirmation
          isVisible={showModal}
          onClose={() => setShowModal(false)}
          title={title}
          message={message}
          textBtn="Tutup"
          onSubmit={() => setShowModal(false)}
          style={undefined}
        />
      </BackgroundWithImage>
    </SafeAreaView>
  );
};

export default Login;
