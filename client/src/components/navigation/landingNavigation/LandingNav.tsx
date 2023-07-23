import React, { useContext } from "react";
import style from "./style.module.css";
import { signUpCtrx } from "../../../store/signUpContx";
import { useTranslation } from "react-i18next";

interface userMode {
  setUserMode: React.Dispatch<React.SetStateAction<string>>;
}

const LandNavigation: React.FC = () => {
  const { setUserMode } = useContext(signUpCtrx);
  const { t, i18n } = useTranslation();

  return (
    <div className={style.navBtn}>
      <button
        className={style.signBtn}
        onClick={() => setUserMode("signUpModal")}
      >
        {t("landing.signUp")}
      </button>
      <button
        className={style.logBtn}
        onClick={() => setUserMode("loginModal")}
      >
        {t("landing.login")}
      </button>
    </div>
  );
};

export default LandNavigation;
