/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import IconAwesome6 from 'react-native-vector-icons/FontAwesome6';
import IconFeather from 'react-native-vector-icons/Feather';
import {colors} from '../utils/colors';

const navigation = useNavigation();

export const MenuSettings = [
  {
    id: 1,
    label: 'Edit Profile',
    onChange: () => navigation.navigate('Profile'),
    icon: <IconAwesome name="user-o" size={24} color={colors.darkgray} />,
  },
  {
    id: 2,
    label: 'Favorite',
    onChange: () => navigation.navigate('Favorite'),
    icon: <IconAwesome name="heart-o" size={24} color={colors.darkgray} />,
  },
  {
    id: 3,
    label: 'History Transaction',
    onChange: () => navigation.navigate('HistoryTransaction'),
    icon: (
      <IconAwesome6
        name="clock-rotate-left"
        size={24}
        color={colors.darkgray}
      />
    ),
  },
  {
    id: 4,
    label: 'Change Password',
    onChange: () => navigation.navigate('ChangePassword'),
    icon: <IconFeather name="lock" size={24} color={colors.darkgray} />,
  },
  {
    id: 5,
    label: 'About Apps',
    onChange: () => navigation.navigate('About'),
    icon: <IconFeather name="info" size={24} color={colors.darkgray} />,
  },
  {
    id: 6,
    label: 'Rating Apps',
    onChange: () => navigation.navigate('Rating'),
    icon: <IconFeather name="star" size={24} color={colors.darkgray} />,
  },
];
