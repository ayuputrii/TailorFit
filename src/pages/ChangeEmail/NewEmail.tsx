import React, {useState} from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import {BackHeader, ModalConfirmation} from '../../components';
import {ChangeEmailSections} from '../../sections';
import styles from './styles';
import {NewEmailProps} from '../../navigation';
import {API_UPDATE_EMAIL, BASE_URL, putDataWithToken} from '../../api';
import {getData} from '../../utils/async-storage';
import {colors} from '../../utils/colors';

const NewEmail = ({navigation}: NewEmailProps) => {
  const [email, setEmail] = useState<string | undefined>('');
  const [errorEmail, setErrorEmail] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const [showModal, setShowModal] = useState(false);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

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
        const response: any = await putDataWithToken(
          BASE_URL + API_UPDATE_EMAIL,
          data,
          token,
        );

        if (response?.data?.success) {
          setLoading(false);
          setDisabled(false);
          setShowModal(true);
          setTitle('Selamat,  berhasil!');
          setMessage(response?.data?.message || 'Email berhasil diubah');
        } else {
          setIsError(true);
          setLoading(false);
          setDisabled(false);
          setShowModal(true);
          setTitle('Mohon maaf, belum berhasil');
          setMessage(response?.data?.message || 'Email belum berhasil diubah');
        }
      } catch (error: any) {
        setIsError(true);
        setLoading(false);
        setDisabled(false);
        setShowModal(true);
        setTitle('Mohon maaf, belum berhasil');
        setMessage("Server is encountered with problem! We'll fix it soon.");
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={false}
        backgroundColor={colors.basebg}
        barStyle="dark-content"
      />
      <BackHeader
        title="Ubah Email"
        goBack={() => navigation?.goBack()}
        icon={false}>
        <ChangeEmailSections
          email={email}
          setEmail={setEmail}
          onSendEmail={onSendEmail}
          errorEmail={errorEmail}
          disabled={disabled}
          loading={loading}
        />
      </BackHeader>

      <ModalConfirmation
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        title={title}
        message={message}
        textBtn={isError ? 'Tutup' : 'Kembali ke Pengaturan'}
        onSubmit={
          isError
            ? () => setShowModal(false)
            : () => {
                setShowModal(false);
                navigation.replace('Settings');
              }
        }
        style={undefined}
      />
    </SafeAreaView>
  );
};

export default NewEmail;
