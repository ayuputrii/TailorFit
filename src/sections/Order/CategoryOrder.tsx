import React from 'react';
import {FlatList} from 'react-native';
import {Gap, MenuButtons} from '../../components';
import {verticalScale} from '../../utils/scale';
import {CategoryTypes, menu, Size} from '../../types';

interface CategoryOrderSectionsProps {
  category?: CategoryTypes[];
  activeMenuIndex: number;
  handleMenuPress: any;
  bgColor?: string;
  bgColorInActive?: string;
  txtColor?: string;
  txtColorInActive?: string;
  availableSize?: Size[];
}

const CategoryOrderSections = ({
  category,
  activeMenuIndex,
  handleMenuPress,
  bgColor,
  bgColorInActive,
  txtColor,
  txtColorInActive,
  availableSize,
}: CategoryOrderSectionsProps) => {
  return (
    <React.Fragment>
      {Boolean(category?.length || availableSize?.length) && (
        <React.Fragment>
          <Gap height={verticalScale(8)} width={0} />

          <FlatList
            data={category || availableSize}
            horizontal
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}: {item: menu; index: number}) => {
              return (
                <MenuButtons
                  key={index}
                  activeMenuIndex={activeMenuIndex}
                  setActiveMenuIndex={() => handleMenuPress(index, {...item})}
                  index={index}
                  item={item}
                  onPress={() => {}}
                  disabled={false}
                  bgColor={bgColor}
                  bgColorInActive={bgColorInActive}
                  txtColor={txtColor}
                  txtColorInActive={txtColorInActive}
                />
              );
            }}
            keyExtractor={(_item, index) => index.toString()}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default CategoryOrderSections;
