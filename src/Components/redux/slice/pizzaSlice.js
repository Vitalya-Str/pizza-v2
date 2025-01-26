import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzasItems = createAsyncThunk("pizza/fetchPizzasItems", async ({ searchPizza, categoryId, sortList, orderType }) => {
  const response = await axios.get(
    `https://6783e7b58b6c7a1316f60805.mockapi.io/Pizza-v2?${searchPizza}${categoryId}&sortBy=${sortList.sortProperty}&order=${orderType}`
  );
  return response.data;
});

const initialState = {
  items: [],
  status: "loading",
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzasItems.pending, (state) => {
        state.status = "loading";
        state.items = [];
      })
      .addCase(fetchPizzasItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "success";
      })
      .addCase(fetchPizzasItems.rejected, (state) => {
        state.status = "error";
        state.items = [];
      });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
