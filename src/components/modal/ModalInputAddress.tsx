import React, {Dispatch, SetStateAction, useRef} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  Switch,
} from 'react-native';
import Modal from 'react-native-modal';
import {colors} from '../../utils/colors';
import {Buttons, Gap, Text} from '../commons';
import Icon from 'react-native-vector-icons/AntDesign';
import {moderateScale} from '../../utils/scale';
import {fonts} from '../../utils/fonts';
import {InputNumber, InputText} from '../forms';
import {KeyboardAvoidingView} from 'react-native';

interface ModalInputAddressProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  textBtn: string;
  onSubmit: () => void;
  addressName: string | undefined;
  setAddressName: Dispatch<SetStateAction<string | undefined>>;
  errorAddressName: string | undefined;
  phone: string | undefined;
  setPhone: Dispatch<SetStateAction<string | undefined>>;
  errorPhone: string;
  address: string | undefined;
  setAddress: Dispatch<SetStateAction<string | undefined>>;
  errorAddress: string;
  postCode: string | undefined;
  setPostCode: Dispatch<SetStateAction<string | undefined>>;
  errorPostCode: string;
  disabled: boolean;
  loading: boolean;
  isDefault: boolean;
  setIsDefault: Dispatch<SetStateAction<boolean>>;
}

const ModalInputAddress = ({
  isVisible,
  onClose,
  title,
  textBtn,
  onSubmit,
  addressName,
  setAddressName,
  errorAddressName,
  phone,
  setPhone,
  errorPhone,
  address,
  setAddress,
  errorAddress,
  postCode,
  setPostCode,
  errorPostCode,
  disabled,
  loading,
  isDefault,
  setIsDefault,
}: ModalInputAddressProps) => {
  const refAddressName = useRef<TextInput>(null);
  const refPhone = useRef<TextInput>(null);
  const refAddress = useRef<TextInput>(null);
  const refPostCode = useRef<TextInput>(null);

  return (
    <Modal isVisible={isVisible}>
      <ScrollView
        style={styles.container}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <Buttons disabled={false} onPress={onClose} style={styles.btnClose}>
          <Icon
            name="closecircle"
            size={moderateScale(30)}
            color={colors.red}
          />
        </Buttons>
        <KeyboardAvoidingView behavior={'height'} style={styles.container}>
          <View style={styles.content}>
            <View style={styles.viewMessage}>
              <Text style={styles.title}>{title}</Text>
            </View>
            <InputText
              ref={refAddressName}
              value={addressName}
              onChangeText={setAddressName}
              placeholder="Nama Alamat"
              placeholderTextColor={'#AFAFAF'}
              styleInput={undefined}
              styleText={undefined}
              error={errorAddressName}
              onSubmitEditing={() => refPhone.current?.focus()}
            />
            <InputText
              ref={refPhone}
              value={phone}
              onChangeText={setPhone}
              placeholder="Nomor Handphone"
              placeholderTextColor={'#AFAFAF'}
              styleInput={undefined}
              styleText={undefined}
              error={errorPhone}
              onSubmitEditing={() => refAddress.current?.focus()}
            />
            <InputText
              ref={refAddress}
              value={address}
              onChangeText={setAddress}
              placeholder="Alamat"
              placeholderTextColor={'#AFAFAF'}
              styleInput={undefined}
              styleText={undefined}
              error={errorAddress}
              onSubmitEditing={() => refPostCode.current?.focus()}
            />
            <InputNumber
              ref={refPostCode}
              value={`${postCode}`}
              onChangeText={setPostCode}
              placeholder="Kode Pos"
              placeholderTextColor={'#AFAFAF'}
              styleInput={undefined}
              styleText={undefined}
              error={errorPostCode}
              onSubmitEditing={onSubmit}
            />

            <View style={styles.flexBetweenCenter}>
              <Text style={styles.txt}>Alamat Utama ? </Text>
              <Switch
                trackColor={{false: colors.lightgray, true: colors.lightgray}}
                thumbColor={colors.orange}
                ios_backgroundColor="#3e3e3e"
                onValueChange={setIsDefault}
                value={isDefault}
              />
            </View>

            <Buttons
              disabled={disabled}
              onPress={onSubmit}
              style={styles.btn}
              children={
                <View style={styles.flexRowCenter}>
                  {loading && (
                    <>
                      <ActivityIndicator color={colors.white} size="small" />
                      <Gap width={moderateScale(3)} height={0} />
                    </>
                  )}
                  <Text style={styles.text}>{textBtn}</Text>
                </View>
              }
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: moderateScale(100),
    backgroundColor: 'white',
    borderRadius: moderateScale(20),
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
  flexRowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexBetweenCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewMessage: {
    marginVertical: moderateScale(24),
  },
  txt: {
    textAlign: 'center',
    color: colors.orange,
    fontFamily: fonts.PoppinsMedium,
    fontSize: moderateScale(14),
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
  btn: {
    width: '100%',
    backgroundColor: colors.orange,
    borderRadius: moderateScale(8),
    height: moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: moderateScale(24),
  },
  text: {
    color: colors.white,
    fontFamily: fonts.PoppinsBold,
    fontSize: moderateScale(16),
  },
});

export default ModalInputAddress;
