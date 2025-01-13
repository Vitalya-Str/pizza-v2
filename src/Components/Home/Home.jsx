import { useEffect, useState } from "react";
import Skeleton from "../PizzaBlock/Skeleton";
import { PizzaBlock } from "../PizzaBlock/PizzaBlock";
import { Sort } from "./Sort";
import { Categories } from "./Categories";

export const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoader, setIsLoader] = useState(true);

  useEffect(() => {
    fetch("https://6783e7b58b6c7a1316f60805.mockapi.io/Pizza-v2")
      .then((res) => {
        return res.json();
      })
      .then((res) => setItems(res));
    setIsLoader(false);
  }, []);
  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isLoader ? [...new Array(6)].map((_, i) => <Skeleton key={i} />) : items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
        </div>
      </div>
    </>
  );
};
