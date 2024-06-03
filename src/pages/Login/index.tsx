import React, {useContext, useState} from 'react';
import {SafeAreaView, ScrollView, StatusBar, View} from 'react-native';
import {colors} from '../../utils/colors';
import {BackgroundWithImage, HeaderNotLogin} from '../../components/commons';
import LoginSections from '../../sections/Login';
import styles from './styles';
import {LoginProps} from '../../navigation';
import {API_LOGIN, BASE_URL, postData} from '../../api';
import {ModalConfirmation} from '../../components';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {removeData, saveData} from '../../utils/async-storage';
import {KeyboardAvoidingView} from 'react-native';
import {AuthContext} from '../../context/AuthContext';
import {images} from '../../assets';

const Login = ({navigation}: LoginProps) => {
  const ctx = useContext(AuthContext);
  const login = ctx?.onLogin;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  const [showRemember, setShowRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const onLogin = async () => {
    const data = {
      email,
      password,
    };

    if (email === '') {
      setErrorEmail('Email is required');
    } else {
      setErrorEmail('');
    }
    if (password === '') {
      setErrorPassword('Password is required');
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
          setTitle('Login is Failed');
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
        setTitle('Login is Failed');
        setMessage("Server is encountered with problem! We'll fix it soon.");
      }
      setTitle('Login is Failed');
      setMessage("Server is encountered with problem! We'll fix it soon.");
    } else {
      setLoading(false);
      setDisabled(false);
      setShowModal(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      // setState({userInfo});
    } catch (error) {
      console.log('error', error);
      // if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      //   // user cancelled the login flow
      // } else if (error.code === statusCodes.IN_PROGRESS) {
      //   // operation (e.g. sign in) is in progress already
      // } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      //   // play services not available or outdated
      // } else {
      //   // some other error happened
      // }
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
                title="Sign In"
                subTitle="Please enter your email and enter password."
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
                loginWithGoogle={loginWithGoogle}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        <ModalConfirmation
          isVisible={showModal}
          onClose={() => setShowModal(false)}
          title={title}
          message={message}
          textBtn="Close"
          onSubmit={() => setShowModal(false)}
          style={undefined}
        />
      </BackgroundWithImage>
    </SafeAreaView>
  );
};

export default Login;
