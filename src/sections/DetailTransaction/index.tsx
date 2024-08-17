import React from 'react';
import {ScrollView, View} from 'react-native';
import {Gap} from '../../components';
import {moderateScale} from '../../utils/scale';
import {AddressTypes} from '../../types';
import styles from './styles';
import ChooseAddress from '../Checkout/ChooseAddress';
import DetailProductTransaction from './DetailProductTransaction';

interface DetailTransactionSectionsProps {
  detail: AddressTypes[];
}
const DetailTransactionSections = ({
  detail,
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

        {/* {dataFilter && (
          <>
                  <Gap height={moderateScale(16)} width={0} />

        <UserInformationSections data={dataFilter} />
          </>
        )} */}

        {detail && (
          <>
            <Gap height={moderateScale(16)} width={0} />

            <DetailProductTransaction data={detail} />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default DetailTransactionSections;
