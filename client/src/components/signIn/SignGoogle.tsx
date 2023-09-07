import React, { useContext, useEffect, useState } from "react";
import style from "./send.module.css";
import axios from "../../helper/axios";
import Cookies from "universal-cookie";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router";

const GoogleSignSuccess: React.FC = () => {
  const location = useLocation();
  const cookies = new Cookies();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery(
    "googleSuccess",
    () =>
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/google/success`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }),
    { refetchOnWindowFocus: false }
  );

  useEffect(() => {
    if (token && data?.status === 200) {
      const expiration = new Date();

      expiration.setHours(expiration.getHours() + 3);
      cookies.set("token", token, {
        path: "/",
        expires: expiration,
      });
      cookies.set("isLoggedIn", "true", {
        path: "/",
        expires: expiration,
      });
      navigate("/dashboard");
    }
  }, [token, data]);

  return (
    <div className={style.emailSent}>
      <p>redirecting......</p>
    </div>
  );
};

export default GoogleSignSuccess;
