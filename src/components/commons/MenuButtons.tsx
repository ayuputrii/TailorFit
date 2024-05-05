import React from 'react';
import Buttons from './Buttons';
import {Platform, StyleSheet} from 'react-native';
import Gap from './Gap';
import Text from './Text';
import {colors} from '../../utils/colors';
import {moderateScale, verticalScale} from '../../utils/scale';
import {fonts} from '../../utils/fonts';

interface MenuButtonsProps {
  activeMenuIndex: number;
  setActiveMenuIndex: (index: number) => void;
  index: number;
  item: any;
  onPress: () => void;
}

const MenuButtons = ({
  activeMenuIndex,
  setActiveMenuIndex,
  index,
  item,
  onPress,
}: MenuButtonsProps) => {
  return (
    <>
      <Buttons
        style={[
          styles.button,
          {
            backgroundColor:
              activeMenuIndex === index ? colors.black : colors.white,
          },
        ]}
        onPress={() => {
          onPress();
          setActiveMenuIndex(index);
        }}>
        <Text
          style={[
            styles.text,
            {
              color: activeMenuIndex === index ? colors.white : colors.black,
            },
          ]}>
          {item?.label}
        </Text>
      </Buttons>
      <Gap width={moderateScale(6)} height={0} />
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    width: moderateScale(100),
    borderRadius: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
    height: verticalScale(Platform.OS === 'ios' ? 35 : 40),
    marginBottom: moderateScale(Platform.OS === 'ios' ? 24 : 16),
  },
  text: {
    fontSize: moderateScale(14),
    width: moderateScale(80),
    flexWrap: 'wrap',
    textAlign: 'center',
    fontFamily: fonts.PoppinsSemiBold,
  },
});

export default MenuButtons;
