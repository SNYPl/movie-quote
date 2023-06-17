import React, { useState, useContext } from "react";
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
import { useLocation } from "react-router-dom";
import { signUpCtrx } from "../../store/signUpContx";

const Landing: React.FC = () => {
  let location = useLocation();
  const path: string = location.pathname;
  const includePath: boolean = path.includes("verify");
  const [verifyThanksPage, setVerifyThanksPage] =
    useState<boolean>(includePath);

  const { userMode, setUserMode } = useContext(signUpCtrx);

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

  return (
    // <section className={style.containerScroll}>
    <>
      {userMode === "loginModal" && (
        <PopUpWrapper setVerifyThanksPage={setVerifyThanksPage}>
          <SignIn />
        </PopUpWrapper>
      )}
      {userMode === "signUpModal" || verifyThanksPage ? (
        <SignUp
          pathName={verifyThanksPage}
          setVerifyThanksPage={setVerifyThanksPage}
        />
      ) : (
        ""
      )}

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
      {landingInfo.map((item) => (
        <LandingMovie
          mainTitle={item.mainTitle}
          title={item.title}
          img={item.img}
        />
      ))}
    </>
    // </section>
  );
};

export default Landing;
