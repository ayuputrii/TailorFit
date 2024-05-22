import React, {Dispatch, SetStateAction} from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '../../utils/colors';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {moderateScale} from '../../utils/scale';
import {Buttons, InputSearch} from '../../components';

interface ProductSearchProps {
  value: string;
  onChangeText: Dispatch<SetStateAction<string>>;
  onSubmitEditing: () => void;
  onClose: () => void;
  onNotifications: () => void;
  onSearchDelete: () => void;
}

const ProductSearch = ({
  value,
  onChangeText,
  onSubmitEditing,
  onClose,
  onNotifications,
  onSearchDelete,
}: ProductSearchProps) => {
  return (
    <View style={styles.container}>
      <Buttons disabled={false} onPress={onClose} style={styles.viewBack}>
        <Ionicons
          name="chevron-back-outline"
          size={moderateScale(24)}
          color={colors.black}
        />
      </Buttons>
      <InputSearch
        value={value}
        onChangeText={onChangeText}
        placeholder="Search product..."
        placeholderTextColor={colors.lightgray}
        styleInput={undefined}
        styleText={undefined}
        onSubmitEditing={onSubmitEditing}
        onPress={onSearchDelete}
      />
      <Buttons
        disabled={false}
        onPress={onNotifications}
        style={styles.viewNotif}>
        <Octicons name="bell" size={moderateScale(24)} color={colors.black} />
      </Buttons>
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
