import React, { useEffect, useState, useRef, useContext } from 'react';

import './styles/Navbar.css';
import notificon from '../../assets/images/notificon.png'
import profilicon from '../../assets/images/profilicon.png'
import plusicon from '../../assets/images/plusicon.png'
import localspot_logo from '../../assets/images/localspotlogo.png'
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';

import { logout } from "../../services/auth";

import { AuthContext } from "../../components/Auth/authContext/authContext"

export default function Navbar() {
  const [menuIsOpen, setmenuIsOpen] = useState(false);

  const menuRef = useRef(null);

  const navigate = useNavigate();

  const { authState } = useContext(AuthContext);

  useEffect(() => {
    function handleClickOutside(event) {
      if (!menuRef.current.contains(event.target)) {
        setmenuIsOpen(false);
      } else {
        console.log("Click open Profile Menue")
      }
    }
  
    if (menuIsOpen) {
      document.addEventListener("click", handleClickOutside);
    }
  
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuIsOpen]);


  const handleLogout = () => {
      logout();
      navigate("/login");
    };

  return (
    <header className="navbar">
      <div className="navbar__brand">
        <button className='navbarbuttonicon localspot_logo'>
          <img src={localspot_logo} alt='localspot logo'/>
        </button>
      </div>
      <div className="navbar__center">
        <div className='row'>
        <button className='navbarbuttonicon pictureprofil'>
            <img className="defaultprofil" src={profilicon} alt='list profile icon'/>
          </button>
          <button className='navbarbuttonicon pictureprofil'>
            <img className="defaultprofil" src={profilicon} alt='list profile icon'/>
          </button>
          <button className='navbarbuttonicon pictureprofil'>
            <img className="defaultprofil" src={profilicon} alt='list profile icon'/>
          </button>
          <button className='navbarbuttonicon pictureprofil MoreMembers'>
            +3
          </button>
          <button className='AddMembers'>
            <div className='row'>
              <img src={plusicon} alt='plus icon'/>
              <p className='t5'>Ajouter membres</p>
            </div>
          </button>
        </div>
      </div>
      <div className="navbar__menu">
        <div className='row'>
          
          <button className='navbarbuttonicon'>
            <img id="notificon" src={notificon}/>
          </button>
          
          <div style={{ width: "15px", height: "15px", backgroundColor: authState.isAuth ? "green" : "red", borderRadius: "100%", 
    marginRight: "15px" }}></div>
          
          <div className='navbarbuttonicon' ref={menuRef} onClick={() => {
            console.log("J'ai clique");

            setmenuIsOpen(prev => !prev)}
          }>
            <img className="defaultprofil" src={profilicon} alt='list profile icon'/>


            <div className={`ExportContainer`}>
              
              <AnimatePresence mode="wait">
                {menuIsOpen && (
                <motion.div
                  className={`OptionExportContainer`}
                  key="panel"
                  initial={{ y: "100%", x: "calc(-50% - 10px)", opacity: 0 }}
                  animate={{ y: "6px", opacity: 1 }}
                  exit={{ y: "100%", opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
      
                  <button className='firstMenu' onClick={() => {navigate("/profile")}}>Mon profil</button>
                  <button>Paramètre</button>
                  <div className="hline hlineExport"/>
                  
                  <button className='lastMenu' id='deconnexion' onClick={handleLogout}>Déconnexion</button>


                  </motion.div>
                  )}
              </AnimatePresence>
            </div>
            
          </div>
        </div>
      </div>
    </header>
);
}
