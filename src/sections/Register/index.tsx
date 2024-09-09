import React, {Dispatch, SetStateAction, useRef} from 'react';
import {ActivityIndicator, TextInput, View} from 'react-native';
import {colors} from '../../utils/colors';
import {
  Buttons,
  Gap,
  InputNumber,
  InputPassword,
  InputText,
  SocialMedia,
  Text,
} from '../../components';
import styles from './styles';
import {moderateScale} from '../../utils/scale';

interface RegisterSectionsProps {
  email: string | undefined;
  setEmail: Dispatch<SetStateAction<string | undefined>>;
  fullName: string | undefined;
  setFullName: Dispatch<SetStateAction<string | undefined>>;
  phone: string | undefined;
  setPhone: Dispatch<SetStateAction<string | undefined>>;
  password: string | undefined;
  setPassword: Dispatch<SetStateAction<string | undefined>>;
  navigation: any;
  onRegister: () => void;
  errorEmail: string;
  errorFullName: string;
  errorPhone: string;
  errorPassword: string;
  disabled: boolean;
  loading: boolean;
  onGoogle: () => void;
}

const RegisterSections = ({
  email,
  setEmail,
  fullName,
  setFullName,
  phone,
  setPhone,
  password,
  setPassword,
  navigation,
  onRegister,
  errorEmail,
  errorFullName,
  errorPhone,
  errorPassword,
  disabled,
  loading,
  onGoogle,
}: RegisterSectionsProps) => {
  const refFullName = useRef<TextInput>(null);
  const refEmail = useRef<TextInput>(null);
  const refphone = useRef<TextInput>(null);
  const refPassword = useRef<TextInput>(null);

  return (
    <View style={styles.content}>
      <InputText
        ref={refFullName}
        value={fullName}
        onChangeText={setFullName}
        placeholder="Masukkan Nama Lengkap"
        placeholderTextColor={colors.gray}
        styleInput={undefined}
        styleText={undefined}
        error={errorFullName}
        onSubmitEditing={() => refEmail.current?.focus()}
      />
      <InputNumber
        ref={refphone}
        value={phone}
        onChangeText={setPhone}
        placeholder="Masukkan Nomor Handphone"
        placeholderTextColor={colors.gray}
        styleInput={undefined}
        styleText={undefined}
        error={errorPhone}
        onSubmitEditing={() => refPassword.current?.focus()}
      />
      <InputText
        ref={refEmail}
        value={email}
        onChangeText={setEmail}
        placeholder="Masukkan Email"
        placeholderTextColor={colors.gray}
        styleInput={undefined}
        styleText={undefined}
        error={errorEmail}
        onSubmitEditing={() => refphone.current?.focus()}
      />
      <InputPassword
        ref={refPassword}
        value={password}
        onChangeText={setPassword}
        placeholder="Masukkan Kata Sandi"
        placeholderTextColor={colors.gray}
        error={errorPassword}
        onSubmitEditing={onRegister}
      />
      <Buttons
        onPress={onRegister}
        disabled={disabled}
        style={styles.btn}
        children={
          <View style={styles.flexRow}>
            {loading && <ActivityIndicator size="small" color={colors.white} />}
            <Gap width={moderateScale(3)} height={0} />
            <Text style={styles.loginText}>Sign Up</Text>
          </View>
        }
      />
      <View style={styles.viewList}>
        <View style={styles.borderTop} />
        <Text style={[styles.txt, styles.colorLightBlack]}>
          Atau Masuk dengan
        </Text>
        <View style={styles.borderTop} />
      </View>
      <SocialMedia onPress={onGoogle} />
      <Buttons
        style={styles.signIn}
        disabled={false}
        onPress={() => navigation.navigate('Login')}
        children={
          <React.Fragment>
            <Text style={[styles.txt, styles.colorLightBlack]}>
              Sudah memiliki akun ?
            </Text>
            <Text style={[styles.txt, styles.colorBoldBlack]}> Login</Text>
          </React.Fragment>
        }
      />
    </View>
  );
};

export default RegisterSections;
