/* eslint-disable react-native/no-inline-styles */
import React, {Dispatch, SetStateAction} from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '../../utils/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {moderateScale} from '../../utils/scale';
import {Buttons, InputSearch} from '../../components';

interface ProductSearchProps {
  value: string;
  onChangeText: Dispatch<SetStateAction<string>>;
  onSubmitEditing: () => void;
  onClose: () => void;
  onNotifications?: () => void;
  onSearchDelete: () => void;
  isLogin?: boolean | undefined;
  onClearText: () => void;
}

const ProductSearch = ({
  value,
  onChangeText,
  onSubmitEditing,
  onClose,
  // onNotifications,
  onSearchDelete,
  // isLogin,
  onClearText,
}: ProductSearchProps) => {
  return (
    <View style={[styles.container, {width: '100%'}]}>
      <Buttons disabled={false} onPress={onClose} style={styles.viewBack}>
        <Ionicons
          name="chevron-back-outline"
          size={moderateScale(24)}
          color={colors.black}
        />
      </Buttons>
      <InputSearch
        value={value}
        onClearText={onClearText}
        onChangeText={onChangeText}
        placeholder="Search product..."
        placeholderTextColor={colors.lightgray}
        styleInput={undefined}
        styleText={undefined}
        onSubmitEditing={onSubmitEditing}
        onPress={onSearchDelete}
      />
      {/* {isLogin && (
        <Buttons
          disabled={false}
          onPress={onNotifications}
          style={styles.viewNotif}>
          <Octicons name="bell" size={moderateScale(24)} color={colors.black} />
        </Buttons>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  viewBack: {
    marginRight: moderateScale(4),
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
  },
  viewNotif: {
    marginLeft: moderateScale(10),
  },
});
export default ProductSearch;
