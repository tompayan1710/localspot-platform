import React, { useEffect, useState, useRef } from 'react';
import './styles/VerticalBar.css';
import hamburgericon from '../../assets/images/hamburgericon.png'
import qrcodeicon from '../../assets/images/qrcodeicon.png'
import staticon from '../../assets/images/staticon.png'
import mapicon from '../../assets/images/mapicon.png'
import equipeicon from '../../assets/images/equipeicon.png'
import settingicon from '../../assets/images/settingicon.png'

export default function Navbar(props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [menuVisible, setMenuVisible] = useState(false);
  const [hideText, setHideText] = useState(false);


  const menuItems = [
    { label: 'Tableau de bord', icon: mapicon, labelnav: "home" },
    { label: 'Emplacement', icon: mapicon, labelnav: "emplacement" },
    { label: 'Mes offres', icon: qrcodeicon, labelnav: "myoffers" },
    { label: 'Statistique', icon: staticon, labelnav: "statistic" },
    { label: 'Mon équipe', icon: equipeicon, labelnav: "myteam" },
    { label: 'Paramètre', icon: settingicon, labelnav: "settings" },
  ];

  // 🧠 Effet qui suit toujours le vrai état (déclaratif)
  useEffect(() => {
    if (menuVisible) {
      // si le menu est ouvert : montrer immédiatement
      setHideText(false);
    } else {
      // si le menu est fermé : attendre animation
      const timeout = setTimeout(() => {
        setHideText(true);
      }, 500); // match duration CSS

      return () => clearTimeout(timeout); // évite les conflits
    }
  }, [menuVisible]);

  const toggleMenu = () => {
    setMenuVisible(prev => !prev);
    props.setMenuVisible(prev => !prev)
  };
  
  
  
  
  return (
<header className={`verticalbar ${menuVisible ? '' : 'collapsed'}`}>
      <div className="verticalbar__brand">
        <button className='hamburgericon' onClick={toggleMenu}>
          <img src={hamburgericon}/>
          <span style={{ marginLeft: "8px", color: "black" }}>
            {menuVisible ? '' : ''}
          </span>
        </button>
        {
          menuItems.map((item, index) => (
            <button key={index} className={`row MenueElement ${selectedIndex === index ? 'selected' : ''}`} 
            onClick={() => {
              props.setActivePage(item.labelnav)
              setSelectedIndex(index)
            }
             }>
              <img src={item.icon}/>
              <p className={`t5 ${hideText ? 'displayNone' : ''}`}>{item.label}</p>
            </button>
          )
        )
        }
        <div className={`InformationContainer ${hideText ? 'displayNone' : ''}`}>
          <p className='t5'>Besoin d'aide?</p>
          <p className='t6'>Consultez notre centre d'aide ou contactez notre support.</p>
          <button className='t5'>
            Contacter le support
          </button>
        </div>
      </div>
    </header>
);
}
