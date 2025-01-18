import { useEffect, useState } from "react";
import Skeleton from "../PizzaBlock/Skeleton";
import { PizzaBlock } from "../PizzaBlock/PizzaBlock";
import { Sort } from "./Sort";
import { Categories } from "./Categories";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryIndex, setOrderType, setSortList } from "../redux/slice/filterSlice";
import { setItems } from "../redux/slice/pizzaSlice";
import axios from "axios";

export const Home = () => {
  const { categoryIndex, sortList, orderType, searchItem } = useSelector((state) => state.filter);
  const items = useSelector((state) => state.pizza.items);

  const [isLoader, setIsLoader] = useState(true);

  const dispatch = useDispatch();

  const onSetItems = (items) => {
    dispatch(setItems(items));
  };
  const onOrderType = (text) => {
    dispatch(setOrderType(text));
  };
  const onSortList = (obj) => {
    dispatch(setSortList(obj));
  };
  const onCategoryIndex = (id) => {
    dispatch(setCategoryIndex(id));
  };

  const category = categoryIndex === 0 ? "" : `&category=${categoryIndex}`;
  const searchPizza = !searchItem ? "" : `&search=${searchItem}`;

  useEffect(() => {
    setIsLoader(true);
    axios
      .get(`https://6783e7b58b6c7a1316f60805.mockapi.io/Pizza-v2?${searchPizza}${category}&sortBy=${sortList.sortProperty}&order=${orderType}`)
      .then((res) => {
        onSetItems(res.data);
        setIsLoader(false);
      })
      .catch((error) => {
        onSetItems([]);
        setIsLoader(false);
      });

    window.scrollTo(0, 0);
  }, [category, sortList, orderType, searchPizza]);
  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories categoryIndex={categoryIndex} onCategoryIndex={onCategoryIndex} />
          <Sort sortList={sortList} setSortList={onSortList} setOrderType={onOrderType} orderType={orderType} />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isLoader ? [...new Array(8)].map((_, i) => <Skeleton key={i} />) : items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
        </div>
      </div>
    </>
  );
};
