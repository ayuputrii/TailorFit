import React, {useMemo, useState} from 'react';
import {ScrollView} from 'react-native';
import {colors} from '../../utils/colors';
import {
  BackgroundWithImage,
  HeaderNotLogin,
  ModalConfirmation,
} from '../../components';
import {NewPasswordSections} from '../../sections';
import styles from './styles';
import {NewPasswordProps} from '../../navigation';
import {API_RESET_PASSWORD, BASE_URL, postData} from '../../api';
import {images} from '../../assets';

const NewPassword = ({navigation}: NewPasswordProps) => {
  const email = useMemo(() => {
    return navigation.getState().routes.find(item => item.name === 'VerifyOTP')
      ?.params?.email;
  }, [navigation]);

  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

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
      setErrorPassword('Password is required');
    } else {
      setErrorPassword('');
    }

    if (password) {
      setLoading(true);
      setDisabled(true);

      try {
        const response: any = await postData(
          BASE_URL + API_RESET_PASSWORD,
          data,
        );
        if (response?.data?.success) {
          setLoading(false);
          setDisabled(false);
          setShowModal(true);
          setTitle('Reset Password is Success');
          setMessage(response?.data?.message);
        } else {
          setIsError(true);
          setLoading(false);
          setDisabled(false);
          setShowModal(true);
          setTitle('Reset Password is Failed');
          setMessage(response?.data?.message);
        }
      } catch (error: any) {
        setIsError(true);
        setLoading(false);
        setDisabled(false);
        setShowModal(true);
        setTitle('Reset Password is Failed');
        setMessage("Server is encountered with problem! We'll fix it soon.");
      }
    }
  };

  return (
    <BackgroundWithImage backgroundChildren={false} src={images.imgRainbow}>
      <ScrollView style={styles.scroll}>
        <HeaderNotLogin
          title="Create New Password"
          subTitle={`Please enter your new password and ${'\n'} confirm password.`}
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
          onLogin={() => navigation.replace('Login')}
        />
      </ScrollView>

      <ModalConfirmation
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        title={title}
        message={message}
        textBtn={isError ? 'Close' : 'Login'}
        onSubmit={
          isError
            ? () => setShowModal(false)
            : () => {
                setShowModal(false);
                navigation.replace('Login');
              }
        }
        style={undefined}
      />
    </BackgroundWithImage>
  );
};

export default NewPassword;
