import React, {useEffect, useState, useRef} from "react";
import styles from "./BottomSheet.css";
import crossicon from "../../assets/images/crossicon.png"
import Carousel from "../../components/Carousel/Carousel"
import bedicon from "../../assets/images/bedicon.png"
import twousericon from "../../assets/images/twousericon.png"
import arrowdownicon from "../../assets/images/arrowdownicon.png"
import adresseicon from "../../assets/images/adresseicon.png"
import LineChart from "../../components/Visualisation/LineChart"

import ListScrollable from "../../components/ListScrollable/ListeScrollable";
import { delay, motion, AnimatePresence } from "framer-motion";





export default function BottomSheet({onClose,selected,  ...motionProps}) {
  const [openOptions, setOpenOptions] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Ce mois-ci");
  const menuRef = useRef(null);
  const scrollRef = useRef(null);





  const images = [
    "https://picsum.photos/id/1018/600/400",
    "https://picsum.photos/id/1015/600/400",
    "https://picsum.photos/id/1016/600/400",
    "https://picsum.photos/id/1019/600/400",
    "https://picsum.photos/id/1020/600/400",
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if(menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenOptions(false);
      }
    }

    if(openOptions){
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    }, [openOptions])

  const handleSelect = (value) => {
    setSelectedFilter(value);
    setOpenOptions(false);
  };


  return (
    <>

      

      <AnimatePresence mode="wait">
        {selected && (
        <motion.div
          className={`CardEmplacement`}
          {...motionProps}
          key="panel"
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: "0%", opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
      
      <Carousel></Carousel>
      <div className="row adresseEmplacementContainer">
        <img src={adresseicon}/>
        <p className="t4">{selected?.adresse}</p>

          {/*
        <p className="t4">{selected?.latitude}</p>
        <p className="t4">{selected?.longitude}</p>
          */}
      </div>
      
      <div>
        <div className="statEmplacement">
          <div>
            <div className="row">
              <p className="t3">2</p>
              <img src={bedicon}/>
            </div>
            <p className="t5">Chambre</p>
          </div>
          <div>
            <div className="row">
              <p className="t3">90%</p>
            </div>
            <p className="t5">d'occupation</p>
          </div>
          <div>
            <div className="row">
              <p className="t3">40</p>
              <img src={twousericon}/>
            </div>
            <p className="t5">vaccanciers</p>
          </div>
        </div>



        <div className="menuStat" ref={menuRef}>
          <button className="menuButton" onClick={() => setOpenOptions(!openOptions)}>
            <span>{selectedFilter}</span>
            <img
              src={arrowdownicon}
              className={`chevron ${openOptions ? "rotated" : ""}`}
              alt="chevron"
            />
          </button>
            <div
            className={`optionsMenu ${openOptions ? "show": ""}`}
>
              <div onClick={() => handleSelect("Ce mois-ci")}>Ce mois-ci</div>
              <div onClick={() => handleSelect("Cette semaine")}>Cette semaine</div>
              <div onClick={() => handleSelect("Aujourd’hui")}>Aujourd’hui</div>
            </div>
        </div>





      </div>
      <div className="ContainerLineChart">
        <LineChart height="200px"></LineChart>          
      </div>



      <div className="ContainerListeEmplacement">
        <ListScrollable images={images} />
      </div>
    </motion.div>
    )}
    </AnimatePresence>

    
    <AnimatePresence>
      {selected && (
        <motion.button
          className="crossButton"
          key="cross-btn"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut", delay: selected ? 0.2 : 0.0 }}
          onClick={onClose}
        >
          <img src={crossicon} alt="fermer" />
        </motion.button>
      )}
    </AnimatePresence>
    
    

      
    </>
    
  );
}
