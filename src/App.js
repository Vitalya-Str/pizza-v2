import "../src/scss/app.scss";
import { Categories } from "./Components/Categories";
import { Header } from "./Components/Header";
import { PizzaBlock } from "./Components/PizzaBlock/PizzaBlock";
import Skeleton from "./Components/PizzaBlock/Skeleton";
import { Sort } from "./Components/Sort";
import { useEffect, useState } from "react";

function App() {
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
    <div className="wrapper">
      <Header />
      <div className="content">
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
      </div>
    </div>
  );
}

export default App;
