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

export default store;
