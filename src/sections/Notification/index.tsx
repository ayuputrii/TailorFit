import React from 'react';
import {View} from 'react-native';
import {CardCommons, Gap, ImageWithNotFound, Text} from '../../components';
import {moderateScale} from '../../utils/scale';
import styles from './styles';

interface NotificationSectionsProps {
  item: {
    label: string;
    model: string;
    variant: string;
  };
}

const NotificationSections = ({item}: NotificationSectionsProps) => {
  return (
    <View style={{width: '100%'}}>
      <CardCommons
        title={''}
        subTitle={''}
        titleStyle={false}
        subTitleStyle={false}
        onPress={() => {}}
        disabled={true}
        style={styles.card}>
        <View style={styles.boxProduct}>
          <ImageWithNotFound
            styleNoData={styles.notFound}
            uri={false}
            style={{}}
          />

          <Gap height={0} width={moderateScale(4)} />

          <View style={styles.viewDesc}>
            <Text style={styles.title}>{item?.label || '-'}</Text>

            <Text style={styles.textGraySemiBold}>{item?.model || '-'}</Text>

            <Text style={[styles.textOrangeSemiBold, styles.variant]}>
              {item?.variant || '-'}
            </Text>
          </View>
        </View>
      </CardCommons>
    </View>
  );
};

export default NotificationSections;
