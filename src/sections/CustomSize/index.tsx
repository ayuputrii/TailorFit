import React, {Dispatch, SetStateAction} from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import {Buttons, Text} from '../../components';
import {Size} from '../../types';

interface CustomSizeSectionsProps {
  item: {
    name: string;
    label: string;
    value: number;
  };
  customSize: Size['sizeDetail'];
  onChangeSizeValue: ({
    dir,
    part,
  }: {
    dir: 'plus' | 'minus';
    part: keyof Size['sizeDetail'];
  }) => void;
}

const CustomSizeSections = ({
  item,
  onChangeSizeValue,
  customSize,
}: CustomSizeSectionsProps) => {
  const onPlus = () => {
    onChangeSizeValue({
      dir: 'plus',
      part: item.name as keyof Size['sizeDetail'],
    });
  };

  const onMinus = () => {
    onChangeSizeValue({
      dir: 'minus',
      part: item.name as keyof Size['sizeDetail'],
    });
  };

  return (
    <View style={styles.container}>
      <Buttons style={styles.bgContent} onPress={onMinus}>
        <Text style={styles.txt}>-</Text>
      </Buttons>
      <View style={styles.flexCol}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.subTitle}>
          {customSize[item.name as keyof Size['sizeDetail']].value} cm
        </Text>
      </View>
      <Buttons style={styles.bgContent} onPress={onPlus}>
        <Text style={styles.txt}>+</Text>
      </Buttons>
    </View>
  );
};

export default CustomSizeSections;
