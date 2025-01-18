import s from "./Search.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setSearchItem } from "../redux/slice/filterSlice";
import { useCallback, useRef, useState } from "react";
import debounce from "lodash.debounce";

const Search = () => {
  const searchItem = useSelector((state) => state.filter.searchItem);
  const [value, setValue] = useState("");

  const inputRef = useRef();

  const dispatch = useDispatch();

  const onSearchItem = (e) => {
    setValue("");
    inputRef.current.focus();
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
        <button className={s.clearButton} onClick={() => onSearchItem("")}>
          ✕
        </button>
      )}
    </div>
  );
};

export default Search;
