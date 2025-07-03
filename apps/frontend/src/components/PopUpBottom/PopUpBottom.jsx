import "./PopUpBottom.css"
import { forwardRef } from "react";
import crossiconBlack from "../../assets/images/crossiconBlack.png"

const PopUpBottom = forwardRef(({ children, title, onClose , isHeader}, ref) => {

  return (
    <div className="PopUpBottom" ref={ref}>
        {
          isHeader === false ? <></>
          :
          <>
            <button className="closeButton" onClick={onClose}>
                <img src={crossiconBlack} alt="cross icon"/>
            </button>
            <div className="centerBar"></div>
            {/* {
                title
            } */}
            <div className="PopUpLine"></div>
          </>
        } 
        <div className="bodyPopUpBottom">
            {children}
        </div>
    </div>
  );
}
)

export default PopUpBottom;
