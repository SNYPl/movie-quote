import React, { useContext } from "react";
import style from "./style.module.css";
import { signUpCtrx } from "../../store/signUpContx";

type children = {
  children: React.ReactNode;
  setVerifyThanksPage: React.Dispatch<React.SetStateAction<boolean>>;
};

const Wrapper: React.FC<children> = (props) => {
  const { userMode, setUserMode } = useContext(signUpCtrx);

  return (
    <article
      className={`${style.overlay} popUpOverlay`}
      onClick={(e: React.MouseEvent) => {
        if ((e.target as HTMLInputElement).classList.contains("popUpOverlay")) {
          setUserMode("");
          props.setVerifyThanksPage(false);
        }
      }}
    >
      <section
        className={style.popUp}
        onKeyDown={(e) => {
          if (e.code === "Escape") {
            setUserMode("");
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
