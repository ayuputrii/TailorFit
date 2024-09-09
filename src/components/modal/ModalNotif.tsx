import React from 'react';
import {StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import {colors} from '../../utils/colors';
import {Buttons, Gap, Text} from '../commons';
import Icon from 'react-native-vector-icons/AntDesign';
import {moderateScale, verticalScale} from '../../utils/scale';
import {fonts} from '../../utils/fonts';
import IlustrationSuccess from '../../assets/ilustration/il-success.svg';
import IlustrationCancel from '../../assets/ilustration/il-cancel.svg';

interface ModalNotifProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  style: any;
  error: boolean;
}

const ModalNotif = ({
  isVisible,
  onClose,
  title,
  style,
  error,
}: ModalNotifProps) => {
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
            {!error ? (
              <IlustrationSuccess
                width={'100%'}
                height={moderateScale(150)}
                style={styles.image}
              />
            ) : (
              <IlustrationCancel
                width={'100%'}
                height={moderateScale(150)}
                style={styles.image}
              />
            )}
          </View>
          <Gap height={moderateScale(14)} width={0} />
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: moderateScale(20),
    height: moderateScale(320),
  },
  btnClose: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: verticalScale(8),
    paddingBottom: moderateScale(24),
    right: moderateScale(12),
  },
  content: {
    paddingHorizontal: moderateScale(24),
  },
  ilustration: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
  },
  title: {
    textAlign: 'center',
    color: colors.orange,
    fontFamily: fonts.PoppinsBold,
    fontSize: moderateScale(16),
  },
});

export default ModalNotif;
