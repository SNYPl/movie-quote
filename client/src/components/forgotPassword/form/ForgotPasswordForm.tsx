import React, { useState, useContext } from "react";
import style from "./style.module.css";
import { useForm } from "react-hook-form";
import { signUpCtrx } from "../../../store/signUpContx";

type FormValues = {
  email: string;
};

const ForgotEmail: React.FC = () => {
  const [error, setError] = useState<string>("");
  const { userMode, setUserMode } = useContext(signUpCtrx);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = () => {};

  return (
    <div className={style.email}>
      <article className={style.title}>
        <h3>Forgot password?</h3>
        <p>
          Enter the email and we'll send an email with instructions to reset
          your password
        </p>
      </article>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={`${style.input} ${style.username}`}>
          <label htmlFor="username">Email</label>
          <input
            type="text"
            placeholder="Enter your email"
            id="username"
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
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <button className={`${style.sendEmail}`} type="submit">
          Send Instructions
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
          Back to login
        </a>
      </p>
    </div>
  );
};

export default ForgotEmail;
