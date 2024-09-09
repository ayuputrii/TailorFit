import React, {Dispatch, SetStateAction} from 'react';
import ModalCommons from './Modal';
import {ScrollView, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Buttons, Calendar, Gap} from '../commons';
import {moderateScale, verticalScale} from '../../utils/scale';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';

interface ModalCalendarProps {
  showCalendar: boolean;
  setShowCalendar: Dispatch<SetStateAction<boolean>>;
  onDateChange?: any;
}

const ModalCalendar = ({
  showCalendar,
  setShowCalendar,
  onDateChange,
}: ModalCalendarProps) => {
  const closeCalendar = () => {
    setShowCalendar(false);
  };

  return (
    <ModalCommons
      setVisible={setShowCalendar}
      visible={showCalendar}
      containerStyle={styles.containerStyle}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Buttons
            disabled={false}
            style={{}}
            onPress={() => setShowCalendar(false)}>
            <Icon
              name="close-circle-outline"
              size={moderateScale(24)}
              color={colors.red}
            />
          </Buttons>
        </View>
        <Gap height={moderateScale(16)} width={0} />
        <Calendar onDateChange={onDateChange} maxRangeDuration={undefined} />
      </ScrollView>
    </ModalCommons>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: colors.white,
    height: verticalScale(320),
    marginHorizontal: moderateScale(6),
    padding: moderateScale(16),
    zIndex: 100,
    borderRadius: 20,
  },
  content: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(-2),
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: moderateScale(40),
    borderRadius: moderateScale(8),
    backgroundColor: colors.darkblue,
  },
  textTitle: {
    fontSize: moderateScale(12),
    color: colors.white,
    fontFamily: fonts.PoppinsSemiBold,
  },
});

export default ModalCalendar;
