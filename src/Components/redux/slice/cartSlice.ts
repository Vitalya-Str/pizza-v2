import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getCartItemsLocalStorage } from "../../utils/getCartItemsLocalStorage";

export type Item = {
  category: number;
  id: string;
  imageUrl: string;
  price: number;
  rating: number;
  sizes: number;
  title: string;
  count: number;
  type: string;
};

export interface CartItem {
  totalPrice: number;
  items: Item[];
}

const { totalPrice, items } = getCartItemsLocalStorage();

const initialState: CartItem = {
  totalPrice,
  items,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItems(state, action: PayloadAction<Item>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
    },
    itemsMinus(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if (findItem) {
        findItem.count--;
      }
      state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
    },
    removeItems(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const cartSelector = (state: RootState) => state.cart;
export const cartItemSelector = (id: string) => (state: RootState) => state.cart.items.find((obj) => obj.id === id);

export const { addItems, removeItems, clearItems, itemsMinus } = cartSlice.actions;

export default cartSlice.reducer;
