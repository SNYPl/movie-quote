import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import quoteImg from "../../../assets/img/imgNews.png";
import { useForm } from "react-hook-form";
import { FileUploader } from "react-drag-drop-files";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios, { AxiosError } from "axios";
import { Oval } from "react-loader-spinner";

interface newQuote {
  setNewQuote: React.Dispatch<React.SetStateAction<boolean>>;
}

type movie = {
  quotes: string;
  quotesGeo: string;
};

const QuoteForm: React.FC<newQuote> = ({ setNewQuote }) => {
  const [quoteImg, setQuoteImg] = useState<any>("");
  const [selectMovie, setSelectMovie] = useState<any>("");
  const [errorUser, setErrorUser] = useState("");
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<movie>();

  //username
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

  const movieListNames = useQuery(
    "movielistNames",
    () =>
      axios.get("http://localhost:3001/dashboard/movieListNames", {
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

  const handleChange = (file: any) => {
    let reader = new FileReader();
    reader?.readAsDataURL(file);
    reader.onload = () => {
      setQuoteImg(reader?.result);
    };
  };

  const fileTypes = ["JPG", "PNG", "JPEG"];

  const formData = new FormData();

  const { mutate, isLoading } = useMutation(
    (movieInfo: typeof formData) => {
      return axios.patch(
        `http://localhost:3001/dashboard/newsFeed/add-quote`,
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
        queryClient.invalidateQueries("quotesInfo");
        // queryClient.refetchQueries("quotesInfo");
        if (res.status === 200) setNewQuote(false);
      },
      onError: (err) => {
        if (err instanceof AxiosError) {
          setErrorUser(err?.response?.data.message);
        }
      },
    }
  );
  useEffect(() => {
    if (selectMovie) {
      setErrorUser("");
    }
  }, [selectMovie]);

  const onSubmit = (data: any) => {
    if (!selectMovie) {
      setErrorUser("Select Movie");
      return;
    }

    formData.append("text", data.quotes);
    formData.append("textGeo", data.quotesGeo);
    formData.append("quoteImage", quoteImg);
    formData.append("movie", selectMovie);

    mutate(formData);
  };

  return (
    <section className={style.overlay}>
      <article className={style.popUp}>
        <div className={style.title}>
          <h4>Write New Quote</h4>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => setNewQuote(false)}
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
            style={{ backgroundImage: `url(${username.data?.data.image})` }}
          ></div>
          <h4>{username.data?.data.username}</h4>
        </article>

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

            <section className={style.optionsContainer}>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 6C12 7.5913 11.3679 9.11742 10.2426 10.2426C9.11742 11.3679 7.5913 12 6 12C4.4087 12 2.88258 11.3679 1.75736 10.2426C0.632141 9.11742 0 7.5913 0 6C0 4.4087 0.632141 2.88258 1.75736 1.75736C2.88258 0.632141 4.4087 0 6 0C7.5913 0 9.11742 0.632141 10.2426 1.75736C11.3679 2.88258 12 4.4087 12 6ZM2 6C2 7.06087 2.42143 8.07828 3.17157 8.82843C3.92172 9.57857 4.93913 10 6 10C7.06087 10 8.07828 9.57857 8.82843 8.82843C9.57857 8.07828 10 7.06087 10 6C10 4.93913 9.57857 3.92172 8.82843 3.17157C8.07828 2.42143 7.06087 2 6 2C4.93913 2 3.92172 2.42143 3.17157 3.17157C2.42143 3.92172 2 4.93913 2 6Z"
                  fill="white"
                />
                <path
                  d="M18 12H19C19.9702 11.9999 20.9073 12.3524 21.637 12.9919C22.3666 13.6313 22.8389 14.5142 22.966 15.476L29.186 12.712C29.4905 12.5763 29.824 12.5189 30.1563 12.545C30.4886 12.571 30.8091 12.6797 31.0887 12.8611C31.3683 13.0426 31.5981 13.291 31.7573 13.5838C31.9164 13.8767 31.9999 14.2047 32 14.538V29.462C31.9997 29.795 31.9163 30.1228 31.7572 30.4154C31.5982 30.708 31.3685 30.9563 31.0892 31.1376C30.8099 31.319 30.4897 31.4278 30.1577 31.454C29.8257 31.4803 29.4924 31.4232 29.188 31.288L22.966 28.524C22.8389 29.4858 22.3666 30.3687 21.637 31.0081C20.9073 31.6476 19.9702 32.0001 19 32H4C2.93913 32 1.92172 31.5786 1.17157 30.8284C0.421427 30.0783 0 29.0609 0 28V16C0 14.9391 0.421427 13.9217 1.17157 13.1716C1.92172 12.4214 2.93913 12 4 12H18ZM30 14.54L23 17.65V26.35L30 29.462V14.54ZM2 16V28C2 28.5304 2.21071 29.0391 2.58579 29.4142C2.96086 29.7893 3.46957 30 4 30H19C19.5304 30 20.0391 29.7893 20.4142 29.4142C20.7893 29.0391 21 28.5304 21 28V16C21 15.4696 20.7893 14.9609 20.4142 14.5858C20.0391 14.2107 19.5304 14 19 14H4C3.46957 14 2.96086 14.2107 2.58579 14.5858C2.21071 14.9609 2 15.4696 2 16Z"
                  fill="white"
                />
                <path
                  d="M18 12C19.5913 12 21.1174 11.3679 22.2426 10.2426C23.3679 9.11742 24 7.5913 24 6C24 4.4087 23.3679 2.88258 22.2426 1.75736C21.1174 0.632141 19.5913 0 18 0C16.4087 0 14.8826 0.632141 13.7574 1.75736C12.6321 2.88258 12 4.4087 12 6C12 7.5913 12.6321 9.11742 13.7574 10.2426C14.8826 11.3679 16.4087 12 18 12ZM14 6C14 4.93913 14.4214 3.92172 15.1716 3.17157C15.9217 2.42143 16.9391 2 18 2C19.0609 2 20.0783 2.42143 20.8284 3.17157C21.5786 3.92172 22 4.93913 22 6C22 7.06087 21.5786 8.07828 20.8284 8.82843C20.0783 9.57857 19.0609 10 18 10C16.9391 10 15.9217 9.57857 15.1716 8.82843C14.4214 8.07828 14 7.06087 14 6Z"
                  fill="white"
                />
              </svg>
              <select
                className={style.selectMovie}
                onChange={(e: any) => setSelectMovie(e.target.value)}
              >
                <option selected disabled defaultValue={"Choose Movie"}>
                  Choose Movie
                </option>
                {movieListNames?.data?.data.map((el: any, id: any) => (
                  <option key={id}>{el.name}</option>
                ))}
              </select>
            </section>

            <button type="submit" className={style.postBtn}>
              {isLoading ? (
                <Oval
                  height={30}
                  width={30}
                  color="#4fa94d"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  ariaLabel="oval-loading"
                  secondaryColor="#4fa94d"
                  strokeWidth={2}
                  strokeWidthSecondary={2}
                />
              ) : (
                "Post"
              )}
            </button>
          </form>
          {errorUser && <p className={style.errMsg}>{errorUser}</p>}
        </section>
      </article>
    </section>
  );
};

export default QuoteForm;
