import { Route, Routes } from "react-router-dom";
import "../src/scss/app.scss";
import { Home } from "./Components/Home/Home";
import { Header } from "./Components/Header/Header";
import { NotFound } from "./Components/NotFound/NotFound";
// import { Cart } from "./Components/Cart/Cart";
// import Pizza from "./Components/PizzaBlock/Pizza";
import { lazy, Suspense } from "react";

const Cart = lazy(() => import(/* webpackChunkName: "Cart" */ "./Components/Cart/Cart").then(({ Cart }) => ({ default: Cart })));
const Pizza = lazy(() => import(/* webpackChunkName: "Pizza" */ "./Components/PizzaBlock/Pizza"));

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/cart"
            element={
              <Suspense fallback={<div>Загрузка...</div>}>
                <Cart />
              </Suspense>
            }
          />
          <Route
            path="/pizza/:id"
            element={
              <Suspense fallback={<div>Загрузка...</div>}>
                <Pizza />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
