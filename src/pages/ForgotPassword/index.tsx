import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {colors} from '../../utils/colors';
import {
  BackgroundWithImage,
  HeaderNotLogin,
  ModalConfirmation,
} from '../../components';
import {ForgotPasswordSections} from '../../sections';
import styles from './styles';
import {ForgotPasswordProps} from '../../navigation';
import {API_FORGOT_PASSWORD, BASE_URL, postData} from '../../api';
import {images} from '../../assets';

const ForgotPassword = ({navigation}: ForgotPasswordProps) => {
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [errorEmail, setErrorEmail] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [modalError, setModalError] = useState(false);

  const onSendEmail = async () => {
    const data = {
      email,
    };

    if (email === '') {
      setErrorEmail('Email is required');
    } else {
      setErrorEmail('');
    }

    if (email) {
      setLoading(true);
      setDisabled(true);

      try {
        const response: any = await postData(
          BASE_URL + API_FORGOT_PASSWORD,
          data,
        );
        if (response?.data?.success) {
          setLoading(false);
          setDisabled(false);
          setShowModal(false);
          setModalError(false);
          navigation.navigate('VerifyOTP', {
            email,
          });
          setEmail('');
        } else {
          setLoading(false);
          setDisabled(false);
          setShowModal(true);
          setModalError(true);
          setTitle('Verify Email is Failed');
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
        setTitle('Verify Email is Failed');
        setMessage("Server is encountered with problem! We'll fix it soon.");
      }
    }
  };

  return (
    <BackgroundWithImage backgroundChildren={false} src={images.imgRainbow}>
      <ScrollView style={styles.scroll}>
        <HeaderNotLogin
          title="Forgot Password"
          subTitle={`Please enter the email with your account ${'\n'} and well send the instruction to ${'\n'} reset to your email.`}
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
        />
      </ScrollView>

      <ModalConfirmation
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        title={title}
        message={message}
        textBtn={'Close'}
        onSubmit={() => setShowModal(false)}
        style={modalError ? styles.modalError : null}
      />
    </BackgroundWithImage>
  );
};

export default ForgotPassword;
