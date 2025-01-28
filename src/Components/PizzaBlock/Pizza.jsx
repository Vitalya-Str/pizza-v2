import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Pizza = () => {
  const [pizza, setPizza] = useState();
  const { id } = useParams();

  useEffect(() => {
    const getPizza = async () => {
      try {
        const { data } = await axios.get(`https://6783e7b58b6c7a1316f60805.mockapi.io/Pizza-v2/` + +id);
        setPizza(data);
      } catch (error) {
        console.log(error);
      }
    };

    getPizza();
  }, []);

  if (!pizza) {
    return <div>Идет загрузка...</div>;
  }

  return (
    <>
      <div className="container">
        <h2 className="content__title">{pizza.title}</h2>
        <img src="https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg" alt="img" />
        <div> Цена: {pizza.price} Р</div>
      </div>
    </>
  );
};

export default Pizza;
