import { useEffect, useState } from "react";
import Skeleton from "../PizzaBlock/Skeleton";
import { PizzaBlock } from "../PizzaBlock/PizzaBlock";
import { Sort } from "./Sort";
import { Categories } from "./Categories";

export const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoader, setIsLoader] = useState(true);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [sortList, setSortList] = useState({
    name: "популярности",
    sortProperty: "rating",
  });
  const [orderType, setOrderType] = useState("asc");

  const category = categoryIndex === 0 ? "" : `category=${categoryIndex}`;

  useEffect(() => {
    setIsLoader(true);
    fetch(`https://6783e7b58b6c7a1316f60805.mockapi.io/Pizza-v2?${category}&sortBy=${sortList.sortProperty}&order=${orderType}`)
      .then((res) => res.json())
      .then((res) => {
        setItems(res);
        setIsLoader(false);
      });
    window.scrollTo(0, 0);
  }, [category, sortList, orderType]);
  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories categoryIndex={categoryIndex} setCategoryIndex={setCategoryIndex} />
          <Sort sortList={sortList} setSortList={setSortList} setOrderType={setOrderType} orderType={orderType} />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isLoader ? [...new Array(6)].map((_, i) => <Skeleton key={i} />) : items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
        </div>
      </div>
    </>
  );
};
