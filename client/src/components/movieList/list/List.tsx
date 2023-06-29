import React, { useState, useEffect, useContext } from "react";
import style from "./style.module.css";
import Movie from "./movie/Movie";
import AddMovie from "../addMovie/AddMovie";
import EditMovie from "../editMovie/EditMovie";
import SearchMovie from "../searchNav/SearchMovie";
import axios from "axios";
import { DashbCtrx } from "../../../store/dashboardContext";
import { useQueryClient, useQuery } from "react-query";

const List: React.FC = () => {
  const { movies, setMovies } = useContext(DashbCtrx);

  const [addMovie, setAddMovie] = useState(false);

  const { isLoading, error, data } = useQuery("moviesList", () =>
    axios.get("http://localhost:3001/movie-list", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000/",
        " Access-Control-Allow-Credentials": true,
      },
      withCredentials: true,
    })
  );

  console.log(data);

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
