import React from "react";
import style from "./style.module.css";
import WriteNew from "./writeNew/WriteNew";
import News from "./news/News";
import QuoteForm from "./quoteForm/QuoteForm";
import { useQuery } from "react-query";
import axios from "axios";

const NewsFeed: React.FC = () => {
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
    { refetchOnWindowFocus: false }
  );
  return (
    <section className={style.newsFeed}>
      <WriteNew />
      {data?.data.map((el: any) => (
        <News quote={el} />
      ))}

      {/* <QuoteForm /> */}
    </section>
  );
};

export default NewsFeed;
