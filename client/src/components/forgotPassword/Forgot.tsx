import React from "react";
import style from "./style.module.css";
import PopUpWrapper from "../popUpWrapper/PopUp";
import ForgotEmailCheck from "./email/ForgotEmail";
import SendForgotMail from "./form/ForgotPasswordForm";
import SuccessPassword from "./success/SuccessPassword";
import LinkExpired from "./expired/EmailExpired";

const ForgotPass: React.FC = () => {
  return (
    <div className={style.forget}>
      {/* <PopUpWrapper>
        <LinkExpired />
      </PopUpWrapper> */}
    </div>
  );
};

export default ForgotPass;
