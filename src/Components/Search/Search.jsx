import React, { useContext } from "react";
import s from "./Search.module.scss";
import { SearchValue } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { setSearchItem } from "../redux/slice/filterSlice";

const Search = () => {
  const searchItem = useSelector((state) => state.filter.searchItem);

  const dispatch = useDispatch();

  const onSearchItem = (e) => {
    dispatch(setSearchItem(e));
  };

  // const { searchItem, setSearchItem } = useContext(SearchValue);

  return (
    <div className={s.searchContainer}>
      <input className={s.searchInput} type="text" value={searchItem} onChange={(e) => onSearchItem(e.target.value)} placeholder="Поиск пиццы..." />
    </div>
  );
};

export default Search;
