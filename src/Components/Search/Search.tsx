import s from "./Search.module.scss";
import { useDispatch } from "react-redux";
import { setSearchItem } from "../redux/slice/filterSlice";
import { useCallback, useRef, useState } from "react";
import debounce from "lodash.debounce";
import React, { FC } from "react";

const Search: FC = () => {
  const [value, setValue] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const onSearchItem = () => {
    setValue("");
    dispatch(setSearchItem(""));
    inputRef.current?.focus();
  };

  const onSetSearchValue = (value) => {
    setValue(value);
    onUpdateSearch(value);
  };

  const onUpdateSearch = useCallback(
    debounce((str) => {
      dispatch(setSearchItem(str));
    }, 250),
    []
  );

  return (
    <div className={s.searchContainer}>
      <input
        ref={inputRef}
        className={s.searchInput}
        type="text"
        value={value}
        onChange={(e) => onSetSearchValue(e.target.value)}
        placeholder="Поиск пиццы..."
      />
      {value && (
        <button className={s.clearButton} onClick={() => onSearchItem()}>
          ✕
        </button>
      )}
    </div>
  );
};

export default Search;
