import React, { useState } from "react";
import style from "./style.module.css";
import Movie from "./movie/Movie";
import AddMovie from "../addMovie/AddMovie";
import EditMovie from "../editMovie/EditMovie";
import SearchMovie from "../searchNav/SearchMovie";

const List: React.FC = () => {
  const [addMovie, setAddMovie] = useState(false);
  return (
    <>
      {addMovie && <AddMovie setAddMovie={setAddMovie} />}
      <section className={style.list}>
        <SearchMovie setAddMovie={setAddMovie} />
        <article className={style.listMovie}>
          <Movie />
          <Movie />
          <Movie />
        </article>
      </section>
    </>
  );
};

export default List;
