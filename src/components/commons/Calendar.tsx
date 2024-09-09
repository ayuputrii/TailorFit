import React from 'react';
import {StyleSheet, View} from 'react-native';
import CalendarPicker, {
  CalendarPickerProps,
} from 'react-native-calendar-picker';
import {colors} from '../../utils/colors';
import {moderateScale} from '../../utils/scale';

type Props = {
  mode?: CalendarPickerProps['initialView'];
  onDateChange?: (date: Date) => void;
  maxRangeDuration?: number | undefined;
};

const Calendar = ({mode, onDateChange, maxRangeDuration}: Props) => {
  return (
    <View style={styles.container}>
      <CalendarPicker
        startFromMonday={true}
        allowBackwardRangeSelect
        todayBackgroundColor={colors.orange}
        selectedDayColor={colors.choco}
        selectedDayTextColor={colors.white}
        maxRangeDuration={maxRangeDuration}
        onMonthChange={date => {
          onDateChange(date);
        }}
        onDateChange={date => onDateChange(date)}
        nextTitleStyle={styles.rightMargin}
        previousTitleStyle={styles.leftMargin}
        initialView={mode}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  rightMargin: {
    marginRight: moderateScale(8),
  },
  leftMargin: {
    marginLeft: moderateScale(8),
  },
});

export default Calendar;
