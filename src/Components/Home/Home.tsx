import { FC, memo, useCallback, useEffect, useRef } from "react";
import Skeleton from "../PizzaBlock/Skeleton";
import { PizzaBlock } from "../PizzaBlock/PizzaBlock";
import { ListType, Sort } from "./Sort";
import { Categories } from "./Categories";
import { useDispatch, useSelector } from "react-redux";
import { filterSelector, setCategoryIndex, setCurrentPage, setFilter, setOrderType, setSortList } from "../redux/slice/filterSlice";
import { fetchPizzasItems, pizzaSelector, setItems } from "../redux/slice/pizzaSlice";
import QueryString from "qs";
import { useNavigate } from "react-router-dom";
import Pagination from "../Pagination/Pagination";

export const Home: FC = memo(() => {
  const { category, sortList, orderType, searchItem, currentPage } = useSelector(filterSelector);
  const { items, status } = useSelector(pizzaSelector);
  const navigate = useNavigate();
  const isSearch = useRef(false);

  const dispatch = useDispatch();

  const onChangePage = (value: number) => {
    dispatch(setCurrentPage(value));
  };

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
      currentPage,
    });
    navigate(`?${queryString}`);
  }, [category, sortList.sortProperty, orderType, currentPage]);

  const setPizzasItem = () => {
    //@ts-ignore
    dispatch(fetchPizzasItems({ searchPizza, categoryId, sortList, orderType, currentPage }));
  };

  useEffect(() => {
    setPizzasItem();
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      setPizzasItem();
    }
  }, [categoryId, sortList.sortProperty, orderType, searchPizza, currentPage]);
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
        <Pagination onChangePage={(value: number) => onChangePage(value)} />
      </div>
    </>
  );
});
