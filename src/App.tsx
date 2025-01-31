import { Route, Routes } from "react-router-dom";
import "../src/scss/app.scss";
import { Home } from "./Components/Home/Home";
import { Header } from "./Components/Header";
import { NotFound } from "./Components/NotFound/NotFound";
import { Cart } from "./Components/Cart/Cart";
import Pizza from "./Components/PizzaBlock/Pizza";
import React from "react";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/pizza/:id" element={<Pizza />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
