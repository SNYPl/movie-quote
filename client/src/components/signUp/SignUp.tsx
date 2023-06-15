import React, { useState, useEffect } from "react";
import style from "./style.module.css";
import PopUpWrapper from "../popUpWrapper/PopUp";
import SignUpForm from "./form/form";
import EmailSent from "./email/email";
import Finish from "./finish/finish";

interface userMode {
  setUserMode: React.Dispatch<React.SetStateAction<string>>;
  pathName: boolean;
  setVerifyThanksPage: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUp: React.FC<userMode> = ({
  setUserMode,
  pathName,
  setVerifyThanksPage,
}) => {
  const [signUpMode, setSignUpMode] = useState<string>("form");
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    if (pathName) {
      setSignUpMode("finished");
    }
  }, []);

  return (
    <PopUpWrapper
      setUserMode={setUserMode}
      setVerifyThanksPage={setVerifyThanksPage}
    >
      {signUpMode === "form" && (
        <SignUpForm setSignUpMode={setSignUpMode} setUserEmail={setUserEmail} />
      )}
      {signUpMode === "emailSender" && <EmailSent userEmail={userEmail} />}
      {signUpMode === "finished" && <Finish />}
    </PopUpWrapper>
  );
};

export default SignUp;
