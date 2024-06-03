/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import IconAwesome6 from 'react-native-vector-icons/FontAwesome6';
import IconAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconFeather from 'react-native-vector-icons/Feather';
import {colors} from '../utils/colors';

const navigation = useNavigation();

export const MenuSettings = [
  {
    id: 1,
    label: 'Edit Profile',
    onChange: () => navigation.navigate('Profile'),
    icon: <IconAwesome5 name="pen" size={16} color={colors.darkgray} />,
  },
  {
    id: 2,
    label: 'History Transaction',
    onChange: () => navigation.navigate('HistoryTransaction'),
    icon: (
      <IconAwesome6
        name="clock-rotate-left"
        size={16}
        color={colors.darkgray}
      />
    ),
  },
  {
    id: 3,
    label: 'Change Password',
    onChange: () => navigation.navigate('ChangePassword'),
    icon: <IconFeather name="lock" size={16} color={colors.darkgray} />,
  },
  {
    id: 4,
    label: 'Change Email',
    onChange: () => navigation.navigate('ChangeEmail'),
    icon: <IconAwesome5 name="pen" size={16} color={colors.darkgray} />,
  },
  {
    id: 5,
    label: 'Change Phone Number',
    onChange: () => navigation.navigate('ChangePhoneNumber'),
    icon: <IconAwesome5 name="pen" size={16} color={colors.darkgray} />,
  },
  {
    id: 6,
    label: 'About Apps',
    onChange: () => navigation.navigate('About'),
    icon: <IconFeather name="info" size={16} color={colors.darkgray} />,
  },
];
