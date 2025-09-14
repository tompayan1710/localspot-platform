import ErrorPageTemplate from "./ErrorPageTemplate/ErrorPageTemplate";

import NotFoundBoat from "../assets/images/NotFoundBoat.png"
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <ErrorPageTemplate img={NotFoundBoat} alt={"not found illustration"} widthImg={"min(260px, 80%)"} heightImg={"auto"} title={t("not_found_title")} description={t("not_found_description")} textButton={t("back_to_home")} onClickButton={() => navigate("/")}>
    </ErrorPageTemplate>
  );
}
