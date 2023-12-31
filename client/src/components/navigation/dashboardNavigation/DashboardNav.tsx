import React, { useContext, useState } from "react";
import style from "./style.module.css";
import { loginContx } from "../../../store/LoginContext";
import { signUpCtrx } from "../../../store/signUpContx";
import Cookies from "universal-cookie";
import Notifications from "../notifications/Notifications";
import { useQuery } from "react-query";
import axios from "../../../helper/axios";
import { useTranslation } from "react-i18next";

const DashboardNavigation: React.FC = () => {
  const { setLogin } = useContext(loginContx);
  const { setUserMode } = useContext(signUpCtrx);
  const cookies = new Cookies();
  const [not, setNot] = useState(false);
  const { t } = useTranslation();
  const token = cookies.get("token");
  const logout = () => {
    cookies.remove("remember", { path: "/" });
    cookies.remove("token", { path: "/" });
    cookies.remove("isLoggedIn", { path: "/" });

    setUserMode("");
    setLogin(false);
  };

  const { isLoading, error, data } = useQuery(
    "notifications",
    () =>
      axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/dashboard/notifications/quotes`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      ),
    { refetchOnWindowFocus: false }
  );
  const concatenatedNotifications = data?.data.reduce(
    (accumulator: any, currentObject: any) => {
      return accumulator.concat(currentObject.notifications);
    },
    []
  );

  let newNotification = [];
  if (concatenatedNotifications) {
    newNotification =
      concatenatedNotifications
        .reverse()
        .filter((el: any) => el.read === false) || [];
  }

  return (
    <div className={style.navigation}>
      <section className={style.notf}>
        {not && <Notifications data={concatenatedNotifications || []} />}
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => setNot(!not)}
        >
          <g clipPath="url(#clip0_20502_8049)">
            <path
              d="M16 32.0018C17.0609 32.0018 18.0783 31.5803 18.8284 30.8302C19.5786 30.08 20 29.0626 20 28.0017H12C12 29.0626 12.4214 30.08 13.1716 30.8302C13.9217 31.5803 14.9391 32.0018 16 32.0018ZM16 3.83775L14.406 4.15975C12.5979 4.52815 10.9727 5.50996 9.8053 6.93899C8.63795 8.36803 8.0002 10.1565 8 12.0017C8 13.2577 7.732 16.3957 7.082 19.4857C6.762 21.0197 6.33 22.6177 5.756 24.0017H26.244C25.67 22.6177 25.24 21.0217 24.918 19.4857C24.268 16.3957 24 13.2577 24 12.0017C23.9993 10.1569 23.3614 8.36885 22.1941 6.94022C21.0267 5.51159 19.4017 4.53008 17.594 4.16175L16 3.83575V3.83775ZM28.44 24.0017C28.886 24.8957 29.402 25.6037 30 26.0017H2C2.598 25.6037 3.114 24.8957 3.56 24.0017C5.36 20.4017 6 13.7618 6 12.0017C6 7.16175 9.44 3.12175 14.01 2.19975C13.9821 1.92166 14.0128 1.6408 14.1001 1.3753C14.1874 1.10979 14.3293 0.865529 14.5168 0.658266C14.7043 0.451003 14.9332 0.285339 15.1887 0.171959C15.4441 0.058579 15.7205 0 16 0C16.2795 0 16.5559 0.058579 16.8113 0.171959C17.0668 0.285339 17.2957 0.451003 17.4832 0.658266C17.6707 0.865529 17.8126 1.10979 17.8999 1.3753C17.9872 1.6408 18.0179 1.92166 17.99 2.19975C20.2506 2.65955 22.2828 3.88647 23.7425 5.67275C25.2022 7.45903 25.9997 9.6949 26 12.0017C26 13.7618 26.64 20.4017 28.44 24.0017Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_20502_8049">
              <rect width="32" height="32" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <div
          className={style.circle}
          style={{ display: newNotification.length ? "flex" : "none" }}
        >
          {newNotification.length ? newNotification.length : ""}
        </div>
      </section>
      <button className={style.lgtBtn} onClick={logout}>
        {t("sideNav.logout")}
      </button>
    </div>
  );
};

export default DashboardNavigation;
