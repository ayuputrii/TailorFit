import React, {useContext} from 'react';
import {
  BackHeader,
  CardCommons,
  Gap,
  ImageWithNotLogin,
  Text,
} from '../../components';
import IconANT from 'react-native-vector-icons/AntDesign';
import {colors} from '../../utils/colors';
import {moderateScale, verticalScale} from '../../utils/scale';
import {SafeAreaView, ScrollView, StatusBar} from 'react-native';
import styles from './styles';
import {NavigationParam, SettingsProps} from '../../navigation';
import {AuthContext} from '../../context/AuthContext';
import IconAwesome6 from 'react-native-vector-icons/FontAwesome6';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import IconFeather from 'react-native-vector-icons/Feather';
import IconsMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';

const MenuSettings = [
  {
    id: 1,
    label: 'Ubah Profil',
    value: 'Profile',
    icon: <IconAwesome name="user-o" size={18} color={colors.darkgray} />,
  },
  {
    id: 2,
    label: 'Riwayat Transaksi',
    value: 'HistoryTransaction',
    icon: (
      <IconAwesome6
        name="clock-rotate-left"
        size={18}
        color={colors.darkgray}
      />
    ),
  },
  {
    id: 3,
    label: 'Ubah Kata Sandi',
    value: 'ForgotPassword',
    icon: <IconFeather name="lock" size={18} color={colors.darkgray} />,
  },
  {
    id: 4,
    label: 'Ubah Email',
    value: 'ChangeEmail',
    icon: (
      <IconsMaterialCommunity
        name="email-edit"
        size={18}
        color={colors.darkgray}
      />
    ),
  },
  {
    id: 5,
    label: 'FAQ',
    value: 'FAQPage',
    icon: <IconMaterial name="info" size={18} color={colors.darkgray} />,
  },
];

const Settings = ({navigation}: SettingsProps) => {
  const ctx = useContext(AuthContext);
  const isLogin = ctx?.isLogin;
  const onLogout = ctx?.onLogout;

  const handleLogout = async () => {
    if (onLogout) {
      onLogout();
    }
    navigation.jumpTo('MainTabs');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={false}
        backgroundColor={colors.basebg}
        barStyle="dark-content"
      />
      <BackHeader
        title="Pengaturan"
        goBack={() => navigation?.goBack()}
        icon={
          isLogin && (
            <IconANT
              name="logout"
              color={colors.black}
              size={moderateScale(20)}
              onPress={handleLogout}
            />
          )
        }>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          {isLogin ? (
            <React.Fragment>
              <Gap height={moderateScale(20)} width={0} />

              {MenuSettings?.map(items => (
                <React.Fragment>
                  <CardCommons
                    title={''}
                    subTitle={''}
                    titleStyle={false}
                    subTitleStyle={false}
                    onPress={() => navigation.navigate(items?.value)}
                    style={styles.card}>
                    <Text style={styles.text}>{items?.label}</Text>
                    {items?.icon}
                  </CardCommons>
                  <Gap height={verticalScale(14)} width={0} />
                </React.Fragment>
              ))}
            </React.Fragment>
          ) : (
            <ImageWithNotLogin navigation={navigation} />
          )}
          <Gap height={moderateScale(8)} width={0} />
        </ScrollView>
      </BackHeader>
    </SafeAreaView>
  );
};

export default Settings;
