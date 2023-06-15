import React, { useState } from "react";
import style from "./style.module.css";
import { useForm } from "react-hook-form";

type FormValues = {
  username: string;
  email: string;
  password: string;
};

const ProfileForm: React.FC = () => {
  const [error, setError] = useState<string>("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = () => {};
  return (
    <div className={style.profileForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={`${style.input} ${style.username}`}>
          <label htmlFor="username">Username </label>
          <div className={style.inputContainer}>
            <input
              type="text"
              placeholder="At le"
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
            <p className={style.editBtn}>Edit</p>
          </div>
          {errors.username && <p>{errors.username.message}</p>}
        </div>

        <div className={`${style.input} ${style.username}`}>
          <label htmlFor="email">Email </label>
          <div className={style.inputContainer}>
            <input
              type="text"
              id="email"
              placeholder="Enter your email"
              {...register("email", {
                onChange: () => setError(""),
                required: {
                  value: true,
                  message: "fill fields",
                },
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "wrong email format",
                },
              })}
            />
            <p className={style.editBtn}>Edit</p>
          </div>
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div className={`${style.input} ${style.password}`}>
          <label htmlFor="">Password </label>
          <div className={style.inputContainer}>
            <input
              type="password"
              placeholder="At least 8 & max.15 lower case characters"
              {...register("password", {
                required: {
                  value: true,
                  message: "Fill field",
                },
              })}
            />
            <p className={style.editBtn}>Edit</p>
          </div>
          {errors.password && <p>{errors.password.message}</p>}
        </div>
      </form>
      <article className={style.saveBtns}>
        <button className={style.cancelBtn}>Cancel</button>
        <button className={style.saveBtn}>Save changes</button>
      </article>
    </div>
  );
};

export default ProfileForm;
