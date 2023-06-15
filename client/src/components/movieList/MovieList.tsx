import React from "react";
import style from "./style.module.css";
import List from "./list/List";
import MovieDescription from "./movieDescription/MovieDescription";

const MovieList: React.FC = () => {
  return (
    <section className={style.movieList}>
      {/* <List /> */}
      <MovieDescription />
    </section>
  );
};

export default MovieList;
