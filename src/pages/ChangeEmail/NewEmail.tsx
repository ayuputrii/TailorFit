import React, {useState} from 'react';
import {View} from 'react-native';
import {colors} from '../../utils/colors';
import {BackHeader, ModalConfirmation} from '../../components';
import {ChangeEmailSections} from '../../sections';
import styles from './styles';
import {NewEmailProps} from '../../navigation';
import {API_UPDATE_EMAIL, BASE_URL, putDataWithToken} from '../../api';
import {getData} from '../../utils/async-storage';
import IconANT from 'react-native-vector-icons/AntDesign';
import {moderateScale} from '../../utils/scale';

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
      setErrorEmail('Email is required');
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
          setTitle('Create New Email is Success');
          setMessage(response?.data?.message);
        } else {
          setIsError(true);
          setLoading(false);
          setDisabled(false);
          setShowModal(true);
          setTitle('Create New Email is Failed');
          setMessage(response?.data?.message);
        }
      } catch (error: any) {
        setIsError(true);
        setLoading(false);
        setDisabled(false);
        setShowModal(true);
        setTitle('Create New Email is Failed');
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
          <ChangeEmailSections
            email={email}
            setEmail={setEmail}
            onSendEmail={onSendEmail}
            errorEmail={errorEmail}
            disabled={disabled}
            loading={loading}
          />
        </BackHeader>
      </View>

      <ModalConfirmation
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        title={title}
        message={message}
        textBtn={isError ? 'Close' : 'Back to Settings'}
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
    </React.Fragment>
  );
};

export default NewEmail;
