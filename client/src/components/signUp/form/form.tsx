import React, { useState, useContext } from "react";
import style from "./style.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { signUpCtrx } from "../../../store/signUpContx";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

type FormValues = {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
};

type axiosReq = {
  username: string;
  email: string;
  password: string;
};

interface signUpMode {
  setSignUpMode: React.Dispatch<React.SetStateAction<string>>;
  setUserEmail: React.Dispatch<React.SetStateAction<string>>;
}

const Registration: React.FC<signUpMode> = ({
  setSignUpMode,
  setUserEmail,
}) => {
  const [error, setError] = useState<string>("");
  const { setUserMode } = useContext(signUpCtrx);
  const { t, i18n } = useTranslation();

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
        "http://localhost:3001/registration",
        {
          username: data.username,
          email: data.email,
          password: data.password,
        },
        {
          headers,
        }
      )
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setSignUpMode("emailSender");
          setUserEmail(res.data.email);
        }
      })
      .catch((err) => setError(err.response.data));
  };

  function onSignUp(googleUser: any) {
    var id_token = googleUser.getAuthResponse().id_token;

    console.log("click");

    // Send the id_token to your backend server for verification and user registration.
    // Your server should verify the token's authenticity and extract user information.

    // For example, you can use fetch API to send the id_token to your server:
    // fetch('/signup', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ id_token: id_token })
    // })
    // .then(response => {
    //   // Handle the response from your server
    // })
    // .catch(error => {
    //   // Handle any errors that occur during the fetch
    // });
  }

  return (
    <div className={style.SignUp}>
      <article className={style.title}>
        <h3>{t("signUp.welcome")}</h3>
        <p>{t("signUp.details")}</p>
      </article>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={`${style.input} ${style.username}`}>
          <label htmlFor="username">
            {t("signUp.name")}
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
            type="text"
            placeholder={t("signUp.namePhl")}
            id="username"
            {...register("username", {
              onChange: () => setError(""),
              required: {
                value: true,
                message: "Fill field",
              },
              minLength: {
                value: 3,
                message: "minimum length 3",
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
          {errors.username && <p>{errors.username.message}</p>}
        </div>

        <div className={`${style.input} ${style.username}`}>
          <label htmlFor="email">
            {t("signUp.email")}
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
            type="text"
            id="email"
            placeholder={t("signUp.emailPlh")}
            {...register("email", {
              onChange: () => setError(""),
              required: {
                value: true,
                message: "fill fields",
              },
              pattern: {
                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "wrong email format",
              },
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div className={`${style.input} ${style.password}`}>
          <label htmlFor="">
            {t("signUp.password")}
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
            placeholder={t("signUp.passwordPhl")}
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
            {t("signUp.repeatPass")}
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
            placeholder={t("signUp.repeatPassPhl")}
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
        <button type="submit" className={`${style.signUpBtn}`}>
          {t("signUp.enter")}
        </button>
        <Link
          className={`${style.signUpBtn}`}
          to="http://localhost:3001/auth/google"
        >
          {t("signUp.enterChrome")}
        </Link>
        <div className="g-signin2" data-onsuccess="onSignUp">
          {" "}
          {t("signUp.enterChrome")}
        </div>
      </form>
      <p className={`${style.account}`}>
        {t("signUp.account")}
        <a
          href="/"
          onClick={(e: any) => {
            e.preventDefault();
            setUserMode("loginModal");
          }}
        >
          {t("signUp.login")}
        </a>
      </p>
    </div>
  );
};

export default Registration;
