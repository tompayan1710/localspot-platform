import "./WhiteButton.css"

export default function WhiteButton({text, onClick, img, alt}){
    return (
        <button className="whiteButton" onClick={onClick}>
            {
                img && <img src={img} alt={alt}/>
            }
            <p className="t5">{text}</p>
        </button>
    )
}