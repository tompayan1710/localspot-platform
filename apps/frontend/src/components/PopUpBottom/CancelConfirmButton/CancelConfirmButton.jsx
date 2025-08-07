import Spinner from "../../Spinner/Spinner"
import "./CancelConfirmButton.css"

export default function CancelConfirmButton({cancelText, confirmText, loading, onCancel, onConfirm}) {
    return (
        <div className="CancelConfirmButton">
            <button className="CancelButton" onClick={onCancel}>
                <p className="5">{cancelText}</p>
            </button>
            <button className="ConfirmButton" onClick={onConfirm}>
                {
                    loading ? <Spinner /> :
                    <p className="5">{confirmText}</p>
                }
            </button>
        </div>
    )
}