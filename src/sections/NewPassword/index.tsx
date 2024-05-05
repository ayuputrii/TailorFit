import React, {Dispatch, SetStateAction} from 'react';
import {View} from 'react-native';
import {InputPassword} from '../../components/forms';
import {Buttons, Gap, Text} from '../../components/commons';
import {colors} from '../../utils/colors';
import styles from './styles';
import {ActivityIndicator} from 'react-native';
import {moderateScale} from '../../utils/scale';

interface NewPasswordSectionsProps {
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  errorPassowrd: string;
  onConfirmPassword: any;
  loading: boolean;
  disabled: boolean;
  onLogin: () => void;
}

const NewPasswordSections = ({
  password,
  setPassword,
  errorPassowrd,
  onConfirmPassword,
  loading,
  disabled,
  onLogin,
}: NewPasswordSectionsProps) => {
  return (
    <View style={styles.content}>
      <InputPassword
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        placeholderTextColor={colors.gray}
        error={errorPassowrd}
      />
      <Gap height={24} width={0} />
      <Buttons
        onPress={onConfirmPassword}
        style={styles.btn}
        children={
          <View style={styles.flexRow}>
            {loading && <ActivityIndicator size="small" color={colors.white} />}
            <Gap width={moderateScale(3)} height={0} />
            <Text style={styles.text}>Confirm Password</Text>
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

export default NewPasswordSections;
