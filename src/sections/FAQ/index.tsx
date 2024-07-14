import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {styles} from './styles';
import {CollapsibleView, ImageWithNotData} from '../../components';
import {menu} from '../../types';

interface FAQSectionsProps {
  data: menu[];
}

const FAQSections = ({data}: FAQSectionsProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toogleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <ScrollView style={styles.container}>
      {data?.length ? (
        <CollapsibleView
          toogleCollapse={toogleCollapse}
          isCollapsed={isCollapsed}
          data={data}
        />
      ) : (
        <ImageWithNotData style={styles.noData} />
      )}
    </ScrollView>
  );
};

export default FAQSections;
