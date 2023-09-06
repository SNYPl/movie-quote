import React, { useState, useEffect, useContext } from "react";
import style from "./style.module.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { signUpCtrx } from "../../../store/signUpContx";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Finish: React.FC = () => {
  let location = useLocation();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { setUserMode, setVerifyThanksPage } = useContext(signUpCtrx);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const tokenUrl = location.pathname.split("=")[1];

  const config = {
    headers: {
      "Content-Type": "application/json; charset=UTF-9",
      "Access-Control-Allow-Origin": process.env.ACCESS_ALLOW_URL,
      "Access-Control-Allow-Credentials": true,
      Accept: "application/json",
      Authorization: `Bearer ${tokenUrl}`,
    },
  };

  useEffect(() => {
    axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/verify/:token`, {
        token: tokenUrl,
      })
      .then((res) => setSuccess(res.status === 200))
      .catch((err) => setError(err.response.data.message));
  });

  return (
    <div className={style.thanks}>
      <svg
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M48.9375 17.5625C49.2708 18.7292 49.5313 19.9375 49.7188 21.1875C49.9063 22.4375 50 23.7083 50 25C50 28.5417 49.3542 31.8333 48.0625 34.875C46.7708 37.9167 45 40.5625 42.75 42.8125C40.5 45.0625 37.8542 46.8229 34.8125 48.0938C31.7708 49.3646 28.5 50 25 50C21.4583 50 18.1667 49.3646 15.125 48.0938C12.0833 46.8229 9.4375 45.0625 7.1875 42.8125C4.9375 40.5625 3.17708 37.9167 1.90625 34.875C0.635417 31.8333 0 28.5417 0 25C0 21.5 0.635417 18.2292 1.90625 15.1875C3.17708 12.1458 4.9375 9.5 7.1875 7.25C9.4375 5 12.0833 3.22917 15.125 1.9375C18.1667 0.645834 21.4583 0 25 0C27.7083 0 30.2604 0.395833 32.6563 1.1875C35.0521 1.97917 37.2917 3.04167 39.375 4.375C39.8333 4.66667 40.0938 5.0625 40.1563 5.5625C40.2188 6.0625 40.0833 6.52083 39.75 6.9375C39.4167 7.35417 39 7.60417 38.5 7.6875C38 7.77083 37.5208 7.66667 37.0625 7.375C35.3125 6.29167 33.4271 5.41667 31.4063 4.75C29.3854 4.08333 27.25 3.75 25 3.75C18.9583 3.75 13.9063 5.78125 9.84375 9.84375C5.78125 13.9063 3.75 18.9583 3.75 25C3.75 31.0417 5.78125 36.0938 9.84375 40.1563C13.9063 44.2188 18.9583 46.25 25 46.25C31.0417 46.25 36.0938 44.2188 40.1563 40.1563C44.2188 36.0938 46.25 31.0417 46.25 25C46.25 23.9583 46.1875 22.9583 46.0625 22C45.9375 21.0417 45.75 20.0833 45.5 19.125C45.375 18.625 45.4063 18.125 45.5938 17.625C45.7813 17.125 46.1042 16.7708 46.5625 16.5625C47.0208 16.3542 47.4896 16.3333 47.9688 16.5C48.4479 16.6667 48.7708 17.0208 48.9375 17.5625ZM20 35.0625L12.375 27.375C12 27 11.8125 26.5417 11.8125 26C11.8125 25.4583 12.0208 24.9792 12.4375 24.5625C12.8125 24.1875 13.2708 24 13.8125 24C14.3542 24 14.8333 24.1875 15.25 24.5625L21.3125 30.6875L45.8125 6.1875C46.1875 5.8125 46.6458 5.61458 47.1875 5.59375C47.7292 5.57292 48.2083 5.77083 48.625 6.1875C49.0417 6.60417 49.25 7.08333 49.25 7.625C49.25 8.16667 49.0417 8.64583 48.625 9.0625L22.625 35.0625C22.25 35.4375 21.8021 35.625 21.2813 35.625C20.7604 35.625 20.3333 35.4375 20 35.0625Z"
          fill="#302B63"
        />
      </svg>

      <article className={style.title}>
        {success && <h3>{t("signUp.finish.thank")}</h3>}
        {error && <h3>{t("signUp.finish.error")}</h3>}
        {success && <p>{t("signUp.finish.active")}</p>}
        {error && <p>{error}</p>}
      </article>

      <button
        className={`${style.newsFd} `}
        onClick={(e: any) => {
          setVerifyThanksPage(false);
          setUserMode("loginModal");

          try {
            navigate("/"); // Omit optional second argument
          } catch (error) {
            console.log("error");
          }
        }}
      >
        {t("signUp.login")}
      </button>
    </div>
  );
};

export default Finish;
