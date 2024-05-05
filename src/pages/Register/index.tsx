import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {colors} from '../../utils/colors';
import {BackgroundWithImage, HeaderNotLogin} from '../../components/commons';
import {RegisterSections} from '../../sections';
import styles from './styles';
import {RegisterProps} from '../../navigation';
import {API_REGISTER, BASE_URL, postData} from '../../api';
import {ModalConfirmation} from '../../components';

const Register = ({navigation}: RegisterProps) => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorFullName, setErrorFullName] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const onRegister = async () => {
    const data = {
      email,
      fullName,
      password,
      role: 'CUSTOMER',
    };
    if (email === '') {
      setErrorEmail('Email harap diisi');
    } else {
      setErrorEmail('');
    }
    if (fullName === '') {
      setErrorFullName('FullName harap diisi');
    } else {
      setErrorFullName('');
    }
    if (password === '') {
      setErrorPassword('Password harap diisi');
    } else {
      setErrorPassword('');
    }

    if (email && fullName && password) {
      setLoading(true);

      try {
        const response: any = await postData(BASE_URL + API_REGISTER, data);
        console.log('response regist', response);
        if (response?.data?.success) {
          setLoading(false);
          setDisabled(false);
          setErrors(false);
          setShowModal(true);
          setTitle('Register is Success');
          setMessage(response?.data?.message);
        } else {
          setLoading(false);
          setDisabled(false);
          setErrors(true);
          setShowModal(true);
          setTitle('Register is Failed');
          setMessage(response?.data?.message || response?.data?.error?.message);
        }
      } catch (error: any) {
        setLoading(false);
        setDisabled(false);
        setErrors(true);
        setShowModal(true);
        setTitle('Register is Failed');
        setMessage("Server is encountered with problem! We'll fix it soon.");
      }
    }
  };

  return (
    <BackgroundWithImage
      backgroundChildren={false}
      src={require('../../assets/images/img-rainbow.png')}>
      <ScrollView style={styles.scroll}>
        <HeaderNotLogin
          title="Sign Up"
          subTitle={`Please enter your fullname, email, ${'\n'} userName and enter password.`}
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
          navigation={navigation}
          onRegister={onRegister}
          disabled={disabled}
          errorEmail={errorEmail}
          errorFullName={errorFullName}
          errorPassword={errorPassword}
          loading={loading}
        />
      </ScrollView>
      <ModalConfirmation
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        title={title}
        message={message}
        textBtn={errors ? 'Close' : 'Login'}
        onSubmit={() => {
          errors ? setShowModal(false) : navigation.replace('Login');
        }}
        style={undefined}
      />
    </BackgroundWithImage>
  );
};

export default Register;
