import React, {useContext, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
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
import {getData} from '../../utils/async-storage';
import {useRoute} from '@react-navigation/native';

const CELL_COUNT = 6;

const VerifyOTP = ({navigation}: VerifyOTPProps) => {
  const route = useRoute<VerifyOTPProps['route']>();

  const ctx = useContext(AuthContext);
  const isLogin = ctx?.isLogin;

  const isChangeEmail = route?.params?.titleParam === 'ChangeEmail';

  const email = route?.params?.email;

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
      setErrorOTP('Harap isi OTP');
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
          setTitle('Verifikasi OTP Berhasil');
          setMessage(
            response?.data?.message ||
              'Berhasil memasukkan kode OTP yang benar!',
          );
        } else {
          setLoading(false);
          setDisabled(false);
          setIsError(true);
          setShowModal(true);
          setTitle('Verifikasi OTP Belum Berhasil');
          setMessage(
            response?.data?.message || 'Mohon maaf, silakan coba lagi nanti...',
          );
        }
      } catch (error: any) {
        setLoading(false);
        setDisabled(false);
        setIsError(true);
        setShowModal(true);
        setTitle('Verifikasi OTP Belum Berhasil');
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
        setTitle('Verifikasi Email Belum Berhasil');
        setMessage(
          response?.data?.message ||
            "Server is encountered with problem! We'll fix it soon.",
        );
      }
    } catch (error: any) {
      setLoadingReset(false);
      setDisabled(false);
      setShowModalEmail(true);
      setTitle('Verifikasi Email Belum Berhasil');
      setMessage("Server is encountered with problem! We'll fix it soon.");
    }
  };

  return (
    <React.Fragment>
      {isLogin ? (
        <SafeAreaView style={styles.container}>
          <StatusBar
            animated={false}
            backgroundColor={colors.basebg}
            barStyle="dark-content"
          />
          <BackHeader
            title={'Verifikasi OTP'}
            goBack={() => navigation?.goBack()}
            icon={false}>
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
                    /*onLayout={getCellOnLayoutHandler(index)} */
                  >
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
                    <Text style={styles.txt}>Kirim Ulang Kode...</Text>
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
                    <Text style={styles.text}>Verifikasi OTP</Text>
                  </View>
                }
                disabled={disabled}
              />
            </View>
          </BackHeader>
        </SafeAreaView>
      ) : (
        <BackgroundWithImage backgroundChildren={false} src={images.imgRainbow}>
          <ScrollView style={styles.scroll}>
            <HeaderNotLogin
              title="Verifikasi Email Anda"
              subTitle={`Harap isi 4 kode yang telah dikirimkan ke email Anda di${'\n'} ${email}`}
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
                  style={[styles.cell, isFocused && styles.focusCell]}>
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
                  <Text style={styles.text}>Verifikasi OTP</Text>
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
        textBtn={isError ? 'Tutup' : 'OK'}
        onSubmit={
          isChangeEmail
            ? isError
              ? () => setShowModal(false)
              : () => {
                  setShowModal(false);
                  navigation.navigate('NewEmail', {
                    email,
                  });
                }
            : isError
            ? () => setShowModal(false)
            : () => {
                setShowModal(false);
                navigation.navigate('NewPassword', {
                  email,
                });
              }
        }
        style={styles.modal}
      />

      <ModalConfirmation
        isVisible={showModalEmail}
        onClose={() => setShowModalEmail(false)}
        title={title}
        message={message}
        textBtn="Tutup"
        onSubmit={() => setShowModalEmail(false)}
        style={styles.modal}
      />
    </React.Fragment>
  );
};

export default VerifyOTP;
