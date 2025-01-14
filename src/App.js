import { Route, Routes } from "react-router-dom";
import "../src/scss/app.scss";
import { Home } from "./Components/Home/Home";
import { Header } from "./Components/Header";
import { NotFound } from "./Components/NotFound/NotFound";
import { Cart } from "./Components/Cart/Cart";
import React, { useState } from "react";

export const SearchValue = React.createContext();

function App() {
  const [searchItem, setSearchItem] = useState("");

  return (
    <SearchValue.Provider value={{ searchItem, setSearchItem }}>
      <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home searchItem={searchItem} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </SearchValue.Provider>
  );
}

export default App;
