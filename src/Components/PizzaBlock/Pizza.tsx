import axios from "axios";
import { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Pizza: FC = () => {
  const [pizza, setPizza] = useState<{
    title: string;
    price: number;
  }>();
  const { id } = useParams();

  useEffect(() => {
    const getPizza = async () => {
      try {
        const { data } = await axios.get(`https://6783e7b58b6c7a1316f60805.mockapi.io/Pizza-v2/${id}`);
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
        <Link to="/">
          <button className="button button--outline button--add"> Назад</button>
        </Link>
      </div>
    </>
  );
};

export default Pizza;
