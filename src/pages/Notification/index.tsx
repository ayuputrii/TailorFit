import React, {useState, useContext} from 'react';
import {BackHeader, Gap, ImageWithNotLogin} from '../../components';
import {colors} from '../../utils/colors';
import {moderateScale} from '../../utils/scale';
import {FlatList, SafeAreaView, ScrollView, StatusBar} from 'react-native';
import {NotificationProps} from '../../navigation';
import {NotificationSections} from '../../sections';
import {AuthContext} from '../../context/AuthContext';
import styles from './styles';

const data = [
  {
    id: 1,
    label: 'Successfully Payment',
    model: 'Kemeja - 150.000 x 2pcs',
    variant: 'Slim Fit - XL',
  },
];

const Notification = ({navigation}: NotificationProps) => {
  const ctx = useContext(AuthContext);
  const isLogin = ctx?.isLogin;

  const [dataNotification, setDataNotification] = useState(data as []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={false}
        backgroundColor={colors.basebg}
        barStyle="dark-content"
      />
      <BackHeader
        title="Notification List"
        goBack={() => navigation?.goBack()}
        icon={false}>
        {isLogin ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={styles.scroll}>
            <FlatList
              data={dataNotification}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              keyExtractor={(_item, index) => index.toString()}
              renderItem={({item, index}) => {
                return <NotificationSections key={index} item={item} />;
              }}
            />

            <Gap height={moderateScale(8)} width={0} />
          </ScrollView>
        ) : (
          <ImageWithNotLogin navigation={navigation} />
        )}
        <Gap height={moderateScale(8)} width={0} />
      </BackHeader>
    </SafeAreaView>
  );
};

export default Notification;
