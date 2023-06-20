import React from "react";
import style from "./style.module.css";

type children = {
  children: React.ReactNode;
};

const Navigation: React.FC<children> = (props) => {
  return (
    <header className={style.navigation}>
      <h1>MOVIE QUOTES</h1>
      <section className={style.nav}>
        <select name="Lang" id="language" className={style.lang}>
          <option value="en" defaultValue={"EN"}>
            EN
          </option>
          <option value="ge">GE</option>
        </select>
        {props.children}
      </section>
    </header>
  );
};

export default Navigation;
