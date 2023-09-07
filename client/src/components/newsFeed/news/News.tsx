import React, { useState } from "react";
import style from "./style.module.css";
import { useMutation, useQueryClient } from "react-query";
import axios, { AxiosError } from "axios";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Cookies from "universal-cookie";

interface quote {
  quote: any;
}

const News: React.FC<quote> = ({ quote }) => {
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();
  const [commentErr, setCommentErr] = useState("");
  const { t, i18n } = useTranslation();
  const cookies = new Cookies();
  const token = cookies.get("token");
  //like quote

  const likeQuote = useMutation(
    (quoteLike: any) => {
      return axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/movie-list/quote/quote=${quoteLike.id}/like`,
        quoteLike,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": process.env.ACCESS_ALLOW_URL,
            "Access-Control-Allow-Credentials": true,
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          withCredentials: true,
        }
      );
    },
    {
      onSuccess: async (res) => {
        await queryClient.invalidateQueries("quotesInfo");
        await queryClient.refetchQueries("quotesInfo");
        await queryClient.invalidateQueries("notifications");
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
    likeQuote.mutate({ id: quote.quote._id });
  };

  // comment add

  const commentAdd = useMutation(
    (quoteComment: any) => {
      return axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/movie-list/quote/quote=${quoteComment.id}/add-comment`,
        quoteComment,
        {
          headers: {
            "Content-Type": "application/json; charset=UTF-9",
            "Access-Control-Allow-Origin": process.env.ACCESS_ALLOW_URL,
            "Access-Control-Allow-Credentials": true,
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          withCredentials: true,
        }
      );
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries("quotesInfo");
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
      commentAdd.mutate({ id: quote.quote._id, comment: comment });
    } else if (e.keyCode === 13 && !comment) {
      setCommentErr("input is empty");
    }
  };

  return (
    <section className={style.news}>
      <article className={style.author}>
        <div
          className={style.photo}
          style={{
            backgroundImage:
              quote.quoteAuthor.image &&
              `url(${process.env.REACT_APP_BACKEND_URL}/uploads/images/${quote.quoteAuthor.image})`,
          }}
        ></div>
        <h4>{quote.quoteAuthor.authorName}</h4>
      </article>
      <Link to={`/dashboard/movie-list/quote/quote=${quote.quote._id}`}>
        <p className={style.quote}>
          {i18n.language === "en" ? quote.quote.text : quote.quote.textGeo}. "
          {t("quote.movie")} -{" "}
          <span className={style.quoteMovieName}>
            {" "}
            {i18n.language === "en" ? quote.movie.name : quote.movie.nameGeo}
          </span>
          ." ({quote.movie.year})
        </p>
        <div className={style.newsImg}>
          <img
            src={
              quote.quote.image &&
              `${process.env.REACT_APP_BACKEND_URL}/uploads/images/${quote.quote.image}`
            }
            alt="quoteImg"
          />
        </div>
      </Link>
      <article className={style.reactions}>
        <div className={style.commentsCount}>
          <p>{quote.quote.comments.length}</p>
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
          <p>{quote?.quote?.likes.length}</p>
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
              fill={quote?.liked ? "green" : "white"}
            />
          </svg>
        </div>
      </article>

      <section className={style.comments}>
        {quote.quote.comments.map((el: any, id: any) => (
          <article className={style.comment} key={id}>
            <div
              className={style.commentPhoto}
              style={{
                backgroundImage:
                  el.commentAuthor.image &&
                  `url(${process.env.REACT_APP_BACKEND_URL}/uploads/images/${el.commentAuthor.image})`,
              }}
            ></div>
            <div className={style.commentInfo}>
              <h4>{el.commentAuthor.username}</h4>
              <p>{el.comment}</p>
            </div>
          </article>
        ))}
        ;
      </section>

      <section className={style.commentWrite}>
        <div
          className={style.writeAuthorPhoto}
          style={{
            backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL}/uploads/images/${quote.user.image})`,
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
      {commentErr && <p className={style.commentError}>{commentErr}</p>}
    </section>
  );
};

export default News;
