import React, { useState } from "react";
import style from "./style.module.css";

const WriteNew: React.FC = () => {
  const [focused, setFocused] = useState("button");

  return (
    <div className={style.writeNew}>
      <button
        className={`${focused === "button" ? style.writeBtn : style.smWidth}`}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23.253 2.91059C23.3931 3.05117 23.4718 3.24158 23.4718 3.44009C23.4718 3.6386 23.3931 3.82901 23.253 3.96959L21.6885 5.53559L18.6885 2.53559L20.253 0.96959C20.3936 0.828987 20.5844 0.75 20.7832 0.75C20.9821 0.75 21.1729 0.828987 21.3135 0.96959L23.253 2.90909V2.91059ZM20.628 6.59459L17.628 3.59459L7.4085 13.8156C7.32594 13.8981 7.26379 13.9988 7.227 14.1096L6.0195 17.7306C5.9976 17.7966 5.99449 17.8674 6.01052 17.9351C6.02655 18.0028 6.06108 18.0646 6.11026 18.1138C6.15944 18.163 6.22133 18.1975 6.28901 18.2136C6.35668 18.2296 6.42749 18.2265 6.4935 18.2046L10.1145 16.9971C10.2251 16.9607 10.3258 16.8991 10.4085 16.8171L20.628 6.59459Z"
            fill="white"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1.5 20.2506C1.5 20.8473 1.73705 21.4196 2.15901 21.8416C2.58097 22.2635 3.15326 22.5006 3.75 22.5006H20.25C20.8467 22.5006 21.419 22.2635 21.841 21.8416C22.2629 21.4196 22.5 20.8473 22.5 20.2506V11.2506C22.5 11.0517 22.421 10.8609 22.2803 10.7203C22.1397 10.5796 21.9489 10.5006 21.75 10.5006C21.5511 10.5006 21.3603 10.5796 21.2197 10.7203C21.079 10.8609 21 11.0517 21 11.2506V20.2506C21 20.4495 20.921 20.6403 20.7803 20.7809C20.6397 20.9216 20.4489 21.0006 20.25 21.0006H3.75C3.55109 21.0006 3.36032 20.9216 3.21967 20.7809C3.07902 20.6403 3 20.4495 3 20.2506V3.75059C3 3.55168 3.07902 3.36091 3.21967 3.22026C3.36032 3.07961 3.55109 3.00059 3.75 3.00059H13.5C13.6989 3.00059 13.8897 2.92157 14.0303 2.78092C14.171 2.64027 14.25 2.4495 14.25 2.25059C14.25 2.05168 14.171 1.86091 14.0303 1.72026C13.8897 1.57961 13.6989 1.50059 13.5 1.50059H3.75C3.15326 1.50059 2.58097 1.73764 2.15901 2.1596C1.73705 2.58156 1.5 3.15385 1.5 3.75059V20.2506Z"
            fill="white"
          />
        </svg>
        Write new quote
      </button>
      <div
        className={`${style.searchInp} ${
          focused === "search" ? style.writeBtn : ""
        }`}
      >
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
          placeholder="Enter @ to search movies, Enter # to search quotes "
          onFocus={() => setFocused("search")}
          onBlur={() => setFocused("button")}
          className={`${focused === "search" ? style.writeBtn : ""}`}
        />
      </div>
    </div>
  );
};

export default WriteNew;
