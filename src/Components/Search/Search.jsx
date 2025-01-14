import React, { useContext } from "react";
import s from "./Search.module.scss";
import { SearchValue } from "../../App";

const Search = () => {
  const { searchItem, setSearchItem } = useContext(SearchValue);

  return (
    <div className={s.searchContainer}>
      <input
        className={s.searchInput}
        type="text"
        value={searchItem}
        onChange={(e) => setSearchItem(e.target.value)}
        placeholder="Search for pizzas..."
      />
      
    </div>
  );
};

export default Search;
