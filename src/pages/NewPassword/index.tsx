import React, {useContext, useState} from 'react';
import {SafeAreaView, ScrollView, StatusBar} from 'react-native';
import {colors} from '../../utils/colors';
import {
  BackgroundWithImage,
  BackHeader,
  HeaderNotLogin,
  ModalConfirmation,
} from '../../components';
import {NewPasswordSections} from '../../sections';
import styles from './styles';
import {NewPasswordProps} from '../../navigation';
import {
  API_RESET_PASSWORD,
  BASE_URL,
  postData,
  postDataWithToken,
} from '../../api';
import {images} from '../../assets';
import {AuthContext} from '../../context/AuthContext';
import {getData} from '../../utils/async-storage';
import {useRoute} from '@react-navigation/native';

const NewPassword = ({navigation}: NewPasswordProps) => {
  const ctx = useContext(AuthContext);
  const isLogin = ctx?.isLogin;

  const route = useRoute();

  const email = route?.params?.email;

  const [password, setPassword] = useState<string | undefined>('');
  const [errorPassword, setErrorPassword] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const [showModal, setShowModal] = useState(false);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const onConfirmPassword = async () => {
    const data = {
      email,
      password,
    };

    if (password === '') {
      setErrorPassword('Harap isi kata sandi baru Anda');
    } else {
      setErrorPassword('');
    }

    if (password) {
      setLoading(true);
      setDisabled(true);

      try {
        const token = await getData('ACCESS_TOKEN');
        const response: any = isLogin
          ? await postDataWithToken(BASE_URL + API_RESET_PASSWORD, data, token)
          : await postData(BASE_URL + API_RESET_PASSWORD, data);

        if (response?.data?.success) {
          setLoading(false);
          setDisabled(false);
          setShowModal(true);
          setTitle('Selamat, berhasil!');
          setMessage(
            response?.data?.message || 'Kata Sandi Baru Anda Berhasil di Ubah',
          );
        } else {
          setIsError(true);
          setLoading(false);
          setDisabled(false);
          setShowModal(true);
          setTitle('Mohon maaf, gagal');
          setMessage(
            response?.data?.message ||
              'Kata Sandi Baru Anda Belum Berhasil di Ubah',
          );
        }
      } catch (error: any) {
        setIsError(true);
        setLoading(false);
        setDisabled(false);
        setShowModal(true);
        setTitle('Kata Sandi Baru Anda Belum Berhasil di Ubah');
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
            <NewPasswordSections
              password={password}
              setPassword={setPassword}
              onConfirmPassword={onConfirmPassword}
              errorPassowrd={errorPassword}
              disabled={disabled}
              loading={loading}
              isLogin={isLogin}
            />
          </BackHeader>
        </SafeAreaView>
      ) : (
        <BackgroundWithImage backgroundChildren={false} src={images.imgRainbow}>
          <ScrollView style={styles.scroll}>
            <HeaderNotLogin
              title="Buat Kata Sandi Baru"
              subTitle={`Harap isi kata sandi baru Anda dan ${'\n'} konfirmasi kata sandi.`}
              fontSizeSub={12}
              subColor={colors.lightgray}
              marginTop={0}
            />

            <NewPasswordSections
              password={password}
              setPassword={setPassword}
              onConfirmPassword={onConfirmPassword}
              errorPassowrd={errorPassword}
              disabled={disabled}
              loading={loading}
              isLogin={isLogin}
              onLogin={() => navigation.replace('Login')}
            />
          </ScrollView>
        </BackgroundWithImage>
      )}

      <ModalConfirmation
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        title={title}
        message={message}
        textBtn={
          isLogin
            ? isError
              ? 'Tutup'
              : 'Kembali ke Pengaturan'
            : isError
            ? 'Tutup'
            : 'Login'
        }
        onSubmit={
          isLogin
            ? isError
              ? () => setShowModal(false)
              : () => {
                  setShowModal(false);
                  navigation.replace('Settings');
                }
            : isError
            ? () => setShowModal(false)
            : () => {
                setShowModal(false);
                navigation.replace('Login');
              }
        }
        style={undefined}
      />
    </React.Fragment>
  );
};

export default NewPassword;
