import React, {useContext} from 'react';
import {BackHeader, Gap, ImageWithNotLogin} from '../../components';
import IconANT from 'react-native-vector-icons/AntDesign';
import {colors} from '../../utils/colors';
import {moderateScale} from '../../utils/scale';
import {SafeAreaView, ScrollView, StatusBar} from 'react-native';
import styles from './styles';
import {ChatProps} from '../../navigation';
import {AuthContext} from '../../context/AuthContext';

const Chat = ({navigation}: ChatProps) => {
  const ctx = useContext(AuthContext);
  const isLogin = ctx?.isLogin;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={false}
        backgroundColor={colors.basebg}
        barStyle="dark-content"
      />
      <BackHeader
        title="Chat"
        goBack={() => navigation?.goBack()}
        icon={
          isLogin && (
            <IconANT
              name="logout"
              color={colors.black}
              size={moderateScale(20)}
            />
          )
        }>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <Gap height={moderateScale(8)} width={0} />
          {isLogin ? null : <ImageWithNotLogin navigation={navigation} />}
          <Gap height={moderateScale(8)} width={0} />
        </ScrollView>
      </BackHeader>
    </SafeAreaView>
  );
};

export default Chat;
