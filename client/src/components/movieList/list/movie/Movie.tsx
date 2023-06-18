import React from "react";
import style from "./style.module.css";
import img from "../../../../assets/img/movie.png";

const Movie: React.FC = () => {
  return (
    <article className={style.movie}>
      <div className={style.movieImg}>
        <img src={img} alt="movie" />
      </div>
      <h5 className={style.movieTitle}>Loki Mobius (2021) </h5>
      <div className={style.commentInfo}>
        <span>5</span>
        <svg
          width="32"
          height="30"
          viewBox="0 0 32 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.356 21.788C5.56359 21.9964 5.72267 22.248 5.82188 22.5249C5.9211 22.8018 5.95801 23.0972 5.93 23.39C5.78944 24.7452 5.52295 26.0843 5.134 27.39C7.924 26.744 9.628 25.996 10.402 25.604C10.841 25.3816 11.3466 25.329 11.822 25.456C13.1849 25.8193 14.5895 26.0022 16 26C23.992 26 30 20.386 30 14C30 7.616 23.992 2 16 2C8.008 2 2 7.616 2 14C2 16.936 3.234 19.66 5.356 21.788ZM4.37 29.598C3.89614 29.6919 3.42074 29.778 2.944 29.856C2.544 29.92 2.24 29.504 2.398 29.132C2.57558 28.7132 2.73835 28.2883 2.886 27.858L2.892 27.838C3.388 26.398 3.792 24.742 3.94 23.2C1.486 20.74 0 17.52 0 14C0 6.268 7.164 0 16 0C24.836 0 32 6.268 32 14C32 21.732 24.836 28 16 28C14.4153 28.0021 12.8372 27.7964 11.306 27.388C10.266 27.914 8.028 28.872 4.37 29.598Z"
            fill="white"
          />
          <path
            d="M14.132 11.52C13.7424 10.9133 13.1664 10.4494 12.4906 10.1981C11.8148 9.94681 11.0757 9.92163 10.3844 10.1264C9.69303 10.3311 9.08682 10.7547 8.65685 11.3335C8.22688 11.9123 7.99638 12.615 8 13.336C8.00036 13.9331 8.16105 14.5191 8.46528 15.0328C8.76952 15.5466 9.20614 15.9692 9.72952 16.2565C10.2529 16.5439 10.8438 16.6854 11.4406 16.6663C12.0374 16.6472 12.6181 16.4682 13.122 16.148C12.86 16.926 12.372 17.756 11.568 18.588C11.4142 18.7471 11.3299 18.9608 11.3336 19.1821C11.3355 19.2917 11.3589 19.3998 11.4025 19.5004C11.4462 19.6009 11.5092 19.6918 11.588 19.768C11.6668 19.8442 11.7598 19.9041 11.8618 19.9443C11.9637 19.9845 12.0726 20.0042 12.1821 20.0024C12.4034 19.9986 12.6142 19.9071 12.768 19.748C15.74 16.668 15.354 13.32 14.132 11.524V11.52ZM22.132 11.52C21.7424 10.9133 21.1664 10.4494 20.4906 10.1981C19.8148 9.94681 19.0757 9.92163 18.3844 10.1264C17.693 10.3311 17.0868 10.7547 16.6569 11.3335C16.2269 11.9123 15.9964 12.615 16 13.336C16.0004 13.9331 16.161 14.5191 16.4653 15.0328C16.7695 15.5466 17.2061 15.9692 17.7295 16.2565C18.2529 16.5439 18.8438 16.6854 19.4406 16.6663C20.0374 16.6472 20.6181 16.4682 21.122 16.148C20.86 16.926 20.372 17.756 19.568 18.588C19.4918 18.6668 19.4319 18.7598 19.3917 18.8618C19.3515 18.9637 19.3318 19.0726 19.3336 19.1821C19.3355 19.2917 19.3589 19.3998 19.4025 19.5004C19.4462 19.6009 19.5092 19.6918 19.588 19.768C19.6668 19.8442 19.7598 19.9041 19.8618 19.9443C19.9637 19.9845 20.0726 20.0042 20.1821 20.0024C20.2917 20.0005 20.3998 19.9771 20.5004 19.9335C20.6009 19.8898 20.6918 19.8268 20.768 19.748C23.74 16.668 23.354 13.32 22.132 11.524V11.52Z"
            fill="white"
          />
        </svg>
      </div>
    </article>
  );
};

export default Movie;