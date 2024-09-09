import React, {Dispatch, SetStateAction} from 'react';
import {ImageWithNotData, Shimmer} from '../../components';
import {FlatList, RefreshControl, View} from 'react-native';
import {Cart} from '../../types';
import {moderateScale} from '../../utils/scale';
import {CartSections} from '../../sections';
import styles from './styles';

interface ListCartProps {
  data: Cart[];
  loading: boolean;
  onPressItem: (id: string) => void;
  refreshing: boolean;
  onRefresh: () => void;
  setIsUpdatingQuantity?: Dispatch<SetStateAction<boolean>>;
}

const ListCart = ({
  data,
  loading,
  onPressItem,
  refreshing,
  onRefresh,
  setIsUpdatingQuantity,
}: ListCartProps) => {
  return (
    <>
      {loading ? (
        <FlatList
          data={Array(6).fill(1)}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          renderItem={({index}) => (
            <View style={styles.productShimmerContainer}>
              <Shimmer key={index} style={styles.productShimmer} />
            </View>
          )}
          keyExtractor={(_item, index) => index.toString()}
        />
      ) : Boolean(data?.length) ? (
        <React.Fragment>
          <FlatList
            data={data}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_item, index) => index.toString()}
            style={{
              marginBottom: moderateScale(220),
            }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({item}) => {
              return (
                <CartSections
                  setIsUpdatingQuantity={setIsUpdatingQuantity}
                  key={item?._id}
                  {...item}
                  onPressItem={() => onPressItem(item?._id)}
                />
              );
            }}
          />
        </React.Fragment>
      ) : (
        <ImageWithNotData />
      )}
    </>
  );
};

export default ListCart;
