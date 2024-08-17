import {create} from 'zustand';
import {Asset} from 'react-native-image-picker';

type Props = {
  files: (Asset | string)[];
  addFile: (args: Asset | string) => void;
  clearFile: () => void;
};

export const useDeletedFile = create<Props>(set => ({
  files: [],
  addFile: args =>
    set(state => ({
      files: [...state.files, args],
    })),
  clearFile: () =>
    set(() => ({
      files: [],
    })),
}));
