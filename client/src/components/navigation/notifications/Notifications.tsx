import React, { useState } from "react";
import style from "./style.module.css";
import { useMutation, useQueryClient } from "react-query";
import axios, { AxiosError } from "axios";

interface notifications {
  data: any | [];
}

const Notifications: React.FC<notifications> = ({ data }) => {
  const queryClient = useQueryClient();
  const [Err, setErr] = useState("");

  const { mutate } = useMutation(
    (readNotf: any) => {
      return axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/dashboard/notifications/quotes/read-all`,
        readNotf,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": process.env.ACCESS_ALLOW_URL,
            "Access-Control-Allow-Credentials": true,
            Accept: "application/json",
          },
          withCredentials: true,
        }
      );
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries("notifications");
      },
      onError: (err) => {
        if (err instanceof AxiosError) {
          setErr(err?.response?.data.message);
        }
      },
    }
  );

  const readAllNotifications = () => {
    mutate("");
  };

  function getTimeDifference(elTime: any) {
    const createdDate = new Date(elTime);
    const currentTime = new Date();
    const timeDifference = Math.floor(
      (currentTime.getTime() - createdDate.getTime()) / (1000 * 60)
    );

    const days = Math.floor(timeDifference / (60 * 24));
    const hours = Math.floor((timeDifference % (60 * 24)) / 60);
    const minutes = timeDifference % 60;

    let time;

    if (days) {
      time = `${days} days ago`;
    } else if (hours) {
      time = `${hours} hour ago`;
    } else {
      time = `${minutes} min ago`;
    }

    return `${time}`;
  }

  return (
    <section className={style.notifications}>
      <div className={style.title}>
        <h4>Notifications</h4>
        <a
          href="#"
          onClick={(e: any) => {
            e.preventDefault();
            readAllNotifications();
          }}
        >
          Mark as all read
        </a>
      </div>

      <article className={style.notfList}>
        {data.map((el: any, id: any) => {
          return (
            <div className={style.notfUser} key={id}>
              <section className={style.user}>
                <div
                  className={style.notUserImg}
                  style={{
                    backgroundImage: `url(${
                      el?.author?.image
                        ? `${process.env.REACT_APP_BACKEND_URL}/uploads/images/` +
                          el?.author?.image
                        : ""
                    })`,
                  }}
                ></div>
                <div className={style.userTitle}>
                  <h4>{el?.author?.name}</h4>
                  {el.action === "comment" ? (
                    <p>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.017 17.841C4.1727 17.9973 4.292 18.186 4.36641 18.3937C4.44082 18.6014 4.46851 18.8229 4.4475 19.0425C4.34208 20.0589 4.14222 21.0632 3.8505 22.0425C5.943 21.558 7.221 20.997 7.8015 20.703C8.13075 20.5362 8.50993 20.4967 8.8665 20.592C9.88865 20.8645 10.9421 21.0017 12 21C17.994 21 22.5 16.7895 22.5 12C22.5 7.212 17.994 3 12 3C6.006 3 1.5 7.212 1.5 12C1.5 14.202 2.4255 16.245 4.017 17.841ZM3.2775 23.6985C2.9221 23.769 2.56555 23.8335 2.208 23.892C1.908 23.94 1.68 23.628 1.7985 23.349C1.93169 23.0349 2.05376 22.7162 2.1645 22.3935L2.169 22.3785C2.541 21.2985 2.844 20.0565 2.955 18.9C1.1145 17.055 0 14.64 0 12C0 6.201 5.373 1.5 12 1.5C18.627 1.5 24 6.201 24 12C24 17.799 18.627 22.5 12 22.5C10.8115 22.5016 9.62788 22.3473 8.4795 22.041C7.6995 22.4355 6.021 23.154 3.2775 23.6985Z"
                          fill="white"
                        />
                        <path
                          d="M10.599 10.14C10.3068 9.68497 9.87482 9.33707 9.36797 9.14859C8.86112 8.96011 8.30678 8.94122 7.78828 9.09478C7.26977 9.24833 6.81512 9.56603 6.49264 10.0001C6.17016 10.4342 5.99729 10.9612 6 11.502C6.00027 11.9498 6.12079 12.3893 6.34896 12.7746C6.57714 13.1599 6.9046 13.4769 7.29714 13.6924C7.68967 13.9079 8.13288 14.014 8.58045 13.9997C9.02803 13.9854 9.46354 13.8512 9.8415 13.611C9.645 14.1945 9.279 14.817 8.676 15.441C8.56063 15.5603 8.4974 15.7206 8.50021 15.8866C8.5016 15.9688 8.51917 16.0499 8.5519 16.1253C8.58464 16.2007 8.63191 16.2689 8.691 16.326C8.7501 16.3831 8.81986 16.4281 8.89632 16.4582C8.97278 16.4884 9.05443 16.5032 9.13661 16.5018C9.30258 16.499 9.46063 16.4303 9.576 16.311C11.805 14.001 11.5155 11.49 10.599 10.143V10.14ZM16.599 10.14C16.3068 9.68497 15.8748 9.33707 15.368 9.14859C14.8611 8.96011 14.3068 8.94122 13.7883 9.09478C13.2698 9.24833 12.8151 9.56603 12.4926 10.0001C12.1702 10.4342 11.9973 10.9612 12 11.502C12.0003 11.9498 12.1208 12.3893 12.349 12.7746C12.5771 13.1599 12.9046 13.4769 13.2971 13.6924C13.6897 13.9079 14.1329 14.014 14.5805 13.9997C15.028 13.9854 15.4635 13.8512 15.8415 13.611C15.645 14.1945 15.279 14.817 14.676 15.441C14.6189 15.5001 14.5739 15.5699 14.5438 15.6463C14.5136 15.7228 14.4988 15.8044 14.5002 15.8866C14.5016 15.9688 14.5192 16.0499 14.5519 16.1253C14.5846 16.2007 14.6319 16.2689 14.691 16.326C14.7501 16.3831 14.8199 16.4281 14.8963 16.4582C14.9728 16.4884 15.0544 16.5032 15.1366 16.5018C15.2188 16.5004 15.2999 16.4828 15.3753 16.4501C15.4507 16.4174 15.5189 16.3701 15.576 16.311C17.805 14.001 17.5155 11.49 16.599 10.143V10.14Z"
                          fill="white"
                        />
                      </svg>
                      commented to your movie quote
                    </p>
                  ) : (
                    <p>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_638_29966)">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M11.9999 1.97108C18.6569 -4.87192 35.3009 7.10258 11.9999 22.5001C-11.3011 7.10408 5.34292 -4.87192 11.9999 1.97108Z"
                            fill="#F3426C"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_638_29966">
                            <rect width="24" height="24" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      Reacted to your quote
                    </p>
                  )}
                </div>
              </section>
              <section className={style.userTime}>
                <h5>{getTimeDifference(el.time)}</h5>
                {!el.read && <p>New</p>}
              </section>
            </div>
          );
        })}
      </article>
    </section>
  );
};

export default Notifications;
