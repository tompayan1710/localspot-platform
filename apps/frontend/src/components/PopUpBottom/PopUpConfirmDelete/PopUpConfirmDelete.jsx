import { forwardRef } from "react";
import CancelConfirmButton from "../CancelConfirmButton/CancelConfirmButton";
import "./PopUpConfirmDelete.css"
import PopUpBottom from "../PopUpBottom";

const PopUpConfirmDelete = forwardRef(({deleteVersement, setIsOccultView, loading}, ref) => {    
    
    
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
                <p className="t3">Confirmez vous la suppression de ce mode de versement ?</p>
                <p className="t5">Cette méthode ne sera plus disponible une fois supprimée, mais vous pourrez en ajouter une nouvelle à tout moment si nécessaire.</p>
                <CancelConfirmButton cancelText={"Annuler"} confirmText={"Supprimer"} loading={loading} theme={"red"} onCancel={() => {
                    ref.current.classList.remove("open");
                    setIsOccultView(false);
                }} onConfirm={deleteVersement} isValid={true}/>
            </div>
        </PopUpBottom>
    )}
)


export default PopUpConfirmDelete;
