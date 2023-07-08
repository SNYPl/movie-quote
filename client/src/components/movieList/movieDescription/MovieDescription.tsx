import React, { useState } from "react";
import style from "./style.module.css";
import DescriptionMovie from "./description/Description";
import AddQuote from "./description/add/AddQuote";
import Quote from "./quotes/Quotes";
import { useQuery } from "react-query";
import { useLocation } from "react-router";
import axios from "axios";
import { MagnifyingGlass } from "react-loader-spinner";

const Description: React.FC = () => {
  const [addQuote, setAddQuote] = useState<boolean>(false);

  let location = useLocation();
  const movieId = location.pathname.split("=")[1];

  const { isLoading, error, data } = useQuery(
    "getMovie",
    () =>
      axios.get(`http://localhost:3001/movie-list/movie/movie=${movieId}`, {
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

  const movie = data?.data.movie;

  const quotes = useQuery(
    "getMovieQuotes",
    () =>
      axios.get(
        `http://localhost:3001/movie-list/movie/movie=${movieId}/get-quotes`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:3000/",
            " Access-Control-Allow-Credentials": true,
          },
          withCredentials: true,
        }
      ),
    {
      refetchOnWindowFocus: false,
      retry: 0,
    }
  );

  return (
    <>
      {addQuote && <AddQuote add={setAddQuote} movie={movie} />}

      <section className={style.descriptionContainer}>
        <h4>Movie description</h4>
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
        {!isLoading && (
          <DescriptionMovie
            add={setAddQuote}
            quotesLength={quotes?.data?.data.quotes.length}
          />
        )}
        {!isLoading &&
          quotes.data?.data.quotes.map((el: any) => (
            <Quote
              text={el.text}
              textGeo={el.textGeo}
              image={el.image}
              likes={el.likes}
              comments={el.comments.length}
              id={el._id}
              key={el._id}
            />
          ))}

        {quotes.isLoading && !isLoading && (
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
      </section>
    </>
  );
};

export default Description;
