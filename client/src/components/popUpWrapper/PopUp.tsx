import React from "react";
import style from "./style.module.css";

type children = {
  children: React.ReactNode;
  setUserMode: React.Dispatch<React.SetStateAction<string>>;
};

const Wrapper: React.FC<children> = (props) => {
  return (
    <article
      className={`${style.overlay} popUpOverlay`}
      onClick={(e: React.MouseEvent) => {
        if ((e.target as HTMLInputElement).classList.contains("popUpOverlay")) {
          props.setUserMode("");
        }
      }}
    >
      <section
        className={style.popUp}
        onKeyDown={(e) => {
          if (e.code === "Escape") {
            props.setUserMode("");
          }
        }}
      >
        {props.children}
      </section>
    </article>
  );
};

export default Wrapper;
