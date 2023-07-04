import React, { useState } from "react";
import style from "./style.module.css";
import Movie from "./movie/Movie";
import AddMovie from "../addMovie/AddMovie";
import EditMovie from "../editMovie/EditMovie";
import SearchMovie from "../searchNav/SearchMovie";
import axios from "axios";
import { useQuery } from "react-query";
import { MagnifyingGlass } from "react-loader-spinner";

const List: React.FC = () => {
  const [addMovie, setAddMovie] = useState(false);

  const { isLoading, error, data } = useQuery(
    "moviesList",
    () =>
      axios.get("http://localhost:3001/movie-list", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3000/",
          " Access-Control-Allow-Credentials": true,
        },
        withCredentials: true,
      }),
    { refetchOnWindowFocus: false }
  );

  return (
    <>
      {addMovie && <AddMovie setAddMovie={setAddMovie} />}
      <section className={style.list}>
        <SearchMovie setAddMovie={setAddMovie} />
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
          {data?.data.movies.map((el: any) => (
            <Movie
              name={el.name}
              year={el.year}
              quotesLength={el.quotes.length}
              image={el.image}
              id={el._id}
              key={el._id}
            />
          ))}
        </article>
      </section>
    </>
  );
};

export default List;
