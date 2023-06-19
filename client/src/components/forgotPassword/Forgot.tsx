import React, { useContext } from "react";
import style from "./style.module.css";
import PopUpWrapper from "../popUpWrapper/PopUp";
import ForgotEmailCheck from "./email/ForgotEmail";
import SendForgotMail from "./form/ForgotPasswordForm";
import SuccessPassword from "./success/SuccessPassword";
import LinkExpired from "./expired/EmailExpired";
import { signUpCtrx } from "../../store/signUpContx";
import ChangePasswordForm from "./changePassword/ChangePassword";

const ForgotPass: React.FC = () => {
  const { forgotPasswordMode } = useContext(signUpCtrx);
  return (
    <div className={style.forget}>
      <PopUpWrapper>
        {forgotPasswordMode === "step1" && <SendForgotMail />}
        {forgotPasswordMode === "step2" && <ForgotEmailCheck />}
        {forgotPasswordMode === "step3" && <ChangePasswordForm />}
        {forgotPasswordMode === "step4" && <SuccessPassword />}
        {forgotPasswordMode === "expired" && <LinkExpired />}
      </PopUpWrapper>
    </div>
  );
};

export default ForgotPass;
