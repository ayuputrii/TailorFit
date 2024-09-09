import React, {ReactNode} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {moderateScale} from '../../utils/scale';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {menu} from '../../types';
import Gap from './Gap';

interface CollapsibleProps {
  toggleCollapse: (index: number, id: number) => void;
  collapsedIndexes: Record<number, boolean | any>;
  data: menu[];
  child: ReactNode;
  contentChild: ReactNode;
}

const CollapsibleView = ({
  toggleCollapse,
  collapsedIndexes,
  data,
  child,
  contentChild,
}: CollapsibleProps) => {
  return (
    <React.Fragment>
      {data &&
        data.map((items: menu, index: number) => {
          const isCollapsed = collapsedIndexes[index]?.[id];

          return (
            <React.Fragment>
              <View style={styles.section} key={index}>
                <TouchableOpacity onPress={() => toggleCollapse(index, id)}>
                  <View style={styles.item}>
                    {child}
                    <Icon
                      name={
                        isCollapsed
                          ? 'keyboard-arrow-down'
                          : 'keyboard-arrow-up'
                      }
                      size={24}
                      color="#666"
                      style={styles.arrowIcon}
                    />
                  </View>
                </TouchableOpacity>
                <Collapsible collapsed={isCollapsed}>
                  {contentChild}
                </Collapsible>
              </View>
              <Gap height={moderateScale(16)} width={0} />
            </React.Fragment>
          );
        })}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: fonts.PoppinsMedium,
    fontSize: moderateScale(16),
    color: colors.black,
  },
  section: {
    padding: moderateScale(16),
    backgroundColor: colors.white,
    borderRadius: moderateScale(10),
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontSize: moderateScale(14),
    color: colors.black,
    fontFamily: fonts.PoppinsMedium,
    width: '80%',
  },
  content: {
    paddingTop: moderateScale(8),
  },
  text: {
    fontSize: moderateScale(14),
    color: colors.orange,
    fontStyle: 'italic',
    width: '100%',
  },
  arrowIcon: {
    marginLeft: 'auto',
  },
});

export default CollapsibleView;
