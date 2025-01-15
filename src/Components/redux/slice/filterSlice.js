import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryIndex: 0,
  sortList: {
    name: "популярности",
    sortProperty: "rating",
  },
  orderType: "asc",
  searchItem: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryIndex(state, action) {
      state.categoryIndex = action.payload;
    },
    setSortList(state, action) {
      state.sortList = action.payload;
    },
    setOrderType(state, action) {
      state.orderType = action.payload;
    },
    setSearchItem(state, action) {
      state.searchItem = action.payload;
    },
  },
});

export const { setCategoryIndex, setSortList, setOrderType, setSearchItem } = filterSlice.actions;

export default filterSlice.reducer;
