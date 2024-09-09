import {create} from 'zustand';
import {Size} from '../types';

type Props = {
  size: Size[];
  setSize: (args: Size[]) => void;
};

export const useSizeStore = create<Props>(set => ({
  size: [],
  setSize: args =>
    set(() => ({
      size: args,
    })),
}));
