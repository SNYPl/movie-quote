import React, { useContext } from "react";
import style from "./style.module.css";
import PopUpWrapper from "../popUpWrapper/PopUp";
import ForgotEmailCheck from "./email/ForgotEmail";
import SendForgotMail from "./form/ForgotPasswordForm";
import SuccessPassword from "./success/SuccessPassword";
import LinkExpired from "./expired/EmailExpired";
import { signUpCtrx } from "../../store/signUpContx";

const ForgotPass: React.FC = () => {
  const { userMode, setUserMode } = useContext(signUpCtrx);

  return (
    <div className={style.forget}>
      <PopUpWrapper>
        <SendForgotMail />
      </PopUpWrapper>
    </div>
  );
};

export default ForgotPass;
