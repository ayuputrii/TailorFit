import React, {Dispatch, SetStateAction} from 'react';
import {StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import {colors} from '../../utils/colors';
import {Buttons, Text} from '../commons';
import Icon from 'react-native-vector-icons/AntDesign';
import {moderateScale} from '../../utils/scale';
import {fonts} from '../../utils/fonts';
import {InputText} from '../forms';

interface ModalInputAddressProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  textBtn: string;
  onSubmit: () => void;
  value: string;
  onChangeText: Dispatch<SetStateAction<string>>;
  backgroundColor: any;
}

const ModalInputAddress = ({
  isVisible,
  onClose,
  title,
  textBtn,
  onSubmit,
  value,
  onChangeText,
  backgroundColor,
}: ModalInputAddressProps) => {
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.container}>
        <Buttons onPress={onClose} style={styles.btnClose}>
          <Icon
            name="closecircle"
            size={moderateScale(30)}
            color={colors.red}
          />
        </Buttons>
        <View style={styles.content}>
          <View style={styles.viewMessage}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <InputText
            value={value}
            onChangeText={onChangeText}
            placeholder="Full name"
            placeholderTextColor={'#AFAFAF'}
            styleInput={(styles.inputView, {backgroundColor})}
            styleText={styles.inputText}
          />
          <InputText
            value={value}
            onChangeText={onChangeText}
            placeholder="Phone Number"
            placeholderTextColor={'#AFAFAF'}
            styleInput={(styles.inputView, {backgroundColor})}
            styleText={styles.inputText}
          />
          <InputText
            value={value}
            onChangeText={onChangeText}
            placeholder="Address"
            placeholderTextColor={'#AFAFAF'}
            styleInput={(styles.inputView, {backgroundColor})}
            styleText={styles.inputText}
          />
          <InputText
            value={value}
            onChangeText={onChangeText}
            placeholder="Post Code"
            placeholderTextColor={'#AFAFAF'}
            styleInput={(styles.inputView, {backgroundColor})}
            styleText={styles.inputText}
          />
          <Buttons
            onPress={onSubmit}
            style={styles.btn}
            children={<Text style={styles.text}>{textBtn}</Text>}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: moderateScale(100),
    backgroundColor: 'white',
    borderRadius: moderateScale(20),
    height: moderateScale(500),
  },
  btnClose: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    right: moderateScale(10),
    paddingTop: moderateScale(16),
  },
  content: {
    paddingHorizontal: moderateScale(24),
  },
  ilustration: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  viewMessage: {
    marginVertical: moderateScale(24),
  },
  title: {
    textAlign: 'center',
    color: colors.orange,
    fontFamily: fonts.PoppinsBold,
    fontSize: moderateScale(16),
  },
  message: {
    textAlign: 'center',
    color: colors.darkgray,
    fontSize: moderateScale(14),
    fontFamily: fonts.PoppinsRegular,
  },
  inputView: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#DCDCDC',
    borderRadius: moderateScale(12),
    height: moderateScale(45),
    justifyContent: 'center',
    paddingHorizontal: moderateScale(8),
    marginBottom: moderateScale(14),
  },
  inputText: {
    marginTop: moderateScale(4),
  },
  btn: {
    width: '100%',
    backgroundColor: colors.orange,
    borderRadius: moderateScale(10),
    height: moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: moderateScale(24),
  },
  text: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
    fontSize: moderateScale(16),
  },
});

export default ModalInputAddress;
