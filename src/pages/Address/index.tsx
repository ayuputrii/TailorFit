import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, View} from 'react-native';
import {AddressSections} from '../../sections';
import styles from './styles';
import {AddressProps} from '../../navigation';
import {
  BackHeader,
  Buttons,
  Gap,
  ImageWithNotData,
  ModalNotif,
  Shimmer,
  Text,
} from '../../components';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {colors} from '../../utils/colors';
import {moderateScale} from '../../utils/scale';
import ModalInputAddress from '../../components/modal/ModalInputAddress';
import {getData} from '../../utils/async-storage';
import {
  API_ADDRESS,
  BASE_URL,
  deleteWithToken,
  getDataWithToken,
  postDataWithToken,
  putDataWithToken,
} from '../../api';
import {AddressTypes} from '../../types';

const Address = ({navigation}: AddressProps) => {
  const [showModal, setShowModal] = useState(false);
  const [showModalInfo, setShowModalInfo] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorModal, setErrorModal] = useState(false);

  const [title, setTitle] = useState('');
  const [dataAddress, setDataAddress] = useState<AddressTypes[]>([]);
  const [addressName, setAddressName] = useState<string | undefined>('');
  const [phone, setPhone] = useState<string | undefined>('');
  const [address, setAddress] = useState<string | undefined>('');
  const [postCode, setPostCode] = useState<string | undefined>('');
  const [idAddress, setIdAddress] = useState<string | undefined>('');
  const [isDefault, setIsDefault] = useState(false);

  const [errorAddressName, setErrorAddressName] = useState('');
  const [errorPhone, setErrorPhone] = useState('');
  const [errorAddress, setErrorAddress] = useState('');
  const [errorPostCode, setErrorPostCode] = useState('');

  const getAddress = async () => {
    try {
      const token = await getData('ACCESS_TOKEN');
      const response = await getDataWithToken(BASE_URL + API_ADDRESS, token);
      if (response) {
        setDataAddress(response?.data?.data);
      }
    } catch (error) {
      setDataAddress([]);
    }
  };

  const clearInput = () => {
    setAddressName('');
    setPhone('');
    setAddress('');
    setPostCode('');
  };

  const addAddress = async () => {
    if (addressName === '') {
      setErrorAddressName('Nama Alamat Name harus diisi');
    } else {
      setErrorAddressName('');
    }
    if (phone === '') {
      setErrorPhone('Nomor Handphone harus diisi');
    } else {
      setErrorPhone('');
    }
    if (address === '') {
      setErrorAddress('Alamat harus diisi');
    } else {
      setErrorAddress('');
    }
    if (postCode === '') {
      setErrorPostCode('Kode Pos harus diisi');
    } else {
      setErrorPostCode('');
    }

    if (addressName && phone && address && postCode) {
      setLoading(true);
      setDisabled(true);

      try {
        const data = {
          name: addressName,
          phone,
          addressDetail: address,
          postalCode: postCode,
        };
        const token = await getData('ACCESS_TOKEN');
        const response = await postDataWithToken(
          BASE_URL + API_ADDRESS,
          data,
          token,
        );
        if (response?.data?.success) {
          setLoading(false);
          setDisabled(false);
          setShowModal(false);
          setShowModalInfo(false);
          clearInput();
          getAddress();
          setDataAddress(response?.data?.data);
        } else {
          setLoading(false);
          setDisabled(false);
          setShowModal(false);
          setShowModalInfo(true);
          setErrorModal(true);
          setTitle(response?.data?.message || 'Sorry, server is error');
          clearInput();
          getAddress();
          setDataAddress(response?.data?.data);
        }
      } catch (error) {
        clearInput();
        setLoading(false);
        setDisabled(false);
        setShowModal(false);
        setShowModalInfo(true);
        setErrorModal(true);
        setTitle('Tambah alamat gagal, silakan coba lagi nanti.');
      }
    }
  };

  const goDetailAddress = (item: AddressTypes) => {
    setIsAdd(false);
    setShowModal(true);
    setIdAddress(item?._id as string);
    setAddressName(item?.name as string);
    setPhone(item?.phone as string);
    setAddress(item?.addressDetail as string);
    setPostCode(item?.postalCode as string);
    setIsDefault(item?.isDefault as boolean);
  };

  const changeAddress = async () => {
    setLoading(true);
    setDisabled(true);

    try {
      const data = {
        name: addressName,
        phone,
        addressDetail: address,
        postalCode: postCode,
        isDefault,
      };
      const token = await getData('ACCESS_TOKEN');
      const response = await putDataWithToken(
        BASE_URL + API_ADDRESS + '/' + idAddress,
        data,
        token,
      );
      if (response?.data?.success) {
        setLoading(false);
        setDisabled(false);
        setShowModal(false);
        setShowModalInfo(false);
        clearInput();
        getAddress();
        setDataAddress(response?.data?.data);
      } else {
        setLoading(false);
        setDisabled(false);
        setShowModal(false);
        setShowModalInfo(true);
        setErrorModal(true);
        setTitle(response?.data?.message || 'Sorry, server is error');
        clearInput();
        getAddress();
        setDataAddress(response?.data?.data);
      }
    } catch (error) {
      clearInput();
      setLoading(false);
      setDisabled(false);
      setShowModal(false);
      setShowModalInfo(true);
      setErrorModal(true);
      setTitle('Update address is failed. Please try again!');
    }
  };

  const onTrash = async (item: AddressTypes) => {
    setLoading(true);
    setDisabled(true);

    try {
      const token = await getData('ACCESS_TOKEN');
      const response = await deleteWithToken(
        BASE_URL + API_ADDRESS + '/' + item?._id,
        token,
      );
      if (response) {
        setLoading(false);
        setDisabled(false);
        setShowModal(false);
        clearInput();
        getAddress();
        setShowModalInfo(true);
        setErrorModal(false);
        setTitle('Delete address is successfully!');
      }
    } catch (error) {
      clearInput();
      setLoading(false);
      setDisabled(false);
      setShowModal(false);
      setShowModalInfo(true);
      setErrorModal(true);
      setTitle('Delete address is failed. Please try again!');
    }
  };

  useEffect(() => {
    setIsLoading(true);

    const getDataAsync = async () => {
      const promises = [getAddress()];
      try {
        await Promise.all(promises);
      } catch (err) {}
      setIsLoading(false);
    };
    getDataAsync();
  }, []);

  useEffect(() => {
    getAddress();
  }, []);

  return (
    <View style={styles.container}>
      <BackHeader
        title="Pilih Alamat"
        goBack={() => navigation?.goBack()}
        icon={false}>
        <ScrollView
          style={styles.scroll}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          {isLoading ? (
            <FlatList
              data={Array(5).fill(1)}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              renderItem={({index}) => {
                return <Shimmer key={index} style={styles.shimmer} />;
              }}
              keyExtractor={(_item, index) => index.toString()}
            />
          ) : dataAddress?.length ? (
            <FlatList
              data={dataAddress}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              renderItem={({
                item,
                index,
              }: {
                item: AddressTypes;
                index: number;
              }) => {
                return (
                  <AddressSections
                    key={index}
                    data={item}
                    onPress={() => goDetailAddress({...item})}
                    onTrash={() => onTrash({...item})}
                  />
                );
              }}
              keyExtractor={(_item, index) => index.toString()}
            />
          ) : (
            <ImageWithNotData style={{}} />
          )}

          <Gap height={moderateScale(80)} width={0} />
        </ScrollView>

        <View style={styles.viewBtnAddress}>
          <Buttons
            disabled={false}
            style={styles.btnAddress}
            onPress={() => {
              setIsAdd(true);
              setShowModal(true);
            }}>
            <Icon
              name="circle-plus"
              color={colors.white}
              size={moderateScale(16)}
            />
            <Gap width={moderateScale(10)} height={0} />
            <Text style={styles.txt}>Tambah Alamat Baru</Text>
          </Buttons>
        </View>
      </BackHeader>
      <ModalInputAddress
        isVisible={showModal}
        onClose={() => {
          clearInput();
          setShowModal(false);
        }}
        title={isAdd ? 'Tambah Alamat Baru' : 'Ubah Alamat'}
        textBtn={isAdd ? 'Tambah' : 'Ubah'}
        onSubmit={() => {
          isAdd ? addAddress() : changeAddress();
        }}
        addressName={addressName}
        setAddressName={setAddressName}
        errorAddressName={errorAddressName}
        phone={phone}
        setPhone={setPhone}
        errorPhone={errorPhone}
        address={address}
        setAddress={setAddress}
        errorAddress={errorAddress}
        postCode={postCode}
        setPostCode={setPostCode}
        errorPostCode={errorPostCode}
        disabled={disabled}
        loading={loading}
        isDefault={isDefault}
        setIsDefault={setIsDefault}
      />
      <ModalNotif
        isVisible={showModalInfo}
        onClose={() => setShowModalInfo(false)}
        title={title}
        style={{}}
        error={errorModal}
      />
    </View>
  );
};

export default Address;
