import React, {forwardRef} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {colors} from '../../utils/colors';
import {moderateScale} from '../../utils/scale';
import {Buttons, Gap, Text} from '../commons';
import {fonts} from '../../utils/fonts';
import moment from 'moment';

interface InputCalendarProps {
  styleInput?: any;
  error?: any;
  onPress: () => void;
  birthday: string | null | undefined;
}

const InputCalendar = forwardRef<TextInput, InputCalendarProps>(
  ({styleInput, error, birthday, onPress}: InputCalendarProps, ref) => {
    return (
      <React.Fragment>
        <Buttons style={[styles.inputView, styleInput]} onPress={onPress}>
          <Text style={styles.txt}>
            {moment(birthday || new Date()).format('DD MMMM YYYY')}
          </Text>
        </Buttons>

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
  },
  txt: {
    color: colors.black,
    fontFamily: fonts.PoppinsRegular,
    width: '100%',
    paddingHorizontal: moderateScale(14),
    marginTop: moderateScale(2),
  },
  error: {
    fontSize: moderateScale(10),
    color: colors.orange,
    fontFamily: fonts.PoppinsSemiBold,
    paddingHorizontal: moderateScale(12),
  },
});
export default InputCalendar;
