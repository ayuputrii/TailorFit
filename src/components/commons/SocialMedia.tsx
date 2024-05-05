import React from 'react';
import {StyleSheet, View} from 'react-native';
import Buttons from './Buttons';
import IconGoogle from '../../assets/icons/ic-google.svg';
// import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import {colors} from '../../utils/colors';
import {moderateScale} from '../../utils/scale';

interface SocialMediaProps {
  onPress: () => void;
}

const SocialMedia = ({onPress}: SocialMediaProps) => {
  return (
    <View style={styles.chooseSignIn}>
      <Buttons
        style={false}
        onPress={onPress}
        children={<IconGoogle width={26} height={26} />}
        disabled={false}
      />
      {/* <Buttons
        style={false}
        onPress={() => {}}
        children={
          <Icon
            name="facebook"
            size={moderateScale(24)}
            color={colors.darkblue}
          />
        }
      />
      <Buttons
        style={false}
        onPress={() => {}}
        children={
          <Icons name="twitter" size={moderateScale(24)} color={colors.blue} />
        }
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  chooseSignIn: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: moderateScale(24),
  },
});

export default SocialMedia;
