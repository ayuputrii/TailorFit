import React, {ReactNode} from 'react';
import {TouchableOpacity, ViewStyle} from 'react-native';

interface ButtonsProps {
  children: ReactNode;
  onPress: () => void;
  style: ViewStyle | any;
  disabled: boolean;
}

const Buttons = ({children, onPress, style, disabled}: ButtonsProps) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={style}
      activeOpacity={0.6}>
      {children}
    </TouchableOpacity>
  );
};

export default Buttons;
