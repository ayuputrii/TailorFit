import React from 'react';
import {BackHeader, CardCommons, Gap, Text} from '../../components';
import IconANT from 'react-native-vector-icons/AntDesign';
import {colors} from '../../utils/colors';
import {moderateScale, verticalScale} from '../../utils/scale';
import {ScrollView, View} from 'react-native';
import {MenuSettings} from '../../constants/MenuSettings';
import styles from './styles';
import {SettingsProps} from '../../navigation';
import {removeData} from '../../utils/async-storage';

const Settings = ({navigation}: SettingsProps) => {
  const handleLogout = async () => {
    await removeData('ACCESS_TOKEN');
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <BackHeader
        title="Settings"
        goBack={() => navigation?.goBack()}
        icon={
          <IconANT
            name="logout"
            color={colors.black}
            size={moderateScale(20)}
            onPress={handleLogout}
          />
        }>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <Gap height={moderateScale(8)} width={0} />
          {MenuSettings?.map(items => (
            <React.Fragment>
              <Gap height={verticalScale(8)} width={0} />
              <CardCommons
                title={''}
                subTitle={''}
                titleStyle={false}
                subTitleStyle={false}
                onPress={items?.onChange}
                style={styles.card}>
                <Text style={styles.text}>{items?.label}</Text>
                {items?.icon}
              </CardCommons>
            </React.Fragment>
          ))}
          <Gap height={moderateScale(8)} width={0} />
        </ScrollView>
      </BackHeader>
    </View>
  );
};

export default Settings;
