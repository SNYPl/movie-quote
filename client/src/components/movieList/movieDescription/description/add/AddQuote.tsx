import React, { useState } from "react";
import style from "./style.module.css";
import { useForm } from "react-hook-form";
import quoteImg from "../../../../../assets/img/desc1.png";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios, { AxiosError } from "axios";
import { FileUploader } from "react-drag-drop-files";

interface addBtn {
  add: React.Dispatch<React.SetStateAction<boolean>>;
  movie: any;
}

type movie = {
  quotes: string;
  quotesGeo: string;
};

const AddQuote: React.FC<addBtn> = ({ add, movie }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<movie>();
  const [quoteImg, setQuoteImg] = useState<any>("");
  const queryClient = useQueryClient();
  const [errorUser, setErrorUser] = useState("");

  const handleChange = (file: any) => {
    let reader = new FileReader();
    reader?.readAsDataURL(file);
    reader.onload = () => {
      setQuoteImg(reader?.result);
    };
  };

  const fileTypes = ["JPG", "PNG", "JPEG"];

  const username = useQuery(
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

  const movieImg = movie.image;
  const movieName = movie.name;
  const genres = movie.genre;
  const movieYear = movie.year;
  const movieDirector = movie.director;
  const id = movie._id;

  const { mutate } = useMutation(
    (movieInfo: typeof formData) => {
      return axios.patch(
        `http://localhost:3001/movie-list/movie/movie=${id}/add-quote`,
        movieInfo,
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
        queryClient.invalidateQueries("getMovieQuotes");
        queryClient.refetchQueries("getMovieQuotes");
        if (res.status === 200) add(false);
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
    formData.append("text", data.quotes);
    formData.append("textGeo", data.quotesGeo);
    formData.append("quoteImage", quoteImg);

    mutate(formData);
  };
  return (
    <section className={style.overlay}>
      <article className={style.popUp}>
        <div className={style.title}>
          <h4>Add Quote</h4>
          <svg
            onClick={() => add(false)}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.29196 1.29183C1.38485 1.19871 1.4952 1.12482 1.61669 1.07441C1.73818 1.024 1.86842 0.998047 1.99996 0.998047C2.13149 0.998047 2.26173 1.024 2.38322 1.07441C2.50471 1.12482 2.61506 1.19871 2.70796 1.29183L7.99996 6.58583L13.292 1.29183C13.3849 1.19886 13.4953 1.12511 13.6168 1.07479C13.7383 1.02447 13.8685 0.99857 14 0.99857C14.1314 0.99857 14.2616 1.02447 14.3831 1.07479C14.5046 1.12511 14.615 1.19886 14.708 1.29183C14.8009 1.38481 14.8747 1.49519 14.925 1.61667C14.9753 1.73815 15.0012 1.86835 15.0012 1.99983C15.0012 2.13132 14.9753 2.26152 14.925 2.383C14.8747 2.50448 14.8009 2.61486 14.708 2.70783L9.41396 7.99983L14.708 13.2918C14.8009 13.3848 14.8747 13.4952 14.925 13.6167C14.9753 13.7381 15.0012 13.8683 15.0012 13.9998C15.0012 14.1313 14.9753 14.2615 14.925 14.383C14.8747 14.5045 14.8009 14.6149 14.708 14.7078C14.615 14.8008 14.5046 14.8746 14.3831 14.9249C14.2616 14.9752 14.1314 15.0011 14 15.0011C13.8685 15.0011 13.7383 14.9752 13.6168 14.9249C13.4953 14.8746 13.3849 14.8008 13.292 14.7078L7.99996 9.41383L2.70796 14.7078C2.61498 14.8008 2.5046 14.8746 2.38312 14.9249C2.26164 14.9752 2.13144 15.0011 1.99996 15.0011C1.86847 15.0011 1.73827 14.9752 1.61679 14.9249C1.49531 14.8746 1.38493 14.8008 1.29196 14.7078C1.19898 14.6149 1.12523 14.5045 1.07491 14.383C1.02459 14.2615 0.998693 14.1313 0.998693 13.9998C0.998693 13.8683 1.02459 13.7381 1.07491 13.6167C1.12523 13.4952 1.19898 13.3848 1.29196 13.2918L6.58596 7.99983L1.29196 2.70783C1.19883 2.61494 1.12494 2.50459 1.07453 2.3831C1.02412 2.26161 0.998169 2.13137 0.998169 1.99983C0.998169 1.8683 1.02412 1.73806 1.07453 1.61657C1.12494 1.49508 1.19883 1.38473 1.29196 1.29183Z"
              fill="#CED4DA"
            />
          </svg>
        </div>
        <section>
          <article className={style.author}>
            <div
              className={style.photo}
              style={{ backgroundImage: `url(${username.data?.data.image})` }}
            ></div>
            <h4>{username.data?.data.username}</h4>
          </article>

          <article className={style.movie}>
            <div className={style.moviePhoto}>
              <img src={movieImg} alt="movie" />
            </div>
            <article className={style.movieDesc}>
              <div className={style.descTitle}>
                <h3>
                  {movieName} ({movieYear})
                </h3>
              </div>

              <div className={style.genres}>
                {genres.map((el: string, id: any) => (
                  <p key={id}>{el}</p>
                ))}
              </div>

              <p className={style.director}>
                Director: <span>{movieDirector}</span>
              </p>
            </article>
          </article>
        </section>

        <section className={style.forms}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={`${style.input} ${style.desc} `}>
              <span>Eng</span>
              <input
                type="textarea"
                placeholder="Quote in English."
                id="quotes"
                {...register("quotes", {
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
            {errors.quotes && (
              <p className={`${style.inpErr}`}>{errors.quotes.message}</p>
            )}

            <div className={`${style.input}  ${style.desc}`}>
              <span>ქარ</span>
              <input
                type="textarea"
                placeholder="ციტატა ქართულ ენაზე"
                id="quotesGeo"
                {...register("quotesGeo", {
                  required: {
                    value: true,
                    message: "Fill field",
                  },
                  minLength: {
                    value: 3,
                    message: "minimum length 3",
                  },
                  pattern: {
                    value: /^[\u10A0-\u10FF]*$/,
                    message: "მხოლოდ ქართული ასოები !",
                  },
                })}
              />
            </div>
            <select disabled className={`${style.selector}`}>
              <option value={movieName}>{movieName}</option>
            </select>

            {errors.quotesGeo && (
              <p className={`${style.inpErr}`}>{errors.quotesGeo.message}</p>
            )}

            <div className={style.uploadPhoto}>
              <FileUploader
                handleChange={handleChange}
                name="file"
                types={fileTypes}
                maxSize="1"
                required
                classes={style.dargNdrop}
                label="UPLOAD or drop image here"
              />
            </div>

            <button type="submit" className={style.addBtn}>
              Add Quote
            </button>
          </form>
          {errorUser && <p className={style.errMsg}>{errorUser}</p>}
        </section>
      </article>
    </section>
  );
};

export default AddQuote;
