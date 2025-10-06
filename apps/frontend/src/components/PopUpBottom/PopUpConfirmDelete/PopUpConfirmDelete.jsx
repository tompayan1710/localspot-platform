import { forwardRef } from "react";
import CancelConfirmButton from "../CancelConfirmButton/CancelConfirmButton";
import "./PopUpConfirmDelete.css"
import PopUpBottom from "../PopUpBottom";
import { useTranslation } from "react-i18next";

const PopUpConfirmDelete = forwardRef(({deletefunction, setIsOccultView, loading}, ref) => {    
    const {t} = useTranslation();
    
    return (
        <PopUpBottom
            onClose={() => {
                ref.current.classList.remove("open");
                setIsOccultView(false);
            }}
            isHeader={false}
            ref={ref}
            >
            <div className="PopUpConfirmDelete">
                <p className="t3">{t("Confirm_deletion_payout")}</p>
                <p className="t5">{t("Confirm_deletion_payout_text")}</p>
                <CancelConfirmButton cancelText={t("Cancel")} confirmText={"Supprimer"} loading={loading} theme={"red"} onCancel={() => {
                    ref.current.classList.remove("open");
                    setIsOccultView(false);
                }} onConfirm={deletefunction} isValid={true}/>
            </div>
        </PopUpBottom>
    )}
)


export default PopUpConfirmDelete;
