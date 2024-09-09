import React, {Dispatch, forwardRef, SetStateAction} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {colors} from '../../utils/colors';
import Icon from 'react-native-vector-icons/AntDesign';
import {moderateScale} from '../../utils/scale';
import {Buttons} from '../commons';
import {fonts} from '../../utils/fonts';

interface InputSearchProps {
  value: string;
  onChangeText: Dispatch<SetStateAction<string>>;
  onSubmitEditing: () => void;
  placeholder: string;
  placeholderTextColor: string;
  styleInput: any;
  styleText: any;
  onPress: () => void;
  onClearText: () => void;
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
    onClearText,
  }: InputSearchProps) => {
    return (
      <View style={[styles.inputView, styleInput]}>
        <TextInput
          value={value}
          style={[styles.InputSearch, styleText]}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
        />
        <Buttons style={{}} disabled={false} onPress={onClearText}>
          <Icon
            name="closecircle"
            size={moderateScale(18)}
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
    borderWidth: moderateScale(1),
    borderColor: colors.lightgray,
    borderRadius: moderateScale(16),
    paddingHorizontal: moderateScale(6),
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  InputSearch: {
    color: colors.black,
    fontFamily: fonts.PoppinsRegular,
    height: moderateScale(38),
    width: '90%',
  },
});
export default InputSearch;
