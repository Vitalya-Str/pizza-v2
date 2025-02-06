import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ListType } from "../../Home/Sort";
import { RootState } from "../store";

interface FilterSlice {
  category: number;
  orderType: "asc" | "desc";
  searchItem: string;
  sortList: ListType;
  currentPage: number;
}

const initialState: FilterSlice = {
  category: 0,
  sortList: {
    name: "популярности",
    sortProperty: "rating",
  },
  orderType: "asc",
  searchItem: "",
  currentPage: 1,
};

console.log(initialState.currentPage);

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryIndex(state, action: PayloadAction<number>) {
      state.category = action.payload;
    },
    setSortList(state, action: PayloadAction<ListType>) {
      state.sortList = action.payload;
    },
    setOrderType(state, action: PayloadAction<"asc" | "desc">) {
      state.orderType = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSearchItem(state, action: PayloadAction<string>) {
      state.searchItem = action.payload;
    },
    setFilter(state, action: PayloadAction<FilterSlice>) {
      state.category = Number(action.payload.category);
      state.sortList = action.payload.sortList;
      state.orderType = action.payload.orderType;
      state.currentPage = action.payload.currentPage;
    },
  },
});

export const filterSelector = (state: RootState) => state.filter;

export const { setCategoryIndex, setSortList, setOrderType, setSearchItem, setFilter, setCurrentPage } = filterSlice.actions;

export default filterSlice.reducer;
