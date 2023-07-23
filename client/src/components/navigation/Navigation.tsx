import React from "react";
import style from "./style.module.css";
import { useTranslation } from "react-i18next";

type children = {
  children: React.ReactNode;
};

const Navigation: React.FC<children> = (props) => {
  const { t, i18n } = useTranslation();
  return (
    <header className={style.navigation}>
      <h1>{t("landing.movieQuotes")}</h1>
      <section className={style.nav}>
        <select
          name="Lang"
          id="language"
          className={style.lang}
          onChange={(e) => {
            i18n.changeLanguage(e.target.value);
          }}
          defaultValue={i18n.language}
        >
          <option value="en">{t("landing.en")}</option>
          <option value="ge">{t("landing.ge")}</option>
        </select>
        {props.children}
      </section>
    </header>
  );
};

export default Navigation;
