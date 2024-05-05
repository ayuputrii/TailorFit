import React, {Dispatch, SetStateAction} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {colors} from '../../utils/colors';
import {
  Buttons,
  Gap,
  InputPassword,
  InputText,
  SocialMedia,
  Text,
} from '../../components';
import styles from './styles';
import {moderateScale} from '../../utils/scale';

interface RegisterSectionsProps {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  fullName: string;
  setFullName: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  navigation: any;
  onRegister: () => void;
  errorEmail: string;
  errorFullName: string;
  errorPassword: string;
  disabled: boolean;
  loading: boolean;
}

const RegisterSections = ({
  email,
  setEmail,
  fullName,
  setFullName,
  password,
  setPassword,
  navigation,
  onRegister,
  errorEmail,
  errorFullName,
  errorPassword,
  disabled,
  loading,
}: RegisterSectionsProps) => {
  return (
    <View style={styles.content}>
      <InputText
        value={fullName}
        onChangeText={setFullName}
        placeholder="Fullname"
        placeholderTextColor={colors.gray}
        styleInput={undefined}
        styleText={undefined}
        error={errorFullName}
      />
      <InputText
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        placeholderTextColor={colors.gray}
        styleInput={undefined}
        styleText={undefined}
        error={errorEmail}
      />
      <InputPassword
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        placeholderTextColor={colors.gray}
        error={errorPassword}
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
          Or Sign Up with
        </Text>
        <View style={styles.borderTop} />
      </View>
      <SocialMedia />
      <Buttons
        style={styles.signIn}
        disabled={false}
        onPress={() => navigation.navigate('Login')}
        children={
          <>
            <Text style={[styles.txt, styles.colorLightBlack]}>
              You have an account ?
            </Text>
            <Text style={[styles.txt, styles.colorBoldBlack]}> Sign In</Text>
          </>
        }
      />
    </View>
  );
};

export default RegisterSections;
