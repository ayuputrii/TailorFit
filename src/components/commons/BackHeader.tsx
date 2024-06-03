import React, {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '../../utils/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {moderateScale, verticalScale} from '../../utils/scale';
import Buttons from './Buttons';
import Text from './Text';
import {fonts} from '../../utils/fonts';
import IconANT from 'react-native-vector-icons/AntDesign';

interface BackHeaderProps {
  goBack: () => void;
  title: string;
  icon?: ReactNode;
  children: ReactNode;
}

const BackHeader = ({goBack, title, icon, children}: BackHeaderProps) => {
  return (
    <React.Fragment>
      <View style={styles.flexBetween}>
        <View style={styles.container}>
          <Buttons disabled={false} onPress={goBack} style={styles}>
            <Icon name="chevron-back" size={moderateScale(22)} />
          </Buttons>
        </View>
        <Text style={styles.title}>{title}</Text>
        {icon ? (
          <React.Fragment>{icon}</React.Fragment>
        ) : (
          <IconANT
            name="logout"
            style={styles.opacity}
            color={colors.black}
            size={moderateScale(20)}
          />
        )}
      </View>

      {children}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  flexBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(8),
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  opacity: {
    opacity: 0,
  },
  title: {
    fontSize: moderateScale(20),
    color: colors.black,
    fontFamily: fonts.PoppinsBold,
  },
  viewIcon: {
    backgroundColor: colors.basebg,
    width: moderateScale(24),
    height: moderateScale(24),
    borderRadius: moderateScale(8),
  },
});

export default BackHeader;
