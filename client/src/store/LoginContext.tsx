import React, { useState, createContext } from "react";
import Cookies from "universal-cookie";
const cookies = new Cookies();


type contxCreate = {
  login: boolean | string;
  setLogin: React.Dispatch<React.SetStateAction<boolean | string>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
};

const userName= cookies.get("user")

type contxProv = {
  children: React.ReactNode;
};

export const loginContx = createContext<contxCreate>({
  login: "",
  setLogin: () => {},
  username: userName,
  setUsername: () => "",
  email: "",
  setEmail: () => "",
});

export const LoginProvider: React.FC<contxProv> = ({ children }) => {
  const [login, setLogin] = useState<boolean | string>("");
  const [username, setUsername] = useState<string>(userName);
  const [email, setEmail] = useState<string>("");

  return (
    <loginContx.Provider
      value={{
        setLogin,
        login,
        setUsername,
        username,
        email,
        setEmail,
      }}
    >
      {children}
    </loginContx.Provider>
  );
};
