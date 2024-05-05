import React, {ReactNode} from 'react';
import {ViewStyle} from 'react-native';
import {Modal} from 'react-native-paper';

interface ModalProps {
  visible: boolean;
  setVisible: any;
  containerStyle: ViewStyle;
  children: ReactNode;
}

const ModalCommons = ({
  visible,
  setVisible,
  containerStyle,
  children,
}: ModalProps) => {
  return (
    <Modal
      visible={visible}
      onDismiss={() => setVisible(false)}
      contentContainerStyle={containerStyle}>
      {children}
    </Modal>
  );
};

export default ModalCommons;
