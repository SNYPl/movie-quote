import React, { useState, useEffect, useContext } from "react";
import style from "./style.module.css";
import PopUpWrapper from "../popUpWrapper/PopUp";
import SignUpForm from "./form/form";
import EmailSent from "./email/email";
import Finish from "./finish/finish";
import { signUpCtrx } from "../../store/signUpContx";

interface userMode {
  pathName: boolean;
}

const SignUp: React.FC<userMode> = ({ pathName }) => {
  const [signUpMode, setSignUpMode] = useState<string>("form");
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    if (pathName) {
      setSignUpMode("finished");
    }
  }, []);

  return (
    <PopUpWrapper>
      {signUpMode === "form" && (
        <SignUpForm setSignUpMode={setSignUpMode} setUserEmail={setUserEmail} />
      )}
      {signUpMode === "emailSender" && <EmailSent userEmail={userEmail} />}
      {signUpMode === "finished" && <Finish />}
    </PopUpWrapper>
  );
};

export default SignUp;
