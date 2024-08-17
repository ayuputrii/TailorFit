import React, {useState, useContext} from 'react';
import {
  BackHeader,
  Buttons,
  Gap,
  ImageWithNotLogin,
  Text,
} from '../../components';
import {colors} from '../../utils/colors';
import {moderateScale} from '../../utils/scale';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import styles from './styles';
import {CustomSizeProps} from '../../navigation';
import {CustomSizeSections} from '../../sections';
import {AuthContext} from '../../context/AuthContext';
import {Size} from '../../types';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {useDesiredSizeStore} from '../../store/useDesiredSizeStore';

const CustomSize = ({navigation}: CustomSizeProps) => {
  const ctx = useContext(AuthContext);
  const isLogin = ctx?.isLogin;

  const desiredSizeStore = useDesiredSizeStore();

  const size = Object.entries(
    (desiredSizeStore.size?.sizeDetail || {}) as Size['sizeDetail'],
  ).map(([prop, val]) => {
    return {
      name: prop,
      label: val?.label,
      value: val?.value,
    };
  });

  const [customSize, setCustomSize] = useState<Size['sizeDetail']>(
    () => desiredSizeStore.size?.sizeDetail as Size['sizeDetail'],
  );

  const onConfirm = () => {
    desiredSizeStore.setSize({
      name: 'CUSTOM',
      _id: '',
      sizeDetail: customSize,
    });
    navigation.navigate({
      name: 'ProductDetail',
      params: {
        openBottomSheet: true,
      },
      merge: true,
    });
  };
  const onReset = () => {};

  const onChangeSizeValue = ({
    dir,
    part,
  }: {
    dir: 'plus' | 'minus';
    part: keyof Size['sizeDetail'];
  }) => {
    if (dir === 'plus') {
      setCustomSize({
        ...customSize,
        [part]: {
          ...customSize[part],
          value: customSize[part].value + 1,
        },
      });
    } else {
      if (customSize[part].value > 1) {
        setCustomSize({
          ...customSize,
          [part]: {
            ...customSize[part],
            value: customSize[part].value - 1,
          },
        });
      }
    }
  };

  const goSizeInformation = () => {
    navigation.navigate('SizeInformation');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={false}
        backgroundColor={colors.basebg}
        barStyle="dark-content"
      />
      <BackHeader
        title="Customize Size"
        goBack={() =>
          navigation.navigate({
            name: 'ProductDetail',
            params: {
              openBottomSheet: true,
            },
            merge: true,
          })
        }
        icon={
          <IonIcon
            name="information-circle"
            size={moderateScale(22)}
            color={colors.black}
            onPress={goSizeInformation}
          />
        }>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <Gap height={moderateScale(8)} width={0} />
          {isLogin ? (
            <FlatList
              data={size}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              keyExtractor={(_item: any, index: {toString: () => any}) =>
                index.toString()
              }
              renderItem={({
                item,
                index,
              }: {
                item: {name: string; label: string; value: number};
                index: number;
              }) => {
                return (
                  <CustomSizeSections
                    key={index}
                    item={item}
                    customSize={customSize}
                    onChangeSizeValue={onChangeSizeValue}
                  />
                );
              }}
              ListFooterComponent={<Gap height={moderateScale(60)} width={0} />}
            />
          ) : (
            <ImageWithNotLogin navigation={navigation} />
          )}
          <Gap height={moderateScale(120)} width={0} />
        </ScrollView>
        <View style={styles.contentFooter}>
          <Text style={styles.txtFooter}>
            Silakan periksa informasi ukuran pada ikon "i" untuk panduan ukuran
            Anda
          </Text>

          <View style={styles.flexRowCenter}>
            <Buttons onPress={onConfirm} style={styles.btnConfirm}>
              <Text style={styles.txtBtn}>Konfirmasi</Text>
            </Buttons>
            <Gap width={moderateScale(6)} height={0} />
            <Buttons onPress={onReset} style={styles.btnReset}>
              <Text style={styles.txtBtn}>Reset</Text>
            </Buttons>
          </View>
        </View>
      </BackHeader>
    </SafeAreaView>
  );
};

export default CustomSize;
