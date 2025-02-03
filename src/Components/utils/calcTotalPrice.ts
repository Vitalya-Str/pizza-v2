import { Item } from "../redux/slice/cartSlice";

export const calcTotalPrice = (items: Item[]) => {
  return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};
