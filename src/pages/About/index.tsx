import React from 'react';
import {BackHeader, Gap, Text} from '../../components';
import IconANT from 'react-native-vector-icons/AntDesign';
import {colors} from '../../utils/colors';
import {moderateScale} from '../../utils/scale';
import {ScrollView, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';

const About = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <BackHeader
        title="About Apps"
        goBack={() => navigation?.goBack()}
        icon={
          <IconANT
            name="logout"
            color={colors.black}
            size={moderateScale(20)}
          />
        }>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <Gap height={moderateScale(8)} width={0} />
          <Text style={styles.txtDesc}>
            TailorFit is designed for the needs of tailors in buying and selling
            goods in the form of fashion according to what customers want, you
            can buy goods according to your fashion, you can also customize
            fashion that you like, of course you can find out the size with just
            a camera and you easily can pay online, easy, safe and practical.
          </Text>
          <Gap height={moderateScale(8)} width={0} />
        </ScrollView>
      </BackHeader>
    </View>
  );
};

export default About;
