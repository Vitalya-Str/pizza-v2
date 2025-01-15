import { configureStore } from "@reduxjs/toolkit";
import filter from "./slice/filterSlice";
import pizza from "./slice/pizzaSlice";

const store = configureStore({
  reducer: {
    filter,
    pizza,
  },
});

export default store;
