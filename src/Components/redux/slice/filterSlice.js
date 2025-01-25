import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: 0,
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
      state.category = action.payload;
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
    setFilter(state, action) {
      state.category = Number(action.payload.category);
      state.sortList = action.payload.sortList;
      state.orderType = action.payload.orderType;
    },
  },
});

export const { setCategoryIndex, setSortList, setOrderType, setSearchItem, setFilter } = filterSlice.actions;

export default filterSlice.reducer;
