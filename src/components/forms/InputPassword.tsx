import React, {forwardRef, useState} from 'react';
import {StyleSheet, TextInput, View, TouchableOpacity} from 'react-native';
import {colors} from '../../utils/colors';
import IconFeather from 'react-native-vector-icons/Feather';
import {Gap, Text} from '../commons';
import {moderateScale} from '../../utils/scale';
import {fonts} from '../../utils/fonts';

interface InputPasswordProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmitEditing: () => void;
  placeholder: string;
  placeholderTextColor?: string;
  error: any;
}

const InputPassword = forwardRef<TextInput, InputPasswordProps>(
  (
    {
      value,
      onChangeText,
      onSubmitEditing,
      placeholder,
      placeholderTextColor = '#AFAFAF',
      error,
    }: InputPasswordProps,
    ref,
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };

    return (
      <React.Fragment>
        <View style={styles.inputView}>
          <TextInput
            ref={ref}
            value={value}
            style={styles.inputText}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            onChangeText={onChangeText}
            secureTextEntry={!isPasswordVisible}
            onSubmitEditing={onSubmitEditing}
          />

          <TouchableOpacity
            style={styles.icon}
            onPress={togglePasswordVisibility}
            activeOpacity={0.8}>
            {!isPasswordVisible ? (
              <IconFeather
                name="eye-off"
                size={moderateScale(16)}
                color={colors.grey}
              />
            ) : (
              <IconFeather
                name="eye"
                size={moderateScale(16)}
                color={colors.grey}
              />
            )}
          </TouchableOpacity>
        </View>

        {error && <Text style={styles.error}>{error}</Text>}
        <Gap height={moderateScale(10)} width={0} />
      </React.Fragment>
    );
  },
);

const styles = StyleSheet.create({
  inputView: {
    width: '100%',
    backgroundColor: colors.white,
    borderWidth: moderateScale(1),
    borderColor: '#DCDCDC',
    borderRadius: moderateScale(10),
    height: moderateScale(50),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(8),
    marginBottom: moderateScale(4),
  },
  inputText: {
    color: colors.black,
    fontFamily: 'Poppins-Regular',
    width: '90%',
    marginTop: moderateScale(2),
  },
  icon: {
    width: moderateScale(16),
  },
  error: {
    fontSize: moderateScale(10),
    color: colors.orange,
    fontFamily: fonts.PoppinsSemiBold,
    paddingHorizontal: moderateScale(12),
  },
});

export default InputPassword;
