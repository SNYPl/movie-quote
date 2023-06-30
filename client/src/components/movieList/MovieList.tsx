import React from "react";
import style from "./style.module.css";
import { Outlet } from "react-router";

const MovieList: React.FC = () => {
  return (
    <section className={style.movieList}>
      <Outlet />
    </section>
  );
};

export default MovieList;
