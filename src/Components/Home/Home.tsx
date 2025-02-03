import { FC, memo, useCallback, useEffect, useRef } from "react";
import Skeleton from "../PizzaBlock/Skeleton";
import { PizzaBlock } from "../PizzaBlock/PizzaBlock";
import { ListType, Sort } from "./Sort";
import { Categories } from "./Categories";
import { useDispatch, useSelector } from "react-redux";
import { filterSelector, setCategoryIndex, setFilter, setOrderType, setSortList } from "../redux/slice/filterSlice";
import { fetchPizzasItems, pizzaSelector, setItems } from "../redux/slice/pizzaSlice";
import QueryString from "qs";
import { useNavigate } from "react-router-dom";

export const Home: FC = memo(() => {
  const { category, sortList, orderType, searchItem } = useSelector(filterSelector);
  const { items, status } = useSelector(pizzaSelector);
  const navigate = useNavigate();
  const isSearch = useRef(false);

  const dispatch = useDispatch();

  const onOrderType = (text: "asc" | "desc") => {
    dispatch(setOrderType(text));
  };
  const onSortList = (obj: ListType) => {
    dispatch(setSortList(obj));
  };
  const onCategoryIndex = useCallback((id: number) => {
    dispatch(setCategoryIndex(id));
  }, []);

  const categoryId = category === 0 ? "" : `&category=${category}`;
  const searchPizza = !searchItem ? "" : `&search=${searchItem}`;

  // useEffect(() => {
  //   if (window.location.search) {
  //     const params = QueryString.parse(window.location.search.substring(1));

  //     const sortList = list.find((obj) => obj.sortProperty === params.sortList);
  //     if (sortList) {
  //       dispatch(
  //         setFilter({
  //           ...params,
  //           sortList,
  //         })
  //       );
  //     }

  //     isSearch.current = true;
  //   }
  // }, []);

  useEffect(() => {
    const queryString = QueryString.stringify({
      category,
      sortList: sortList.sortProperty,
      orderType,
    });
    navigate(`?${queryString}`);
  }, [category, sortList.sortProperty, orderType]);

  const setPizzasItem = () => {
    //@ts-ignore
    dispatch(fetchPizzasItems({ searchPizza, categoryId, sortList, orderType }));
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
          {status === "loading"
            ? [...new Array(8)].map((_, i) => <Skeleton key={i} />)
            : items.map((pizza: any) => <PizzaBlock key={pizza.id} {...pizza} />)}
        </div>
      </div>
    </>
  );
});
