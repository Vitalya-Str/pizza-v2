import React, { FC, useEffect, useRef, useState } from "react";
import s from "./Sort.module.scss";

export type ListType = {
  name: "популярности" | "цене" | "алфавиту";
  sortProperty: "rating" | "price" | "title";
};

export const list: ListType[] = [
  {
    name: "популярности",
    sortProperty: "rating",
  },
  {
    name: "цене",
    sortProperty: "price",
  },
  {
    name: "алфавиту",
    sortProperty: "title",
  },
];

type SortType = {
  sortList: ListType;
  orderType: string;
  setSortList: (i: ListType) => void;
  setOrderType: (value: "asc" | "desc") => void;
};

export const Sort: FC<SortType> = ({ sortList, setSortList, setOrderType, orderType }) => {
  const [open, setOpen] = useState(false);

  const sortRef = useRef<HTMLDivElement>(null);

  const setSortListItem = (i: ListType) => {
    setSortList(i);
    setOpen(!open);
  };

  useEffect(() => {
    const handleSubmitSort = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };
    document.body.addEventListener("click", handleSubmitSort);

    return () => document.body.removeEventListener("click", handleSubmitSort);
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <div className={s.root}>
          <button className={orderType === "asc" ? s.activeButton : ""} onClick={() => setOrderType("asc")}>
            ↑
          </button>
          <button className={orderType === "desc" ? s.activeButton : ""} onClick={() => setOrderType("desc")}>
            ↓
          </button>
        </div>
        <span onClick={() => setOpen(!open)}>{sortList.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {list.map((obj, i) => (
              <li key={i} onClick={() => setSortListItem(obj)} className={sortList.name === obj.name ? "active" : ""}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
