import React, {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '../../utils/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {moderateScale, verticalScale} from '../../utils/scale';
import Buttons from './Buttons';
import Text from './Text';
import {fonts} from '../../utils/fonts';

interface BackHeaderProps {
  goBack: () => void;
  title: string;
  icon: ReactNode;
  children: ReactNode;
}

const BackHeader = ({goBack, title, icon, children}: BackHeaderProps) => {
  return (
    <>
      <View style={styles.container}>
        <Buttons onPress={goBack} style={styles}>
          <Icon name="chevron-back" size={moderateScale(22)} />
        </Buttons>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.content}>{icon}</View>
      </View>
      {children}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(8),
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: moderateScale(20),
    color: colors.black,
    fontFamily: fonts.PoppinsBold,
  },
  viewIcon: {
    backgroundColor: colors.white,
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BackHeader;
