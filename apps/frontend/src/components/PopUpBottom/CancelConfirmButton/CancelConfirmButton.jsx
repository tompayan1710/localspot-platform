import Spinner from "../../Spinner/Spinner"
import "./CancelConfirmButton.css"

export default function CancelConfirmButton({cancelText, confirmText, loading, onCancel, theme, onConfirm, isValid}) {
    return (
        <div className="CancelConfirmButton">
            <button className="CancelButton" onClick={onCancel}>
                <p className="t4">{cancelText}</p>
            </button>
            <button className={`ConfirmButton ${theme ? theme : ""}`} onClick={onConfirm} disabled={!isValid}>
                {
                    loading && <Spinner />
                }
                    <p className={`${loading ? "disapear" : ""} t4`}>{confirmText}</p>
            </button>
        </div>
    )
}