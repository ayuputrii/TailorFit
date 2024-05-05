import React from 'react';
import {StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import IlustrationVerified from '../../assets/ilustration/il-verified.svg';
import {colors} from '../../utils/colors';
import {Buttons, Text} from '../commons';
import Icon from 'react-native-vector-icons/AntDesign';
import {moderateScale, verticalScale} from '../../utils/scale';
import {fonts} from '../../utils/fonts';

interface ModalConfirmationProps {
  isVisible: boolean;
  onClose: any;
  title: string;
  message: string;
  textBtn: string;
  onSubmit: () => void;
  style: any;
}

const ModalConfirmation = ({
  isVisible,
  onClose,
  title,
  message,
  textBtn,
  onSubmit,
  style,
}: ModalConfirmationProps) => {
  return (
    <Modal isVisible={isVisible}>
      <View style={[style, styles.container]}>
        <Buttons onPress={onClose} style={styles.btnClose} disabled={false}>
          <Icon
            name="closecircle"
            size={moderateScale(30)}
            color={colors.red}
          />
        </Buttons>
        <View style={styles.content}>
          <View style={styles.ilustration}>
            <IlustrationVerified />
          </View>
          <View style={styles.viewMessage}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
          </View>
          <Buttons
            onPress={onSubmit}
            style={styles.btn}
            children={<Text style={styles.text}>{textBtn}</Text>}
            disabled={false}
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
    height: moderateScale(400),
  },
  btnClose: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: verticalScale(4),
    paddingBottom: moderateScale(24),
    right: moderateScale(10),
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
  btn: {
    width: '100%',
    backgroundColor: colors.orange,
    borderRadius: moderateScale(10),
    height: moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
    fontSize: moderateScale(16),
  },
});

export default ModalConfirmation;
