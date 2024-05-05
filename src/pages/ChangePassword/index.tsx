import React, {useState} from 'react';
import {BackHeader, Gap, ModalConfirmation} from '../../components';
import IconANT from 'react-native-vector-icons/AntDesign';
import {colors} from '../../utils/colors';
import {moderateScale} from '../../utils/scale';
import {ScrollView, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import {ChangePasswordSections} from '../../sections';

const ChangePassword = () => {
  const navigation = useNavigation();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const onChangePassword = async () => {
    setBtnLoading(true);
    setTimeout(() => {
      setBtnLoading(false);
      setShowModal(true);
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <BackHeader
        title="Change Password"
        goBack={() => navigation?.goBack()}
        icon={
          <IconANT
            name="logout"
            color={colors.black}
            size={moderateScale(20)}
          />
        }>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <Gap height={moderateScale(8)} width={0} />
          <ChangePasswordSections
            currentPassword={currentPassword}
            setCurrentPassword={setCurrentPassword}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            rePassword={rePassword}
            setRePassword={setRePassword}
            onChangePassword={onChangePassword}
            btnLoading={btnLoading}
          />
          <Gap height={moderateScale(8)} width={0} />
        </ScrollView>
      </BackHeader>
      <ModalConfirmation
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        title="Successfully"
        message="Successfully for change new password."
        textBtn="Close"
        onSubmit={() => setShowModal(false)}
        style={undefined}
      />
    </View>
  );
};

export default ChangePassword;
