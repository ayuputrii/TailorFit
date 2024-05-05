import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {colors} from '../../utils/colors';
import {BackgroundWithImage, HeaderNotLogin} from '../../components/commons';
import LoginSections from '../../sections/Login';
import styles from './styles';
import {LoginProps} from '../../navigation';
import {API_LOGIN, BASE_URL, postData} from '../../api';
import {ModalConfirmation} from '../../components';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {removeData, saveData} from '../../utils/async-storage';

const Login = ({navigation}: LoginProps) => {
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
      setErrorEmail('Email harap diisi');
    } else {
      setErrorEmail('');
    }
    if (password === '') {
      setErrorPassword('Password harap diisi');
    } else {
      setErrorPassword('');
    }

    if (email && password) {
      setLoading(true);

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
          await saveData('ACCESS_TOKEN', response.data.data.accessToken);
          navigation.replace('MainTabs');
        } else {
          setLoading(false);
          setDisabled(false);
          setShowModal(true);
          setTitle('Login is Failed');
          setMessage(response?.data?.message || response?.data?.error?.message);
        }
      } catch (error: any) {
        console.log('ERROR__', error);
        setLoading(false);
        setDisabled(false);
        setShowModal(true);
        setTitle('Login is Failed');
        setMessage("Server is encountered with problem! We'll fix it soon.");
      }
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
    <BackgroundWithImage
      backgroundChildren={false}
      src={require('../../assets/images/img-rainbow.png')}>
      <ScrollView style={styles.scroll}>
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
      </ScrollView>
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
  );
};

export default Login;
