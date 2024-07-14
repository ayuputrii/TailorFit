import React, {useState} from 'react';
import {View} from 'react-native';
import {colors} from '../../utils/colors';
import {BackHeader, ModalConfirmation} from '../../components';
import styles from './styles';
import {ChangeEmailProps} from '../../navigation';
import {API_CHANGE_EMAIL, BASE_URL, postDataWithToken} from '../../api';
import IconANT from 'react-native-vector-icons/AntDesign';
import {moderateScale} from '../../utils/scale';
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
      setErrorEmail('Email is required');
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
    <React.Fragment>
      <View style={styles.container}>
        <BackHeader
          title="Change Email"
          goBack={() => navigation?.goBack()}
          icon={
            <IconANT
              name="logout"
              color={colors.black}
              size={moderateScale(20)}
            />
          }>
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
