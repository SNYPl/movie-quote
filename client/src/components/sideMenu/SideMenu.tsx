import React, { useContext, useEffect, useState } from "react";
import style from "./style.module.css";
import { DashbCtrx } from "../../store/dashboardContext";
import { NavLink, useLocation } from "react-router-dom";
import { loginContx } from "../../store/LoginContext";
import { RotatingLines } from "react-loader-spinner";

const SideMenu: React.FC = () => {
  const { profileImageUpdated } = useContext(DashbCtrx);
  const { username } = useContext(loginContx);

  let location = useLocation();

  const defaultNav =
    location.pathname === "/dashboard"
      ? "newsFeed"
      : location.pathname === "/dashboard/profile"
      ? "profileBorder"
      : location.pathname === "/dashboard/movie-list"
      ? "movieList"
      : "";

  const [dashBoardNav, setDashboardNav] = useState(defaultNav);

  return (
    <section className={style.menu}>
      <section className={style.profile}>
        <div
          className={`${style.profileImg} ${
            dashBoardNav === "profileBorder" && style.profileBorder
          }`}
          style={{ backgroundImage: `url(${profileImageUpdated})` }}
        >
          {profileImageUpdated === "loading" ? (
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="40"
              visible={true}
            />
          ) : (
            ""
          )}
        </div>
        <article className={`${style.profileInfo} `}>
          <h3>{username}</h3>
          <NavLink
            to="/dashboard/profile"
            onClick={(e: any) => {
              setDashboardNav("profileBorder");
            }}
          >
            Edit your profile
          </NavLink>
        </article>
      </section>
      <section
        className={`${style.menuSection} ${
          dashBoardNav === "newsFeed" && style.newsFeed
        }`}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.00029 26.9996V13.9996H6.00029V26.9996C6.00029 27.2649 6.10564 27.5192 6.29318 27.7067C6.48072 27.8943 6.73507 27.9996 7.00029 27.9996H25.0003C25.2655 27.9996 25.5199 27.8943 25.7074 27.7067C25.8949 27.5192 26.0003 27.2649 26.0003 26.9996V13.9996H28.0003V26.9996C28.0003 27.7953 27.6842 28.5583 27.1216 29.121C26.559 29.6836 25.7959 29.9996 25.0003 29.9996H7.00029C6.20464 29.9996 5.44158 29.6836 4.87897 29.121C4.31636 28.5583 4.00029 27.7953 4.00029 26.9996ZM26.0003 4.99964V11.9996L22.0003 7.99964V4.99964C22.0003 4.73442 22.1056 4.48007 22.2932 4.29253C22.4807 4.10499 22.7351 3.99964 23.0003 3.99964H25.0003C25.2655 3.99964 25.5199 4.10499 25.7074 4.29253C25.8949 4.48007 26.0003 4.73442 26.0003 4.99964Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.5863 2.99964C14.9613 2.62469 15.47 2.41406 16.0003 2.41406C16.5306 2.41406 17.0392 2.62469 17.4143 2.99964L30.7083 16.2916C30.8961 16.4794 31.0015 16.7341 31.0015 16.9996C31.0015 17.2652 30.8961 17.5199 30.7083 17.7076C30.5205 17.8954 30.2658 18.0009 30.0003 18.0009C29.7347 18.0009 29.4801 17.8954 29.2923 17.7076L16.0003 4.41364L2.70829 17.7076C2.52051 17.8954 2.26584 18.0009 2.00029 18.0009C1.73474 18.0009 1.48006 17.8954 1.29229 17.7076C1.10451 17.5199 0.999023 17.2652 0.999023 16.9996C0.999023 16.7341 1.10451 16.4794 1.29229 16.2916L14.5863 2.99964Z"
            fill="white"
          />
        </svg>
        <NavLink
          to="/dashboard"
          onClick={(e: any) => {
            setDashboardNav("newsFeed");
          }}
        >
          News feed
        </NavLink>
      </section>
      <section
        className={`${style.menuSection} ${
          dashBoardNav === "movieList" && style.movieList
        }`}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_20542_8792)">
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
          </g>
          <defs>
            <clipPath id="clip0_20542_8792">
              <rect width="32" height="32" fill="white" />
            </clipPath>
          </defs>
        </svg>

        <NavLink
          to="/dashboard/movie-list"
          onClick={(e: any) => {
            setDashboardNav("movieList");
          }}
        >
          List of movies
        </NavLink>
      </section>
    </section>
  );
};

export default SideMenu;
