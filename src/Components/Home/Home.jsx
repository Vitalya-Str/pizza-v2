import { useEffect, useRef, useState } from "react";
import Skeleton from "../PizzaBlock/Skeleton";
import { PizzaBlock } from "../PizzaBlock/PizzaBlock";
import { list, Sort } from "./Sort";
import { Categories } from "./Categories";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryIndex, setFilter, setOrderType, setSortList } from "../redux/slice/filterSlice";
import { setItems } from "../redux/slice/pizzaSlice";
import axios from "axios";
import QueryString from "qs";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { category, sortList, orderType, searchItem } = useSelector((state) => state.filter);
  const items = useSelector((state) => state.pizza.items);
  const navigate = useNavigate();
  const isSearch = useRef(false);

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

  const categoryId = category === 0 ? "" : `&category=${category}`;
  const searchPizza = !searchItem ? "" : `&search=${searchItem}`;

  useEffect(() => {
    if (window.location.search) {
      const params = QueryString.parse(window.location.search.substring(1));
      console.log(params);

      const sortList = list.find((obj) => obj.sortProperty === params.sortList);
      dispatch(
        setFilter({
          ...params,
          sortList,
        })
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    const queryString = QueryString.stringify({
      category,
      sortList: sortList.sortProperty,
      orderType,
    });
    navigate(`?${queryString}`);
  }, [category, sortList.sortProperty, orderType]);

  const setPizzasItem = () => {
    setIsLoader(true);
    axios
      .get(`https://6783e7b58b6c7a1316f60805.mockapi.io/Pizza-v2?${searchPizza}${categoryId}&sortBy=${sortList.sortProperty}&order=${orderType}`)
      .then((res) => {
        onSetItems(res.data);
        setIsLoader(false);
      })
      .catch((error) => {
        onSetItems([]);
        setIsLoader(false);
      });
  };

  useEffect(() => {
    setPizzasItem();
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      setPizzasItem();
    }
  }, [categoryId, sortList.sortProperty, orderType, searchPizza]);
  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories categoryIndex={category} onCategoryIndex={onCategoryIndex} />
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
