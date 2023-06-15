import React, { useState } from "react";
import style from "./style.module.css";
import PopUpWrapper from "../popUpWrapper/PopUp";
import SignUpForm from "./form/form";
import EmailSent from "./email/email";
import Finish from "./finish/finish";

interface userMode {
  setUserMode: React.Dispatch<React.SetStateAction<string>>;
}

const SignUp: React.FC<userMode> = ({ setUserMode }) => {
  const [signUpMode, setSignUpMode] = useState<string>("form");
  const [userEmail, setUserEmail] = useState<string>("");
  return (
    <PopUpWrapper setUserMode={setUserMode}>
      {signUpMode === "form" && (
        <SignUpForm setSignUpMode={setSignUpMode} setUserEmail={setUserEmail} />
      )}
      {signUpMode === "emailSender" && <EmailSent userEmail={userEmail} />}
    </PopUpWrapper>
  );
};

export default SignUp;
