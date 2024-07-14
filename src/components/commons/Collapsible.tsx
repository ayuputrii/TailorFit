import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {moderateScale} from '../../utils/scale';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {menu} from '../../types';
import Gap from './Gap';

interface CollapsibleProps {
  toogleCollapse: () => void;
  isCollapsed: boolean;
  data: menu[];
}

const CollapsibleView = ({
  toogleCollapse,
  isCollapsed,
  data,
}: CollapsibleProps) => {
  return (
    <React.Fragment>
      {data &&
        data?.map((items: menu, index: number) => {
          return (
            <React.Fragment key={index}>
              <Text style={styles.title}>{items?.title}</Text>
              <Gap height={moderateScale(8)} width={0} />
              <View style={styles.section}>
                <TouchableOpacity onPress={toogleCollapse}>
                  <View style={styles.item}>
                    <Text style={styles.itemTitle}>{items?.label || '-'}</Text>
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
                  <View style={styles.content}>
                    <Text style={styles.text}>{items?.content || '-'}</Text>
                  </View>
                </Collapsible>
              </View>
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
