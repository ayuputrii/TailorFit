import {create} from 'zustand';

type Props = {
  isBuy: boolean;
  setBuy: () => void;
  setNotBuy: () => void;
};

export const useIsBuyStore = create<Props>(set => ({
  isBuy: false,
  setBuy: () =>
    set(() => ({
      isBuy: true,
    })),
  setNotBuy: () =>
    set(() => ({
      isBuy: false,
    })),
}));
