import React, {useState} from 'react';
import {View} from 'react-native';
import {BackHeader, ModalConfirmation} from '../../components';
import styles from './styles';
import {ChangeEmailProps} from '../../navigation';
import {API_CHANGE_EMAIL, BASE_URL, postDataWithToken} from '../../api';
import {getData} from '../../utils/async-storage';
import {CurrentEmailSections} from '../../sections';

const ChangeEmail = ({navigation}: ChangeEmailProps) => {
  const [email, setEmail] = useState<string | undefined>('');
  const [title, setTitle] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [errorCurrentEmail, setErrorEmail] = useState<string>('');

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
        const response: any = await postDataWithToken(
          BASE_URL + API_CHANGE_EMAIL,
          data,
          token,
        );

        if (response?.data?.success) {
          setLoading(false);
          setDisabled(false);
          setShowModal(false);
          setModalError(false);
          navigation.navigate('VerifyOTP', {
            email,
            titleParam: 'ChangeEmail',
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
      <View style={styles.container}>
        <BackHeader
          title="Ubah Email"
          goBack={() => navigation?.goBack()}
          icon={false}>
          <CurrentEmailSections
            email={email}
            setEmail={setEmail}
            onSendEmail={onSendEmail}
            disabled={disabled}
            loading={loading}
            errorCurrentEmail={errorCurrentEmail}
          />
        </BackHeader>
      </View>

      <ModalConfirmation
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        title={title}
        message={message}
        textBtn={'Close'}
        onSubmit={() => setShowModal(false)}
        style={modalError ? styles.modalError : null}
      />
    </React.Fragment>
  );
};

export default ChangeEmail;
