import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ListType } from "../../Home/Sort";
import { RootState } from "../store";

interface FilterSlice {
  category: number;
  orderType: "asc" | "desc";
  searchItem: string;
  sortList: ListType;
}

const initialState: FilterSlice = {
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
    setCategoryIndex(state, action: PayloadAction<number>) {
      state.category = action.payload;
    },
    setSortList(state, action: PayloadAction<ListType>) {
      state.sortList = action.payload;
    },
    setOrderType(state, action: PayloadAction<"asc" | "desc">) {
      state.orderType = action.payload;
    },
    setSearchItem(state, action: PayloadAction<string>) {
      state.searchItem = action.payload;
    },
    setFilter(state, action: PayloadAction<FilterSlice>) {
      state.category = Number(action.payload.category);
      state.sortList = action.payload.sortList;
      state.orderType = action.payload.orderType;
    },
  },
});

export const filterSelector = (state: RootState) => state.filter;

export const { setCategoryIndex, setSortList, setOrderType, setSearchItem, setFilter } = filterSlice.actions;

export default filterSlice.reducer;
