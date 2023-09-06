import React, { useState } from "react";
import style from "./style.module.css";
import Movie from "./movie/Movie";
import AddMovie from "../addMovie/AddMovie";
import SearchMovie from "../searchNav/SearchMovie";
import axios from "axios";
import { useQuery } from "react-query";
import { MagnifyingGlass } from "react-loader-spinner";

const List: React.FC = () => {
  const [addMovie, setAddMovie] = useState(false);
  const [searchMovie, setSearchMovie] = useState("");

  const { isLoading, error, data } = useQuery(
    "moviesList",
    () =>
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/movie-list`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": process.env.ACCESS_ALLOW_URL,
          "Access-Control-Allow-Credentials": true,
        },
        withCredentials: true,
      }),
    { refetchOnWindowFocus: false }
  );

  const moviesList =
    data?.data.movies.filter((el: any) =>
      el.name.toLowerCase().includes(searchMovie.toLocaleLowerCase())
    ) || [];

  return (
    <>
      {addMovie && <AddMovie setAddMovie={setAddMovie} />}
      <section className={style.list}>
        <SearchMovie
          setAddMovie={setAddMovie}
          setSearchMovie={setSearchMovie}
        />
        <article
          className={`${style.listMovie} ${isLoading && style.isLoading}`}
        >
          {isLoading && (
            <MagnifyingGlass
              visible={true}
              height="250"
              width="250"
              ariaLabel="MagnifyingGlass-loading"
              wrapperStyle={{}}
              wrapperClass="MagnifyingGlass-wrapper"
              glassColor="#c0efff"
              color="#e15b64"
            />
          )}
          {moviesList.map((el: any) => (
            <Movie
              name={el.name}
              year={el.year}
              quotesLength={el.quotes.length}
              image={el.image}
              id={el._id}
              key={el._id}
              nameGeo={el.nameGeo}
            />
          ))}
        </article>
      </section>
    </>
  );
};

export default List;
