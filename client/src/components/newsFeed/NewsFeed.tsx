import React, { useEffect, useState } from "react";
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
  const [queryLimit, setQueryLimit] = useState(2);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { isLoading, error, data, isFetching } = useQuery(
    ["quotesInfo", queryLimit],
    () =>
      axios.get(`http://localhost:3001/newsFeed?limit=${queryLimit}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3000/",
          " Access-Control-Allow-Credentials": true,
        },
        withCredentials: true,
      }),
    {
      refetchOnWindowFocus: false,
      staleTime: 0,
      enabled: true,
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const bodyHeight = document.body.scrollHeight;
      const scrollY = window.scrollY;

      if (
        scrollY + windowHeight >= bodyHeight &&
        !isLoadingMore &&
        !isFetching
      ) {
        if (data?.data.totalQuotes < queryLimit) {
          setIsLoadingMore(false);
          return;
        }
        setIsLoadingMore(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      setIsLoadingMore(false);
    };
  }, [isLoadingMore, isFetching]);

  useEffect(() => {
    if (isLoadingMore) {
      setQueryLimit((prev) => prev + 2);
    }
  }, [isLoadingMore]);

  const searchMovie =
    data?.data.quotes?.filter((el: any) => {
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

      {searchMovie.map((el: any, id: any) => (
        <News quote={el} key={el.quote._id} />
      ))}

      {isFetching && (
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
