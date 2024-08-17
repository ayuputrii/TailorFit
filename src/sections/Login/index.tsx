import React, {Dispatch, SetStateAction, useRef} from 'react';
import {ActivityIndicator, View, TextInput} from 'react-native';
import {
  Buttons,
  Gap,
  InputPassword,
  InputText,
  SocialMedia,
  Text,
} from '../../components';
import {colors} from '../../utils/colors';
import styles from './styles';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {moderateScale} from '../../utils/scale';

interface LoginSectionsProps {
  email: string | undefined;
  setEmail: Dispatch<SetStateAction<string | undefined>>;
  password: string | undefined;
  setPassword: Dispatch<SetStateAction<string | undefined>>;
  showRemember: boolean;
  setShowRemember: Dispatch<SetStateAction<boolean>>;
  navigation: any;
  onLogin: () => void;
  loading: boolean;
  disabled: boolean;
  errorEmail: string;
  errorPassword: string;
  loginWithGoogle: () => void;
}

const LoginSections = ({
  email,
  setEmail,
  password,
  setPassword,
  showRemember,
  setShowRemember,
  navigation,
  onLogin,
  loading,
  disabled,
  errorEmail,
  errorPassword,
  loginWithGoogle,
}: LoginSectionsProps) => {
  const refEmail = useRef<TextInput>(null);
  const refPassword = useRef<TextInput>(null);

  return (
    <View style={styles.content}>
      <InputText
        ref={refEmail}
        value={email}
        onChangeText={setEmail}
        placeholder="Masukkan Email"
        placeholderTextColor={colors.gray}
        styleInput={undefined}
        styleText={undefined}
        error={errorEmail}
        onSubmitEditing={() => refPassword.current?.focus()}
      />
      <InputPassword
        ref={refPassword}
        value={password}
        onChangeText={setPassword}
        placeholder="Masukkan Kata Sandi"
        placeholderTextColor={colors.gray}
        error={errorPassword}
        onSubmitEditing={onLogin}
      />
      <View style={styles.viewRemember}>
        <Buttons
          style={false}
          disabled={false}
          onPress={() => setShowRemember(!showRemember)}
          children={
            <View style={styles.flexRow}>
              {showRemember ? (
                <Icons
                  name="checkbox-outline"
                  size={moderateScale(24)}
                  color={colors.orange}
                />
              ) : (
                <Icons
                  name="checkbox-blank-outline"
                  size={moderateScale(24)}
                  color={colors.orange}
                />
              )}
              <Gap width={8} height={0} />
              <Text style={styles.txt}>Ingat Saya</Text>
            </View>
          }
        />
        <Buttons
          style={false}
          disabled={false}
          onPress={() => navigation.navigate('ForgotPassword')}
          children={<Text style={styles.txt}>Lupa Kata Sandi ? </Text>}
        />
      </View>
      <Buttons
        onPress={onLogin}
        disabled={disabled}
        style={styles.btn}
        children={
          <View style={styles.flexRow}>
            {loading && <ActivityIndicator size="small" color={colors.white} />}
            <Gap width={moderateScale(3)} height={0} />
            <Text style={styles.loginText}>Sign In</Text>
          </View>
        }
      />
      <View style={styles.viewList}>
        <View style={styles.borderTop} />
        <Text style={[styles.txt, styles.colorLightBlack]}>
          Or Sign In with
        </Text>
        <View style={styles.borderTop} />
      </View>
      <SocialMedia onPress={loginWithGoogle} />
      <Buttons
        style={styles.signUp}
        disabled={false}
        onPress={() => navigation.navigate('Register')}
        children={
          <React.Fragment>
            <Text style={[styles.txt, styles.colorLightBlack]}>
              Anda belum memiliki akun ?
            </Text>
            <Text style={[styles.txt, styles.colorBoldBlack]}> Sign Up</Text>
          </React.Fragment>
        }
      />
    </View>
  );
};

export default LoginSections;
