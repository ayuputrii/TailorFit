import React, {Dispatch, SetStateAction} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {InputText} from '../../components/forms';
import {Buttons, Gap, Text} from '../../components/commons';
import {colors} from '../../utils/colors';
import styles from './styles';
import {moderateScale} from '../../utils/scale';

interface ChangeEmailSectionsProps {
  email: string | undefined;
  setEmail: Dispatch<SetStateAction<string | undefined>>;
  onSendEmail: () => {};
  errorEmail: string;
  disabled: boolean;
  loading: boolean;
}

const ChangeEmailSections = ({
  email,
  setEmail,
  onSendEmail,
  errorEmail,
  disabled,
  loading,
}: ChangeEmailSectionsProps) => {
  return (
    <View style={styles.content}>
      <InputText
        value={email}
        onChangeText={setEmail}
        placeholder="New Email"
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
            <Text style={styles.text}>Change Email</Text>
          </View>
        }
        disabled={disabled}
      />
    </View>
  );
};

export default ChangeEmailSections;
