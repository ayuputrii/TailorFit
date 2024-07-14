import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {styles} from './styles';
import {CollapsibleView, ImageWithNotData} from '../../components';
import {menu} from '../../types';

interface FAQSectionsProps {
  data: menu[];
}

const FAQSections = ({data}: FAQSectionsProps) => {
  const [collapsedIndexes, setCollapsedIndexes] = useState<
    Record<number, Record<number, boolean>>
  >({});

  const toggleCollapse = (sectionIndex: number, itemIndex: number) => {
    setCollapsedIndexes(prevState => ({
      ...prevState,
      [sectionIndex]: {
        ...prevState[sectionIndex],
        [itemIndex]: !prevState[sectionIndex]?.[itemIndex],
      },
    }));
  };

  return (
    <ScrollView style={styles.container}>
      {data?.length ? (
        <CollapsibleView
          toggleCollapse={toggleCollapse}
          collapsedIndexes={collapsedIndexes}
          data={data}
        />
      ) : (
        <ImageWithNotData style={styles.noData} />
      )}
    </ScrollView>
  );
};

export default FAQSections;
