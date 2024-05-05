import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {AddressSections} from '../../sections';
import styles from './styles';
import {AddressProps} from '../../navigation';
import {BackHeader, Buttons, Gap, Text} from '../../components';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {colors} from '../../utils/colors';
import {moderateScale} from '../../utils/scale';
import ModalInputAddress from '../../components/modal/ModalInputAddress';

const Address = ({navigation}: AddressProps) => {
  const [showModal, setShowModal] = useState(false);
  const [isAdd, setIsAdd] = useState(false);

  const changeAddress = () => {
    setShowModal(false);
  };

  const addAddress = () => {
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      <BackHeader
        title="Choose Address"
        goBack={() => navigation?.goBack()}
        icon={false}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={styles.scroll}>
          <AddressSections
            onPress={() => {
              setIsAdd(false);
              setShowModal(true);
            }}
          />
        </ScrollView>
        <Buttons
          style={styles.btnAddress}
          onPress={() => {
            setIsAdd(true);
            setShowModal(true);
          }}>
          <Icon
            name="circle-plus"
            color={colors.white}
            size={moderateScale(16)}
          />
          <Gap width={moderateScale(10)} height={0} />
          <Text style={styles.txt}>Add New Address</Text>
        </Buttons>
      </BackHeader>
      <ModalInputAddress
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        title={isAdd ? 'Add New Address' : 'Change Address'}
        textBtn={isAdd ? 'Add' : 'Change'}
        onSubmit={() => (isAdd ? addAddress() : changeAddress())}
        backgroundColor={isAdd ? colors.white : colors.basebg}
        value=""
        onChangeText={() => {}}
      />
    </View>
  );
};

export default Address;
