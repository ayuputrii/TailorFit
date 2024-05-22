import React, {Dispatch, forwardRef, SetStateAction, useRef} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {colors} from '../../utils/colors';
import Icon from 'react-native-vector-icons/AntDesign';
import {moderateScale} from '../../utils/scale';
import {Buttons} from '../commons';

interface InputSearchProps {
  value: string;
  onChangeText: Dispatch<SetStateAction<string>>;
  onSubmitEditing: () => void;
  placeholder: string;
  placeholderTextColor: string;
  styleInput: any;
  styleText: any;
  onPress: () => void;
}

const InputSearch = forwardRef<TextInput, InputSearchProps>(
  ({
    value,
    onChangeText,
    onSubmitEditing,
    placeholder,
    placeholderTextColor = '#AFAFAF',
    styleInput,
    styleText,
  }: InputSearchProps) => {
    const inputRef = useRef<TextInput>(null);

    const onClear = () => {
      inputRef.current?.clear();
      onChangeText('');
    };
    return (
      <View style={[styles.inputView, styleInput]}>
        <TextInput
          ref={inputRef}
          value={value}
          style={[styles.InputSearch, styleText]}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
        />
        <Buttons style={{}} disabled={false} onPress={onClear}>
          <Icon
            name="closecircle"
            size={moderateScale(20)}
            color={colors.black}
          />
        </Buttons>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  inputView: {
    width: '92%',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#DCDCDC',
    borderRadius: moderateScale(16),
    height: moderateScale(50),
    paddingHorizontal: moderateScale(6),
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  InputSearch: {
    color: colors.black,
    fontFamily: 'Poppins-Regular',
    width: '90%',
  },
});
export default InputSearch;
