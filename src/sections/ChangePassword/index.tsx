import React, {Dispatch, SetStateAction} from 'react';
import {View} from 'react-native';
import {InputPassword} from '../../components/forms';
import {Buttons, Gap, Text} from '../../components/commons';
import {colors} from '../../utils/colors';
import styles from './styles';
import {moderateScale} from '../../utils/scale';
import {ActivityIndicator} from 'react-native-paper';

interface ChangePasswordSectionsProps {
  currentPassword: string;
  setCurrentPassword: Dispatch<SetStateAction<string>>;
  newPassword: string;
  setNewPassword: Dispatch<SetStateAction<string>>;
  rePassword: string;
  setRePassword: Dispatch<SetStateAction<string>>;
  onChangePassword: () => {};
  btnLoading: boolean;
}

const ChangePasswordSections = ({
  currentPassword,
  setCurrentPassword,
  newPassword,
  setNewPassword,
  rePassword,
  setRePassword,
  onChangePassword,
  btnLoading,
}: ChangePasswordSectionsProps) => {
  return (
    <View style={styles.content}>
      <InputPassword
        value={currentPassword}
        onChangeText={setCurrentPassword}
        placeholder="Current Password"
        placeholderTextColor={colors.gray}
      />
      <InputPassword
        value={newPassword}
        onChangeText={setNewPassword}
        placeholder="New-Password"
        placeholderTextColor={colors.gray}
      />
      <InputPassword
        value={rePassword}
        onChangeText={setRePassword}
        placeholder="Re-Password"
        placeholderTextColor={colors.gray}
      />
      <Buttons
        disabled={false}
        onPress={onChangePassword}
        style={styles.btn}
        children={
          <View style={styles.flexRow}>
            {btnLoading && (
              <React.Fragment>
                <ActivityIndicator
                  animating={true}
                  color={colors.white}
                  size={moderateScale(16)}
                />
                <Gap height={0} width={moderateScale(8)} />
              </React.Fragment>
            )}
            <Text style={styles.text}>Change Password</Text>
          </View>
        }
      />
    </View>
  );
};

export default ChangePasswordSections;
