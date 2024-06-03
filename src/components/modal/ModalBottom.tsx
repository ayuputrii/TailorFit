import React, {ReactNode} from 'react';
import {View, StyleSheet} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

interface ModalBottomSheet {
  children: ReactNode;
  button: ReactNode;
  refRBSheet: any;
  height?: number;
}

const ModalBottom = ({
  children,
  button,
  refRBSheet,
  height,
}: ModalBottomSheet) => {
  return (
    <View style={styles.container}>
      {button}
      <RBSheet
        ref={refRBSheet}
        height={height}
        useNativeDriver={false}
        draggable
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        {children}
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
});

export default ModalBottom;
