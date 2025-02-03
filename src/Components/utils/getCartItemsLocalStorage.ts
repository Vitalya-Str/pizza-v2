import { calcTotalPrice } from "./calcTotalPrice";

export const getCartItemsLocalStorage = () => {
  const data = localStorage.getItem("cart");

  const items = data ? JSON.parse(data) : [];

  const totalPrice = calcTotalPrice(items);

  return {
    items,
    totalPrice,
  };
};
