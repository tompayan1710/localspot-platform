import React from "react";
import { useDragScroll } from './useDragScroll.js'; // adapte le chemin si besoin
import './ListeScrollable.css'; // adapte le chemin si besoin
import disponnibleicon from '../../assets/images/disponnibleicon.png'; 
/*import indisponnibleicon from '../../assets/images/indisponnibleicon.png'; */
import surfaceicon from '../../assets/images/surfaceicon.png'; 
import bedremplieicon from '../../assets/images/bedremplieicon.png'; 
import towuserfilicon from '../../assets/images/towuserfilicon.png'; 


const ListScrollable = () => {
  const [ref] = useDragScroll();

  const images = [
    "https://picsum.photos/id/1018/600/400",
    "https://picsum.photos/id/1015/600/400",
    "https://picsum.photos/id/1016/600/400",
    "https://picsum.photos/id/1019/600/400",
    "https://picsum.photos/id/1020/600/400",
  ];

  return (
      <div ref={ref} className="ContainerListeScrollable">
          {
            images.map((item, index) => {
              return(
                <div index={index} className="item">
                  <img src={images[index]}  alt={`Emplacement appartement n°${index}`} draggable={false}/>
                  <div className="itemInfoContainer">
                    <div className="occupationcontainer">
                      <p  className="t32">8/10</p><div className="row"><img src={disponnibleicon} alt="icon validate"/><p className="t6">disponnible</p></div>
                    </div> 
                    <p className="t5">places occupées</p>
                    <div className="contentitem row">
                      <div className="row">
                        <img src={surfaceicon}/>
                        <p>90 m²</p>
                      </div>
                      <div className="row">
                        <img src={bedremplieicon}/>
                        <p>2</p>
                      </div>
                      <div className="row">
                        <img src={towuserfilicon}/>
                        <p>3</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          }
      </div>
  );
};

export default ListScrollable;
