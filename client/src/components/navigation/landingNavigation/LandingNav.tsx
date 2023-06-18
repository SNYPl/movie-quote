import React, { useContext } from "react";
import style from "./style.module.css";
import { signUpCtrx } from "../../../store/signUpContx";

interface userMode {
  setUserMode: React.Dispatch<React.SetStateAction<string>>;
}

const LandNavigation: React.FC = () => {
  const { setUserMode } = useContext(signUpCtrx);

  return (
    <div className={style.navBtn}>
      <button
        className={style.signBtn}
        onClick={() => setUserMode("signUpModal")}
      >
        Sign Up
      </button>
      <button
        className={style.logBtn}
        onClick={() => setUserMode("loginModal")}
      >
        Log in
      </button>
    </div>
  );
};

export default LandNavigation;