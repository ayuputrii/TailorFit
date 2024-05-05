import React, {Dispatch, SetStateAction} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {InputText} from '../../components/forms';
import {Buttons, Gap, Text} from '../../components/commons';
import {colors} from '../../utils/colors';
import styles from './styles';
import {moderateScale} from '../../utils/scale';

interface ForgotPasswordSectionsProps {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  onLogin: () => {};
  onSendEmail: () => {};
  errorEmail: string;
  disabled: boolean;
  loading: boolean;
}

const ForgotPasswordSections = ({
  email,
  setEmail,
  onLogin,
  onSendEmail,
  errorEmail,
  disabled,
  loading,
}: ForgotPasswordSectionsProps) => {
  return (
    <View style={styles.content}>
      <InputText
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        placeholderTextColor={colors.gray}
        error={errorEmail}
        styleInput={undefined}
        styleText={undefined}
      />
      <Gap height={6} width={0} />
      <Buttons
        onPress={onSendEmail}
        style={styles.btn}
        children={
          <View style={styles.flexRow}>
            {loading && <ActivityIndicator size="small" color={colors.white} />}
            <Gap width={moderateScale(3)} height={0} />
            <Text style={styles.text}>Send Email</Text>
          </View>
        }
        disabled={disabled}
      />
      <Gap height={12} width={0} />
      <Buttons
        onPress={onLogin}
        style={styles.btnSignIn}
        children={<Text style={styles.text}>Sign In</Text>}
        disabled={disabled}
      />
    </View>
  );
};

export default ForgotPasswordSections;
