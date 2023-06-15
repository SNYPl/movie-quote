import React from "react";
import style from "./style.module.css";

interface userMode {
  setUserMode: React.Dispatch<React.SetStateAction<string>>;
}

const LandNavigation: React.FC<userMode> = ({ setUserMode }) => {
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
