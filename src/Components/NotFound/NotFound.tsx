import s from "./NotFound.module.scss";
import React, { FC } from "react";

export const NotFound: FC = () => {
  return (
    <div className={s.container}>
      <h1>Страница не найдена! :( </h1>
    </div>
  );
};
