import React, {Dispatch, SetStateAction} from 'react';
import {BackHeader, Gap, ModalConfirmation} from '../../components';
import {moderateScale} from '../../utils/scale';
import {ScrollView} from 'react-native';
import {ProfileSections} from '../../sections';
import {UserDataTypes} from '../../types';
import {Asset} from 'react-native-image-picker';

interface ProfilePageProps {
  navigation: any;
  photo: Asset[] | undefined | string;
  setPhoto: Dispatch<SetStateAction<Asset[] | undefined | string>>;
  fullName: string | undefined;
  setFullName: Dispatch<SetStateAction<string | undefined>>;
  gender: string | undefined;
  setGender: Dispatch<SetStateAction<string | undefined>>;
  birthday: string | null | undefined;
  setBirthday: Dispatch<SetStateAction<string | null | undefined>>;
  phone: string | undefined;
  setPhone: Dispatch<SetStateAction<string | undefined>>;
  email: string | undefined;
  setEmail: Dispatch<SetStateAction<string | undefined>>;
  onUpdateProfile: () => void;
  disabled: boolean;
  loading: boolean;
  user: UserDataTypes;
  showModal: boolean;
  setShowModal: () => void;
  title: string;
  message: string;
  goShowModalCalendar: () => void;
}

const ProfilePage = ({
  navigation,
  photo,
  setPhoto,
  fullName,
  setFullName,
  gender,
  setGender,
  birthday,
  setBirthday,
  phone,
  setPhone,
  email,
  setEmail,
  onUpdateProfile,
  disabled,
  loading,
  user,
  showModal,
  setShowModal,
  title,
  message,
  goShowModalCalendar,
}: ProfilePageProps) => {
  return (
    <React.Fragment>
      <BackHeader
        title="Edit Profile"
        goBack={() => navigation?.goBack()}
        icon={false}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <Gap height={moderateScale(8)} width={0} />
          <ProfileSections
            photo={photo}
            setPhoto={setPhoto}
            fullName={fullName}
            setFullName={setFullName}
            gender={gender}
            setGender={setGender}
            birthday={birthday}
            setBirthday={setBirthday}
            phone={phone}
            setPhone={setPhone}
            email={email}
            setEmail={setEmail}
            onPress={onUpdateProfile}
            disabled={disabled}
            loading={loading}
            user={user}
            goShowModalCalendar={goShowModalCalendar}
          />
          <Gap height={moderateScale(8)} width={0} />
        </ScrollView>
      </BackHeader>

      <ModalConfirmation
        isVisible={showModal}
        onClose={setShowModal}
        title={title}
        message={message}
        textBtn="Close"
        onSubmit={setShowModal}
        style={undefined}
      />
    </React.Fragment>
  );
};

export default ProfilePage;
