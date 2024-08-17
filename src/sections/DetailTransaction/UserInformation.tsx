import React from 'react';
import {CardCommons, Gap, PhotoWithNotFound, Text} from '../../components';
import {View} from 'react-native';
import styles from './styles';
import {moderateScale} from '../../utils/scale';

interface UserInformationSectionsProps {
  data: any;
}

const UserInformationSections = ({data}: UserInformationSectionsProps) => {
  return (
    <CardCommons
      title={''}
      subTitle={''}
      titleStyle={false}
      subTitleStyle={false}
      onPress={() => {}}
      disabled={true}
      style={styles.card}>
      <View style={styles.flexRowBetween}>
        <View style={styles.content}>
          <PhotoWithNotFound />

          <Gap height={0} width={moderateScale(6)} />

          <View>
            <Text style={styles.text}>Pick-up Name</Text>
            <Text style={styles.title}>{data?.pickupName || '-'}</Text>
          </View>
        </View>

        <View style={styles.rightContent}>
          <Text style={styles.title}>Status Pick-up</Text>
          <Text style={styles.text}>On The Way</Text>
          <Text style={styles.txtDate}>Monday, 12 March 2024 - 08:00 pm</Text>
        </View>
      </View>
    </CardCommons>
  );
};

export default UserInformationSections;
