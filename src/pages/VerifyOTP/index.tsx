import React, {useMemo, useState} from 'react';
import {ActivityIndicator, ScrollView, View} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {colors} from '../../utils/colors';
import {
  BackgroundWithImage,
  Buttons,
  Gap,
  HeaderNotLogin,
  ModalConfirmation,
  Text,
} from '../../components';
import styles from './styles';
import {
  API_FORGOT_PASSWORD,
  API_VERIFY_OTP,
  BASE_URL,
  postData,
} from '../../api';
import {moderateScale} from '../../utils/scale';
import {VerifyOTPProps} from '../../navigation';
import {images} from '../../assets';

const CELL_COUNT = 6;

const VerifyOTP = ({navigation}: VerifyOTPProps) => {
  const email = useMemo(() => {
    return navigation.getState().routes.find(item => item.name === 'VerifyOTP')
      ?.params?.email;
  }, [navigation]);

  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [errorOTP, setErrorOTP] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [showModalEmail, setShowModalEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingReset, setLoadingReset] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [isError, setIsError] = useState(false);

  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const onSendOTP = async () => {
    const data = {
      otp: value,
      email,
    };

    if (value === '') {
      setErrorOTP('OTP is required');
    } else {
      setErrorOTP('');
    }

    if (value) {
      setLoading(true);

      try {
        const response: any = await postData(BASE_URL + API_VERIFY_OTP, data);
        if (response?.data?.success) {
          setLoading(false);
          setDisabled(false);
          setIsError(false);
          setShowModal(true);
          setTitle('Verify OTP is Success');
          setMessage(response?.data?.message);
        } else {
          setLoading(false);
          setDisabled(false);
          setIsError(true);
          setShowModal(true);
          setTitle('Verify OTP is Failed');
          setMessage(response?.data?.message);
        }
      } catch (error: any) {
        setLoading(false);
        setDisabled(false);
        setIsError(true);
        setShowModal(true);
        setTitle('Verify OTP is Failed');
        setMessage("Server is encountered with problem! We'll fix it soon.");
      }
    }
  };

  const onSendEmail = async () => {
    const data = {
      email,
    };

    setLoadingReset(true);
    setDisabled(true);

    try {
      const response: any = await postData(
        BASE_URL + API_FORGOT_PASSWORD,
        data,
      );
      if (response?.data?.success) {
        setLoadingReset(false);
        setDisabled(false);
        setShowModalEmail(false);
      } else {
        setLoadingReset(false);
        setDisabled(false);
        setShowModalEmail(true);
        setTitle('Verify Email is Failed');
        setMessage(response?.data?.message);
      }
    } catch (error: any) {
      setLoadingReset(false);
      setDisabled(false);
      setShowModalEmail(true);
      setTitle('Verify Email is Failed');
      setMessage("Server is encountered with problem! We'll fix it soon.");
    }
  };

  return (
    <BackgroundWithImage backgroundChildren={false} src={images.imgRainbow}>
      <ScrollView style={styles.scroll}>
        <HeaderNotLogin
          title="Verify Your Email"
          subTitle={`Please enter the 4 digit code sent to ${'\n'} ayuputri.12378@gmal.com.`}
          fontSizeSub={12}
          subColor={colors.lightgray}
          marginTop={0}
        />

        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
        {errorOTP && (
          <React.Fragment>
            <Gap height={moderateScale(30)} width={0} />
            <Text style={styles.error}>{errorOTP}</Text>
          </React.Fragment>
        )}

        <Buttons
          onPress={onSendEmail}
          style={false}
          children={
            <View style={styles.flexRow}>
              {loadingReset && (
                <ActivityIndicator size="small" color={colors.orange} />
              )}
              <Gap width={moderateScale(3)} height={0} />
              <Text style={styles.txt}>Resend Code...</Text>
            </View>
          }
          disabled={false}
        />

        <Buttons
          onPress={onSendOTP}
          style={styles.btn}
          children={
            <View style={styles.flexRow}>
              {loading && (
                <ActivityIndicator size="small" color={colors.white} />
              )}
              <Gap width={moderateScale(3)} height={0} />
              <Text style={styles.text}>Verify</Text>
            </View>
          }
          disabled={disabled}
        />

        <ModalConfirmation
          isVisible={showModal}
          onClose={() => setShowModal(false)}
          title={title}
          message={message}
          textBtn={isError ? 'Close' : 'OK'}
          onSubmit={
            isError
              ? () => setShowModal(false)
              : () => {
                  setShowModal(false);
                  navigation.navigate('NewPassword');
                }
          }
          style={styles.modal}
        />

        <ModalConfirmation
          isVisible={showModalEmail}
          onClose={() => setShowModalEmail(false)}
          title={title}
          message={message}
          textBtn="Close"
          onSubmit={() => setShowModalEmail(false)}
          style={styles.modal}
        />
      </ScrollView>
    </BackgroundWithImage>
  );
};

export default VerifyOTP;
