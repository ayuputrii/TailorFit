import {Size} from '../types';
import {create} from 'zustand';

type Props = {
  size: Size | null;
  setSize: (args: Size) => void;
  deleteSize: () => void;
};

export const useDesiredSizeStore = create<Props>(set => ({
  size: null,
  setSize: args =>
    set(() => ({
      size: args,
    })),
  deleteSize: () =>
    set(() => ({
      size: null,
    })),
}));
