import WhiteButton from "../../components/Buttons/WhiteButton/WhiteButton"
import FadeInImage from "../../components/Utils/FadeInImage"
import "./ErrorPageTemplate.css"

export default function ErrorPageTemplate({img, alt, widthImg, heightImg, title, description, textButton, onClickButton}) {
    return (
        <div className="ErrorPage">
            <FadeInImage src={img} alt={alt} style={{
                width: widthImg ? widthImg : "auto",
                height: heightImg ? heightImg : "auto"
            }}/>
            <div className="BodyError">
                <p className="t4 bold">{title}</p>
                <p className="t6">{description}</p>
            </div>
            <WhiteButton text={textButton} onClick={onClickButton}/>
        </div>
    )
}