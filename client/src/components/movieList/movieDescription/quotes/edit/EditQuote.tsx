import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios, { AxiosError } from "axios";
import { To, useLocation } from "react-router";
import { FileUploader } from "react-drag-drop-files";
import { useNavigate } from "react-router-dom";
import { Oval, RotatingLines } from "react-loader-spinner";
import { useTranslation } from "react-i18next";

type quote = {
  editQuoteText: string;
  editQuoteTextGeo: string;
};

const EditQuote: React.FC = () => {
  const queryClient = useQueryClient();
  const [errorUser, setErrorUser] = useState("");
  const [succ, setSucc] = useState("");
  const navigate = useNavigate();

  let location = useLocation();
  const quoteId = location.pathname.split("=")[1].split("/")[0];
  const { t } = useTranslation();
  const [curImg, setCurImg] = useState<any | null>("");

  const { error, isLoading, data } = useQuery(
    "getQuote",
    () =>
      axios.get(
        `http://localhost:3001/movie-list/quote/quote=${quoteId}/get-quote`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:3000/",
            " Access-Control-Allow-Credentials": true,
          },
          withCredentials: true,
        }
      ),
    { refetchOnWindowFocus: false }
  );

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<quote>({
    defaultValues: {
      editQuoteText: data?.data.quote.text,
      editQuoteTextGeo: data?.data.quote.textGeo,
    },
  });

  const [editedImage, setEditedImage] = useState<any>(data?.data.quote.image);

  useEffect(() => {
    if (data) {
      reset();
    }
  }, [data]);
  if (data) {
  }

  const fileTypes = ["JPG", "PNG", "JPEG"];

  const updatedText = watch("editQuoteText", data?.data.quote.text);
  const updatedTextGeo = watch("editQuoteTextGeo", data?.data.quote.textGeo);

  const handleChange = (file: any) => {
    setEditedImage(file);
    let reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      setCurImg(reader?.result);
    };
  };

  const { mutate } = useMutation(
    (quoteEdit: typeof formData) => {
      return axios.patch(
        `http://localhost:3001/movie-list/quote/quote=${quoteId}/edit-quote`,
        quoteEdit,
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
        queryClient.invalidateQueries("getQuote");
        queryClient.invalidateQueries("getMovieQuotes");
        queryClient.refetchQueries("getMovieQuotes");
        if (res.status === 200) {
          setSucc("Quote successfully edited");
          navigate(`../quote/quote=${quoteId}`, { replace: true });
        }
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
    setSucc("");
    formData.append("text", data.editQuoteText);
    formData.append("textGeo", data.editQuoteTextGeo);
    formData.append("image", editedImage);

    mutate(formData);
  };

  //delete quote

  const deleteQuote = useMutation(
    (movie: any) => {
      return axios.delete(
        "http://localhost:3001/movie-list/movie/delete-quote",
        {
          data: { id: quoteId },
          withCredentials: true,
        }
      );
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries("getMovieQuotes");
        if (res.status === 200) {
          navigate(`/dashboard/movie-list/movie/movie=${res.data.movie}`);
        }
      },
      onError: (err) => {
        if (err instanceof AxiosError) {
          // setErr(err?.response?.data.message);
        }
      },
    }
  );

  const deleteQuoteHandler = () => {
    deleteQuote.mutate({ id: quoteId });
  };

  return (
    <section className={style.overlay}>
      <article className={style.popUp}>
        <div className={style.title}>
          <div className={style.titleIcon} onClick={deleteQuoteHandler}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.125 1.25H11.875C12.0408 1.25 12.1997 1.31585 12.3169 1.43306C12.4342 1.55027 12.5 1.70924 12.5 1.875V3.125H7.5V1.875C7.5 1.70924 7.56585 1.55027 7.68306 1.43306C7.80027 1.31585 7.95924 1.25 8.125 1.25ZM13.75 3.125V1.875C13.75 1.37772 13.5525 0.900805 13.2008 0.549175C12.8492 0.197544 12.3723 0 11.875 0L8.125 0C7.62772 0 7.15081 0.197544 6.79917 0.549175C6.44754 0.900805 6.25 1.37772 6.25 1.875V3.125H3.1325C3.12833 3.12496 3.12417 3.12496 3.12 3.125H1.875C1.70924 3.125 1.55027 3.19085 1.43306 3.30806C1.31585 3.42527 1.25 3.58424 1.25 3.75C1.25 3.91576 1.31585 4.07473 1.43306 4.19194C1.55027 4.30915 1.70924 4.375 1.875 4.375H2.5475L3.61375 17.7C3.66403 18.3265 3.94844 18.9111 4.41034 19.3373C4.87224 19.7635 5.47774 20.0001 6.10625 20H13.8937C14.5223 20.0001 15.1278 19.7635 15.5897 19.3373C16.0516 18.9111 16.336 18.3265 16.3863 17.7L17.4525 4.375H18.125C18.2908 4.375 18.4497 4.30915 18.5669 4.19194C18.6842 4.07473 18.75 3.91576 18.75 3.75C18.75 3.58424 18.6842 3.42527 18.5669 3.30806C18.4497 3.19085 18.2908 3.125 18.125 3.125H16.8813C16.8771 3.12496 16.8729 3.12496 16.8687 3.125H13.75ZM16.1975 4.375L15.14 17.6C15.1149 17.9132 14.9727 18.2055 14.7417 18.4186C14.5108 18.6318 14.208 18.7501 13.8937 18.75H6.10625C5.792 18.7501 5.48925 18.6318 5.2583 18.4186C5.02735 18.2055 4.88514 17.9132 4.86 17.6L3.8025 4.375H16.1975ZM6.83875 5.625C7.00417 5.61544 7.16661 5.67195 7.29037 5.78212C7.41413 5.89229 7.48908 6.04709 7.49875 6.2125L8.12375 16.8375C8.13032 17.001 8.07252 17.1605 7.96277 17.2818C7.85302 17.4032 7.70007 17.4766 7.53676 17.4865C7.37345 17.4963 7.2128 17.4417 7.0893 17.3344C6.96581 17.227 6.88932 17.0756 6.87625 16.9125L6.25 6.2875C6.24493 6.20539 6.25611 6.12309 6.28291 6.04531C6.30972 5.96754 6.35161 5.89581 6.40619 5.83426C6.46077 5.77271 6.52697 5.72255 6.60098 5.68664C6.675 5.65072 6.75537 5.62978 6.8375 5.625H6.83875ZM13.1613 5.625C13.2434 5.62978 13.3238 5.65072 13.3978 5.68664C13.4718 5.72255 13.538 5.77271 13.5926 5.83426C13.6471 5.89581 13.689 5.96754 13.7158 6.04531C13.7426 6.12309 13.7538 6.20539 13.7487 6.2875L13.1237 16.9125C13.1204 16.9956 13.1005 17.0771 13.0653 17.1524C13.0301 17.2277 12.9802 17.2952 12.9185 17.3509C12.8569 17.4067 12.7847 17.4496 12.7063 17.4771C12.6279 17.5047 12.5447 17.5163 12.4617 17.5113C12.3788 17.5063 12.2976 17.4848 12.2231 17.4481C12.1485 17.4113 12.082 17.3601 12.0275 17.2974C11.973 17.2346 11.9315 17.1616 11.9055 17.0827C11.8796 17.0037 11.8696 16.9204 11.8763 16.8375L12.5013 6.2125C12.5109 6.04709 12.5859 5.89229 12.7096 5.78212C12.8334 5.67195 12.9958 5.61544 13.1613 5.625ZM10 5.625C10.1658 5.625 10.3247 5.69085 10.4419 5.80806C10.5592 5.92527 10.625 6.08424 10.625 6.25V16.875C10.625 17.0408 10.5592 17.1997 10.4419 17.3169C10.3247 17.4342 10.1658 17.5 10 17.5C9.83424 17.5 9.67527 17.4342 9.55806 17.3169C9.44085 17.1997 9.375 17.0408 9.375 16.875V6.25C9.375 6.08424 9.44085 5.92527 9.55806 5.80806C9.67527 5.69085 9.83424 5.625 10 5.625Z"
                fill="white"
              />
            </svg>
            <p>
              {deleteQuote.isLoading ? (
                <Oval
                  height={20}
                  width={20}
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
                t("quote.editQuote.delete")
              )}
            </p>
          </div>
          <h4> {t("quote.editQuote.title")}</h4>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={style.closeIcon}
            onClick={() => {
              navigate(`/dashboard/movie-list/movie/movie=${data?.data.movie}`);
            }}
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
              style={{
                backgroundImage: `url(http://localhost:3001/uploads/images/${data?.data.quoteAuthorData?.image})`,
              }}
            >
              {" "}
              {isLoading && (
                <RotatingLines
                  strokeColor="grey"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="30"
                  visible={true}
                />
              )}
            </div>
            <h4>{data?.data.quoteAuthorData.name}</h4>
          </article>
        </section>

        <section className={style.forms}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={`${style.input} ${style.desc} `}>
              <span>Eng</span>
              <input
                type="textarea"
                placeholder={`Enter quote`}
                id="quoteTextsss"
                value={updatedText}
                {...register("editQuoteText", {
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
            {errors.editQuoteText && (
              <p className={`${style.inpErr}`}>
                {errors.editQuoteText.message}
              </p>
            )}

            <div className={`${style.input}  ${style.desc}`}>
              <span>ქარ</span>
              <input
                type="textarea"
                placeholder={`დაწერეთ ციტატა`}
                id="textGeoInp"
                value={updatedTextGeo}
                {...register("editQuoteTextGeo", {
                  required: {
                    value: true,
                    message: "Fill field",
                  },
                  minLength: {
                    value: 3,
                    message: "minimum length 3",
                  },
                  pattern: {
                    value: /^[\u10A0-\u10FF_ ]*$/,
                    message: "მხოლოდ ქართული ასოები !",
                  },
                })}
              />
            </div>
            {errors.editQuoteTextGeo && (
              <p className={`${style.inpErr}`}>
                {errors.editQuoteTextGeo.message}
              </p>
            )}

            <div className={style.photoQuot}>
              {isLoading ? (
                <RotatingLines
                  strokeColor="grey"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="80"
                  visible={true}
                />
              ) : (
                <img
                  src={
                    curImg
                      ? curImg
                      : `http://localhost:3001/uploads/images/${data?.data.quote.image}`
                  }
                  alt="img"
                />
              )}
              <FileUploader
                handleChange={handleChange}
                name="image"
                maxSize="1"
                fileTypes={fileTypes}
                classes={style.dargNdrop}
                label={t("quote.editQuote.upload")}
              />
            </div>
            <button type="submit" className={style.addBtn}>
              {t("quote.editQuote.save")}
            </button>
          </form>
          {errorUser && <p className={style.errMsg}>{errorUser}</p>}
          {succ && <p className={style.scrMsg}>{succ}</p>}
        </section>
      </article>
    </section>
  );
};

export default EditQuote;
