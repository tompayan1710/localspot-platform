import "./ButtonLevier.scss"

export default function ButtonLevier({toogleInput, isSelected}){
return (
        <div className="toggleLevier">
            <input className="toggle-input" type="checkbox" onChange={toogleInput}  checked={isSelected} />
            <div className="toggle-handle-wrapper">
                <div className="toggle-handle">
                <div className="toggle-handle-knob"></div>
                <div className="toggle-handle-bar-wrapper">
                    <div className="toggle-handle-bar"></div>
                </div>
                </div>
            </div>
            <div className="toggle-base">
                <div className="toggle-base-inside"></div>
            </div>
        </div>
    );
}