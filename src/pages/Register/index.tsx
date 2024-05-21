import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
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
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorFullName, setErrorFullName] = useState('');
  const [errorPhone, setErrorPhone] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const onRegister = async () => {
    const data = {
      email,
      fullName,
      phone,
      password,
      role: 'CUSTOMER',
    };
    console.log('data', data);
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
    if (phone === '') {
      setErrorPhone('Phone Number harap diisi');
    } else {
      setErrorPhone('');
    }
    if (password === '') {
      setErrorPassword('Password harap diisi');
    } else {
      setErrorPassword('');
    }

    if (email && fullName && phone && password) {
      setLoading(true);
      setDisabled(true);

      try {
        const response: any = await postData(BASE_URL + API_REGISTER, data);
        console.log('ini response register', response);
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
          setMessage(
            response?.data?.message ||
              response?.data?.error?.message ||
              "Server is encountered with problem! We'll fix it soon.",
          );
        }
      } catch (error: any) {
        setLoading(false);
        setDisabled(false);
        setErrors(true);
        setShowModal(true);
        setTitle('Register is Failed');
        setMessage(error?.data?.message);
      }
    } else {
      setLoading(false);
      setDisabled(false);
      setShowModal(false);
    }
  };

  const onGoogle = () => {};

  return (
    <BackgroundWithImage
      backgroundChildren={false}
      src={require('../../assets/images/img-rainbow.png')}>
      <ScrollView
        style={styles.scroll}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
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
            phone={phone}
            setPhone={setPhone}
            navigation={navigation}
            onRegister={onRegister}
            onGoogle={onGoogle}
            disabled={disabled}
            errorEmail={errorEmail}
            errorFullName={errorFullName}
            errorPhone={errorPhone}
            errorPassword={errorPassword}
            loading={loading}
          />
        </View>
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
