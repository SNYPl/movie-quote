import React, { useState } from "react";
import style from "./style.module.css";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useLocation, useNavigate } from "react-router";
import axios, { AxiosError } from "axios";
import { Link } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { useTranslation } from "react-i18next";

type movie = {
  quotes: string;
  quotesGeo: string;
};

const ViewQuote: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<movie>();
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [commentErr, setCommentErr] = useState("");

  const user = useQuery(
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

  let location = useLocation();
  const quoteId = location.pathname.split("=")[1];
  const { t, i18n } = useTranslation();

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
        queryClient.invalidateQueries("notifications");
        navigate(`/dashboard/movie-list/movie/movie=${res.data.movie}`);
      },
      onError: (err) => {
        if (err instanceof AxiosError) {
          setCommentErr(err?.response?.data.message);
        }
      },
    }
  );

  const deleteQuoteHandler = () => {
    deleteQuote.mutate({ id: quoteId });
  };

  //like quote

  const likeQuote = useMutation(
    (quoteLike: any) => {
      return axios.post(
        `http://localhost:3001/movie-list/quote/quote=${quoteLike.id}/like`,
        quoteLike,
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
        queryClient.invalidateQueries("notifications");
        queryClient.refetchQueries("getQuote");
      },
      onError: (err) => {
        if (err instanceof AxiosError) {
          setCommentErr(err?.response?.data.message);
        }
      },
    }
  );

  const likeQuoteHandler = () => {
    if (likeQuote.isLoading) {
      return;
    }
    likeQuote.mutate({ id: quoteId });
  };

  // comment add

  const commentAdd = useMutation(
    (quoteComment: any) => {
      return axios.post(
        `http://localhost:3001/movie-list/quote/quote=${quoteComment.id}/add-comment`,
        quoteComment,
        {
          headers: {
            "Content-Type": "application/json; charset=UTF-9",
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
        queryClient.invalidateQueries("notifications");
        setComment("");
      },
      onError: (err) => {
        if (err instanceof AxiosError) {
          setCommentErr(err?.response?.data.message);
        }
      },
    }
  );

  const commentAddHandler = (e: any) => {
    if (e.keyCode === 13 && comment) {
      commentAdd.mutate({ id: quoteId, comment: comment });
    } else if (e.keyCode === 13 && !comment) {
      setCommentErr("input is empty");
    }
  };

  return (
    <section className={style.overlay}>
      <article
        className={style.popUp}
        style={{ border: isLoading ? "none" : "" }}
      >
        {isLoading ? (
          <TailSpin
            height="200"
            width="100"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass={style.wrapperLoader}
            visible={true}
          />
        ) : (
          <>
            <div className={style.title}>
              {user?.data?.data.username ===
                data?.data.quoteAuthorData.name && (
                <div className={style.titleIcon}>
                  <Link
                    to={`/dashboard/movie-list/quote/quote=${quoteId}/edit-quote`}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_20589_9013)">
                        <path
                          d="M15.1825 0.183617C15.2406 0.125413 15.3095 0.0792346 15.3855 0.0477266C15.4614 0.0162185 15.5428 0 15.625 0C15.7072 0 15.7886 0.0162185 15.8645 0.0477266C15.9405 0.0792346 16.0094 0.125413 16.0675 0.183617L19.8175 3.93362C19.8757 3.99167 19.9219 4.06064 19.9534 4.13658C19.9849 4.21251 20.0011 4.29391 20.0011 4.37612C20.0011 4.45833 19.9849 4.53973 19.9534 4.61566C19.9219 4.69159 19.8757 4.76056 19.8175 4.81862L7.3175 17.3186C7.25752 17.3782 7.18608 17.425 7.1075 17.4561L0.857502 19.9561C0.743922 20.0016 0.619497 20.0127 0.499651 19.9881C0.379806 19.9635 0.269811 19.9043 0.183303 19.8178C0.0967945 19.7313 0.0375777 19.6213 0.0129933 19.5015C-0.011591 19.3816 -0.000461602 19.2572 0.0450017 19.1436L2.545 12.8936C2.57616 12.815 2.62294 12.7436 2.6825 12.6836L15.1825 0.183617ZM14.0088 3.12612L16.875 5.99237L18.4913 4.37612L15.625 1.50987L14.0088 3.12612ZM15.9913 6.87612L13.125 4.00987L5 12.1349V12.5011H5.625C5.79076 12.5011 5.94973 12.567 6.06694 12.6842C6.18415 12.8014 6.25 12.9604 6.25 13.1261V13.7511H6.875C7.04076 13.7511 7.19973 13.817 7.31694 13.9342C7.43415 14.0514 7.5 14.2104 7.5 14.3761V15.0011H7.86625L15.9913 6.87612ZM3.79 13.3449L3.6575 13.4774L1.7475 18.2536L6.52375 16.3436L6.65625 16.2111C6.53703 16.1666 6.43424 16.0867 6.36165 15.9821C6.28905 15.8776 6.2501 15.7534 6.25 15.6261V15.0011H5.625C5.45924 15.0011 5.30027 14.9353 5.18306 14.8181C5.06585 14.7008 5 14.5419 5 14.3761V13.7511H4.375C4.24773 13.751 4.12351 13.7121 4.01897 13.6395C3.91443 13.5669 3.83455 13.4641 3.79 13.3449Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_20589_9013">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </Link>
                  <div className={style.hXaz}></div>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={deleteQuoteHandler}
                  >
                    <path
                      d="M8.125 1.25H11.875C12.0408 1.25 12.1997 1.31585 12.3169 1.43306C12.4342 1.55027 12.5 1.70924 12.5 1.875V3.125H7.5V1.875C7.5 1.70924 7.56585 1.55027 7.68306 1.43306C7.80027 1.31585 7.95924 1.25 8.125 1.25ZM13.75 3.125V1.875C13.75 1.37772 13.5525 0.900805 13.2008 0.549175C12.8492 0.197544 12.3723 0 11.875 0L8.125 0C7.62772 0 7.15081 0.197544 6.79917 0.549175C6.44754 0.900805 6.25 1.37772 6.25 1.875V3.125H3.1325C3.12833 3.12496 3.12417 3.12496 3.12 3.125H1.875C1.70924 3.125 1.55027 3.19085 1.43306 3.30806C1.31585 3.42527 1.25 3.58424 1.25 3.75C1.25 3.91576 1.31585 4.07473 1.43306 4.19194C1.55027 4.30915 1.70924 4.375 1.875 4.375H2.5475L3.61375 17.7C3.66403 18.3265 3.94844 18.9111 4.41034 19.3373C4.87224 19.7635 5.47774 20.0001 6.10625 20H13.8937C14.5223 20.0001 15.1278 19.7635 15.5897 19.3373C16.0516 18.9111 16.336 18.3265 16.3863 17.7L17.4525 4.375H18.125C18.2908 4.375 18.4497 4.30915 18.5669 4.19194C18.6842 4.07473 18.75 3.91576 18.75 3.75C18.75 3.58424 18.6842 3.42527 18.5669 3.30806C18.4497 3.19085 18.2908 3.125 18.125 3.125H16.8813C16.8771 3.12496 16.8729 3.12496 16.8687 3.125H13.75ZM16.1975 4.375L15.14 17.6C15.1149 17.9132 14.9727 18.2055 14.7417 18.4186C14.5108 18.6318 14.208 18.7501 13.8937 18.75H6.10625C5.792 18.7501 5.48925 18.6318 5.2583 18.4186C5.02735 18.2055 4.88514 17.9132 4.86 17.6L3.8025 4.375H16.1975ZM6.83875 5.625C7.00417 5.61544 7.16661 5.67195 7.29037 5.78212C7.41413 5.89229 7.48908 6.04709 7.49875 6.2125L8.12375 16.8375C8.13032 17.001 8.07252 17.1605 7.96277 17.2818C7.85302 17.4032 7.70007 17.4766 7.53676 17.4865C7.37345 17.4963 7.2128 17.4417 7.0893 17.3344C6.96581 17.227 6.88932 17.0756 6.87625 16.9125L6.25 6.2875C6.24493 6.20539 6.25611 6.12309 6.28291 6.04531C6.30972 5.96754 6.35161 5.89581 6.40619 5.83426C6.46077 5.77271 6.52697 5.72255 6.60098 5.68664C6.675 5.65072 6.75537 5.62978 6.8375 5.625H6.83875ZM13.1613 5.625C13.2434 5.62978 13.3238 5.65072 13.3978 5.68664C13.4718 5.72255 13.538 5.77271 13.5926 5.83426C13.6471 5.89581 13.689 5.96754 13.7158 6.04531C13.7426 6.12309 13.7538 6.20539 13.7487 6.2875L13.1237 16.9125C13.1204 16.9956 13.1005 17.0771 13.0653 17.1524C13.0301 17.2277 12.9802 17.2952 12.9185 17.3509C12.8569 17.4067 12.7847 17.4496 12.7063 17.4771C12.6279 17.5047 12.5447 17.5163 12.4617 17.5113C12.3788 17.5063 12.2976 17.4848 12.2231 17.4481C12.1485 17.4113 12.082 17.3601 12.0275 17.2974C11.973 17.2346 11.9315 17.1616 11.9055 17.0827C11.8796 17.0037 11.8696 16.9204 11.8763 16.8375L12.5013 6.2125C12.5109 6.04709 12.5859 5.89229 12.7096 5.78212C12.8334 5.67195 12.9958 5.61544 13.1613 5.625ZM10 5.625C10.1658 5.625 10.3247 5.69085 10.4419 5.80806C10.5592 5.92527 10.625 6.08424 10.625 6.25V16.875C10.625 17.0408 10.5592 17.1997 10.4419 17.3169C10.3247 17.4342 10.1658 17.5 10 17.5C9.83424 17.5 9.67527 17.4342 9.55806 17.3169C9.44085 17.1997 9.375 17.0408 9.375 16.875V6.25C9.375 6.08424 9.44085 5.92527 9.55806 5.80806C9.67527 5.69085 9.83424 5.625 10 5.625Z"
                      fill="white"
                    />
                  </svg>
                </div>
              )}
              <h4>{t("quote.view")}</h4>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={style.closeIcon}
                onClick={() =>
                  navigate(
                    `/dashboard/movie-list/movie/movie=${data?.data.movie}`
                  )
                }
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
                    backgroundImage: `url(${data?.data.quoteAuthorData.image})`,
                  }}
                ></div>
                <h4>{data?.data.quoteAuthorData.name}</h4>
              </article>
            </section>
            <section className={style.forms}>
              <form>
                <div className={`${style.input} ${style.desc} `}>
                  <span>Eng</span>
                  <input
                    type="textarea"
                    placeholder="Quote in English."
                    id="description"
                    value={data?.data.quote.text}
                    {...register("quotes", {
                      disabled: true,
                    })}
                  />
                </div>

                <div className={`${style.input}  ${style.desc}`}>
                  <span>ქარ</span>
                  <input
                    type="textarea"
                    placeholder="ციტატა ქართულ ენაზე"
                    id="descriptionGeo"
                    value={data?.data.quote.textGeo}
                    {...register("quotesGeo", {
                      disabled: true,
                    })}
                  />
                </div>

                <div className={style.photoQuot}>
                  <img src={data?.data.quote.image} alt="img" />
                </div>
                <article className={style.reactions}>
                  <div className={style.commentsCount}>
                    <p>{data?.data.quote.comments.length}</p>
                    <svg
                      width="32"
                      height="31"
                      viewBox="0 0 32 31"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M28 2C28.5304 2 29.0391 2.21071 29.4142 2.58579C29.7893 2.96086 30 3.46957 30 4V20C30 20.5304 29.7893 21.0391 29.4142 21.4142C29.0391 21.7893 28.5304 22 28 22H23C22.379 22 21.7666 22.1446 21.2111 22.4223C20.6557 22.7 20.1726 23.1032 19.8 23.6L16 28.666L12.2 23.6C11.8274 23.1032 11.3443 22.7 10.7889 22.4223C10.2334 22.1446 9.62098 22 9 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H28ZM4 0C2.93913 0 1.92172 0.421427 1.17157 1.17157C0.421427 1.92172 0 2.93913 0 4L0 20C0 21.0609 0.421427 22.0783 1.17157 22.8284C1.92172 23.5786 2.93913 24 4 24H9C9.31049 24 9.61672 24.0723 9.89443 24.2111C10.1721 24.35 10.4137 24.5516 10.6 24.8L14.4 29.866C14.5863 30.1144 14.8279 30.316 15.1056 30.4549C15.3833 30.5937 15.6895 30.666 16 30.666C16.3105 30.666 16.6167 30.5937 16.8944 30.4549C17.1721 30.316 17.4137 30.1144 17.6 29.866L21.4 24.8C21.5863 24.5516 21.8279 24.35 22.1056 24.2111C22.3833 24.0723 22.6895 24 23 24H28C29.0609 24 30.0783 23.5786 30.8284 22.8284C31.5786 22.0783 32 21.0609 32 20V4C32 2.93913 31.5786 1.92172 30.8284 1.17157C30.0783 0.421427 29.0609 0 28 0L4 0Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <div className={style.likes}>
                    <p>{data?.data.quote.likes.length}</p>
                    <svg
                      width="32"
                      height="30"
                      viewBox="0 0 32 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={likeQuoteHandler}
                    >
                      <path
                        d="M15.9998 5.4961L14.5658 4.0221C11.1998 0.562097 5.02779 1.7561 2.79979 6.1061C1.75379 8.1521 1.51779 11.1061 3.42779 14.8761C5.26779 18.5061 9.09579 22.8541 15.9998 27.5901C22.9038 22.8541 26.7298 18.5061 28.5718 14.8761C30.4818 11.1041 30.2478 8.1521 29.1998 6.1061C26.9718 1.7561 20.7998 0.560097 17.4338 4.0201L15.9998 5.4961ZM15.9998 30.0001C-14.6662 9.7361 6.55779 -6.0799 15.6478 2.2861C15.7678 2.3961 15.8858 2.5101 15.9998 2.6281C16.1126 2.5102 16.2301 2.39678 16.3518 2.2881C25.4398 -6.0839 46.6658 9.7341 15.9998 30.0001Z"
                        fill={data?.data.likedQuote ? "green" : "white"}
                      />
                    </svg>
                  </div>
                </article>

                <section className={style.comments}>
                  {data?.data.quote.comments.map((el: any) => (
                    <article className={style.comment}>
                      <div
                        className={style.commentPhoto}
                        style={{
                          backgroundImage: `url(${el.commentAuthor.image})`,
                        }}
                      ></div>
                      <div className={style.commentInfo}>
                        <h4>{el.commentAuthor.username}</h4>
                        <p>{el.comment}</p>
                      </div>
                    </article>
                  ))}
                </section>
                <section className={style.commentWrite}>
                  <div
                    className={style.writeAuthorPhoto}
                    style={{
                      backgroundImage: `url(${user.data?.data.image})`,
                    }}
                  ></div>
                  <input
                    type="text"
                    placeholder={t("quote.commentPlh")}
                    value={comment}
                    onChange={(e) => {
                      setComment(e.target.value);
                      if (!comment) {
                        setCommentErr("");
                      }
                    }}
                    onKeyUp={commentAddHandler}
                  />
                </section>
              </form>
              {commentErr && <p className={style.commentError}>{commentErr}</p>}
            </section>
          </>
        )}
      </article>
    </section>
  );
};

export default ViewQuote;
