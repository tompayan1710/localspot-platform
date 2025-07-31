import "./BottomBar.css"

export default function BottomBar({text="None", onClick={}, towbutton = false}){
    return (
        <div className="BottomBar">
            <div className="ContainerButtons row">
                <button className="FillButton" onClick={onClick}>
                    <p className="t4">{text}</p>
                </button>
            </div>
        </div>
    )
}