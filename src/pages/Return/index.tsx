import React, {useState} from 'react';
import {BackHeader, Gap, ModalConfirmation} from '../../components';
import {moderateScale} from '../../utils/scale';
import {ScrollView, View} from 'react-native';
import {ReturnSections} from '../../sections';
import {Asset} from 'react-native-image-picker';
import {ReturnProps} from '../../navigation';
import {useRoute} from '@react-navigation/native';
import {API_RETURN, BASE_URL, postFormData} from '../../api';
import {getData} from '../../utils/async-storage';
import styles from './styles';

const Return = ({navigation}: ReturnProps) => {
  const route = useRoute<ReturnProps['route']>();

  const {idProduct, orderId} = route?.params;

  const [comment, setComment] = useState<string>('');
  const [file, setFile] = useState<(Asset | string)[]>([]);

  const [title, setTitle] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [modalError, setModalError] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    setDisabled(true);

    try {
      const formData = new FormData();
      formData.append('productId', idProduct);
      formData.append('orderId', orderId);
      formData.append('reason', comment);
      Array.from(file).forEach(fl => {
        formData.append('images', {
          uri: (fl as Asset)?.uri,
          name: 'photo.jpg',
          type: 'image/jpeg',
        });
      });

      const token = await getData('ACCESS_TOKEN');
      const response = await postFormData(
        BASE_URL + API_RETURN,
        formData,
        token,
      );

      if (response?.data?.success) {
        setLoading(false);
        setDisabled(false);
        setShowModal(true);
        setModalError(false);
        setTitle('Selamat, berhasil!');
        setMessage(
          response?.data?.message ||
            'Terimakasih, telah mengisi formulir pengembalian.',
        );
        setComment('');
        setFile([]);
      } else {
        setLoading(false);
        setDisabled(false);
        setShowModal(true);
        setModalError(true);
        setTitle('Mohon maaf, permohonan anda tidak bisa kami buat');
        setMessage(response?.data?.message || 'Silakan, coba lagi nanti!');
      }
    } catch (error) {
      setLoading(false);
      setDisabled(false);
      setShowModal(true);
      setModalError(true);
      setTitle('Mohon maaf, permohonan anda tidak bisa kami buat');
      setMessage('Silakan, coba lagi nanti!');
    }
  };

  return (
    <View style={styles.container}>
      <BackHeader
        title="Pengembalian Barang"
        goBack={() => navigation?.goBack()}
        icon={false}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <Gap height={moderateScale(8)} width={0} />
          <ReturnSections
            comment={comment}
            setComment={setComment}
            file={file}
            setFile={setFile}
            onSubmit={onSubmit}
            loading={loading}
            disabled={disabled}
          />
          <Gap height={moderateScale(8)} width={0} />
        </ScrollView>
      </BackHeader>
      <ModalConfirmation
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        title={title}
        message={message}
        textBtn={'Kembali ke Beranda'}
        onSubmit={() => navigation.replace('Order')}
        style={modalError ? styles.modalError : null}
      />
    </View>
  );
};

export default Return;
