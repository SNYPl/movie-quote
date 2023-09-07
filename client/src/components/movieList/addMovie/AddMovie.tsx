import React, { useContext, useState } from "react";
import style from "./style.module.css";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { FileUploader } from "react-drag-drop-files";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { RotatingLines } from "react-loader-spinner";
import { useTranslation } from "react-i18next";
import Cookies from "universal-cookie";

type movie = {
  name: string;
  nameGeo: string;
  genre: any[] | Blob;
  year: string;
  director: string;
  directorGeo: string;
  description: string;
  descriptionGeo: string;
  budget: string;
};

interface addMovie {
  setAddMovie: React.Dispatch<React.SetStateAction<boolean>>;
}

const fileTypes = ["JPG", "PNG", "JPEG"];

const AddMovie: React.FC<addMovie> = ({ setAddMovie }) => {
  const { t, i18n } = useTranslation();
  const cookies = new Cookies();
  const token = cookies.get("token");

  const { error, data } = useQuery(
    "userInfo",
    () =>
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/dashboard`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": process.env.ACCESS_ALLOW_URL,
          "Access-Control-Allow-Credentials": true,
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }),
    { refetchOnWindowFocus: false }
  );

  const queryClient = useQueryClient();

  const [errorUser, setErrorUser] = useState("");
  const [succ, setSucc] = useState("");

  const [image, setImage] = useState<any>();

  const handleChange = (file: any) => {
    setImage(file);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<movie>();

  let headers = {
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": process.env.ACCESS_ALLOW_URL,
    "Access-Control-Allow-Credentials": true,
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  };

  const { mutate, isLoading } = useMutation(
    (userInfo: typeof formData) => {
      return axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/movie-list/add-movie`,
        userInfo,
        {
          headers,
          withCredentials: true,
        }
      );
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries("moviesList");
        queryClient.refetchQueries("moviesList");
        if (res.status === 200) setSucc(res.data.message);
        setAddMovie(false);
      },
      onError: (err) => {
        if (err instanceof AxiosError) {
          setErrorUser(err?.response?.data.message);
        }
      },
    }
  );

  const formData = new FormData();

  const onSubmit = (data: any) => {
    formData.append("name", data.name);
    formData.append("nameGeo", data.nameGeo);
    formData.append("genre", data.genre);
    formData.append("year", data.year);
    formData.append("director", data.director);
    formData.append("directorGeo", data.directorGeo);
    formData.append("description", data.description);
    formData.append("descriptionGeo", data.descriptionGeo);
    formData.append("budget", data.budget);
    formData.append("image", image);

    mutate(formData);
  };

  return (
    <section className={style.overlay}>
      <article className={style.popUp}>
        <div className={style.title}>
          <h4> {t("movieList.add")}</h4>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => setAddMovie(false)}
          >
            <path
              d="M1.29196 1.29183C1.38485 1.19871 1.4952 1.12482 1.61669 1.07441C1.73818 1.024 1.86842 0.998047 1.99996 0.998047C2.13149 0.998047 2.26173 1.024 2.38322 1.07441C2.50471 1.12482 2.61506 1.19871 2.70796 1.29183L7.99996 6.58583L13.292 1.29183C13.3849 1.19886 13.4953 1.12511 13.6168 1.07479C13.7383 1.02447 13.8685 0.99857 14 0.99857C14.1314 0.99857 14.2616 1.02447 14.3831 1.07479C14.5046 1.12511 14.615 1.19886 14.708 1.29183C14.8009 1.38481 14.8747 1.49519 14.925 1.61667C14.9753 1.73815 15.0012 1.86835 15.0012 1.99983C15.0012 2.13132 14.9753 2.26152 14.925 2.383C14.8747 2.50448 14.8009 2.61486 14.708 2.70783L9.41396 7.99983L14.708 13.2918C14.8009 13.3848 14.8747 13.4952 14.925 13.6167C14.9753 13.7381 15.0012 13.8683 15.0012 13.9998C15.0012 14.1313 14.9753 14.2615 14.925 14.383C14.8747 14.5045 14.8009 14.6149 14.708 14.7078C14.615 14.8008 14.5046 14.8746 14.3831 14.9249C14.2616 14.9752 14.1314 15.0011 14 15.0011C13.8685 15.0011 13.7383 14.9752 13.6168 14.9249C13.4953 14.8746 13.3849 14.8008 13.292 14.7078L7.99996 9.41383L2.70796 14.7078C2.61498 14.8008 2.5046 14.8746 2.38312 14.9249C2.26164 14.9752 2.13144 15.0011 1.99996 15.0011C1.86847 15.0011 1.73827 14.9752 1.61679 14.9249C1.49531 14.8746 1.38493 14.8008 1.29196 14.7078C1.19898 14.6149 1.12523 14.5045 1.07491 14.383C1.02459 14.2615 0.998693 14.1313 0.998693 13.9998C0.998693 13.8683 1.02459 13.7381 1.07491 13.6167C1.12523 13.4952 1.19898 13.3848 1.29196 13.2918L6.58596 7.99983L1.29196 2.70783C1.19883 2.61494 1.12494 2.50459 1.07453 2.3831C1.02412 2.26161 0.998169 2.13137 0.998169 1.99983C0.998169 1.8683 1.02412 1.73806 1.07453 1.61657C1.12494 1.49508 1.19883 1.38473 1.29196 1.29183Z"
              fill="#CED4DA"
            />
          </svg>
        </div>
        <article className={style.author}>
          <div
            className={style.photo}
            style={{
              backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL}/uploads/images/${data?.data.image})`,
            }}
          ></div>
          <h4>{data?.data.username}</h4>
        </article>

        <section className={style.forms}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={`${style.input} ${style.name}`}>
              <span>Eng</span>
              <input
                type="text"
                placeholder="Movie name"
                id="name"
                {...register("name", {
                  required: {
                    value: true,
                    message: "Fill field",
                  },
                  minLength: {
                    value: 3,
                    message: "minimum length 3",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_, ]*$/,
                    message: "only english words !",
                  },
                })}
              />
              {errors.name && <p>{errors.name.message}</p>}
            </div>
            <div className={`${style.input} `}>
              <span>ქარ</span>
              <input
                type="text"
                placeholder="ფილმის სახელი"
                id="nameGeo"
                {...register("nameGeo", {
                  required: {
                    value: true,
                    message: "Fill field",
                  },
                  pattern: {
                    value: /^[\u10A0-\u10FF_ ,]*$/,
                    message: "მხოლოდ ქართულად ასოები !",
                  },
                })}
              />
              {errors.nameGeo && <p>{errors.nameGeo.message}</p>}
            </div>

            <div className={`${style.input} `}>
              <input
                type="text"
                placeholder={t("movieList.addMovie.separate")}
                id="genre"
                {...register("genre", {
                  required: {
                    value: true,
                    message: "Fill field",
                  },
                })}
              />
              {errors.genre && <p>{errors.genre.message}</p>}
            </div>

            <div className={`${style.input} `}>
              <input
                type="text"
                placeholder="წელი/year"
                id="year"
                {...register("year", {
                  required: {
                    value: true,
                    message: "Fill field",
                  },
                  pattern: {
                    value: /^[0-9]*$/,
                    message: "only numbers!",
                  },
                })}
              />
              {errors.year && <p>{errors.year.message}</p>}
            </div>

            <div className={`${style.input} `}>
              <span>Eng</span>
              <input
                type="text"
                placeholder="Director"
                id="director"
                {...register("director", {
                  required: {
                    value: true,
                    message: "Fill field",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_, ]*$/,
                    message: "only english words !",
                  },
                })}
              />
              {errors.director && <p>{errors.director.message}</p>}
            </div>

            <div className={`${style.input} `}>
              <span>ქარ</span>
              <input
                type="text"
                placeholder="რეჟისორი"
                id="directorGeo"
                {...register("directorGeo", {
                  required: {
                    value: true,
                    message: "Fill field",
                  },
                  pattern: {
                    value: /^[\u10A0-\u10FF_ ,]*$/,
                    message: "მხოლოდ ქართულად ასოები !",
                  },
                })}
              />
              {errors.directorGeo && <p>{errors.directorGeo.message}</p>}
            </div>

            <div className={`${style.input} `}>
              <input
                type="text"
                placeholder={t("movieList.addMovie.budget")}
                id="budget"
                {...register("budget", {
                  required: {
                    value: true,
                    message: "Fill field",
                  },
                  pattern: {
                    value: /^[0-9]*$/,
                    message: "only numbers!",
                  },
                })}
              />
              {errors.budget && <p>{errors.budget.message}</p>}
            </div>

            <div className={`${style.input} ${style.desc} `}>
              <span>Eng</span>
              <input
                type="textarea"
                placeholder="Movie Description"
                id="description"
                {...register("description", {
                  required: {
                    value: true,
                    message: "Fill field",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_, ]*$/,
                    message: "only english words !",
                  },
                })}
              />
              {errors.description && <p>{errors.description.message}</p>}
            </div>

            <div className={`${style.input}  ${style.desc}`}>
              <span>ქარ</span>
              <input
                type="textarea"
                placeholder="ფილმის აღწერა"
                id="descriptionGeo"
                {...register("descriptionGeo", {
                  required: {
                    value: true,
                    message: "Fill field",
                  },
                  pattern: {
                    value: /^[\u10A0-\u10FF_ ,]*$/,
                    message: "მხოლოდ ქართულად ასოები !",
                  },
                })}
              />
              {errors.descriptionGeo && <p>{errors.descriptionGeo.message}</p>}
            </div>

            <div className={style.uploadPhoto}>
              <FileUploader
                handleChange={handleChange}
                name="file"
                types={fileTypes}
                required
                maxSize="1"
                classes={style.dargNdrop}
                label={t("movieList.addMovie.upload")}
              />
            </div>

            {succ && <p className={style.scrMsg}>{succ}</p>}
            {errorUser && <p className={style.errMsg}>{errorUser}</p>}

            <button type="submit" className={style.addBtn}>
              {isLoading ? (
                <RotatingLines
                  strokeColor="grey"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="40"
                  visible={true}
                />
              ) : (
                t("movieList.add")
              )}
            </button>
          </form>
        </section>
      </article>
    </section>
  );
};

export default AddMovie;
