import React, {ReactNode} from 'react';
import {TouchableOpacity, ViewStyle} from 'react-native';
import {colors} from '../../utils/colors';

interface ButtonsProps {
  children?: ReactNode;
  onPress?: any;
  style?: ViewStyle | any;
  disabled?: boolean;
}

const Buttons = ({children, onPress, style, disabled}: ButtonsProps) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={disabled ? [style, {backgroundColor: colors.gray}] : style}
      activeOpacity={0.6}>
      {children}
    </TouchableOpacity>
  );
};

export default Buttons;
