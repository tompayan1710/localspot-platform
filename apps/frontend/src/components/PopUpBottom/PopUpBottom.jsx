import "./PopUpBottom.css"
import { forwardRef } from "react";
import crossiconBlack from "../../assets/images/crossiconBlack.png"

const PopUpBottom = forwardRef(({ children, title, onClose , isHeader, duration=0.3, fullHeight, zIndex}, ref) => {

  return (
    <div className={`PopUpBottom ${fullHeight && "fullHeight"} ${isHeader === false ? "NoHeader" : ""}`} style={{transitionDuration: `${duration}s`, ...(fullHeight ? { height: "calc(100% - 40px)" } : {}), ...(zIndex ? { zIndex: `${zIndex}` } : {})}} ref={ref}>
        {
          isHeader === false ? <></>
          :
          <div className="HeadContainer">

            <button className="closeButton" onClick={onClose}>
                <img src={crossiconBlack} alt="cross icon"/>
            </button>
            <div className="centerBar"></div>
            {/* {
                title
            } */}
            <div className="PopUpLine"></div>
          </div>
        } 
        <div className="bodyPopUpBottom noScroll">
            {children}
        </div>
    </div>
  );
}
)

export default PopUpBottom;
