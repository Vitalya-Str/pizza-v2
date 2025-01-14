export const Categories = ({ categoryIndex, setCategoryIndex }) => {
  const categories = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];

  return (
    <div className="categories">
      <ul>
        {categories.map((category, i) => (
          <li key={i} onClick={() => setCategoryIndex(i)} className={categoryIndex === i ? "active" : ""}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};
