import React, { useState } from "react";
import style from "./style.module.css";
import { useForm } from "react-hook-form";

type FormValues = {
  username: string;
  password: string;
};

const SignIn: React.FC = () => {
  const [error, setError] = useState<string>("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = () => {};

  return (
    <div className={style.signIn}>
      <article className={style.title}>
        <h3>Log in to your account</h3>
        <p>Welcome back! Please enter your details.</p>
      </article>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={`${style.input} ${style.username}`}>
          <label htmlFor="username">Email</label>
          <input
            type="text"
            placeholder="Enter your email"
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
          <label htmlFor="">Password</label>
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: {
                value: true,
                message: "Fill field",
              },
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <section className={`${style.forgotPassword}`}>
          <div className={`${style.checkbox}`}>
            <input type="checkbox" id="rememberLogin" value="rememberLogin" />
            <label htmlFor="rememberLogin">Remember Me</label>
          </div>
          <a href="/reset">Forgot Password?</a>
        </section>
        <button className={`${style.signBtn}`} type="submit">
          Sign in
        </button>
        <button className={`${style.signBtn} `}>Sign Chrome</button>
      </form>
      <p className={`${style.account}`}>
        Don't have an account? <a href="#">Sign up</a>
      </p>
    </div>
  );
};

export default SignIn;
