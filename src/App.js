import "../src/scss/app.scss";
import { Categories } from "./Components/Categories";
import { Header } from "./Components/Header";
import { PizzaBlock } from "./Components/PizzaBlock";
import { Sort } from "./Components/Sort";
import pizzes from '../src/assets/pizzes.json'

function App() {
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
            {pizzes.map((pizza, i) => <PizzaBlock key={i} {...pizza}  />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
