import React, {ReactNode} from 'react';
import {View, StyleSheet} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {moderateScale} from '../../utils/scale';

interface ModalBottomSheet {
  children: ReactNode;
  button: ReactNode;
  refRBSheet: any;
  height?: number;
  onCloseModalBottom?: () => void;
}

const ModalBottom = ({
  children,
  button,
  refRBSheet,
  height,
  onCloseModalBottom,
}: ModalBottomSheet) => {
  return (
    <View style={styles.container}>
      {button}
      <RBSheet
        ref={refRBSheet}
        height={height}
        useNativeDriver={false}
        draggable
        onClose={onCloseModalBottom}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(133, 126, 126, 0.29)',
          },
          draggableIcon: {
            backgroundColor: '#857E7E',
            marginTop: moderateScale(32),
            borderRadius: moderateScale(8),
            height: moderateScale(11),
            width: moderateScale(67),
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
