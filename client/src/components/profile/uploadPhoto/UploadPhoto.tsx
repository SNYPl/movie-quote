import React from "react";
import style from "./style.module.css";

const UploadPhoto: React.FC = () => {
  return (
    <div className={style.photo}>
      <span className={style.hiddenFileInput}>
        <input type="file" name="profilePhoto" />
      </span>
      <p>Upload new photo</p>
    </div>
  );
};

export default UploadPhoto;
