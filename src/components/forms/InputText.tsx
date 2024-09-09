import React, {Dispatch, forwardRef, SetStateAction} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {colors} from '../../utils/colors';
import {moderateScale} from '../../utils/scale';
import {Gap, Text} from '../commons';
import {fonts} from '../../utils/fonts';

interface InputTextProps {
  value?: string;
  onChangeText?: Dispatch<SetStateAction<string | undefined>>;
  onSubmitEditing?: () => void;
  placeholder?: string;
  placeholderTextColor?: string;
  styleInput?: any;
  styleText?: any;
  error?: any;
  defaultValue?: string | number;
  editable?: boolean;
  onFocus?: () => void;
}

const InputText = forwardRef<TextInput, InputTextProps>(
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
      defaultValue,
      editable,
      onFocus,
    }: InputTextProps,
    ref,
  ) => {
    return (
      <React.Fragment>
        <View style={[styles.inputView, styleInput]}>
          <TextInput
            ref={ref}
            value={value}
            style={[styles.inputText, styleText]}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
            defaultValue={defaultValue as string}
            editable={editable}
            onFocus={onFocus}
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
    borderWidth: moderateScale(1),
    borderColor: '#DCDCDC',
    borderRadius: moderateScale(8),
    height: moderateScale(50),
    marginBottom: moderateScale(4),
    justifyContent: 'center',
    paddingHorizontal: moderateScale(8),
  },
  inputText: {
    color: colors.black,
    fontFamily: fonts.PoppinsRegular,
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
