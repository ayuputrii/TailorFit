import React, {useContext, useMemo, useState} from 'react';
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
  BackHeader,
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
  postDataWithToken,
} from '../../api';
import {moderateScale} from '../../utils/scale';
import {VerifyOTPProps} from '../../navigation';
import {images} from '../../assets';
import {AuthContext} from '../../context/AuthContext';
import IconANT from 'react-native-vector-icons/AntDesign';
import {getData} from '../../utils/async-storage';
import {useRoute} from '@react-navigation/native';

const CELL_COUNT = 6;

const VerifyOTP = ({navigation}: VerifyOTPProps) => {
  const route = useRoute();

  console.log('route', route);
  const ctx = useContext(AuthContext);
  const isLogin = ctx?.isLogin;

  const isChangeEmail = route?.params?.titleParam === 'ChangeEmail';

  const email = useMemo(() => {
    return navigation.getState().routes.find(item => item.name === 'VerifyOTP')
      ?.params?.email;
  }, [navigation]);

  const [value, setValue] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [errorOTP, setErrorOTP] = useState<string>('');

  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalEmail, setShowModalEmail] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingReset, setLoadingReset] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const onVerifyOTP = async () => {
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
        const token = await getData('ACCESS_TOKEN');
        const response: any = isLogin
          ? await postDataWithToken(BASE_URL + API_VERIFY_OTP, data, token)
          : await postData(BASE_URL + API_VERIFY_OTP, data);

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

  const onSendOTP = async () => {
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
    <React.Fragment>
      {isLogin ? (
        <View style={styles.container}>
          <BackHeader
            title={'Verify OTP'}
            goBack={() => navigation?.goBack()}
            icon={
              <IconANT
                name="logout"
                color={colors.black}
                size={moderateScale(20)}
              />
            }>
            <View style={styles.scrollLogin}>
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
                onPress={onSendOTP}
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
                onPress={onVerifyOTP}
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
            </View>
          </BackHeader>
        </View>
      ) : (
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
              onPress={onSendOTP}
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
              onPress={onVerifyOTP}
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
          </ScrollView>
        </BackgroundWithImage>
      )}
      <ModalConfirmation
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        title={title}
        message={message}
        textBtn={isError ? 'Close' : 'OK'}
        onSubmit={
          isChangeEmail
            ? isError
              ? () => setShowModal(false)
              : () => {
                  setShowModal(false);
                  navigation.navigate('NewEmail');
                }
            : isError
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
    </React.Fragment>
  );
};

export default VerifyOTP;
