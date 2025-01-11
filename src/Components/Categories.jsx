import { useState } from "react";

export const Categories = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const categories = ["Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];

  const onCategories = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((category, i) => (
          <li key={i} onClick={() => onCategories(i)} className={activeIndex === i ? "active" : ""}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};
