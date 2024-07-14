import React from 'react';
import {FlatList, View} from 'react-native';
import {styles} from './styles';
import {Gap, Shimmer} from '../../components';
import {verticalScale} from '../../utils/scale';
import {CategoryTypes, PromotionTypes} from '../../types';
import CategorySections from './CategorySections';
import PromotionsSections from './PromotionsSctions';

interface HomeSearchSectionsProps {
  promotion: PromotionTypes[];
  category: CategoryTypes[];
  width: number;
  activeMenuIndex: number;
  handleMenuPress: any;
  loading: boolean;
  showSearch: boolean;
}

const HomeSearchSections = ({
  promotion,
  category,
  width,
  activeMenuIndex,
  handleMenuPress,
  loading,
  showSearch,
}: HomeSearchSectionsProps) => {
  return (
    <React.Fragment>
      {loading && !showSearch ? (
        <React.Fragment>
          <Shimmer style={styles.imgShimmerPromo} />
          <Gap height={verticalScale(14)} width={0} />
          <View style={styles.flexRow}>
            {[1, 2, 3, 4]?.map((_item, index) => (
              <Shimmer key={index} style={styles.category} />
            ))}
          </View>
          <FlatList
            data={[1, 2, 3, 4]}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            renderItem={({index}) => (
              <View style={styles.productShimmerContainer}>
                <Shimmer key={index} style={styles.productShimmer} />
              </View>
            )}
            keyExtractor={(_item, index) => index.toString()}
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
          {showSearch ? null : (
            <React.Fragment>
              <PromotionsSections width={width} promotion={promotion} />
              <CategorySections
                category={category}
                handleMenuPress={handleMenuPress}
                activeMenuIndex={activeMenuIndex}
              />
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default HomeSearchSections;
