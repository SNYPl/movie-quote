import React, { useState } from "react";
import style from "./style.module.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

const EmailExpired: React.FC = () => {
  let location = useLocation();
  const getPath = location.pathname.split("=");
  const [success, setSuccess] = useState("");
  const { t } = useTranslation();

  const email = getPath[3];

  const sendMail = () => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/forget/password/:token/change/repeat`,
        {
          email,
        },
        {
          headers: {
            "Content-Type": "application/json; charset=UTF-9",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {
        if (res.status === 200) setSuccess("email was sent");
      });
  };

  return (
    <div className={style.expired}>
      <svg
        width="76"
        height="76"
        viewBox="0 0 76 76"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M26.9167 49.0833C39.159 49.0833 49.0833 39.159 49.0833 26.9167C49.0833 14.6744 39.159 4.75 26.9167 4.75C14.6744 4.75 4.75 14.6744 4.75 26.9167C4.75 39.159 14.6744 49.0833 26.9167 49.0833Z"
          fill="#302B63"
        />
        <path
          d="M26.9167 44.3333C36.5356 44.3333 44.3333 36.5356 44.3333 26.9167C44.3333 17.2977 36.5356 9.5 26.9167 9.5C17.2977 9.5 9.5 17.2977 9.5 26.9167C9.5 36.5356 17.2977 44.3333 26.9167 44.3333Z"
          fill="#222030"
        />
        <path d="M26 16H28V27H26V16Z" fill="#302B63" />
        <path
          d="M34.0938 31.3398L32.7303 32.803L27.0001 27.4635L28.3636 26.0003L34.0938 31.3398Z"
          fill="#302B63"
        />
        <path
          d="M26.9167 30.0833C28.6656 30.0833 30.0833 28.6656 30.0833 26.9167C30.0833 25.1678 28.6656 23.75 26.9167 23.75C25.1678 23.75 23.75 25.1678 23.75 26.9167C23.75 28.6656 25.1678 30.0833 26.9167 30.0833Z"
          fill="#302B63"
        />
        <path
          d="M26.9166 28.4987C27.791 28.4987 28.4999 27.7898 28.4999 26.9154C28.4999 26.0409 27.791 25.332 26.9166 25.332C26.0421 25.332 25.3333 26.0409 25.3333 26.9154C25.3333 27.7898 26.0421 28.4987 26.9166 28.4987Z"
          fill="#FFC107"
        />
        <path
          d="M18.8416 66.499L41.6416 28.3406C42.9083 26.2823 45.9166 26.2823 47.025 28.3406L69.825 66.499C71.0916 68.5573 69.5083 71.249 67.1333 71.249H21.5333C19.1583 71.249 17.575 68.5573 18.8416 66.499Z"
          fill="#FFC107"
        />
        <path
          d="M41.8 63.175C41.8 62.8583 41.8 62.5417 41.9584 62.225C42.1167 61.9083 42.275 61.75 42.4334 61.4333C42.5917 61.1167 42.9084 61.1167 43.225 60.9583C43.5417 60.8 43.8584 60.8 44.175 60.8C44.4917 60.8 44.9667 60.8 45.2834 60.9583C45.6 61.1167 45.9167 61.275 46.075 61.4333C46.2334 61.5917 46.3917 61.9083 46.55 62.225C46.7084 62.5417 46.7084 62.8583 46.7084 63.175C46.7084 63.4917 46.7084 63.8083 46.55 64.125C46.3917 64.4417 46.2334 64.6 46.075 64.9167C45.9167 65.2333 45.6 65.2333 45.2834 65.3917C44.9667 65.55 44.65 65.55 44.175 65.55C43.7 65.55 43.3834 65.55 43.225 65.3917C43.0667 65.2333 42.5917 65.075 42.4334 64.9167C42.275 64.7583 42.1167 64.4417 41.9584 64.125C41.8 63.8083 41.8 63.4917 41.8 63.175ZM46.2334 58.2667H42.5917L41.9584 42.75H46.7084L46.2334 58.2667Z"
          fill="#302B63"
        />
      </svg>

      <article className={style.title}>
        <h3>{t("forgotPass.expired.title")}</h3>
        <p>{t("forgotPass.expired.enter")}</p>
      </article>
      {success && <p className={style.succesText}>{success}</p>}
      <button className={`${style.newsFd} `} onClick={sendMail}>
        {t("forgotPass.expired.req")}
      </button>
    </div>
  );
};

export default EmailExpired;
