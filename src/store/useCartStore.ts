import {create} from 'zustand';
import {Cart} from '../types';

type Props = {
  cart: Cart[];
  selectedCart: string[];
  addCart: (args: Cart) => void;
  deleteCart: (id: string) => void;
  updateCart: (id: string, data: Cart) => void;
  clearCart: () => void;
  setCart: (args: Cart[]) => void;
  addSelectedCart: (args: string) => void;
  deleteSelectedCart: (args: string) => void;
  setSelectedCart: (args: string[]) => void;
};

export const useCartStore = create<Props>(set => ({
  cart: [],
  selectedCart: [],
  addCart: args =>
    set(state => ({
      cart: [...state.cart, args],
    })),
  deleteCart: id =>
    set(state => ({
      cart: state.cart.filter(item => item._id !== id),
    })),
  updateCart: (id, data) =>
    set(state => {
      let clone = [...state.cart];
      const index = clone.map(item => item._id).indexOf(id);
      clone[index] = data;
      return {
        cart: clone,
      };
    }),
  clearCart: () =>
    set(() => ({
      cart: [],
    })),
  setCart: args =>
    set(() => ({
      cart: args,
    })),
  addSelectedCart: args =>
    set(state => ({
      selectedCart: [...state.selectedCart, args],
    })),
  deleteSelectedCart: args =>
    set(state => ({
      selectedCart: state.selectedCart.filter(item => item !== args),
    })),
  setSelectedCart: args =>
    set(() => ({
      selectedCart: args,
    })),
}));
