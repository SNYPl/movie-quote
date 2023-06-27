import React, { useState, createContext } from "react";
import Cookies from "universal-cookie";
const cookies = new Cookies();
interface userNameData {
  email: string;
  image: string;
  movies: any[];
  username: string;
}

type contxCreate = {
  login: boolean | string;
  setLogin: React.Dispatch<React.SetStateAction<boolean | string>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
};

// const userName = cookies.get("user");

type contxProv = {
  children: React.ReactNode;
};

export const loginContx = createContext<contxCreate>({
  login: "",
  setLogin: () => {},
  // username: {
  //   email: "",
  //   image: "",
  //   movies: [],
  //   username: userName,
  // },
  username: "",
  setUsername: () => "",
  email: "",
  setEmail: () => "",
});

export const LoginProvider: React.FC<contxProv> = ({ children }) => {
  const [login, setLogin] = useState<boolean | string>("");
  // const [username, setUsername] = useState<userNameData>({
  //   email: "",
  //   image: "",
  //   movies: [],
  //   username: userName,
  // });
  const [username, setUsername] = useState<string>("");
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
