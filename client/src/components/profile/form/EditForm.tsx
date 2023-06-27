import React, { useState, useContext } from "react";
import style from "./style.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { DashbCtrx } from "../../../store/dashboardContext";
import { loginContx } from "../../../store/LoginContext";
import Cookies from "universal-cookie";

type FormValues = {
  username: string;
  email: string;
  password: string;
  NewUsername: string;
  newEmail: string;
  newPassword: string;
  confNewPassword: string;
};

type InputsEdit = {
  username: boolean;
  email: boolean;
  password: boolean;
};

const ProfileForm: React.FC = () => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState("");

  const {
    profileImage,
    setProfileImageUpdated,
    setProfileImage,
    profileImageUpdated,
  } = useContext(DashbCtrx);
  const { username, email, setUsername, setEmail } = useContext(loginContx);
  const [editInputs, setEditInputs] = useState<InputsEdit>({
    username: false,
    email: false,
    password: false,
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  let headers = {
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json",
  };

  const cookies = new Cookies();

  const formData = new FormData();

  const onSubmit = (data: any) => {
    if (!profileImage || profileImageUpdated === profileImage) {
      formData.append("image", profileImageUpdated);
    } else {
      formData.append("image", profileImage);
    }
    formData.append("username", data.NewUsername);
    formData.append("password", data.newPassword);
    formData.append("email", data.newEmail);

    axios
      .patch("http://localhost:3001/profile/upload-photo", formData, {
        headers,
      })
      .then((res) => {
        if (res.data.token) {
          console.log("shemovida Cookie");

          const expiration = new Date();

          expiration.setHours(expiration.getHours() + 3);
          cookies.set("token", res.data.token, {
            path: "/",
            expires: expiration,
          });
          setUsername(res.data.username);
        }

        setProfileImageUpdated(res.data.img);
        setProfileImage(res.data.img);
        setSuccess(res.data.message);
      })
      .catch((err) => {
        setError(err.response.data);
      });
  };

  return (
    <div className={style.profileForm}>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className={`${style.input} ${style.username}`}>
          <label htmlFor="username">Username </label>
          <div className={style.inputContainer}>
            <input
              type="text"
              placeholder={username}
              id="username"
              {...register("username", {
                onChange: () => setError(""),
                disabled: true,
              })}
            />
            <p
              className={style.editBtn}
              onClick={() => setEditInputs({ ...editInputs, username: true })}
            >
              Edit
            </p>
          </div>
        </div>

        {editInputs.username && (
          <div className={`${style.input} ${style.username}`}>
            <label htmlFor="NewUsername">New Username </label>
            <div className={style.inputContainer}>
              <input
                type="text"
                placeholder="Enter new username"
                id="NewUsername"
                {...register("NewUsername", {
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
              <p className={`${style.editBtn} ${style.hide}`}>Edit</p>
            </div>
            {errors.NewUsername && (
              <p className={`${style.errMsg}`}>{errors.NewUsername.message}</p>
            )}
          </div>
        )}

        <div className={`${style.input} ${style.email}`}>
          <label htmlFor="email">Email </label>
          <div className={style.inputContainer}>
            <input
              type="text"
              id="email"
              placeholder={email}
              {...register("email", {
                onChange: () => setError(""),

                disabled: true,
              })}
            />
            <p
              className={style.editBtn}
              onClick={() => setEditInputs({ ...editInputs, email: true })}
            >
              Edit
            </p>
          </div>
        </div>

        {editInputs.email && (
          <div className={`${style.input} ${style.email}`}>
            <label htmlFor="newEmail">New Email </label>
            <div className={style.inputContainer}>
              <input
                type="text"
                id="newEmail"
                placeholder="Enter new email"
                {...register("newEmail", {
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
              <p className={`${style.editBtn} ${style.hide}`}>Edit</p>
            </div>
            {errors.newEmail && (
              <p className={`${style.errMsg}`}>{errors.newEmail.message}</p>
            )}
          </div>
        )}

        <div className={`${style.input} ${style.password}`}>
          <label htmlFor="">Password </label>
          <div className={style.inputContainer}>
            <input
              type="password"
              // placeholder="At least 8 & max.15 lower case characters"
              value={"datadasamasiaragveli"}
              {...register("password", {
                required: {
                  value: false,
                  message: "Fill field",
                },
                disabled: true,
              })}
            />
            <p
              className={style.editBtn}
              onClick={() => setEditInputs({ ...editInputs, password: true })}
            >
              Edit
            </p>
          </div>
        </div>

        {editInputs.password && (
          <>
            <div className={`${style.input} ${style.password}`}>
              <label htmlFor="newPassword">New Password </label>
              <div className={style.inputContainer}>
                <input
                  type="password"
                  id="newPassword"
                  placeholder="At least 8 & max.15 lower case characters"
                  {...register("newPassword", {
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
                <p className={`${style.editBtn} ${style.hide}`}>Edit</p>
              </div>
              {errors.newPassword && (
                <p className={`${style.errMsg}`}>
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            <div className={`${style.input} ${style.password}`}>
              <label htmlFor="newPassword">Confirm New Password </label>
              <div className={style.inputContainer}>
                <input
                  type="password"
                  id="confNewPassword"
                  placeholder="Confirm New Password"
                  {...register("confNewPassword", {
                    required: {
                      value: true,
                      message: "Fill field",
                    },

                    validate: (val) => {
                      if (watch("newPassword") !== val) {
                        return "Your passwords do not match";
                      }
                    },
                  })}
                />
                <p className={`${style.editBtn} ${style.hide}`}>Edit</p>
              </div>
              {errors.confNewPassword && (
                <p className={`${style.errMsg}`}>
                  {errors.confNewPassword.message}
                </p>
              )}
            </div>
          </>
        )}

        {error && (
          <p className={style.errMsg}>something wrong error: {error}</p>
        )}
        {success && <p className={style.scMsg}>{success}</p>}
        <article className={style.saveBtns}>
          <button
            className={style.cancelBtn}
            type="button"
            onClick={() => {
              reset();
              setEditInputs({ username: false, email: false, password: false });
            }}
          >
            Cancel
          </button>
          <button className={style.saveBtn} type="submit">
            Save changes
          </button>
        </article>
      </form>
    </div>
  );
};

export default ProfileForm;
