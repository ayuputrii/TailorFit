import React, {Dispatch, forwardRef, SetStateAction} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {colors} from '../../utils/colors';
import {moderateScale} from '../../utils/scale';
import {Gap, Text} from '../commons';
import {fonts} from '../../utils/fonts';

interface InputTextAreaProps {
  value?: string;
  onChangeText?: Dispatch<SetStateAction<string>>;
  onSubmitEditing?: () => void;
  placeholder?: string;
  placeholderTextColor?: string;
  styleInput?: any;
  styleText?: any;
  defaultValue?: string | number;
  editable?: boolean;
  onFocus?: () => void;
}

const InputTextArea = forwardRef<TextInput, InputTextAreaProps>(
  (
    {
      value,
      onChangeText,
      onSubmitEditing,
      placeholder,
      placeholderTextColor = '#AFAFAF',
      styleInput,
      styleText,
      defaultValue,
      editable,
      onFocus,
    }: InputTextAreaProps,
    ref,
  ) => {
    return (
      <React.Fragment>
        <View style={[styles.inputView, styleInput]}>
          <TextInput
            ref={ref}
            value={value}
            multiline={true}
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
    height: moderateScale(200),
  },
  inputText: {
    color: colors.black,
    fontFamily: fonts.PoppinsRegular,
    width: '100%',
    paddingHorizontal: moderateScale(16),
  },
});
export default InputTextArea;
