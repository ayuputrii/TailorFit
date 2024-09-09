/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import IconAwesome6 from 'react-native-vector-icons/FontAwesome6';
import IconAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import IconFeather from 'react-native-vector-icons/Feather';
import IconsMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';

import {colors} from '../utils/colors';

const navigation = useNavigation();

export const MenuSettings = [
  {
    id: 1,
    label: 'Ubah Profil',
    onChange: () => navigation.navigate('Profile'),
    icon: <IconAwesome name="user-o" size={16} color={colors.darkgray} />,
  },
  {
    id: 2,
    label: 'Histori Transaksi',
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
    label: 'Ubah Password',
    onChange: () => navigation.navigate('ChangePassword'),
    icon: <IconFeather name="lock" size={16} color={colors.darkgray} />,
  },
  {
    id: 4,
    label: 'Ubah Email',
    onChange: () => navigation.navigate('ChangeEmail'),
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
    label: 'Ubah Nomor Handphone',
    onChange: () => navigation.navigate('ChangePhoneNumber'),
    icon: <IconAwesome5 name="pen" size={16} color={colors.darkgray} />,
  },
];
