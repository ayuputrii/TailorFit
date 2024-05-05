import React, {Dispatch, SetStateAction} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {colors} from '../../utils/colors';
import {moderateScale} from '../../utils/scale';
import {Gap, Text} from '../commons';
import {fonts} from '../../utils/fonts';

interface InputTextProps {
  value: string;
  onChangeText: Dispatch<SetStateAction<string>>;
  placeholder: string;
  placeholderTextColor: string;
  styleInput: any;
  styleText: any;
  error: any;
}

const InputText = ({
  value,
  onChangeText,
  placeholder,
  placeholderTextColor = '#AFAFAF',
  styleInput,
  styleText,
  error,
}: InputTextProps) => {
  return (
    <>
      <View style={[styles.inputView, styleInput]}>
        <TextInput
          value={value}
          style={[styles.inputText, styleText]}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          onChangeText={onChangeText}
        />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
      <Gap height={moderateScale(10)} width={0} />
    </>
  );
};

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
  inputText: {
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
export default InputText;
