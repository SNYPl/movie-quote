import React, { useState, useContext } from "react";
import style from "./style.module.css";
import { useForm } from "react-hook-form";
import { signUpCtrx } from "../../../store/signUpContx";
import axios from "../../../helper/axios";
import { useTranslation } from "react-i18next";

type FormValues = {
  email: string;
};

const ForgotEmail: React.FC = () => {
  const [error, setError] = useState<string>("");
  const {
    setUserMode,
    setForgotPasswordMode,
    setForgotPasswordEmail,
  } = useContext(signUpCtrx);
  const { t, i18n } = useTranslation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: any) => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/forgot/password`,
        {
          email: data.email,
        },
        {
          headers: {
            "Content-Type": "application/json; charset=UTF-9",
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setForgotPasswordMode("step2");
          setForgotPasswordEmail(res.data.email);
        }
      })
      .catch((err) => setError(err.response.data.message));
  };

  return (
    <div className={style.email}>
      <article className={style.title}>
        <h3>{t("forgotPass.form.title")}</h3>
        <p>{t("forgotPass.form.enter")}</p>
      </article>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={`${style.input} ${style.username}`}>
          <label htmlFor="email">{t("forgotPass.form.email")}</label>
          <input
            type="text"
            placeholder={t("forgotPass.form.emailPlh")}
            id="email"
            {...register("email", {
              onChange: () => setError(""),
              required: {
                value: true,
                message: "Fill field",
              },
              minLength: {
                value: 3,
                message: "minimum length 3",
              },
              pattern: {
                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "wrong email format",
              },
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        {error && <p className={style.errorText}>{error}</p>}

        <button className={`${style.sendEmail}`} type="submit">
          {t("forgotPass.form.send")}
        </button>
      </form>
      <p className={`${style.account}`}>
        {" "}
        <svg
          width="13"
          height="10"
          viewBox="0 0 13 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.900423 4.83293C0.900423 5.03726 0.982397 5.24159 1.12887 5.38582L4.96677 9.31611C5.13086 9.48437 5.30664 9.5625 5.48828 9.5625C5.91015 9.5625 6.20898 9.25601 6.20898 8.84736C6.20898 8.63101 6.12109 8.45072 5.98633 8.3125L4.67382 6.95432L3.1328 5.50601L4.457 5.58413L11.3652 5.58413C11.8105 5.58413 12.1152 5.27765 12.1152 4.83293C12.1152 4.38822 11.8105 4.08173 11.3652 4.08173L4.457 4.08173L3.12695 4.15986L4.67382 2.71154L5.98633 1.35336C6.12109 1.22112 6.20898 1.04089 6.20898 0.818509C6.20898 0.415895 5.91015 0.109356 5.48828 0.109356C5.30664 0.109356 5.13086 0.181509 4.97262 0.33774L1.12887 4.28005C0.982397 4.42428 0.900423 4.6286 0.900423 4.83293Z"
            fill="white"
          />
        </svg>
        <a
          href="/"
          onClick={(e: any) => {
            e.preventDefault();
            setUserMode("loginModal");
          }}
        >
          {" "}
          {t("forgotPass.form.back")}
        </a>
      </p>
    </div>
  );
};

export default ForgotEmail;
