import React, { useState, useContext } from "react";
import style from "./style.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { DashbCtrx } from "../../../store/dashboardContext";
import Cookies from "universal-cookie";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useTranslation } from "react-i18next";

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
  const [erroR, setErroR] = useState<string>("");
  const [success, setSuccess] = useState("");
  const { t } = useTranslation();
  const { profileImage, setProfileImage } = useContext(DashbCtrx);
  const [editInputs, setEditInputs] = useState<InputsEdit>({
    username: false,
    email: false,
    password: false,
  });

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery(
    "userInfo",
    () =>
      axios.get("http://localhost:3001/dashboard", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3000/",
          " Access-Control-Allow-Credentials": true,
        },
        withCredentials: true,
      }),
    { refetchOnWindowFocus: false }
  );

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

  const { mutate } = useMutation(
    (userInfo: typeof formData) => {
      return axios.patch(
        "http://localhost:3001/profile/upload-photo",
        userInfo,
        {
          headers,
          withCredentials: true,
        }
      );
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries("userInfo");
        queryClient.invalidateQueries("quotesInfo");

        if (res.data.token) {
          cookies.remove("token");
          const expiration = new Date();

          expiration.setHours(expiration.getHours() + 3);
          cookies.set("token", res.data.token, {
            path: "/",
            expires: expiration,
          });
        }
        setSuccess(res.data.message);
        setErroR("");
        setProfileImage(res.data.img);
      },
      onError: (errs) => {
        setErroR("Error while edit profile");
        setSuccess("");
      },
    }
  );

  const formData = new FormData();

  const onSubmit = (data: any) => {
    if (profileImage) {
      formData.append("image", profileImage);
    }
    formData.append("username", data.NewUsername);
    formData.append("password", data.newPassword);
    formData.append("email", data.newEmail);

    mutate(formData);
  };

  return (
    <div className={style.profileForm}>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className={`${style.input} ${style.username}`}>
          <label htmlFor="username">{t("myProfile.username")} </label>
          <div className={style.inputContainer}>
            <input
              type="text"
              placeholder={data?.data.username}
              id="username"
              {...register("username", {
                onChange: () => setErroR(""),
                disabled: true,
              })}
            />
            {!data?.data.googleId && (
              <p
                className={style.editBtn}
                onClick={() => setEditInputs({ ...editInputs, username: true })}
              >
                {t("myProfile.edit")}
              </p>
            )}
          </div>
        </div>

        {editInputs.username && (
          <div className={`${style.input} ${style.username}`}>
            <label htmlFor="NewUsername">{t("myProfile.newUsername")} </label>
            <div className={style.inputContainer}>
              <input
                type="text"
                placeholder="Enter new username"
                id="NewUsername"
                {...register("NewUsername", {
                  onChange: () => setErroR(""),
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
              <p className={`${style.editBtn} ${style.hide}`}>
                {t("myProfile.edit")}
              </p>
            </div>
            {errors.NewUsername && (
              <p className={`${style.errMsg}`}>{errors.NewUsername.message}</p>
            )}
          </div>
        )}

        <div className={`${style.input} ${style.email}`}>
          <label htmlFor="email">{t("myProfile.email")} </label>
          <div className={style.inputContainer}>
            <input
              type="text"
              id="email"
              placeholder={data?.data.email}
              {...register("email", {
                onChange: () => setErroR(""),

                disabled: true,
              })}
            />
            {!data?.data.googleId && (
              <p
                className={style.editBtn}
                onClick={() => setEditInputs({ ...editInputs, email: true })}
              >
                {t("myProfile.edit")}
              </p>
            )}
          </div>
        </div>

        {editInputs.email && (
          <div className={`${style.input} ${style.email}`}>
            <label htmlFor="newEmail">{t("myProfile.newEmail")} </label>
            <div className={style.inputContainer}>
              <input
                type="text"
                id="newEmail"
                placeholder="Enter new email"
                {...register("newEmail", {
                  onChange: () => setErroR(""),
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
              <p className={`${style.editBtn} ${style.hide}`}>
                {t("myProfile.edit")}
              </p>
            </div>
            {errors.newEmail && (
              <p className={`${style.errMsg}`}>{errors.newEmail.message}</p>
            )}
          </div>
        )}

        <div className={`${style.input} ${style.password}`}>
          <label htmlFor="">{t("myProfile.password")} </label>
          <div className={style.inputContainer}>
            <input
              type="password"
              value={"datadasamasiaragveli"}
              {...register("password", {
                required: {
                  value: false,
                  message: "Fill field",
                },
                disabled: true,
              })}
            />
            {!data?.data.googleId && (
              <p
                className={style.editBtn}
                onClick={() => setEditInputs({ ...editInputs, password: true })}
              >
                {t("myProfile.edit")}
              </p>
            )}
          </div>
        </div>

        {editInputs.password && (
          <>
            <div className={`${style.input} ${style.password}`}>
              <label htmlFor="newPassword">{t("myProfile.newPassword")} </label>
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
                <p className={`${style.editBtn} ${style.hide}`}>
                  {t("myProfile.edit")}
                </p>
              </div>
              {errors.newPassword && (
                <p className={`${style.errMsg}`}>
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            <div className={`${style.input} ${style.password}`}>
              <label htmlFor="newPassword">
                {t("myProfile.confNewPassword")}{" "}
              </label>
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
                <p className={`${style.editBtn} ${style.hide}`}>
                  {t("myProfile.edit")}
                </p>
              </div>
              {errors.confNewPassword && (
                <p className={`${style.errMsg}`}>
                  {errors.confNewPassword.message}
                </p>
              )}
            </div>
          </>
        )}

        {erroR && (
          <p className={style.errMsg}>something wrong error: {erroR}</p>
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
            {t("myProfile.cancel")}
          </button>
          <button className={style.saveBtn} type="submit">
            {t("myProfile.save")}
          </button>
        </article>
      </form>
    </div>
  );
};

export default ProfileForm;
