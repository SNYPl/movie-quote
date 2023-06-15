import React, { useState } from "react";
import style from "./style.module.css";
import DescriptionMovie from "./description/Description";
import AddQuote from "./description/add/AddQuote";
import Quote from "./quotes/Quotes";

const Description: React.FC = () => {
  const [addQuote, setAddQuote] = useState<boolean>(false);
  return (
    <>
      {addQuote && <AddQuote add={setAddQuote} />}

      <section className={style.descriptionContainer}>
        <h4>Movie description</h4>
        <DescriptionMovie add={setAddQuote} />
        <Quote />
        <Quote />
      </section>
    </>
  );
};

export default Description;
