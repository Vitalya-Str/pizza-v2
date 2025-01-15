export const Categories = ({ categoryIndex, onCategoryIndex }) => {
  const categories = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];

  return (
    <div className="categories">
      <ul>
        {categories.map((category, i) => (
          <li key={i} onClick={() => onCategoryIndex(i)} className={categoryIndex === i ? "active" : ""}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};
