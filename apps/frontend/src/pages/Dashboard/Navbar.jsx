import React, { useEffect } from 'react';
import './styles/Navbar.css';
import notificon from '../../assets/images/notificon.png'
import profilicon from '../../assets/images/profilicon.png'
import plusicon from '../../assets/images/plusicon.png'
import localspot_logo from '../../assets/images/localspotlogo.png'

export default function Navbar() {

  return (
    <header className="navbar">
      <div className="navbar__brand">
        <button className='navbarbuttonicon localspot_logo'>
          <img src={localspot_logo}/>
        </button>
      </div>
      <div className="navbar__center">
        <div className='row'>
        <button className='navbarbuttonicon pictureprofil'>
            <img id="defaultprofil" src={profilicon}/>
          </button>
          <button className='navbarbuttonicon pictureprofil'>
            <img id="defaultprofil" src={profilicon}/>
          </button>
          <button className='navbarbuttonicon pictureprofil'>
            <img id="defaultprofil" src={profilicon}/>
          </button>
          <button className='navbarbuttonicon pictureprofil MoreMembers'>
            +3
          </button>
          <button className='AddMembers'>
            <div className='row'>
              <img src={plusicon}/>
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
          <button className='navbarbuttonicon'>
            <img id="defaultprofil" src={profilicon}/>
          </button>
        </div>
      </div>
    </header>
);
}
