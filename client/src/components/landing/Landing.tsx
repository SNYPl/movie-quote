import React, { useState, useContext, useEffect } from "react";
import style from "./style.module.css";
import LandingMovie from "./landingMovie/LandingMovie";
import Navigation from "../navigation/Navigation";
import LandNavigation from "../navigation/landingNavigation/LandingNav";
import img1 from "../../assets/img/landing/img1.jpg";
import img2 from "../../assets/img/landing/img2.jpg";
import img3 from "../../assets/img/landing/img3.jpg";
import PopUpWrapper from "../popUpWrapper/PopUp";
import SignIn from "../signIn/SignIn";
import SignUp from "../signUp/SignUp";
import ForgetPassword from "../forgotPassword/Forgot";
import { useLocation, useNavigate } from "react-router-dom";
import { signUpCtrx } from "../../store/signUpContx";

import axios from "axios";

const Landing: React.FC = () => {
  let location = useLocation();
  const path: string = location.pathname;
  const includePath: boolean = path.includes("verify");
  const includePathForgot: boolean = path.includes("forgot");
  const {
    userMode,
    setUserMode,
    verifyThanksPage,
    setVerifyThanksPage,
    setForgotPasswordMode,
  } = useContext(signUpCtrx);

  const navigate = useNavigate();

  useEffect(() => {
    if (includePath) {
      setVerifyThanksPage(includePath);
    }

    const getPath = location.pathname.split("=");
    if (includePathForgot) {
      const token = getPath[1];
      const email = getPath[3];

      axios
        .post("http://localhost:3001/forgot/password/:token", { token, email })
        .then((res) => {
          if (res.status === 200) {
            setForgotPasswordMode("step3");
            setUserMode("forgotPassword");
          }
        })
        .catch((err) => {
          if (err.response.data.message === "Invalid token") {
            setForgotPasswordMode("expired");
            setUserMode("forgotPassword");
          } else {
            navigate("/noPass");
          }
        });
    }
  }, [path]);

  const landingInfo = [
    {
      mainTitle: "You have to leave somethig behind to go forward",
      title: "Interstellar, 2014",
      img: img1,
    },
    {
      mainTitle:
        "I think we're just gonna have to be secretly in love with earch other and leave it that",
      title: "The Royal Tenenbaums,2001 ",
      img: img2,
    },
    {
      mainTitle:
        "I think we're just gonna have to be secretly in love with earch other and leave it that",
      title: "The Royal Tenenbaums,2001 ",
      img: img3,
    },
  ];

  console.log(verifyThanksPage)

  return (
    // <section className={style.containerScroll}>
    <>
      {userMode === "loginModal" && (
        <PopUpWrapper>
          <SignIn />
        </PopUpWrapper>
      )}
      {userMode === "signUpModal" || verifyThanksPage ? (
        <SignUp pathName={verifyThanksPage} />
      ) : (
        ""
      )}

      {userMode === "forgotPassword" && <ForgetPassword />}

      <div className={style.landing}>
        <Navigation>
          <LandNavigation />
        </Navigation>
        <section className={style.info}>
          <h2>
            Find any quote in <br /> millions of movie lines
          </h2>
          <button className={style.startBtn}>GET STARTED</button>
        </section>
        <div
          className={style.bgrPhoto}
          style={{ backgroundImage: `url(${img1})` }}
        ></div>
      </div>
      {landingInfo.map((item, index) => (
        <LandingMovie
          mainTitle={item.mainTitle}
          title={item.title}
          img={item.img}
          key={index}
        />
      ))}
    </>
    // </section>
  );
};

export default Landing;
