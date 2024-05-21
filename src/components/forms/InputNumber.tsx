import React, {Dispatch, forwardRef, SetStateAction} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {colors} from '../../utils/colors';
import {moderateScale} from '../../utils/scale';
import {Gap, Text} from '../commons';
import {fonts} from '../../utils/fonts';

interface InputNumberProps {
  value: string;
  onChangeText: Dispatch<SetStateAction<string>>;
  onSubmitEditing: () => void;
  placeholder: string;
  placeholderTextColor: string;
  styleInput: any;
  styleText: any;
  error: any;
}

const InputNumber = forwardRef<TextInput, InputNumberProps>(
  (
    {
      value,
      onChangeText,
      onSubmitEditing,
      placeholder,
      placeholderTextColor = '#AFAFAF',
      styleInput,
      styleText,
      error,
    }: InputNumberProps,
    ref,
  ) => {
    return (
      <React.Fragment>
        <View style={[styles.inputView, styleInput]}>
          <TextInput
            ref={ref}
            value={value}
            keyboardType="number-pad"
            style={[styles.InputNumber, styleText]}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
          />
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
    borderWidth: 1,
    borderColor: '#DCDCDC',
    borderRadius: moderateScale(10),
    height: moderateScale(50),
    marginBottom: moderateScale(4),
    justifyContent: 'center',
    paddingHorizontal: moderateScale(8),
  },
  InputNumber: {
    color: colors.black,
    fontFamily: 'Poppins-Regular',
    width: '100%',
    marginTop: moderateScale(2),
  },
  error: {
    fontSize: moderateScale(10),
    color: colors.orange,
    fontFamily: fonts.PoppinsSemiBold,
    paddingHorizontal: moderateScale(12),
  },
});
export default InputNumber;
