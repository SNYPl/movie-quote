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
        <a
          className={`${style.signUpGoogle}`}
          href="http://localhost:3001/auth/google"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_369_30860)">
              <rect width="16" height="16" fill="white" fillOpacity="0.01" />
              <g clipPath="url(#clip1_369_30860)">
                <path
                  d="M15.545 6.55853C15.6383 7.09549 15.6848 7.63953 15.684 8.18453C15.684 10.6185 14.814 12.6765 13.3 14.0695H13.302C11.978 15.2925 10.158 16.0005 8 16.0005C5.87827 16.0005 3.84344 15.1577 2.34315 13.6574C0.842855 12.1571 0 10.1223 0 8.00053C0 5.8788 0.842855 3.84396 2.34315 2.34367C3.84344 0.843383 5.87827 0.000527887 8 0.000527887C9.98594 -0.0227305 11.9038 0.723361 13.352 2.08253L11.068 4.36653C10.2424 3.5795 9.1405 3.14852 8 3.16653C5.913 3.16653 4.14 4.57453 3.508 6.47053C3.17291 7.46403 3.17291 8.54002 3.508 9.53353H3.511C4.146 11.4265 5.916 12.8345 8.003 12.8345C9.081 12.8345 10.007 12.5585 10.725 12.0705H10.722C11.1389 11.7943 11.4955 11.4365 11.7704 11.0187C12.0452 10.6009 12.2325 10.1317 12.321 9.63953H8V6.55953H15.545V6.55853Z"
                  fill="#CED4DA"
                />
              </g>
            </g>
            <defs>
              <clipPath id="clip0_369_30860">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>
          {t("signUp.enterChrome")}
        </a>
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
