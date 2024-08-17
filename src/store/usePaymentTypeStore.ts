import {create} from 'zustand';

type Props = {
  paymentType: 'BCA' | 'GOPAY';
  setPaymentType: (args: Props['paymentType']) => void;
};

export const usePaymentTypeStore = create<Props>(set => ({
  paymentType: 'BCA',
  setPaymentType: args =>
    set(() => ({
      paymentType: args,
    })),
}));
