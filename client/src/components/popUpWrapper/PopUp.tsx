import React from "react";
import style from "./style.module.css";

type children = {
  children: React.ReactNode;
  setUserMode: React.Dispatch<React.SetStateAction<string>>;
  setVerifyThanksPage: React.Dispatch<React.SetStateAction<boolean>>;
};

const Wrapper: React.FC<children> = (props) => {
  return (
    <article
      className={`${style.overlay} popUpOverlay`}
      onClick={(e: React.MouseEvent) => {
        if ((e.target as HTMLInputElement).classList.contains("popUpOverlay")) {
          props.setUserMode("");
          props.setVerifyThanksPage(false);
        }
      }}
    >
      <section
        className={style.popUp}
        onKeyDown={(e) => {
          if (e.code === "Escape") {
            props.setUserMode("");
            props.setVerifyThanksPage(false);
          }
        }}
      >
        {props.children}
      </section>
    </article>
  );
};

export default Wrapper;
