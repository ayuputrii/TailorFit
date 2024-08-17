import React, {Dispatch, SetStateAction, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {colors} from '../../utils/colors';
import {moderateScale} from '../../utils/scale';
import {menu} from '../../types';
import {fonts} from '../../utils/fonts';
import {Gap} from '../commons';

interface InputDropdownProps {
  data: menu[];
  value: string | undefined;
  setValue: (gender: menu) => void;
  isFocus: boolean;
  setIsFocus: Dispatch<SetStateAction<boolean>>;
  placeholder: string;
}
const InputDropdown = ({
  data,
  value,
  setValue,
  isFocus,
  setIsFocus,
  placeholder,
}: InputDropdownProps) => {
  return (
    <React.Fragment>
      <View style={styles.container}>
        <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={[
            {
              id: '',
              label: 'Pilih',
            },
            ...data,
          ]}
          maxHeight={300}
          labelField="label"
          valueField="id"
          placeholder={placeholder}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item);
            setIsFocus(false);
          }}
          containerStyle={{
            top: moderateScale(20),
          }}
          activeColor="white"
        />
      </View>
      <Gap height={moderateScale(10)} width={0} />
    </React.Fragment>
  );
};

export default InputDropdown;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.white,
    borderWidth: moderateScale(1),
    borderColor: '#DCDCDC',
    borderRadius: moderateScale(8),
    height: moderateScale(50),
    marginBottom: moderateScale(4),
    justifyContent: 'center',
  },
  dropdown: {
    color: colors.black,
    fontFamily: fonts.PoppinsRegular,
    width: '100%',
    paddingHorizontal: moderateScale(14),
  },
  placeholderStyle: {
    color: colors.gray,
    fontFamily: fonts.PoppinsRegular,
    width: '100%',
    fontSize: moderateScale(14),
  },
  selectedTextStyle: {
    color: colors.black,
    width: '100%',
    fontSize: moderateScale(12),
    fontFamily: fonts.PoppinsRegular,
  },
});
