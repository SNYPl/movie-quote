import React, { useState } from "react";
import style from "./style.module.css";
import { useForm } from "react-hook-form";
import { FileUploader } from "react-drag-drop-files";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios, { AxiosError } from "axios";
import { useLocation } from "react-router";
import { RotatingLines } from "react-loader-spinner";
import { useTranslation } from "react-i18next";

type movie = {
  updatedName: string;
  nameGeo: string;
  genre: string[];
  year: string;
  director: string;
  directorGeo: string;
  description: string;
  descriptionGeo: string;
  budget: string;
};

interface editMovieTypes {
  setEditMovie: React.Dispatch<React.SetStateAction<boolean>>;
  image: string;
}

const EditMovie: React.FC<editMovieTypes> = ({ setEditMovie, image }) => {
  //useForm
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<movie>();

  const queryClient = useQueryClient();
  const { t } = useTranslation();

  //useState
  const [editedImage, setEditedImage] = useState<any>(image);
  const [errorUser, setErrorUser] = useState("");
  const [succ, setSucc] = useState("");
  const [curImg, setCurImg] = useState<any | null>("");

  //get data
  let location = useLocation();
  const movieId = location.pathname.split("=")[1];

  const { isLoading, error, data } = useQuery(
    "getMovie",
    () =>
      axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/movie-list/movie/movie=${movieId}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": `*`,
            " Access-Control-Allow-Credentials": true,
          },
          withCredentials: true,
        }
      ),
    { refetchOnWindowFocus: false }
  );

  const movie = data?.data.movie;

  //cache
  const username = useQuery(
    "userInfo",
    () =>
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/dashboard`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          " Access-Control-Allow-Credentials": true,
        },
        withCredentials: true,
      }),
    { refetchOnWindowFocus: false }
  );

  const fileTypes = ["JPG", "PNG", "JPEG"];

  const handleChange = (file: any) => {
    let reader = new FileReader();
    reader?.readAsDataURL(file);
    reader.onload = () => {
      setCurImg(reader?.result);
    };

    setEditedImage(file);
  };

  const updatedName = watch("updatedName", movie.name);
  const updatedNameGeo = watch("nameGeo", movie.nameGeo);
  const updatedGenre = watch("genre", movie.genre);
  const updatedYear = watch("year", movie.year);
  const updatedDirector = watch("director", movie.director);
  const updatedDirectorGeo = watch("directorGeo", movie.directorGeo);
  const updatedDescription = watch("description", movie.description);
  const updatedDescriptionGeo = watch("descriptionGeo", movie.descriptionGeo);
  const updatedBudget = watch("budget", movie.budget);

  const editmovie = useMutation(
    (userInfo: typeof formData) => {
      return axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/movie-list/edit-movie`,
        userInfo,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
            Accept: "application/json",
          },
          withCredentials: true,
        }
      );
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries("getMovie");
        queryClient.refetchQueries("getMovie");
        if (res.status === 200) setSucc(res.data.message);
        setEditMovie(false);
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
    formData.append("updatedName", data.updatedName);
    formData.append("nameGeo", data.nameGeo);
    formData.append("genre", data.genre);
    formData.append("year", data.year);
    formData.append("director", data.director);
    formData.append("directorGeo", data.directorGeo);
    formData.append("description", data.description);
    formData.append("descriptionGeo", data.descriptionGeo);
    formData.append("budget", data.budget);
    formData.append("image", editedImage);
    formData.append("id", movieId);

    editmovie.mutate(formData);
  };

  return (
    <section className={style.overlay}>
      <article className={style.popUp}>
        <div className={style.title}>
          <h4>{t("movieList.editMovie.title")}</h4>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => setEditMovie(false)}
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
              backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL}/uploads/images/${username.data?.data.image})`,
            }}
          ></div>
          <h4>{username.data?.data.username}</h4>
        </article>

        <section className={style.forms}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={`${style.input} ${style.name}`}>
              <span>Eng</span>
              <p className={`${style.valueText}`}>{`Movie name:`}</p>
              <input
                type="text"
                value={updatedName}
                id="name"
                {...register("updatedName", {
                  required: {
                    value: true,
                    message: "Fill field",
                  },
                  minLength: {
                    value: 3,
                    message: "minimum length 3",
                  },

                  pattern: {
                    value: /^[a-zA-Z0-9_ ]*$/,
                    message: "only english words !",
                  },
                })}
              />
            </div>
            {errors.updatedName && (
              <p className={`${style.inpErr}`}>{errors.updatedName.message}</p>
            )}
            <div className={`${style.input} `}>
              <span>ქარ</span>
              <p className={`${style.valueText}`}>{`ფილმის სახელი:`}</p>

              <input
                type="text"
                value={updatedNameGeo}
                id="nameGeo"
                {...register("nameGeo", {
                  required: {
                    value: true,
                    message: "Fill field",
                  },
                  pattern: {
                    value: /^[\u10A0-\u10FF]*$/,
                    message: "მხოლოდ ქართულად ასოები !",
                  },
                })}
              />
            </div>
            {errors.nameGeo && (
              <p className={`${style.inpErr}`}>{errors.nameGeo.message}</p>
            )}

            <div className={`${style.input} `}>
              <p className={`${style.valueText}`}>
                {t("movieList.editMovie.genre")}
              </p>

              <input
                type="text"
                id="genre"
                value={updatedGenre}
                {...register("genre", {
                  required: {
                    value: true,
                    message: "Fill field",
                  },
                  // pattern: {
                  //   value: /^[a-zA-Z\s]+\,[a-zA-Z\s]+$/,
                  //   message: "only word and comma",
                  // },
                })}
              />
            </div>
            {errors.genre && (
              <p className={`${style.inpErr}`}>{errors.genre.message}</p>
            )}

            <div className={`${style.input} `}>
              <p className={`${style.valueText}`}>{`წელი/year:`}</p>
              <input
                type="text"
                value={updatedYear}
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
            </div>
            {errors.year && (
              <p className={`${style.inpErr}`}>{errors.year.message}</p>
            )}

            <div className={`${style.input} `}>
              <span>Eng</span>
              <p className={`${style.valueText}`}>{`Director:`}</p>

              <input
                type="text"
                value={updatedDirector}
                id="director"
                {...register("director", {
                  required: {
                    value: true,
                    message: "Fill field",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_ ]*$/,
                    message: "only english words !",
                  },
                })}
              />
            </div>
            {errors.director && (
              <p className={`${style.inpErr}`}>{errors.director.message}</p>
            )}

            <div className={`${style.input} `}>
              <span>ქარ</span>
              <p className={`${style.valueText}`}>{`რეჟისორი:`}</p>

              <input
                type="text"
                value={updatedDirectorGeo}
                id="directorGeo"
                {...register("directorGeo", {
                  required: {
                    value: true,
                    message: "Fill field",
                  },
                  pattern: {
                    value: /^[\u10A0-\u10FF]*$/,
                    message: "მხოლოდ ქართულად ასოები !",
                  },
                })}
              />
            </div>
            {errors.directorGeo && (
              <p className={`${style.inpErr}`}>{errors.directorGeo.message}</p>
            )}

            <div className={`${style.input} `}>
              <p className={`${style.valueText}`}>{`Budget:`}</p>

              <input
                type="text"
                value={updatedBudget}
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
            </div>
            {errors.budget && (
              <p className={`${style.inpErr}`}>{errors.budget.message}</p>
            )}

            <div className={`${style.input} ${style.desc} `}>
              <span>Eng</span>
              <p className={`${style.valueText}`}>{`Movie description:`}</p>

              <input
                type="textarea"
                placeholder="Movie Description"
                value={updatedDescription}
                id="description"
                {...register("description", {
                  required: {
                    value: true,
                    message: "Fill field",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_ ]*$/,
                    message: "only english words !",
                  },
                })}
              />
            </div>
            {errors.description && (
              <p className={`${style.inpErr}`}>{errors.description.message}</p>
            )}

            <div className={`${style.input}  ${style.desc}`}>
              <span>ქარ</span>
              <p className={`${style.valueText}`}>{`ფილმის აღწერა:`}</p>
              <input
                type="textarea"
                value={updatedDescriptionGeo}
                id="descriptionGeo"
                {...register("descriptionGeo", {
                  required: {
                    value: true,
                    message: "Fill field",
                  },
                  pattern: {
                    value: /^[\u10A0-\u10FF]*$/,
                    message: "მხოლოდ ქართულად ასოები !",
                  },
                })}
              />
            </div>
            {errors.descriptionGeo && (
              <p className={`${style.inpErr}`}>
                {errors.descriptionGeo.message}
              </p>
            )}

            <div className={style.uploadPhoto}>
              <img
                src={
                  curImg
                    ? curImg
                    : `${process.env.REACT_APP_BACKEND_URL}/uploads/images/${movie.image}`
                }
              ></img>
              <FileUploader
                handleChange={handleChange}
                name="file"
                types={fileTypes}
                maxSize="1"
                classes={style.dargNdrop}
                label={t("movieList.editMovie.upload")}
              />
            </div>
            {succ && <p className={style.scrMsg}>{succ}</p>}
            {errorUser && <p className={style.errMsg}>{errorUser}</p>}
            <button type="submit" className={style.addBtn}>
              {editmovie.isLoading ? (
                <RotatingLines
                  strokeColor="grey"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="40"
                  visible={true}
                />
              ) : (
                t("movieList.editMovie.title")
              )}
            </button>
          </form>
        </section>
      </article>
    </section>
  );
};

export default EditMovie;
