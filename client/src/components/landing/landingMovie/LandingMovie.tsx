import React from "react";
import style from "./style.module.css";

interface movie {
  mainTitle: string;
  title: string;
  img: any;
}

const LandMovie: React.FC<movie> = (props) => {
  return (
    <div
      className={style.movie}
      style={{ backgroundImage: `url(${props.img})` }}
    >
      <article className={style.overflow}></article>
      <section className={style.titleSection}>
        <article className={style.mainTitle}>
          <div className={style.xazi}></div>
          <h2>{props.mainTitle}</h2>
        </article>
        <article className={style.secTitle}>
          <div></div>
          <p>{props.title}</p>
        </article>
      </section>
    </div>
  );
};

export default LandMovie;
