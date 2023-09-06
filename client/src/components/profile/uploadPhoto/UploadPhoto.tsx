import React, { useContext, useState } from "react";
import style from "./style.module.css";
import { DashbCtrx } from "../../../store/dashboardContext";
import { RotatingLines } from "react-loader-spinner";
import { useQuery } from "react-query";
import axios from "../../../helper/axios";
import { useTranslation } from "react-i18next";

const UploadPhoto: React.FC = () => {
  const { setProfileImage, profileImage } = useContext(DashbCtrx);
  const { t } = useTranslation();
  const [curImg, setCurImg] = useState<any | null>("");

  const { isLoading, error, data } = useQuery(
    "userInfo",
    () =>
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/dashboard`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json; charset=utf-8",
          "Access-Control-Allow-Origin": process.env.ACCESS_ALLOW_URL,
          "Access-Control-Allow-Credentials": true,
        },
        withCredentials: true,
      }),
    { refetchOnWindowFocus: false }
  );

  const onChangeInput = (e: any) => {
    let reader = new FileReader();

    const file = e?.target?.files[0];
    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      return;
    }

    setProfileImage(file);

    reader.readAsDataURL(file);

    reader.onload = () => {
      setCurImg(reader?.result);
    };
  };

  const image = !data?.data?.image
    ? ""
    : isLoading
    ? ""
    : `${process.env.REACT_APP_BACKEND_URL}/uploads/images/${data?.data.image}`;

  return (
    <div className={style.photo}>
      <article className={style.hiddenFileInput}>
        <img src={curImg ? curImg : image} className={style.hiddenFileInput} />
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
          name="image"
          accept="image/png, image/jpeg,image/jpg"
          onChange={onChangeInput}
        />
      </article>
      <p>{t("myProfile.upload")}</p>
    </div>
  );
};

export default UploadPhoto;
