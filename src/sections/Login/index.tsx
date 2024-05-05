import React, {Dispatch, SetStateAction} from 'react';
import {ActivityIndicator, View} from 'react-native';
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
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
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
  return (
    <View style={styles.content}>
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
              <Text style={styles.txt}>Remember me</Text>
            </View>
          }
        />
        <Buttons
          style={false}
          disabled={false}
          onPress={() => navigation.navigate('ForgotPassword')}
          children={<Text style={styles.txt}>Forgot Password ? </Text>}
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
          <>
            <Text style={[styles.txt, styles.colorLightBlack]}>
              You Don’t have an account ?
            </Text>
            <Text style={[styles.txt, styles.colorBoldBlack]}> Sign Up</Text>
          </>
        }
      />
    </View>
  );
};

export default LoginSections;
