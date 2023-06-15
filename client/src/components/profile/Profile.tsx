import React from "react";
import style from "./style.module.css";
import UploadPhoto from "./uploadPhoto/UploadPhoto";
import EditForm from "./form/EditForm";

const MyProfile: React.FC = () => {
  return (
    <div className={style.profile}>
      <h3>My profile</h3>
      <section className={style.profileContainer}>
        <UploadPhoto />
        <EditForm />
      </section>
    </div>
  );
};

export default MyProfile;
