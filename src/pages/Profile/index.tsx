import React from 'react';
import {BackHeader, Gap} from '../../components';
import {moderateScale} from '../../utils/scale';
import {ScrollView, View} from 'react-native';
import styles from './styles';
import {ProfileProps} from '../../navigation';

const Profile = ({navigation}: ProfileProps) => {
  return (
    <View style={styles.container}>
      <BackHeader
        title="Profile"
        goBack={() => navigation?.goBack()}
        icon={false}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <Gap height={moderateScale(8)} width={0} />
          <Gap height={moderateScale(8)} width={0} />
        </ScrollView>
      </BackHeader>
    </View>
  );
};

export default Profile;
