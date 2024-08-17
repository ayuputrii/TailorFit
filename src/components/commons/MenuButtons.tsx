import React from 'react';
import Buttons from './Buttons';
import {StyleSheet} from 'react-native';
import Gap from './Gap';
import Text from './Text';
import {colors} from '../../utils/colors';
import {moderateScale, verticalScale} from '../../utils/scale';
import {fonts} from '../../utils/fonts';
import {menu, Size} from '../../types';
interface MenuButtonsProps {
  activeMenuIndex: number;
  setActiveMenuIndex: (index: number) => void;
  index: number;
  item: Size | menu;
  onPress: () => void;
  disabled: boolean;
  bgColor?: string;
  bgColorInActive?: string;
  txtColor?: string;
  txtColorInActive?: string;
}

const MenuButtons = ({
  activeMenuIndex,
  setActiveMenuIndex,
  index,
  item,
  onPress,
  disabled,
  bgColor = colors.black,
  bgColorInActive = colors.white,
  txtColor = colors.white,
  txtColorInActive = colors.black,
}: MenuButtonsProps) => {
  return (
    <React.Fragment>
      <Buttons
        disabled={disabled}
        style={[
          styles.button,
          {
            backgroundColor:
              activeMenuIndex === index ? bgColor : bgColorInActive,
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
              color: activeMenuIndex === index ? txtColor : txtColorInActive,
            },
          ]}>
          {item?.name}
        </Text>
      </Buttons>

      <Gap width={moderateScale(6)} height={0} />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  button: {
    width: moderateScale(120),
    borderRadius: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
    height: verticalScale(35),
    marginBottom: moderateScale(16),
  },
  text: {
    fontSize: moderateScale(12),
    textAlign: 'center',
    fontFamily: fonts.PoppinsSemiBold,
  },
});

export default MenuButtons;
