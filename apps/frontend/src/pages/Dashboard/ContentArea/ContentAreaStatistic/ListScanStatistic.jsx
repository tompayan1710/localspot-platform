import React, { useEffect } from "react";
import "./ListScanStatistic.css"
import eyeicon from "../../../../assets/images/eyeblueicon.png"
import trashicon from "../../../../assets/images/trashicon.png"
import editicon from "../../../../assets/images/editicon.png"
import listeicon from "../../../../assets/images/listeicon.png"


export default function ListScanStatistic({scans, scansloading, scanserror}) {

    useEffect(()=>{
        console.log("Liste des scans :  ", scans);
    })

    function formatDateFR(dateISO) {
        const date = new Date(dateISO);
        const jour = String(date.getDate()).padStart(2, '0');
        const mois = String(date.getMonth() + 1).padStart(2, '0');
        const annee = date.getFullYear();
        return `${jour}/${mois}/${annee}`;
      }
      

  return (
    <div className="ListEmplacementContainer">
      <table className="emplacementTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Type d'apparei</th>
            <th>Navigateur </th>
            <th id="thAction">Action</th>
          </tr>
        </thead>
        <tbody>
          {scans.map((item, index) => (
            <tr key={item.id}>
              <td className="id">{scans[index]?.id}</td>
              <td>{formatDateFR(item?.created_at)}</td>
              <td>{item.device_type}</td>
              <td>{item.browser_name}</td>
              <td className="actions">
                <button className="icon-button view" title="Voir">
                    <img src={eyeicon} alt="eye icon"/>
                </button>
                <button className="icon-button edit" title="Éditer">
                    <img src={editicon} alt="edit icon"/>
                </button>
                <button className="icon-button delete" title="Supprimer">
                    <img src={trashicon} alt="trash icon"/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="SeeAllContainer">
        <p className="t6">Affichage de <strong>1</strong> à <strong>5</strong> sur <strong>42</strong> résultats</p>
        <button id="SeeAll">
            <img src={listeicon} alt="liste icon" />
            <p className="t6">Voir tout</p>
        </button>
      </div>
    </div>
  );
}
