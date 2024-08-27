import React, {useContext, useState} from 'react';
import {SafeAreaView, ScrollView, StatusBar, View} from 'react-native';
import {colors} from '../../utils/colors';
import {
  BackgroundWithImage,
  BackHeader,
  HeaderNotLogin,
  ModalConfirmation,
} from '../../components';
import {ForgotPasswordSections} from '../../sections';
import styles from './styles';
import {ForgotPasswordProps} from '../../navigation';
import {
  API_FORGOT_PASSWORD,
  BASE_URL,
  postData,
  postDataWithToken,
} from '../../api';
import {images} from '../../assets';
import {AuthContext} from '../../context/AuthContext';
import {getData} from '../../utils/async-storage';

const ForgotPassword = ({navigation}: ForgotPasswordProps) => {
  const ctx = useContext(AuthContext);
  const isLogin = ctx?.isLogin;

  const [email, setEmail] = useState<string | undefined>('');
  const [title, setTitle] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [errorEmail, setErrorEmail] = useState<string>('');

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [modalError, setModalError] = useState(false);

  const onSendEmail = async () => {
    const data = {
      email,
    };

    if (email === '') {
      setErrorEmail('Email harus diisi');
    } else {
      setErrorEmail('');
    }

    if (email) {
      setLoading(true);
      setDisabled(true);

      try {
        const token = await getData('ACCESS_TOKEN');
        const response: any = isLogin
          ? await postDataWithToken(BASE_URL + API_FORGOT_PASSWORD, data, token)
          : await postData(BASE_URL + API_FORGOT_PASSWORD, data);

        if (response?.data?.success) {
          setLoading(false);
          setDisabled(false);
          setShowModal(false);
          setModalError(false);
          navigation.navigate('VerifyOTP', {
            email,
            titleParam: 'ForgotPassword',
          });
          setEmail('');
        } else {
          setLoading(false);
          setDisabled(false);
          setShowModal(true);
          setModalError(true);
          setTitle('Verifikasi Email Belum Berhasil');
          setMessage(
            response?.data?.message ||
              "Server is encountered with problem! We'll fix it soon.",
          );
        }
      } catch (error: any) {
        setLoading(false);
        setDisabled(false);
        setShowModal(true);
        setModalError(true);
        setTitle('Verifikasi Email Belum Berhasil');
        setMessage("Server is encountered with problem! We'll fix it soon.");
      }
    }
  };

  return (
    <React.Fragment>
      {isLogin ? (
        <SafeAreaView style={styles.container}>
          <StatusBar
            animated={false}
            backgroundColor={colors.basebg}
            barStyle="dark-content"
          />
          <BackHeader
            title="Ubah Kata Sandi"
            goBack={() => navigation?.goBack()}
            icon={false}>
            <ForgotPasswordSections
              email={email}
              setEmail={setEmail}
              onLogin={async () => navigation?.navigate('Login')}
              onSendEmail={onSendEmail}
              disabled={disabled}
              loading={loading}
              isLogin={isLogin}
              errorEmail={errorEmail}
            />
          </BackHeader>
        </SafeAreaView>
      ) : (
        <BackgroundWithImage backgroundChildren={false} src={images.imgRainbow}>
          <ScrollView style={styles.scroll}>
            <HeaderNotLogin
              title="Lupa Kata Sandi"
              subTitle={`Silakan masukkan email dengan akun Anda ${'\n'} dan kami akan mengirimkan kode ${'\n'} ke email Anda`}
              fontSizeSub={12}
              subColor={colors.lightgray}
              marginTop={0}
            />

            <ForgotPasswordSections
              email={email}
              setEmail={setEmail}
              onLogin={async () => navigation?.navigate('Login')}
              onSendEmail={onSendEmail}
              disabled={disabled}
              loading={loading}
              errorEmail={errorEmail}
              isLogin={isLogin}
            />
          </ScrollView>
        </BackgroundWithImage>
      )}
      <ModalConfirmation
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        title={title}
        message={message}
        textBtn={'Tutup'}
        onSubmit={() => setShowModal(false)}
        style={modalError ? styles.modalError : null}
      />
    </React.Fragment>
  );
};

export default ForgotPassword;
