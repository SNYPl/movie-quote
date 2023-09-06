import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import WriteNew from "./writeNew/WriteNew";
import News from "./news/News";
import QuoteForm from "./quoteForm/QuoteForm";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import openSocket from "socket.io-client";
import Cookies from "universal-cookie";

const NewsFeed: React.FC = () => {
  const [newQuote, setNewQuote] = useState<boolean>(false);
  const [search, setSearch] = useState("");
  const [queryLimit, setQueryLimit] = useState(5);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const queryClient = useQueryClient();
  const cookies = new Cookies();

  const token = cookies.get("token");

  const { isLoading, error, data, isFetching } = useQuery(
    ["quotesInfo", queryLimit],
    () =>
      axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/newsFeed?limit=${queryLimit}`,

        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": process.env.ACCESS_ALLOW_URL,
            "Access-Control-Allow-Credentials": true,
            // Cookie: `token=${token};`,
          },
        }
      ),
    {
      refetchOnWindowFocus: false,
      staleTime: 0,
      enabled: true,
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    const socket = openSocket(`${process.env.REACT_APP_BACKEND_URL}`, {
      transports: ["websocket"],
    });

    socket.on("quote", (data) => {
      if (data.action === "createQuote") {
        queryClient.invalidateQueries("quotesInfo");
      } else if (data.action === "deleteQuote") {
        queryClient.invalidateQueries("quotesInfo");
      } else if (data.action === "likeQuote") {
        queryClient.invalidateQueries("quotesInfo");
        queryClient.invalidateQueries("notifications");
      } else if (data.action === "commentQuote") {
        queryClient.invalidateQueries("quotesInfo");
        queryClient.invalidateQueries("notifications");
      } else if (data.action === "editQuote") {
        queryClient.invalidateQueries("quotesInfo");
      }
    });
  }, [data, data?.data.quotes]);

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
      setQueryLimit((prev) => prev + 5);
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
