import React , {useState, useRef, useEffect} from "react";
import loupeicon from "../../assets/images/loupeicon.png";
import arrowdownicon from "../../assets/images/arrowdownicon.png"
import filtericon from "../../assets/images/filtericon.png"
import downloadicon from "../../assets/images/downloadicon.png"
import "./ListEmplacementsActif.css"; // si tu veux mettre le CSS à part
import { motion, AnimatePresence } from "framer-motion";
import ListeEmplacement from "./ListEmplacement"

export default function ListeEmplacementActif({markers, loading, error}) {
  const [exportState, setexportState] = useState(false);
  const [filterState, setfilterState] = useState(false);

  const [filterSelectOpen, setfilterSelectOpen] = useState(false);
  const [filterSelectOpen2, setfilterSelectOpen2] = useState(false);


  const exportRef = useRef(null);
  const filterRef = useRef(null);


  useEffect(() => {
    function handleClickOutside(event) {
      if (!exportRef.current.contains(event.target)) {
        setexportState(false);
      } else {
        console.log("Click open Export")
      }

      if (!filterRef.current.contains(event.target)) {
        setfilterState(false);
      } else {
        console.log("Click open filter")
      }
    }
  
    if (exportState || filterState) {
      document.addEventListener("click", handleClickOutside);
    }
  
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [exportState, filterState]);

   
  return (
    <div className="ContainerListeEmplacementActif">
      <p className="t4">Liste des emplacements actifs</p>
      <div className="search-container">
        <img src={loupeicon} className="search-icon" alt="loupe" />
        <input type="text" placeholder="Rechercher par ID, description..." />


        <div className={`FilterContainer`} ref={filterRef}>
          <button className="FilterButton" onClick={() => setfilterState(prev => !prev)}>
            <img src={filtericon} alt="filter icon"/>
            <p className="t5">Filtrer</p>
            <img src={arrowdownicon} alt="arrow down" className={`arrow-icon ${filterState ? "rotated" : ""}`}/>
          </button>

          <AnimatePresence mode="wait">
            {filterState && (
            <motion.div
              className={`OptionFilterContainer`}
              key="panel"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "20%", opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >   

            
              <label className="label t4">Ville</label>

              <div className="select-wrapper">
                <select className="select" 
                  onFocus={() => setfilterSelectOpen(true)}
                  onBlur={() => {
                    setTimeout(() => {
                      setfilterSelectOpen(false);
                    }, 100);
                  }}
                  onChange={() => setfilterSelectOpen(false)}>
                  <option>Toutes les villes</option>
                  <option>Paris</option>
                  <option>Lyon</option>
                  <option>Marseille</option>
                </select>
                <img
                  src={arrowdownicon}
                  className={`arrow-icon ${filterSelectOpen ? 'rotated' : ''}`}
                  alt="arrow"
                />
              </div>

              <label className="label t4">Date</label>
              <div className="select-wrapper">
              <select className="select" 
                  onFocus={() => setfilterSelectOpen2(true)}
                  onBlur={() => {
                    setTimeout(() => {
                      setfilterSelectOpen2(false);
                    }, 100);
                  }}
                  onChange={() => setfilterSelectOpen2(false)}>
                <option>Toutes les dates</option>
                <option>Ce mois-ci</option>
                <option>Cette semaine</option>
                <option>Aujourd’hui</option>
              </select>
                <img
                  src={arrowdownicon}
                  className={`arrow-icon ${filterSelectOpen2 ? 'rotated' : ''}`}
                  alt="arrow"
                />
              </div>
              <div className="Hline"></div>
              <button className="applyButton">Appliquer</button>
              </motion.div>
              )}
          </AnimatePresence>

        </div>
        




        <div className={`ExportContainer`} ref={exportRef}>
          <button className="ExportButton" onClick={() => setexportState(prev => !prev)}>
            <img src={downloadicon} alt="download icon"/>
            <p className="t5">Exporter</p>
            <img src={arrowdownicon} alt="arrow down" className={`arrow-icon ${exportState ? "rotated" : ""}`}/>
          </button>
          <AnimatePresence mode="wait">
            {exportState && (
            <motion.div
              className={`OptionExportContainer`}
              key="panel"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "40%", opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <button>
                {/*<img src={formaPDF} alt="forma PDF icon"/> */}
                Exporter en PDF
              </button>
              <div className="hline hlineExport"/>
              <button>
                {/*<img src={formaExcel} alt="forma Excel icon"/> */}
                Exporter en Excel
              </button>
              <div className="hline hlineExport"/>
              <button>
                {/*<img src={formaPNG} alt="forma PNG icon"/> */}
                Exporter en PNG
              </button>
              </motion.div>
              )}
          </AnimatePresence>
        </div>

  
      </div>

      <ListeEmplacement markers={markers} loading={loading} error={error}></ListeEmplacement>
    </div>
  );
}
