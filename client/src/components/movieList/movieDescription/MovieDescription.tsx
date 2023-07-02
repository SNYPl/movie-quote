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

  const movie = data?.data.movies.filter((el: any) => el._id === movieId);
  return (
    <>
      {addQuote && <AddQuote add={setAddQuote} />}

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
            name={movie[0]?.name}
            nameGeo={movie[0]?.nameGeo}
            description={movie[0]?.description}
            directorGeo={movie[0]?.directorGeo}
            director={movie[0]?.director}
            descriptionGeo={movie[0]?.descriptionGeo}
            genre={movie[0]?.genre}
            year={movie[0]?.year}
            image={movie[0]?.image}
            budget={movie[0]?.budget}
            quotesLength={movie[0]?.quotes.length}
            id={movie[0]._id}
          />
        )}
        {/* {!isLoading && movie[0].quotes.map((el: any) => <Quote />)} */}
        <Quote />
        <Quote />
      </section>
    </>
  );
};

export default Description;
