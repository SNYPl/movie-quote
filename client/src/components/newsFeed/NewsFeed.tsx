import React from "react";
import style from "./style.module.css";
import WriteNew from "./writeNew/WriteNew";
import News from "./news/News";
import QuoteForm from "./quoteForm/QuoteForm";

const NewsFeed: React.FC = () => {
  return (
    <section className={style.newsFeed}>
      <WriteNew />
      <News />
      {/* <QuoteForm /> */}
    </section>
  );
};

export default NewsFeed;
