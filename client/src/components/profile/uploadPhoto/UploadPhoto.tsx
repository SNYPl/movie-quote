import React, { useContext } from "react";
import style from "./style.module.css";
import { DashbCtrx } from "../../../store/dashboardContext";
import { RotatingLines } from "react-loader-spinner";
import { useQuery } from "react-query";
import axios from "axios";

const UploadPhoto: React.FC = () => {
  const { setProfileImage, profileImage } = useContext(DashbCtrx);

  const { isLoading, error, data } = useQuery("userInfo", () =>
    axios.get("http://localhost:3001/dashboard", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000/",
        " Access-Control-Allow-Credentials": true,
      },
      withCredentials: true,
    })
  );

  const onChangeInput = (e: any) => {
    let reader = new FileReader();
    if (!e.target.files[0]) {
      return;
    }

    reader?.readAsDataURL(e?.target?.files[0]);
    reader.onload = () => {
      setProfileImage(reader?.result);
    };

    reader.onerror = (error) => {
      console.log("error" + " " + error);
    };
  };

  return (
    <div className={style.photo}>
      <article
        className={style.hiddenFileInput}
        style={{
          backgroundImage: `url(${
            profileImage ? profileImage : data?.data.image
          })`,
        }}
      >
        {isLoading && !profileImage ? (
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="40"
            visible={true}
          />
        ) : (
          ""
        )}
        <input
          type="file"
          name="profilePhoto"
          accept="image/png, image/jpeg,image/jpg"
          onChange={onChangeInput}
        />
      </article>
      <p>Upload new photo</p>
    </div>
  );
};

export default UploadPhoto;
