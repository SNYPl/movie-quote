import React, { useState, useContext } from "react";
import style from "./style.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { loginContx } from "../../store/LoginContext";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { signUpCtrx } from "../../store/signUpContx";
import { useTranslation } from "react-i18next";

type FormValues = {
  username: string;
  password: string;
};

type axiosReq = {
  username: string;
  password: string;
  token: string;
};

const SignIn: React.FC = () => {
  const [error, setError] = useState<string>("");
  const { setLogin, login, setEmail, setUsername } = useContext(loginContx);
  const [remember, setRemember] = useState(false);
  const { setUserMode, setForgotPasswordMode } = useContext(signUpCtrx);
  const { t, i18n } = useTranslation();

  const cookies = new Cookies();

  const navigate = useNavigate();

  const checkboxHandler = (e: any) => {
    setRemember(e.target.checked);
  };

  let headers = {
    "Content-Type": "application/json; charset=UTF-9",
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: any) => {
    axios
      .post<axiosReq>(
        "http://localhost:3001/login",
        {
          username: data.username,
          password: data.password,
        },
        {
          headers,
        }
      )
      .then((res) => {
        const config = {
          headers: {
            ...headers,
            Authorization: `Bearer ${res.data.token}`,
          },
        };

        return axios.post(
          "http://localhost:3001/login",
          {
            username: data.username,
            password: data.password,
          },
          config
        );
      })
      .then((res) => {
        if (res.status === 200) {
          if (res.data.verified) {
            setLogin(true);
          } else {
            setLogin("unVerified");
          }

          const expiration = new Date();

          expiration.setHours(expiration.getHours() + 3);
          cookies.set("token", res.data.token, {
            path: "/",
            expires: expiration,
          });
          cookies.set("isLoggedIn", true, {
            path: "/",
            expires: expiration,
          });

          if (remember) {
            cookies.set("remember", true, {
              path: "/",
              expires: expiration,
            });
          }

          navigate("/dashboard");
        }
      })
      .catch((err) => setError(err.response.data.message));
  };

  return (
    <div className={style.signIn}>
      <article className={style.title}>
        <h3>{t("login.welcome")}</h3>
        <p>{t("login.details")}</p>
      </article>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={`${style.input} ${style.username}`}>
          <label htmlFor="username">{t("login.email")}</label>
          <input
            type="text"
            placeholder={t("login.emailPlh")}
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
            })}
          />
          {errors.username && <p>{errors?.username?.message}</p>}
        </div>

        <div className={`${style.input} ${style.password}`}>
          <label htmlFor="">{t("login.password")}</label>
          <input
            type="password"
            placeholder={t("login.password")}
            {...register("password", {
              onChange: () => setError(""),
              required: {
                value: true,
                message: "Fill field",
              },
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        {error && <p className={`${style.errText}`}>{error}</p>}

        <section className={`${style.forgotPassword}`}>
          <div className={`${style.checkbox}`}>
            <input
              type="checkbox"
              id="rememberLogin"
              value="rememberLogin"
              onChange={checkboxHandler}
            />
            <label htmlFor="rememberLogin">{t("login.remember")}</label>
          </div>
          <a
            href="/"
            onClick={(e: any) => {
              e.preventDefault();
              setUserMode("forgotPassword");
              setForgotPasswordMode("step1");
            }}
          >
            {t("login.forgot")}
          </a>
        </section>
        <button className={`${style.signBtn}`} type="submit">
          {t("login.enter")}
        </button>
        <button className={`${style.signBtn} `}>
          {t("login.enterChrome")}
        </button>
      </form>
      <p className={`${style.account}`}>
        {t("login.account")}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            setUserMode("signUpModal");
          }}
        >
          {t("login.signUP")}
        </a>
      </p>
    </div>
  );
};

export default SignIn;
