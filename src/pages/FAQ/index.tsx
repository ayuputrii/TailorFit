import React from 'react';
import {BackHeader, Gap} from '../../components';
import {moderateScale} from '../../utils/scale';
import {ScrollView, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import {FAQSections} from '../../sections';
import {DataFAQ} from '../../constants/DataFAQ';

const FAQPage = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <BackHeader title="FAQ" goBack={() => navigation?.goBack()} icon={false}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <Gap height={moderateScale(8)} width={0} />
          <FAQSections data={DataFAQ as []} />
          <Gap height={moderateScale(8)} width={0} />
        </ScrollView>
      </BackHeader>
    </View>
  );
};

export default FAQPage;
