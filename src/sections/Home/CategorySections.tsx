import React from 'react';
import {FlatList} from 'react-native';
import {Gap, MenuButtons} from '../../components';
import {verticalScale} from '../../utils/scale';
import {CategoryTypes} from '../../types';

interface CategorySectionsProps {
  category: CategoryTypes[];
  activeMenuIndex: number;
  handleMenuPress: any;
}

const CategorySections = ({
  category,
  activeMenuIndex,
  handleMenuPress,
}: CategorySectionsProps) => {
  return (
    <React.Fragment>
      {category?.length && (
        <React.Fragment>
          <Gap height={verticalScale(8)} width={0} />

          <FlatList
            data={category}
            horizontal
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({
              item,
              index,
            }: {
              item: CategoryTypes;
              index: number;
            }) => (
              <MenuButtons
                key={index}
                activeMenuIndex={activeMenuIndex}
                setActiveMenuIndex={() => handleMenuPress(index, item?._id)}
                index={index}
                item={item}
                onPress={() => {}}
                disabled={false}
              />
            )}
            keyExtractor={(_item, index) => index.toString()}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default CategorySections;
