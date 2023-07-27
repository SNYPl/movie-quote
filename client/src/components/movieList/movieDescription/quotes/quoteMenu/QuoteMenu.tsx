import React from "react";
import style from "./style.module.css";
import axios, { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { Oval } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface quoteMode {
  id: string;
}

const Menu: React.FC<quoteMode> = ({ id }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { mutate, isLoading } = useMutation(
    (movie: any) => {
      return axios.delete(
        "http://localhost:3001/movie-list/movie/delete-quote",
        {
          data: { id: id },
          withCredentials: true,
        }
      );
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries("getMovieQuotes");
        queryClient.invalidateQueries("quotesInfo");
      },
      onError: (err) => {
        if (err instanceof AxiosError) {
          // setErr(err?.response?.data.message);
        }
      },
    }
  );

  const deleteQuoteHandler = () => {
    mutate({ id: id });
  };

  return (
    <section className={style.menu}>
      <div className={`${style.menuItem} ${style.view}`}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 10C20 10 16.25 3.125 10 3.125C3.75 3.125 0 10 0 10C0 10 3.75 16.875 10 16.875C16.25 16.875 20 10 20 10ZM1.46625 10C2.07064 9.0814 2.7658 8.22586 3.54125 7.44625C5.15 5.835 7.35 4.375 10 4.375C12.65 4.375 14.8487 5.835 16.46 7.44625C17.2354 8.22586 17.9306 9.0814 18.535 10C18.4625 10.1087 18.3825 10.2288 18.2913 10.36C17.8725 10.96 17.2537 11.76 16.46 12.5538C14.8487 14.165 12.6487 15.625 10 15.625C7.35 15.625 5.15125 14.165 3.54 12.5538C2.76456 11.7741 2.07065 10.9186 1.46625 10Z"
            fill="white"
          />
          <path
            d="M10 6.875C9.1712 6.875 8.37634 7.20424 7.79029 7.79029C7.20424 8.37634 6.875 9.1712 6.875 10C6.875 10.8288 7.20424 11.6237 7.79029 12.2097C8.37634 12.7958 9.1712 13.125 10 13.125C10.8288 13.125 11.6237 12.7958 12.2097 12.2097C12.7958 11.6237 13.125 10.8288 13.125 10C13.125 9.1712 12.7958 8.37634 12.2097 7.79029C11.6237 7.20424 10.8288 6.875 10 6.875ZM5.625 10C5.625 8.83968 6.08594 7.72688 6.90641 6.90641C7.72688 6.08594 8.83968 5.625 10 5.625C11.1603 5.625 12.2731 6.08594 13.0936 6.90641C13.9141 7.72688 14.375 8.83968 14.375 10C14.375 11.1603 13.9141 12.2731 13.0936 13.0936C12.2731 13.9141 11.1603 14.375 10 14.375C8.83968 14.375 7.72688 13.9141 6.90641 13.0936C6.08594 12.2731 5.625 11.1603 5.625 10Z"
            fill="white"
          />
        </svg>

        <Link to={`/dashboard/movie-list/quote/quote=${id}`}>
          <h4>{t("quote.view")}</h4>
        </Link>
      </div>
      <div
        className={`${style.menuItem} ${style.edit}`}
        // onClick={() => setQuoteMode("editQUote")}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_20601_29352)">
            <path
              d="M15.1825 0.183617C15.2406 0.125413 15.3095 0.0792346 15.3855 0.0477266C15.4614 0.0162185 15.5428 0 15.625 0C15.7072 0 15.7886 0.0162185 15.8645 0.0477266C15.9405 0.0792346 16.0094 0.125413 16.0675 0.183617L19.8175 3.93362C19.8757 3.99167 19.9219 4.06064 19.9534 4.13658C19.9849 4.21251 20.0011 4.29391 20.0011 4.37612C20.0011 4.45833 19.9849 4.53973 19.9534 4.61566C19.9219 4.69159 19.8757 4.76056 19.8175 4.81862L7.3175 17.3186C7.25752 17.3782 7.18608 17.425 7.1075 17.4561L0.857502 19.9561C0.743922 20.0016 0.619497 20.0127 0.499651 19.9881C0.379806 19.9635 0.269811 19.9043 0.183303 19.8178C0.0967945 19.7313 0.0375777 19.6213 0.0129933 19.5015C-0.011591 19.3816 -0.000461602 19.2572 0.0450017 19.1436L2.545 12.8936C2.57616 12.815 2.62294 12.7436 2.6825 12.6836L15.1825 0.183617ZM14.0088 3.12612L16.875 5.99237L18.4913 4.37612L15.625 1.50987L14.0088 3.12612ZM15.9913 6.87612L13.125 4.00987L5 12.1349V12.5011H5.625C5.79076 12.5011 5.94973 12.567 6.06694 12.6842C6.18415 12.8014 6.25 12.9604 6.25 13.1261V13.7511H6.875C7.04076 13.7511 7.19973 13.817 7.31694 13.9342C7.43415 14.0514 7.5 14.2104 7.5 14.3761V15.0011H7.86625L15.9913 6.87612ZM3.79 13.3449L3.6575 13.4774L1.7475 18.2536L6.52375 16.3436L6.65625 16.2111C6.53703 16.1666 6.43424 16.0867 6.36165 15.9821C6.28905 15.8776 6.2501 15.7534 6.25 15.6261V15.0011H5.625C5.45924 15.0011 5.30027 14.9353 5.18306 14.8181C5.06585 14.7008 5 14.5419 5 14.3761V13.7511H4.375C4.24773 13.751 4.12351 13.7121 4.01897 13.6395C3.91443 13.5669 3.83455 13.4641 3.79 13.3449Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_20601_29352">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>

        <Link to={`/dashboard/movie-list/quote/quote=${id}/edit-quote`}>
          <h4>{t("quote.edit")}</h4>
        </Link>
      </div>

      <div
        className={`${style.menuItem} ${style.delete}`}
        onClick={deleteQuoteHandler}
      >
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

        <h4>
          {isLoading ? (
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
            t("quote.delete")
          )}
        </h4>
      </div>
    </section>
  );
};

export default Menu;
