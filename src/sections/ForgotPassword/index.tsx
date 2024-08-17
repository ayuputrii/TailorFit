import React, {Dispatch, SetStateAction} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {InputText} from '../../components/forms';
import {Buttons, Gap, Text} from '../../components/commons';
import {colors} from '../../utils/colors';
import styles from './styles';
import {moderateScale} from '../../utils/scale';

interface ForgotPasswordSectionsProps {
  email: string | undefined;
  setEmail: Dispatch<SetStateAction<string | undefined>>;
  onLogin: () => {};
  onSendEmail: () => {};
  errorEmail: string;
  disabled: boolean;
  loading: boolean;
  isLogin?: boolean | undefined;
}

const ForgotPasswordSections = ({
  email,
  setEmail,
  onLogin,
  onSendEmail,
  errorEmail,
  disabled,
  loading,
  isLogin,
}: ForgotPasswordSectionsProps) => {
  return (
    <View style={styles.content}>
      <InputText
        value={email}
        onChangeText={setEmail}
        placeholder="Masukkan Email Anda"
        placeholderTextColor={colors.gray}
        error={errorEmail}
        styleInput={undefined}
        styleText={undefined}
        onSubmitEditing={onSendEmail}
      />
      <Gap height={6} width={0} />
      <Buttons
        onPress={onSendEmail}
        style={styles.btn}
        children={
          <View style={styles.flexRow}>
            {loading && <ActivityIndicator size="small" color={colors.white} />}
            <Gap width={moderateScale(3)} height={0} />
            <Text style={styles.text}>Kirim Email</Text>
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
            children={<Text style={styles.text}>Sign In</Text>}
            disabled={disabled}
          />
        </React.Fragment>
      )}
    </View>
  );
};

export default ForgotPasswordSections;
