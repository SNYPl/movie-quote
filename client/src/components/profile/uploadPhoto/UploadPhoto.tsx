import React,{useState,useContext} from "react";
import style from "./style.module.css";
import { DashbCtrx } from "../../../store/dashboardContext";
import { loginContx } from "../../../store/LoginContext";

const UploadPhoto: React.FC = () => {
  const {setProfileImage,profileImage} = useContext(DashbCtrx)
  const {username}= useContext(loginContx)
  console.log(username)

  const onChangeInput = (e:any) => {
    let reader= new FileReader();
    if(!e.target.files[0]) {
        return;
    }

    reader?.readAsDataURL(e?.target?.files[0])
    reader.onload= () => {
      setProfileImage(reader?.result);
    }
   
    reader.onerror = (error) => {
      console.log("error" + " " + error)
    }

  }
  return (
    <div className={style.photo}>
      <article className={style.hiddenFileInput} style={{backgroundImage:`url(${profileImage})`}}>
        <input type="file" name="profilePhoto" accept="image/png, image/jpeg,image/jpg" onChange={onChangeInput}/>
      </article>
      <p>Upload new photo</p>
    </div>
  );
};

export default UploadPhoto;
