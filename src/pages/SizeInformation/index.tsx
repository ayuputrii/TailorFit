import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import {styles} from './styles';
import {BackHeader, Gap} from '../../components';
import {colors} from '../../utils/colors';
import {SizeInformationProps} from '../../navigation';
import {moderateScale} from '../../utils/scale';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {dataSize} from '../../constants/DataSize';

const SizeInformation = ({navigation}: SizeInformationProps) => {
  const [activeSections, setActiveSections] = useState([]);

  const setSections = (sections: []) => {
    setActiveSections(sections);
  };

  const renderHeader = (section: {title: string}) => {
    return (
      <View style={[styles.header]}>
        <Text style={styles.headerText}>{section?.title}</Text>
        <MaterialIcons
          name="keyboard-arrow-down"
          size={moderateScale(24)}
          color={colors.black}
        />
      </View>
    );
  };

  const renderContent = (section: any, _: any, isActive: boolean) => {
    return (
      <View style={[styles.content, isActive ? styles.active : null]}>
        <Text style={styles.contentText}>{section?.content}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={false}
        backgroundColor={colors.basebg}
        barStyle="dark-content"
      />
      <BackHeader
        title="Informasi Ukuran"
        goBack={() => navigation.navigate('CustomSize')}
        icon={false}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <Gap height={moderateScale(8)} width={0} />
          <Accordion
            activeSections={activeSections}
            sections={dataSize}
            touchableComponent={TouchableOpacity}
            expandMultiple={true}
            renderHeader={renderHeader}
            renderContent={renderContent}
            onChange={setSections}
            sectionContainerStyle={{
              backgroundColor: colors.grey,
              marginBottom: moderateScale(8),
              borderRadius: moderateScale(8),
            }}
          />
        </ScrollView>
      </BackHeader>
    </SafeAreaView>
  );
};

export default SizeInformation;
