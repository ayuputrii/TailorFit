import React from 'react';
import {Text, View} from 'react-native';
import Logo from '../../assets/icons/ic-logo.svg';
import {colors} from '../../utils/colors';
import {
  BackgroundWithImage,
  Buttons,
  HeaderNotLogin,
} from '../../components/commons';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {moderateScale} from '../../utils/scale';
import {SplashScreenProps} from '../../navigation';
import {images} from '../../assets';

const SplashScreen = ({navigation}: SplashScreenProps) => {
  return (
    <View style={styles.container}>
      <HeaderNotLogin
        title="TailorFit"
        subTitle="FASHION & STYLE"
        subColor={colors.black}
        marginTop={80}
        fontSizeSub={24}
      />
      <View style={styles.viewLogo}>
        <Logo width={'100%'} height={moderateScale(430)} style={styles.logo} />
      </View>
      <View style={styles.viewRectangle}>
        <BackgroundWithImage
          src={images.imgRectangle}
          children={false}
          backgroundChildren={
            <View style={styles.bottomRow}>
              <Text style={styles.text}>GET STARTED</Text>
              <Buttons
                style={styles.viewIconArrow}
                disabled={false}
                onPress={() => navigation.navigate('MainTabs')}>
                <Icon
                  name="keyboard-arrow-right"
                  size={moderateScale(40)}
                  color={colors.white}
                />
              </Buttons>
            </View>
          }
        />
      </View>
    </View>
  );
};

export default SplashScreen;
