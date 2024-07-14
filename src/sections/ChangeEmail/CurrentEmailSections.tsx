import React, {Dispatch, SetStateAction} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {InputText} from '../../components/forms';
import {Buttons, Gap, Text} from '../../components/commons';
import {colors} from '../../utils/colors';
import styles from './styles';
import {moderateScale} from '../../utils/scale';

interface CurrentEmailSectionsProps {
  email: string | undefined;
  setEmail: Dispatch<SetStateAction<string | undefined>>;
  onSendEmail: () => {};
  errorCurrentEmail: string;
  disabled: boolean;
  loading: boolean;
}

const CurrentEmailSections = ({
  email,
  setEmail,
  onSendEmail,
  errorCurrentEmail,
  disabled,
  loading,
}: CurrentEmailSectionsProps) => {
  return (
    <View style={styles.content}>
      <InputText
        value={email}
        onChangeText={setEmail}
        placeholder="Current Email"
        placeholderTextColor={colors.gray}
        error={errorCurrentEmail}
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
            <Text style={styles.text}>Send Email</Text>
          </View>
        }
        disabled={disabled}
      />
    </View>
  );
};

export default CurrentEmailSections;
