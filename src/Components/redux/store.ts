import { configureStore } from "@reduxjs/toolkit";
import filter from "./slice/filterSlice";
import pizza from "./slice/pizzaSlice";
import cart from "./slice/cartSlice";

const store = configureStore({
  reducer: {
    filter,
    pizza,
    cart,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
