import React, {Dispatch, SetStateAction} from 'react';
import {View} from 'react-native';
import {InputPassword} from '../../components/forms';
import {Buttons, Gap, Text} from '../../components/commons';
import {colors} from '../../utils/colors';
import styles from './styles';
import {ActivityIndicator} from 'react-native';
import {moderateScale} from '../../utils/scale';

interface NewPasswordSectionsProps {
  password: string | undefined;
  setPassword: Dispatch<SetStateAction<string | undefined>>;
  errorPassowrd: string;
  onConfirmPassword: any;
  loading: boolean;
  disabled: boolean;
  onLogin?: () => void;
  isLogin?: boolean | undefined;
}

const NewPasswordSections = ({
  password,
  setPassword,
  errorPassowrd,
  onConfirmPassword,
  loading,
  disabled,
  onLogin,
  isLogin,
}: NewPasswordSectionsProps) => {
  return (
    <View style={styles.content}>
      <InputPassword
        value={password}
        onChangeText={setPassword}
        placeholder="Masukkan Kata Sandi Baru Anda"
        placeholderTextColor={colors.gray}
        error={errorPassowrd}
        onSubmitEditing={onConfirmPassword}
      />
      <Gap height={24} width={0} />
      <Buttons
        onPress={onConfirmPassword}
        style={styles.btn}
        children={
          <View style={styles.flexRow}>
            {loading && <ActivityIndicator size="small" color={colors.white} />}
            <Gap width={moderateScale(3)} height={0} />
            <Text style={styles.text}>Konfirmasi Password</Text>
          </View>
        }
        disabled={disabled}
      />
      {!isLogin && (
        <React.Fragment>
          <Gap height={12} width={0} />
          <Buttons
            onPress={onLogin}
            style={styles.btnSignIn}
            children={<Text style={styles.text}>Login</Text>}
            disabled={disabled}
          />
        </React.Fragment>
      )}
    </View>
  );
};

export default NewPasswordSections;
