import React from 'react';
import {ScrollView, View} from 'react-native';
import {Gap} from '../../components';
import {moderateScale} from '../../utils/scale';
import styles from './styles';
import ChooseAddress from '../Checkout/ChooseAddress';
import DetailProductTransaction from './DetailProductTransaction';
import {DetailTransactionProps} from '../../navigation';

interface DetailTransactionSectionsProps {
  detail: DetailTransactionProps['route']['params'];
  timeDiff: number;
  pathOrder: boolean;
}
const DetailTransactionSections = ({
  detail,
  timeDiff,
  pathOrder,
}: DetailTransactionSectionsProps) => {
  const detailAddress = detail?.item?.addressId;

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.scroll}>
        <ChooseAddress
          onPress={() => {}}
          disabled={true}
          data={detailAddress}
        />

        {detail && (
          <>
            <Gap height={moderateScale(16)} width={0} />

            <DetailProductTransaction
              data={detail}
              timeDiff={timeDiff}
              pathOrder={pathOrder}
            />

            <Gap height={moderateScale(16)} width={0} />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default DetailTransactionSections;
