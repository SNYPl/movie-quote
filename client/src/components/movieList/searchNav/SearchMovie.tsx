import React from "react";
import style from "./style.module.css";
import { useQuery } from "react-query";
import axios from "../../../helper/axios";
import { useTranslation } from "react-i18next";
import Cookies from "universal-cookie";

interface addMovie {
  setAddMovie: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchMovie: React.Dispatch<React.SetStateAction<string>>;
}

const SearchMovie: React.FC<addMovie> = ({ setAddMovie, setSearchMovie }) => {
  const { t, i18n } = useTranslation();
  const cookies = new Cookies();
  const token = cookies.get("token");

  const { isLoading, error, data } = useQuery(
    "moviesList",
    () =>
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/movie-list`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }),
    { refetchOnWindowFocus: false }
  );

  const movieLength = data?.data.movies.length;

  return (
    <section className={style.search}>
      <h2 className={style.title}>
        {t("movieList.list")} ( {t("movieList.total")}{" "}
        <span>{movieLength}</span>)
      </h2>
      <div className={style.addCont}>
        <div className={`${style.searchInp}`}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.6776 12.9296C15.888 11.278 16.4301 9.23025 16.1955 7.19607C15.9609 5.1619 14.9669 3.29131 13.4123 1.95855C11.8578 0.625789 9.85733 -0.0708582 7.81119 0.00798323C5.76505 0.0868247 3.82413 0.93534 2.37673 2.38377C0.929335 3.8322 0.0822089 5.77373 0.0048316 7.81993C-0.0725457 9.86613 0.625532 11.8661 1.95941 13.4197C3.29328 14.9733 5.16458 15.966 7.19892 16.1991C9.23326 16.4323 11.2806 15.8887 12.9314 14.6771H12.9301C12.9676 14.7271 13.0076 14.7746 13.0526 14.8209L17.8651 19.6334C18.0995 19.8679 18.4175 19.9998 18.7491 19.9999C19.0807 20 19.3987 19.8684 19.6333 19.634C19.8678 19.3996 19.9997 19.0817 19.9998 18.7501C19.9999 18.4185 19.8683 18.1004 19.6339 17.8659L14.8214 13.0534C14.7767 13.0081 14.7287 12.9664 14.6776 12.9284V12.9296ZM15.0001 8.12464C15.0001 9.02748 14.8223 9.92147 14.4768 10.7556C14.1313 11.5897 13.6249 12.3476 12.9865 12.986C12.3481 13.6244 11.5902 14.1308 10.7561 14.4763C9.92198 14.8218 9.02798 14.9996 8.12515 14.9996C7.22231 14.9996 6.32831 14.8218 5.4942 14.4763C4.66008 14.1308 3.90219 13.6244 3.26379 12.986C2.62538 12.3476 2.11898 11.5897 1.77347 10.7556C1.42797 9.92147 1.25015 9.02748 1.25015 8.12464C1.25015 6.30127 1.97447 4.55259 3.26379 3.26328C4.5531 1.97397 6.30178 1.24964 8.12515 1.24964C9.94851 1.24964 11.6972 1.97397 12.9865 3.26328C14.2758 4.55259 15.0001 6.30127 15.0001 8.12464Z"
              fill="#CED4DA"
            />
          </svg>

          <input
            type="search"
            placeholder={t("movieList.search")}
            onChange={(e: any) => setSearchMovie(e.target.value)}
          />
        </div>
        <button onClick={() => setAddMovie(true)}>
          <span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_1267_31449)">
                <rect width="16" height="16" fill="white" fillOpacity="0.01" />
                <g clipPath="url(#clip1_1267_31449)">
                  <path
                    d="M13.9995 1C14.2647 1 14.5191 1.10536 14.7066 1.29289C14.8942 1.48043 14.9995 1.73478 14.9995 2V14C14.9995 14.2652 14.8942 14.5196 14.7066 14.7071C14.5191 14.8946 14.2647 15 13.9995 15H1.99951C1.7343 15 1.47994 14.8946 1.2924 14.7071C1.10487 14.5196 0.999512 14.2652 0.999512 14V2C0.999512 1.73478 1.10487 1.48043 1.2924 1.29289C1.47994 1.10536 1.7343 1 1.99951 1H13.9995ZM1.99951 0C1.46908 0 0.960371 0.210714 0.585298 0.585786C0.210225 0.960859 -0.000488281 1.46957 -0.000488281 2V14C-0.000488281 14.5304 0.210225 15.0391 0.585298 15.4142C0.960371 15.7893 1.46908 16 1.99951 16H13.9995C14.5299 16 15.0387 15.7893 15.4137 15.4142C15.7888 15.0391 15.9995 14.5304 15.9995 14V2C15.9995 1.46957 15.7888 0.960859 15.4137 0.585786C15.0387 0.210714 14.5299 0 13.9995 0H1.99951Z"
                    fill="white"
                  />
                  <path
                    d="M7.99951 4C8.13212 4 8.2593 4.05268 8.35307 4.14645C8.44683 4.24021 8.49951 4.36739 8.49951 4.5V7.5H11.4995C11.6321 7.5 11.7593 7.55268 11.8531 7.64645C11.9468 7.74021 11.9995 7.86739 11.9995 8C11.9995 8.13261 11.9468 8.25979 11.8531 8.35355C11.7593 8.44732 11.6321 8.5 11.4995 8.5H8.49951V11.5C8.49951 11.6326 8.44683 11.7598 8.35307 11.8536C8.2593 11.9473 8.13212 12 7.99951 12C7.8669 12 7.73973 11.9473 7.64596 11.8536C7.55219 11.7598 7.49951 11.6326 7.49951 11.5V8.5H4.49951C4.3669 8.5 4.23973 8.44732 4.14596 8.35355C4.05219 8.25979 3.99951 8.13261 3.99951 8C3.99951 7.86739 4.05219 7.74021 4.14596 7.64645C4.23973 7.55268 4.3669 7.5 4.49951 7.5H7.49951V4.5C7.49951 4.36739 7.55219 4.24021 7.64596 4.14645C7.73973 4.05268 7.8669 4 7.99951 4Z"
                    fill="white"
                  />
                </g>
              </g>
              <defs>
                <clipPath id="clip0_1267_31449">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
                <clipPath id="clip1_1267_31449">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </span>
          {t("movieList.add")}
        </button>
      </div>
    </section>
  );
};

export default SearchMovie;
