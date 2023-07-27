import React, { useState, useContext } from "react";
import style from "./style.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { signUpCtrx } from "../../../store/signUpContx";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

type FormValues = {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
};

type axiosReq = {
  token: string;
  password: string;
  email: string;
};

const ChangePassword: React.FC = () => {
  const [error, setError] = useState<string>("");
  const { setUserMode, setForgotPasswordMode } = useContext(signUpCtrx);
  const navigate = useNavigate();
  let location = useLocation();
  const { t, i18n } = useTranslation();

  const getPath = location.pathname.split("=");
  const token = getPath[1];
  const email = getPath[3];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  let headers = {
    "Content-Type": "application/json; charset=UTF-9",
    "Access-Control-Allow-Origin": "*",
  };

  const onSubmit = (data: any) => {
    axios
      .post<axiosReq>(
        "http://localhost:3001/forgot/password/:token/change",
        {
          password: data.password,
          token,
          email,
        },
        {
          headers,
        }
      )
      .then((res) => {
        if (res.status === 200) setForgotPasswordMode("step4");
      })
      .catch((err) => setError(err?.response?.data?.message));
  };
  return (
    <div className={style.changePassword}>
      <article className={style.title}>
        <h3>{t("forgotPass.change.title")}</h3>
        <p>{t("forgotPass.change.enter")}</p>
      </article>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={`${style.input} ${style.password}`}>
          <label htmlFor="">
            {t("forgotPass.change.password")}
            <svg
              width="6"
              height="6"
              viewBox="0 0 6 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.216 2.384V0.575999H2.368V2.384L0.672 1.744L0.384 2.512L2.08 3.12L1.04 4.576L1.76 5.072L2.8 3.536L3.904 5.072L4.56 4.576L3.504 3.12L5.248 2.512L4.928 1.744L3.216 2.384Z"
                fill="#DC3545"
              />
            </svg>
          </label>
          <input
            type="password"
            placeholder={t("forgotPass.change.passwordPlh")}
            {...register("password", {
              required: {
                value: true,
                message: "Fill field",
              },
              minLength: {
                value: 8,
                message: "minimum length 8",
              },
              maxLength: {
                value: 15,
                message: "maximum length 15",
              },
              pattern: {
                value: /^[0-9a-z]+$/,
                message: "only lowercase letters & numbers",
              },
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <div className={`${style.input} ${style.password}`}>
          <label htmlFor="repeatPassword">
            {t("forgotPass.change.confPassword")}
            <svg
              width="6"
              height="6"
              viewBox="0 0 6 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.216 2.384V0.575999H2.368V2.384L0.672 1.744L0.384 2.512L2.08 3.12L1.04 4.576L1.76 5.072L2.8 3.536L3.904 5.072L4.56 4.576L3.504 3.12L5.248 2.512L4.928 1.744L3.216 2.384Z"
                fill="#DC3545"
              />
            </svg>
          </label>
          <input
            type="password"
            id="repeatPassword"
            placeholder={t("forgotPass.change.confPassword")}
            {...register("repeatPassword", {
              required: {
                value: true,
                message: "Fill field",
              },

              validate: (val) => {
                if (watch("password") !== val) {
                  return "Your passwords do not match";
                }
              },
            })}
          />
          {errors.repeatPassword && <p>{errors.repeatPassword.message}</p>}
        </div>
        {error && <p className={`${style.mainError}`}>{error}</p>}
        <button type="submit" className={`${style.resetBtn}`}>
          {t("forgotPass.change.reset")}
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
            navigate("/");
            setUserMode("loginModal");
          }}
        >
          {t("forgotPass.change.back")}
        </a>
      </p>
    </div>
  );
};

export default ChangePassword;
