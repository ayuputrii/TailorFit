import {create} from 'zustand';

type Props = {
  url: string;
  setPaymentSnap: (args: string) => void;
};

export const usePaymentSnapStore = create<Props>(set => ({
  url: '',
  setPaymentSnap: args =>
    set(() => ({
      url: args,
    })),
}));
