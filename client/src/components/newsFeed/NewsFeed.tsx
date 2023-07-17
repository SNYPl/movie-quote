import React, { useState } from "react";
import style from "./style.module.css";
import WriteNew from "./writeNew/WriteNew";
import News from "./news/News";
import QuoteForm from "./quoteForm/QuoteForm";
import { useQuery } from "react-query";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";

const NewsFeed: React.FC = () => {
  const [newQuote, setNewQuote] = useState<boolean>(false);
  const [search, setSearch] = useState("");

  const { isLoading, error, data } = useQuery(
    "quotesInfo",
    () =>
      axios.get("http://localhost:3001/newsFeed", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3000/",
          " Access-Control-Allow-Credentials": true,
        },
        withCredentials: true,
      }),
    { refetchOnWindowFocus: false, staleTime: 0, enabled: true }
  );

  let reversedData = [];

  if (data && data.data) {
    reversedData = [...data.data].reverse();
  }

  const searchMovie =
    reversedData.filter((el: any) => {
      if (search.toLowerCase().includes("@")) {
        return el.movie.name
          .toLowerCase()
          .includes(search.toLowerCase().slice(1));
      } else if (search.toLowerCase().includes("#")) {
        return el.quote.text
          .toLowerCase()
          .includes(search.toLowerCase().slice(1));
      }
      return el.quote.text.toLowerCase().includes(search.toLowerCase());
    }) || [];

  return (
    <section className={style.newsFeed}>
      <WriteNew setNewQuote={setNewQuote} setSearch={setSearch} />
      {newQuote && <QuoteForm setNewQuote={setNewQuote} />}

      {searchMovie.map((el: any) => (
        <News quote={el} key={el.quote._id} />
      ))}
      {isLoading && (
        <TailSpin
          height="400"
          width="200"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass={style.wrapper}
          visible={true}
        />
      )}
    </section>
  );
};

export default NewsFeed;
