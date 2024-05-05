import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import Logo from '../../assets/icons/ic-logo.svg';
import {colors} from '../../utils/colors';
import SplashScreen from 'react-native-splash-screen';
import {
  BackgroundWithImage,
  Buttons,
  HeaderNotLogin,
} from '../../components/commons';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {moderateScale} from '../../utils/scale';
import {SplashScreenProps} from '../../navigation';
import {getData} from '../../utils/async-storage';

const SplashScreenPage = ({navigation}: SplashScreenProps) => {
  const [preload, setPreload] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1500);

    const checkStorage = async () => {
      const accessToken = await getData('ACCESS_TOKEN');
      if (accessToken) {
        navigation.replace('MainTabs');
      }
      setPreload(false);
    };

    checkStorage();
  }, [navigation]);

  if (preload) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <HeaderNotLogin
        title="MADINA TAILOR"
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
          src={require('../../assets/images/img-rectangle.png')}
          children={false}
          backgroundChildren={
            <View style={styles.bottomRow}>
              <Text style={styles.text}>GET STARTED</Text>
              <Buttons
                style={styles.viewIconArrow}
                disabled={false}
                onPress={() => navigation.navigate('Login')}>
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

export default SplashScreenPage;
