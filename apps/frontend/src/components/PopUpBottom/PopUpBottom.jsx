import "./PopUpBottom.css"
import { useState, forwardRef, useEffect } from "react";
import crossiconBlack from "../../assets/images/crossiconBlack.png"

const PopUpBottom = forwardRef(({ children, title, onClose , isHeader}, ref) => {

  return (
    <div className="PopUpBottom" ref={ref}>
        {
          isHeader === false ? <></>
          :
          <>
            <button className="closeButton" onClick={onClose}>
                <img src={crossiconBlack}/>
            </button>
            {
                title
            }
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
