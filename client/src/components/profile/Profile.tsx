import React from "react";
import style from "./style.module.css";
import UploadPhoto from "./uploadPhoto/UploadPhoto";
import EditForm from "./form/EditForm";
import { useTranslation } from "react-i18next";

const MyProfile: React.FC = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className={style.profile}>
      <h3> {t("myProfile.title")}</h3>
      <section className={style.profileContainer}>
        <UploadPhoto />
        <EditForm />
      </section>
    </div>
  );
};

export default MyProfile;
